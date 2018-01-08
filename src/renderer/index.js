import * as typing from './typing.js'

let isTyping = false
let currentNote = null

let init = () => {
	window.addEventListener('keydown', (e) => {
		if(currentNote == null && e.keyCode != 32){
			console.log('key pressed',e.key, 'but no note created, ignoring...')
			return
		}

		switch (e.keyCode) {
		case 32:
			if(!isTyping)
				newNote()
			else
				handleKey(e.key)
			break
		case 27:
			endNote()
			break
		default:
			handleKey(e.key)
			break
		}

		if(e.keyCode == 32 && !isTyping)
			isTyping = true

		if(e.keyCode == 27)
			isTyping == false
	})
}

let newNote = () => {
	currentNote = document.createElement('div')
	currentNote.setAttribute('class', 'note')
	currentNote.setAttribute('id', 'current')
	document.body.append(currentNote)
	isTyping = true
}

let endNote = () => {
	currentNote.removeAttribute('id')
	currentNote = null
	isTyping = false
}

let handleKey = (char) => {
	currentNote.innerText += char
}

window.init = init
window.prove = typing.proveExistence
