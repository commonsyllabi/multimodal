'use strict'

import * as mouse from './mouse.js'
import { getCurrentNote, setCurrentNote, setCurrrentPosition, getCurrentConcept, setCurrentConcept } from './globals.js'

const ESC = 27
const BCK = 8
const SPC = 32
const RET = 13
const TAB = 9
const UP = 38
const DOWN = 40

let currentNote = null

let handle = (e) => {
	currentNote = getCurrentNote()

	if(e.keyCode == UP){
		let index = getCurrentConcept()
		index = index - 1 >= 0 ? index - 1 : 0
		setCurrentConcept(index)
	}

	if(e.keyCode == DOWN){
		let index = getCurrentConcept()
		let len =  document.getElementsByClassName('concept').length-1
		index = index + 1 < len ? index + 1 : len
		setCurrentConcept(index)
	}

	if(currentNote == null && e.keyCode != SPC)
		return
//	console.log(e.keyCode)	

	switch (e.keyCode) {
	case SPC:
		handleKey('\u00A0')
		break
	case BCK:
		eraseCharacter()
		break
	case ESC:
		endNote()
		break
	case TAB:
		handleKey('\u00A0\u00A0\u00A0\u00A0')
		break
	case RET:
		handleKey('\n')
		break
	default:
		if(e.keyCode > 47)
			handleKey(e.key)
		break
	}


}

let newNote = () => {
	let cn = document.createElement('div')
	cn.setAttribute('class', 'note written')
	cn.setAttribute('concept', getCurrentConcept())
	cn.setAttribute('id', 'current')
	cn.innerText = '_'
	document.getElementById('writing-board').append(cn)

	setCurrentNote(cn)
	setCurrrentPosition(mouse.getGridPosition())
}

let endNote = () => {
	// if current note has no text
	if(currentNote.innerText == '_')
		document.getElementById('container').removeChild(currentNote)

	currentNote.removeAttribute('id')
	currentNote.innerText = currentNote.innerText.slice(0, -1)
	currentNote.onclick =(evt) => {
		if(evt.target.getAttribute('id') == 'current') return
		evt.target.setAttribute('id', 'current')
		evt.target.innerText += '_'
		setCurrentNote(evt.target)
	}
	setCurrentNote(null)
}

let handleKey = (char) => {
	if(char == 'Meta') return
	currentNote.innerText = currentNote.innerText.slice(0, -1)
	currentNote.innerText += char + '_'
}

let eraseCharacter = () => {
	currentNote.innerText = currentNote.innerText.slice(0, -2) + '_'
}

export { handle, newNote }
