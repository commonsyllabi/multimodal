'use strict'

const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
const utils = require('../utils.js')

let current = {
	'course':'',
	'title':'',
	'path': ''
}

let setLesson = (_e, _c, _l, _p) => {
	current.course = _c
	current.title = _l
	current.path = _p

	let all_lessons = document.getElementsByClassName('welcome-lesson')
	for(let less of all_lessons)
		less.setAttribute('class', 'welcome-lesson')


	_e.setAttribute('class', 'welcome-lesson selected')

	let btns = document.getElementsByClassName('inter-btn-main')
	for(let btn of btns)
		btn.disabled = false
}

let openLesson = (_c, _l, _p) => {
	let course = _c ? _c : current.course
	let title = _l ? _l : current.title
	let path = _p ? _p : current.path
	ipc.send('open-lesson', current)
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let removeLesson = (_c, _l) => {
	let course = _c ? _c : current.course
	let title = _l ? _l : current.title

	let options = {	'type':'info',
		'buttons':['Yes!', 'Nope.'],
		'title':'Are you sure?',
		'message':'You\'re about to delete this lesson, and all data associated with it. Are you certain?'
	}

	if(dialog.showMessageBox(options) == 0)
		ipc.send('remove-lesson', {'course': course, 'title': title})
}

let editLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-lesson', {'course': current.course, 'title': current.title})
}

let exportLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('export-lesson', {'course': current.course, 'title': current.title})
}

export { openLesson, createLesson, removeLesson, editLesson, editNotesLesson, setLesson, exportLesson }
