'use strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')
require('./sass/welcome.scss')
require('./sass/create.scss')
require('./sass/notes.scss')
require('./sass/interface.scss')


import * as welcome from './main/welcome.js'
import * as create from './main/create.js'
import * as utils from './utils.js'

window.setLesson = welcome.setLesson
window.openLesson = welcome.openLesson
window.editLesson = welcome.editLesson
window.editNotesLesson = welcome.editNotesLesson

window.createLesson = welcome.createLesson
window.exportLesson = welcome.exportLesson

window.createNewCourse = create.createNewCourse
window.saveCourse = create.saveCourse
window.exitCourse = create.exitCourse
window.saveLesson = create.saveLesson
window.exitLesson = create.exitLesson

ipc.on('menu-create', () => { welcome.createLesson()})
ipc.on('menu-open', () => { welcome.openLesson()})
ipc.on('menu-edit', () => { welcome.editLesson()})
ipc.on('menu-export', () => { welcome.exportLesson()})
ipc.on('menu-save', () => { create.saveLesson()})
ipc.on('menu-exit', () => { create.exitLesson()})

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})

ipc.on('update-dropdown', (event, data) => {
	console.log('got', data)
	let new_course = document.createElement('option')
	new_course.setAttribute('value', data.course)
	new_course.innerText = data.course
	new_course.setAttribute('selected', true)
	document.getElementById('course-list').appendChild(new_course)
})

window.selectCourse = create.selectCourse
window.selectCoursePath = create.selectCoursePath
window.addPrep = create.addPrep
window.removePrep = create.removePrep
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept
