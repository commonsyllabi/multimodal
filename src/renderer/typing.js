'use strict'

import * as mouse from './mouse.js'
import { getCurrentNote, setCurrentNote, setCurrrentPosition } from './globals.js'

const ESC = 27
const BCK = 8
const SPC = 32
const RET = 13
const TAB = 9

let currentNote = null

let handle = (e) => {
	currentNote = getCurrentNote()

	if(currentNote == null && e.keyCode != SPC){
		console.log('key pressed',e.key,'with charCode',e.keyCode,'but no note created, ignoring...')
		return
	}

	switch (e.keyCode) {
	case SPC:
		if(currentNote == null)
			newNote()
		else
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
	cn.setAttribute('class', 'note')
	cn.setAttribute('id', 'current')
	cn.innerText = '_'
	document.body.append(cn)

	setCurrentNote(cn)
	setCurrrentPosition(mouse.getPosition())
}

let endNote = () => {
	currentNote.removeAttribute('id')
	currentNote.innerText = currentNote.innerText.slice(0, -1)
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

export { handle }
