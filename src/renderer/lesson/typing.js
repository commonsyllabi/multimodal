'use strict'

import * as mouse from './mouse.js'
import { getCurrentNote, setCurrentNote, setCurrrentPosition, getPreviousConcept, getCurrentConcept, setCurrentConcept } from './globals.js'

const ESC = 27
const UP = 38
const LEFT = 37
const RIGHT = 39
const DOWN = 40

let currentNote = null

let handle = (e) => {
	currentNote = getCurrentNote()

	let index
	switch(e.keyCode){
	case UP: //concept right before
		if(currentNote == null){
			index = getCurrentConcept()
			index = index - 1 >= 0 ? index - 1 : 0
			setCurrentConcept(index)
		}
		break
	case DOWN: //concept right after
		if(currentNote == null){
			index = getCurrentConcept()
			let len = document.getElementsByClassName('concept').length-1
			index = index + 1 < len ? index + 1 : len
			setCurrentConcept(index)
		}
		break
	case LEFT: // previous concept
		if(currentNote == null){
			index = getPreviousConcept()
			setCurrentConcept(index)
		}
		break
	case RIGHT: // jump to the whiteboard
		if(currentNote == null){
			let index = document.getElementsByClassName('concept').length-1
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
	cn.addEventListener('input', () => { OnInput(cn)}, false)
	document.getElementById(getCurrentConcept()).append(cn)

	setCurrentNote(cn)
	setCurrrentPosition(mouse.getGridPosition())

	cn.focus()
}

let OnInput = (el) => {
	el.style.height = 'auto'
	el.style.height = (el.scrollHeight) + 'px'
}

let endNote = () => {
	//if note is blank
	if(currentNote != null && currentNote.value == ''){
		document.getElementById('writing-board').removeChild(currentNote)
	}else{
		currentNote.style.height = (currentNote.scrollHeight)+'px'
		// currentNote.style.overflowY = 'hidden'
	}

	currentNote.blur()
	currentNote.removeAttribute('id')
	currentNote.onclick = (evt) => {
		if(evt.target.getAttribute('id') == 'current') return
		evt.target.setAttribute('id', 'current')
		setCurrentNote(evt.target)
	}
	setCurrentNote(null)
}

export { handle, newNote, endNote }
