'use strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')
require('./sass/welcome.scss')
require('./sass/create.scss')

import * as welcome from './main/welcome.js'
import * as create from './main/create.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Board from './components/Board.vue'

window.vm = new Vue({
	el: '#notice-board',
	template: '<Board/>',
	components: {
		Board
	}
})

// TODO: deal later with shortcuts
// window.setTopic = welcome.setTopic
// window.openTopic = welcome.openTopic
// window.editTopic = welcome.editTopic
//
// window.createLesson = welcome.createLesson
// window.removeLesson = welcome.removeLesson
// window.exportLesson = welcome.exportLesson

// window.createNewCourse = create.createNewCourse
// window.saveCourse = create.saveCourse
// window.exitCourse = create.exitCourse
// window.saveLesson = create.saveLesson
// window.exitLesson = create.exitLesson

ipc.on('menu-create', () => { welcome.createLesson()})
ipc.on('menu-open', () => { welcome.openLesson()})
ipc.on('menu-edit', () => { welcome.editLesson()})
ipc.on('menu-remove', () => { welcome.removeLesson()})
ipc.on('menu-export', () => { welcome.exportLesson()})
ipc.on('menu-save', () => { create.saveLesson()})
ipc.on('menu-exit', () => { create.exitLesson()})

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})

ipc.on('update-dropdown', (event, data) => {
	console.log('got updated dropdown course', data)
	let new_course = document.createElement('option')
	new_course.setAttribute('value', data.name)
	new_course.setAttribute('created', data.created)
	new_course.setAttribute('path', data.path)
	new_course.setAttribute('id', data.id)
	new_course.innerText = data.name
	new_course.setAttribute('selected', true)
	document.getElementById('course-list').appendChild(new_course)
})

window.selectCourse = create.selectCourse
// window.selectSubjectPath = create.selectSubjectPath
