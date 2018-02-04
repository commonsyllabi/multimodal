'use strict'

const {dialog, globalShortcut} = require('electron').remote
const ipc = require('electron').ipcRenderer

globalShortcut.register('CmdOrCtrl+S', () => {
	saveLesson()
})

window.onbeforeunload = () => {
	globalShortcut.unregisterAll()
}

let lesson = {
	'course' : '',
	'path': {
		'local': '',
		'remote':''
	},
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name.value == 'new course'){
		document.getElementById('new-course').style.display = 'inline'
		document.getElementById('set-new-course').style.display = 'inline'
	}else if(name == 'custom'){
		lesson.course = document.getElementById('new-course').value
	}else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none'
		document.getElementById('set-new-course').style.display = 'none'
	}
}

let selectCoursePath = () => {
	let options = {
		'title':'Select course folder',
		'defaultPath':'~/',
		'properties':['openDirectory']
	}

	dialog.showOpenDialog(options, (path) => {
		lesson.path.local = path
		document.getElementById('local-path').value = path
	})
}

let createNote = (kind) => {
	let note = document.createElement('div')
	note.setAttribute('class', 'create-note')
	
	if(kind == 'text'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('kind', 'text')
		text.setAttribute('class', 'create-concept-note')
		note.appendChild(text)
	}else if(kind == 'url'){
		let url = document.createElement('input')
		url.setAttribute('type', 'text')
		url.setAttribute('kind', 'url')
		url.setAttribute('placeholder', 'url')
		url.setAttribute('class', 'create-concept-note')
		note.appendChild(url)

		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('kind', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('class', 'create-concept-note')
		note.appendChild(text)
	}else if(kind == 'img'){
		let src = document.createElement('input')
		src.setAttribute('type', 'text')
		src.setAttribute('kind', 'img')
		src.setAttribute('placeholder', 'src')
		src.setAttribute('class', 'create-concept-note')
		note.appendChild(src)
	}else{
		console.log('unexpected type for new note')
	}

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-note')
	b_txt.setAttribute('onclick', 'addNote(this)')
	b_txt.setAttribute('value', 'text')
	b_txt.innerText = 'txt'

	note.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-note')
	b_url.setAttribute('onclick', 'addNote(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	note.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-note')
	b_img.setAttribute('onclick', 'addNote(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	note.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-note')
	rem.setAttribute('onclick', 'removeNote(this)')
	rem.innerText = '-'
	note.appendChild(rem)

	return note
}

let addNote = (el) => {

	if(el.getAttribute('class') == 'create-add-note'){

		let note = createNote(el.value)
		el.parentNode.insertAdjacentElement('afterend', note)
	}else if(el.getAttribute('class') == 'create-add-concept'){
		let note = createNote('text')
		return note
	}
}

let removeNote = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

	let note = addNote(el)
	concept.appendChild(note)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-concept')
	add.setAttribute('onclick', 'addConcept(this)')
	add.innerText = '+'
	concept.appendChild(add)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-concept')
	rem.setAttribute('onclick', 'removeConcept(this)')
	rem.innerText = '-'
	concept.appendChild(rem)

	el.parentNode.insertAdjacentElement('afterend', concept)
}

let removeConcept = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let createOption = (val) => {
	let el = document.createElement('option')
	el.innerText = '- '+val
	el.value = val
	return el
}

let parseLesson = () => {

	lesson.concepts = []

	let dropdown = document.getElementById('course-list') != null ? document.getElementById('course-list').value :  document.getElementById('existing-course').innerText
	lesson.course = dropdown != 'new course' ? dropdown : document.getElementById('new-course').value
	console.log(lesson.course)
	lesson.title = document.getElementById('title').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []
		concept.push(_co.childNodes[0].value) //find its name

		for(let note of _co.childNodes){ //go through all notes
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-note'){
				
				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields
 
				if(_cn[0].getAttribute('kind') == 'text')
					concept.push({'type':'text', 'text': _cn[0].value})
				else if(_cn[0].getAttribute('kind') == 'url')
					concept.push({'type':'url', 'url': _cn[0].value, 'text': _cn[1].value})
				else if(_cn[0].getAttribute('kind') == 'img')
					concept.push({'type':'img', 'src': _cn[0].value})
			}
		}

		lesson.concepts.push(concept)
	}

	console.log('parsed:',lesson)
}

let saveLesson = () => {
	parseLesson()

	if(lesson.course == '' || lesson.title == ''){

		let _title = 'something is missing'
		let _error = 'it seems you haven\'t specified a course or a lesson title.'

		dialog.showErrorBox(_title, _error)
	}else{
		setMessage('saved!')
		ipc.send('save-lesson', lesson)
	}
}

let exitLesson = () => {

	parseLesson()

	let options = {	'type':'info',
		'buttons':['cancel', 'Quit anyways'],
		'title':'are you sure?',
		'message':'it seems you haven\'t specified a course or a lesson title. do you want to quit anyways?'
	}

	if(lesson.course == '' || lesson.title == ''){
		if(dialog.showMessageBox(options) == 1) 
			ipc.send('exit-home', {'coming':'back'})

	}else {
		ipc.send('exit-home', {'coming':'back'})
	}
}

let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => {el.style.opacity = 0}, 2000)
}

export { selectCourse, selectCoursePath, addNote, removeNote, addConcept, removeConcept, saveLesson, exitLesson}
