'use strict'

const ipc = require('electron').ipcRenderer

let openLesson = (course_name, lesson_name) => {
	ipc.send('open-lesson', {"course":course_name, "lesson": lesson_name})
}

let createLesson = () => {
	ipc.send('create-lesson')
}

export { openLesson, createLesson }
