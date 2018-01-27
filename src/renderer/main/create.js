'use strict'

const ipc = require('electron').ipcRenderer

let lesson = {
	'course' : '',
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name.value == 'new course')
		document.getElementById('new-course').style.display = 'block';
	else if(name == 'custom')
		lesson.course = document.getElementById('new-course').value
	else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none';
	}
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
		note.appendChild(src)
	}else{
		console.log('unexpected type for new note')
	}

	let select = document.createElement('select')
	select.setAttribute('class', 'create-add-note')
	select.setAttribute('onchange', 'addNote(this)')

	select.appendChild(createOption('add'))
	select.appendChild(createOption('text'))
	select.appendChild(createOption('url'))
	select.appendChild(createOption('img'))

	note.appendChild(select)

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

let saveLesson = () => {
	let dropdown = document.getElementsByClassName('create-courses-list')[0].value
	lesson.course = dropdown != 'new course' ? dropdown : document.getElementById('new-course').value

	lesson.title = document.getElementById('title').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []
		concept.push(_co.childNodes[0].value) //find its name

		for(let note of _co.childNodes){ //go through all notes
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-note'){
				
				let _cn = note.childNodes

				if(_cn[0].getAttribute('kind') == 'text')
					concept.push({"type":"text", "text": _cn[0].value})
				else if(_cn[0].getAttribute('kind') == 'url')
					concept.push({"type":"url", "url": _cn[0].value, "text": _cn[1].value})
				else if(_cn[0].getAttribute('kind') == 'img')
					concept.push({"type":"img", "src": _cn[0].value})
			}
		}

		lesson.concepts.push(concept)
	}

	console.log('saving:',lesson)

	ipc.send('save-lesson', lesson)

}

let exitLesson = () => {
	saveLesson()
	//TODO return to main page
}

export { selectCourse, addNote, removeNote, addConcept, removeConcept, saveLesson, exitLesson}
