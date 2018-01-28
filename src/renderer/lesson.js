'use strict'

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

}


window.init = init
window.saveSession = save.saveSession
window.switchConcept = globals.setCurrentConcept
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw
