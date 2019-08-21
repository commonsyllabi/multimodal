'ust strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')
require('./sass/notes.scss')
require('./sass/interface.scss')

import * as mouse from './lesson/mouse.js'
import * as typing from './lesson/typing.js'
import * as save from './lesson/save.js'
import * as globals from './lesson/globals.js'
import * as drawing from './lesson/drawing.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Lesson from './components/Lesson.vue'

new Vue({
	el: '#writing-board',
	template: '<Lesson/>',
	components: {
		Lesson
	}
})

let init = () => {
	drawing.init()

	//-- right now, this is only for moving images
	let notes = document.getElementsByClassName('moveable')

	for(let n of notes){
		n.onclick = (evt) => {
			if(evt.target.getAttribute('id') == 'current') return
			evt.target.setAttribute('id', 'current')
			evt.target.setAttribute('class', 'note moveable concept-bound')
			globals.setCurrentNote(evt.target)
			globals.setCurrrentPosition(mouse.getGridPosition())
		}
	}

	//basically these notes need to be given an initial position

	// window.ondblclick = () => {
  //
	// 	let els = document.getElementsByClassName('written')
	// 	for(let el of els)
	// 		el.removeAttribute('id')
  //
	// 	if(globals.currentNote == null)
	// 		typing.newNote()
	// 	else
	// 		typing.endNote()
	// }

	window.addEventListener('keydown', (e) => {
		typing.handle(e)
	})

	window.addEventListener('mousemove', (e) =>{
		mouse.handle(e)
		drawing.draw(e)
	})

	window.addEventListener('mousedown', (e) => {
		drawing.beginDraw(e)
	})

	window.addEventListener('mouseup', () => {
		drawing.endDraw()
	})

	globals.setCurrentConcept()
	globals.initTags()
}

window.init = init
window.setCurrentConcept = globals.setCurrentConcept
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
