'use strict'

const remote = require('electron').remote
const {Menu, MenuItem, globalShortcut} = remote
const menu = new Menu()

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
		if(globals.currentNote == null)
			typing.newNote()
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

globalShortcut.register('CommandOrControl+S', () => {
	save.saveSession()
})

globalShortcut.register('CmdOrCtrl+D', () => {
	drawing.toggleDraw()
})

globalShortcut.register('CmdOrCtrl+Shift+C', () => {
	drawing.clearBoard()
})

globalShortcut.register('CmdOrCtrl+H', () => {
	save.exitLesson()
})

window.onbeforeunload =  () => {
	globalShortcut.unregisterAll()
}

window.init = init
window.saveSession = save.saveSession
window.exitLesson = save.exitLesson
window.switchConcept = globals.setCurrentConcept
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw
