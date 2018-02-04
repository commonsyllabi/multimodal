'use strict'

const {globalShortcut} = require('electron').remote
const ipc = require('electron').ipcRenderer

globalShortcut.register('CmdOrCtrl+E', () => {
	editLesson()
})


globalShortcut.register('CmdOrCtrl+Shift+E', () => {
	exportLesson()
})

globalShortcut.register('CmdOrCtrl+N', () => {
	createLesson()
})

window.onbeforeunload = () => {
	globalShortcut.unregisterAll()
}

let current = {
	'course':'',
	'title':''
}

let setLesson = (_e, _c, _l) => {
	current.course = _c
	current.title = _l


	let all_lessons = document.getElementsByClassName('welcome-lesson')
	for(let less of all_lessons)
		less.setAttribute('class', 'welcome-lesson')


	_e.setAttribute('class', 'welcome-lesson selected')

	let btns = document.getElementsByClassName('inter-btn-main')
	for(let btn of btns)
		btn.disabled = false
}

let openLesson = (_c, _l) => {
	let course = _c ? _c : current.course
	let title = _l ? _l : current.title
	ipc.send('open-lesson', {'course': course, 'title': title})
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let editLesson = () => {
	if(current.course == ''){
		setMessage('no course selected!')
		return
	}
	ipc.send('edit-lesson', {'course': current.course, 'title': current.title})
}

let exportLesson = () => {
	if(current.course == ''){
		setMessage('no course selected!')
		return
	}
	ipc.send('export-lesson', {'course': current.course, 'title': current.title})
	let msg = 'exported '+current.title
	setMessage(msg)
}

let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => { el.style.opacity = 0 }, 2000)
}

export { openLesson, createLesson, editLesson, setLesson, exportLesson }
