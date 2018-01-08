require('./sass/notes.scss')

import * as mouse from './mouse.js'
import * as typing from './typing.js'

let init = () => {
	window.addEventListener('keydown', (e) => {
		typing.handle(e)
	})

	window.addEventListener('mousemove', (e) =>{
		mouse.handle(e)
	})
}


window.init = init
