'use strict'

const ipc = require('electron').ipcRenderer

import * as globals from './lesson/globals.js'
import * as drawing from './lesson/drawing.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Subject from './components/Subject.vue'
import Dialog from './components/Dialog.vue'

window.currentNote = null
window.currentConcept = 0
window.offsets = [0,0]
window.isEdit = false

window.vm = new Vue({
	el: '#writing-board',
	template: '<Subject/>',
	components: {
		Subject
	}
})

const msgbox = new Vue({
	el: '#dialog',
	template: '<Dialog/>',
	components: {
		'Dialog':Dialog
	}
})

window.msgbox = msgbox.$children[0]

window.editLesson = (e) => {
	window.isEdit = !window.isEdit
	e.innerText = window.isEdit ? "present" : "edit"
}
window.switchConcept = globals.setCurrentConcept
window.jumpToTag = globals.jumpToTag
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw

ipc.on('menu-save', () => {window.saveSession()})
ipc.on('menu-exit', () => {window.exitLesson()})
ipc.on('menu-toggle', () => {drawing.toggleDraw()})
ipc.on('menu-clear-board', () => {drawing.clearBoard()})

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})
