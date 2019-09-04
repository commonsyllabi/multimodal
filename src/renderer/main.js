'use strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')
require('./sass/welcome.scss')
require('./sass/create.scss')

import * as welcome from './main/welcome.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Board from './components/Board.vue'
import Dialog from './components/Dialog.vue'

window.vm = new Vue({
	el: '#notice-board',
	template: '<Board/>',
	components: {
		Board
	}
})

const dialog = new Vue({
	el: '#dialog',
	template: '<Dialog/>',
	components: {
		'Dialog':Dialog
	}
})

window.dialog = dialog.$children[0]

// TODO: deal later with shortcuts


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
