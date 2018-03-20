'use strict'

import * as mouse from './mouse.js'
import { getCurrentNote, setCurrentNote, setCurrrentPosition, getCurrentConcept, setCurrentConcept } from './globals.js'

const ESC = 27
const UP = 38
const DOWN = 40

let currentNote = null

let handle = (e) => {
	currentNote = getCurrentNote()

	let index
	switch(e.keyCode){
	case UP:
		if(currentNote == null){
			index = getCurrentConcept()
			index = index - 1 >= 0 ? index - 1 : 0
			setCurrentConcept(index)
		}
		break
	case DOWN:
		if(currentNote == null){
			index = getCurrentConcept()
			let len =  document.getElementsByClassName('concept').length-1
			index = index + 1 < len ? index + 1 : len
			setCurrentConcept(index)
		}
		break
	case ESC:
		endNote()
		break
	default:
		break
	}
}

let newNote = () => {
	let cn = document.createElement('textarea')
	cn.setAttribute('type', 'text')
	cn.setAttribute('class', 'note written')
	cn.setAttribute('concept', getCurrentConcept())
	cn.setAttribute('id', 'current')
	document.getElementById('writing-board').append(cn)

	setCurrentNote(cn)
	setCurrrentPosition(mouse.getGridPosition())

	cn.focus()
}

let endNote = () => {
	//if note is blank
	if(currentNote != null && currentNote.value == '')
		document.getElementById('writing-board').removeChild(currentNote)
	else
		currentNote.style.height = (currentNote.scrollHeight)+'px'

	currentNote.blur()
	currentNote.removeAttribute('id')
	currentNote.onclick =(evt) => {
		if(evt.target.getAttribute('id') == 'current') return
		evt.target.setAttribute('id', 'current')
		setCurrentNote(evt.target)
	}
	setCurrentNote(null)
}

export { handle, newNote, endNote }
