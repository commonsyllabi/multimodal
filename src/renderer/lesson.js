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

let init = () => {

	drawing.init()

	window.ondblclick = () => {

		let els = document.getElementsByClassName('written')
		for(let el of els)
			el.removeAttribute('id')

		if(globals.currentNote == null)
			typing.newNote()
		else
			typing.endNote()
	}

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
}

window.init = init
window.saveSession = save.saveSession
window.exitLesson = save.exitLesson
window.switchConcept = globals.setCurrentConcept
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw

ipc.on('menu-save', () => {window.saveSession()})
ipc.on('menu-exit', () => {window.exitLesson()})
ipc.on('menu-toggle', () => {drawing.toggleDraw()})
ipc.on('menu-clear-board', () => {drawing.clearBoard()})
