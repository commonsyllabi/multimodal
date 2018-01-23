require('./sass/notes.scss')
require('./sass/interface.scss')

import * as mouse from './mouse.js'
import * as typing from './typing.js'
import * as save from './save.js'
import * as globals from './globals.js'
import * as drawing from './drawing.js'

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

	window.addEventListener('mouseup', (e) => {
		drawing.endDraw()
	})

}


window.init = init
window.saveSession = save.saveSession
window.switchConcept = globals.setCurrentConcept
window.clearBoard = drawing.clearBoard
window.toggleDraw = drawing.toggleDraw
