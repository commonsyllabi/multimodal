'use strict'

const {dialog} = require('electron').remote
const remote = require('electron').remote
const ipc = require('electron').ipcRenderer
const utils = require('../utils.js')

let lessonSaved = false
let lesson = {
	'course' : {},
	'title' : '',
	'concepts': []
}

let course = {
	'name': '',
	'path': '',
	'year':''
}

let selectCourse = (_el) => {
	let val = _el.options[_el.selectedIndex].value
	console.log(_el.options[_el.selectedIndex].value)
	if(val == 'create-course')
		createNewCourse()
}

let createNewCourse = () => {
	ipc.send('create-new-course')
}

let saveCourse = () => {
	let _course = {}
	_course.name = document.getElementById('course-name').value
	_course.year = document.getElementById('course-year').value
	_course.path = document.getElementById('course-path').value

	if(_course.name == null || _course.year == null || _course.path == null){
		alert('Some fields are missing!')
		console.log(_course)
	}else{
		ipc.send('save-course', _course)
	}
}

let exitCourse = () => {
	let w = remote.getCurrentWindow()
	w.close()
}

let selectCoursePath = () => {
	let options = {
		'title':'Select course folder',
		'defaultPath':'~/',
		'properties':['openDirectory', 'createDirectory']
	}

	dialog.showOpenDialog(options, (path) => {
		course.path = path
		document.getElementById('course-path').value = path
	})
}

let selectMediaPath = (_el) => {
	let options = {
		'title':'Select file',
		'defaultPath': '~/',
		'properties':['openFile']
	}

	dialog.showOpenDialog(options, (path) => {
		_el.previousSibling.value = path
		_el.previousSibling.setAttribute('src', path)
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

		let tag = document.createElement('input')
		tag.setAttribute('type', 'text')
		tag.setAttribute('placeholder', 'tag')
		tag.setAttribute('kind', 'tag')
		tag.setAttribute('class', 'create-concept-prep create-concept-tag')
		prep.appendChild(tag)
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
		src.setAttribute('filename', '')
		src.setAttribute('class', 'create-concept-prep img')
		prep.appendChild(src)

		let expl = document.createElement('button')
		expl.innerText = 'select'
		expl.setAttribute('onclick', 'selectMediaPath(this)')
		expl.setAttribute('kind', 'path')
		expl.setAttribute('class', 'create-add-prep')
		prep.appendChild(expl)
	}else{
		console.log('unexpected type for new prep')
	}


	// create interface
	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-remove-holder')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	b_holder.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	b_holder.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	b_holder.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-prep')
	rem.setAttribute('onclick', 'removePrep(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	prep.appendChild(b_holder)

	return prep
}

let addPrep = (el) => {
	let prep = createPrep(el.value) //either txt, or url, or img

	if(el.parentNode.getAttribute('class') == 'create-add-holder'){ //if we're creating the first prep

		// for(let _el of el.parentNode.parentNode.children) // we find the content-holder
		// 	if(_el.getAttribute('class') == 'content-holder')
				el.parentNode.parentNode.appendChild(prep) //and we append to its first child, the content-holder

	}else if(el.parentNode.getAttribute('class') == 'create-add-remove-holder'){ //otherwise there's already a prep
		el.parentNode.parentNode.insertAdjacentElement('afterend', prep)
	}
}

let removePrep = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}

let addWriteup = (el) => {
	let writeup = createWriteup()
	el.parentNode.parentNode.insertAdjacentElement('afterend', writeup)
}

let createWriteup = () => {
	let writeup = document.createElement('div')
	writeup.setAttribute('class', 'create-concept-writeup')
	writeup.setAttribute('type', 'text')

	let content = document.createElement('textarea')
	content.setAttribute('placeholder', 'empty writeup')
	writeup.appendChild(content)

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-writeup-holder')

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-writeup')
	rem.setAttribute('onclick', 'removeWriteup(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-writeup')
	add.setAttribute('onclick', 'addWriteup(this)')
	add.innerText = '+'
	b_holder.appendChild(add)

	writeup.appendChild(b_holder)

	return writeup
}

let removeWriteup = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}


let addNote = (el) => {
	let note = createNote()
	el.parentNode.parentNode.insertAdjacentElement('afterend', note)
}

let createNote = () => {
	let note = document.createElement('div')
	note.setAttribute('class', 'create-concept-note')
	note.setAttribute('type', 'text')

	let content = document.createElement('textarea')
	content.setAttribute('placeholder', 'empty note')
	note.appendChild(content)

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-note-holder')

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-note')
	rem.setAttribute('onclick', 'removeNote(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-note')
	add.setAttribute('onclick', 'addNote(this)')
	add.innerText = '+'
	b_holder.appendChild(add)

	note.appendChild(b_holder)

	return note
}

let removeNote = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	let prep_holder = document.createElement('div')
	prep_holder.setAttribute('class', 'prep-holder')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

	let tag = document.createElement('input')
	tag.setAttribute('class', 'create-concept-tag')
	tag.setAttribute('placeholder', 'concept tag')
	concept.appendChild(tag)

	let prep = document.createElement('div')
	prep.setAttribute('class', 'create-prep')

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-holder')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	b_holder.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	b_holder.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	b_holder.appendChild(b_img)

	prep_holder.appendChild(b_holder)

	concept.append(prep_holder)

	//-- add one note
	let notes_holder = document.createElement('div')
	notes_holder.setAttribute('class', 'notes-holder')
	let dummy = document.createElement('div')
	let note = createNote()
	dummy.append(note)
	notes_holder.append(dummy)
	concept.append(notes_holder)

	//-- add one writeup
	let writeups_holder = document.createElement('div')
	writeups_holder.setAttribute('class', 'writeups-holder')
	dummy = document.createElement('div')
	let writeup = createWriteup()
	dummy.append(writeup)
	writeups_holder.append(dummy)
	concept.append(writeups_holder)

	// add the two buttons at the bottom
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

