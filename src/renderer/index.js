require('./sass/notes.scss')

import * as typing from './typing.js'

let init = () => {
	window.addEventListener('keydown', (e) => {
		typing.handleKey(e)
	})
}


window.init = init
