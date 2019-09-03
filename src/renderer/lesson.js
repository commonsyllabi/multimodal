'use strict'

const ipc = require('electron').ipcRenderer

import * as save from './lesson/save.js'
import * as globals from './lesson/globals.js'
import * as drawing from './lesson/drawing.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Subject from './components/Subject.vue'

window.vm = new Vue({
	el: '#writing-board',
	template: '<Subject/>',
	components: {
		Subject
	}
})

window.currentNote = null
window.offsets = [0,0]
window.isEdit = false

window.editLesson = (e) => {
	window.isEdit = !window.isEdit
	e.innerText = window.isEdit ? "present" : "edit"
}
window.saveSession = save.saveSession
window.exitLesson = save.exitLesson
window.switchConcept = globals.setCurrentConcept
window.jumpToTag = globals.jumpToTag
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw

ipc.on('menu-save', () => {window.saveSession()})
ipc.on('menu-exit', () => {window.exitLesson()})
ipc.on('menu-toggle', () => {drawing.toggleDraw()})
ipc.on('menu-clear-board', () => {drawing.clearBoard()})

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})
