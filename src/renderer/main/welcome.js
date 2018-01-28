'use strict'

const ipc = require('electron').ipcRenderer

let current = {
	"course":"",
	"lesson":""
}

let setLesson = (_e, _c, _l) => {
	current.course = _c
	current.lesson = _l


	let all_lessons = document.getElementsByClassName('welcome-lesson')
	for(let less of all_lessons)
		less.setAttribute('class', 'welcome-lesson')


	_e.setAttribute('class', 'welcome-lesson selected')
}

let openLesson = () => {
	ipc.send('open-lesson', {"course": current.course, "lesson": current.lesson})
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let editLesson = () => {
	ipc.send('edit-lesson', {"course": current.course, "lesson": current.lesson})
}

export { openLesson, createLesson, editLesson, setLesson }
