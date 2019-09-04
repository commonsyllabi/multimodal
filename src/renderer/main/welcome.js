'use strict'

const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
const utils = require('../utils.js')

let current = {
	'course':'',
	'name':'',
	'path': ''
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let removeLesson = (_c, _l) => {
	let course = _c ? _c : current.course
	let name = _l ? _l : current.name

	let options = {	'type':'info',
		'buttons':['Yes!', 'Nope.'],
		'title':'Are you sure?',
		'message':'You\'re about to delete this lesson, and all data associated with it. Are you certain?'
	}

	if(dialog.showMessageBox(options) == 0)
		ipc.send('remove-lesson', current)
}

let editLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-lesson', current)
}

let exportLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('export-lesson', current)
}

export { openLesson, createLesson, removeLesson, editLesson, editNotesLesson, setLesson, exportLesson }
