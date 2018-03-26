'use strict'

const {dialog} = require('electron').remote
const ipc = require('electron').ipcRenderer
const utils = require('../utils.js')

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
	}else if(name == 'custom'){
		lesson.course = document.getElementById('new-course').value
	}else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none'
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

let createPrep = (kind) => {
	let prep = document.createElement('div')
	prep.setAttribute('class', 'create-prep')

	if(kind == 'txt'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('kind', 'txt')
		text.setAttribute('class', 'create-concept-prep')
		prep.appendChild(text)
	}else if(kind == 'url'){
		let url = document.createElement('input')
		url.setAttribute('type', 'text')
		url.setAttribute('kind', 'url')
		url.setAttribute('placeholder', 'url')
		url.setAttribute('class', 'create-concept-prep')
		prep.appendChild(url)

		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('kind', 'txt')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('class', 'create-concept-prep url')
		prep.appendChild(text)
	}else if(kind == 'img'){
		let src = document.createElement('input')
		src.setAttribute('type', 'text')
		src.setAttribute('kind', 'img')
		src.setAttribute('placeholder', 'src')
		src.setAttribute('class', 'create-concept-prep url')
		prep.appendChild(src)
	}else{
		console.log('unexpected type for new prep')
	}

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	prep.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	prep.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	prep.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-prep')
	rem.setAttribute('onclick', 'removePrep(this)')
	rem.innerText = '-'
	prep.appendChild(rem)

	return prep
}

let addPrep = (el) => {

	if(el.getAttribute('class') == 'create-add-prep'){

		let prep = createPrep(el.value)
		let prep_holder
		if(el.parentNode.getAttribute('class') == 'create-concept'){ //if we're creating the first prep

			for(let _el of el.parentNode.children){ // we find the content-holder
				if(_el.getAttribute('class') == 'content-holder')
					_el.children[0].appendChild(prep) //and we append to its first child, the prep-holder
			}
			//prep_holder = el.parentNode.children[el.parentNode.children.length-1]
		//	prep_holder.appendChild(prep)
		}else if(el.parentNode.getAttribute('class') == 'create-prep'){
			el.parentNode.insertAdjacentElement('afterend', prep)
		}

	}else if(el.getAttribute('class') == 'create-add-concept'){

		let prep = createPrep('text')
		return prep

	}
}

let addNote = (el) => {
	//TODO
}

let removeNote = (el) => {
	//TODO
}

let removePrep = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	//TODO add content-holder and prep-holder
	let content_holder = document.createElement('div')
	content_holder.setAttribute('class', 'content-holder')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

	let prep = document.createElement('div')
	prep.setAttribute('class', 'create-prep')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	concept.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	concept.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	concept.appendChild(b_img)

	let dummy = document.createElement('div')
	concept.append(dummy)


	let prep_holder = document.createElement('div')
	content_holder.appendChild(prep_holder)
	concept.append(content_holder)

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

let parseLesson = () => {
	//TODO adapt parsing to new structure of edit-notes.pug (div.content-holder and div.prep-holder)
	lesson.concepts = []

	let dropdown = document.getElementById('course-list') != null ? document.getElementById('course-list').value :  document.getElementById('existing-course').innerText
	lesson.course = dropdown != 'new course' ? dropdown : document.getElementById('new-course').value
	lesson.title = document.getElementById('title').value

	lesson.path.local = document.getElementById('local-path').value
	//TODO remove remote path

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []
		concept.push(_co.childNodes[0].value) //find its name

		for(let note of _co.childNodes[5].childNodes[0].childNodes){ //go through all notes, first finding the 'content-holder' and then finding the 'prep-holder'
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-prep'){

				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields

				if(_cn[0].getAttribute('kind') == 'txt')
					concept.push({'type':'txt', 'text': _cn[0].value})
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

let saveLesson = (_type) => {
	parseLesson()

	if(lesson.course == '' || lesson.title == ''){

		let _title = 'something is missing'
		let _error = 'it seems you haven\'t specified a course or a lesson title.'

		dialog.showErrorBox(_title, _error)
	}else{
		utils.setMessage('saved!', 'info')

		lesson.prefix = _type //either prep or in-class
		console.log(lesson);
	//		ipc.send('save-lesson', lesson)
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

/*
let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => {el.style.opacity = 0}, 2000)
}
*/
export { selectCourse, selectCoursePath, addNote, removeNote, addPrep, removePrep, addConcept, removeConcept, saveLesson, exitLesson}