// goes through all the information on the input fields and saves them as JSON
let parseLesson = () => {
	lesson.concepts = []

	// -- GET COURSE INFORMATION
	// here we check first if we are editing the lesson
	if(document.getElementById('existing-course') != null){
		lesson.course = {
			'name': document.getElementById('existing-course').innerText,
			'year': document.getElementById('existing-course').getAttribute('year'),
			'path': document.getElementById('local-path').value
		}
	}else{ // or creating the new one
		let dropdown = document.getElementById('course-list').selectedOptions[0]

		lesson.course = {
			'name': dropdown.value,
			'year': dropdown.getAttribute('year'),
			'path': dropdown.getAttribute('path')
		}
	}

	// --  GET LESSON INFORMATION
	lesson.title = document.getElementById('title').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = {
			'concept': _co.childNodes[0].value,
			'tag':_co.childNodes[1].value,
			'prep': [],
			'notes': [],
			'writeups':[]
		}

		// get the correct prep-notes container
		let prepHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'prep-holder')
				prepHolder = child

		// then start going through the prep notes
		for(let note of prepHolder.childNodes){
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-prep'){

				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields

				if(_cn[0].getAttribute('kind') == 'txt'){
					concept.prep.push({'type':'txt', 'text': _cn[0].value, 'tag': _cn[1].value ? _cn[1].value : ''})
				}else if(_cn[0].getAttribute('kind') == 'url'){
					concept.prep.push({'type':'url', 'url': _cn[0].value, 'text': _cn[1].value})
				}else if(_cn[0].getAttribute('kind') == 'img'){

					let p = _cn[0].value
					if((/\.(gif|jpg|jpeg|tiff|png|svg|bmp)$/i).test(p)){			//checking if it's an image file
						concept.prep.push({'type':'img', 'src': _cn[0].getAttribute('src'), 'name': _cn[0].getAttribute('filename')})
					}else if((/\.(mp4|mov|avi|wmv|flv|mpg|m4a)$/i).test(p)){	//checking it it's a video file
						concept.prep.push({'type':'vid', 'src': _cn[0].getAttribute('src'), 'name': _cn[0].getAttribute('filename')})
					}else{ // unsupported file
						alert(`One of the image or videos files specified on concept: ${_co.childNodes[0].value} is invalid!`)
						return false
					}

				}else if(_cn[0].getAttribute('kind') == 'tag'){ //TODO what is this?
					console.log('got tag:'+_cn[0])
					concept.prep.push({'type':'tag', 'tag':_cn[0].value})
				}
			}
		}

		// --- FIND NOTES
		let notesHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'notes-holder')
				notesHolder = child
		for(let note of notesHolder.childNodes){
			console.log(note);
			if(note.getAttribute('class') == 'create-concept-note' && note.childNodes[0].value != ''){
				console.log('NOTE',note.childNodes[0]);
				concept.notes.push(note.childNodes[0].value)
			}

		}


		// --- FIND WRITEUPS
		let writeupsHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'writeups-holder')
				writeupsHolder = child


				// the problem is that the initial write up holder doesnt have an empty <div> child and the subsequent ones have
		for(let child of writeupsHolder.childNodes)
			if(child.getAttribute('class') == 'create-concept-writeup' && child.childNodes[0].value != '' && child.childNodes[0].value != null) //first case
				concept.writeups.push(child.childNodes[0].value)
			else
				for(let subchild of child.childNodes)
					if(subchild.getAttribute('class') == 'create-concept-writeup' && subchild.childNodes[0].value != '' && subchild.childNodes[0].value != null) //second case
						concept.writeups.push(subchild.childNodes[0].value)




		lesson.concepts.push(concept)
	}

	// if we're creating a lesson for the first time, we add a whiteboard
	// because, if we're editing the lesson, we don't want to keep adding
	if(document.getElementById('existing-course') == null){
		let whiteboard = {
			'concept':'whiteboard',
			'tag':'whiteboard',
			'prep':[{'type': 'wbd', 'text':'', 'tag':''}],
			'notes':[],
			'writeups': []
		}
		lesson.concepts.push(whiteboard)
	}

	console.log('[SAVE] successfully parsed:',lesson)
	return true
}

let saveLesson = (_type) => {

	if(parseLesson()){ //if we're creating a lesson
		if(lesson.course == '' || lesson.title == ''){

			let _title = 'something is missing'
			let _error = 'it seems you haven\'t specified a course or a lesson title.'

			dialog.showErrorBox(_title, _error)
		}else{
			utils.setMessage('saved!', 'info')
			lessonSaved = true
			ipc.send('save-lesson', lesson)
		}
	}
}

let exitLesson = () => {

	let options = {	'type':'info',
		'buttons':['Cancel', 'Quit anyways'],
		'title':'Are you sure?',
		'message':'The current lesson hasn\'t been saved. Do you want to quit anyways?'
	}

	if(lesson.course == '' || lesson.title == '' || !lessonSaved){
		if(dialog.showMessageBox(options) == 1)
			ipc.send('exit-home', {'coming':'back'})

	}else {
		ipc.send('exit-home', {'coming':'back'})
	}
}

export { createNewCourse, saveCourse, exitCourse, selectCourse, selectCoursePath, selectMediaPath, addPrep, removePrep, addNote, removeNote, addWriteup, removeWriteup, addConcept, removeConcept, saveLesson, exitLesson}
