require('./sass/notes.scss')

import * as mouse from './mouse.js'
import * as typing from './typing.js'
import * as save from './save.js'
import * as globals from './globals.js'

let init = () => {
	window.addEventListener('keydown', (e) => {
		typing.handle(e)
	})

	window.addEventListener('mousemove', (e) =>{
		mouse.handle(e)
	})
}


window.init = init
window.saveSession = save.saveSession
window.switchConcept = globals.setCurrentConcept
