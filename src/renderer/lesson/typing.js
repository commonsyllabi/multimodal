'use strict'

import { getCurrentNote, setCurrentNote, setCurrrentPosition, getPreviousConcept, getCurrentConcept, setCurrentConcept } from './globals.js'

const ESC = 27
const UP = 38
const LEFT = 37
const RIGHT = 39
const DOWN = 40

let cn = null

let handle = (e) => {
	cn = window.currentNote

	let index
	switch(e.keyCode){
	case UP: //concept right before
		if(cn == null){
			e.preventDefault()
			index = getCurrentConcept()
			index = index - 1 > 0 ? index - 1 : 0
			setCurrentConcept(index, true)
		}
		break
	case DOWN: //concept right after
		if(cn == null){
			e.preventDefault()
			index = getCurrentConcept()
			console.log('index before',index);
			let len = document.getElementsByClassName('concept-group').length-1
			index = index + 1 < len ? index + 1 : len
			console.log('index after',index);
			setCurrentConcept(index, true)
		}
		break
	case LEFT: // previous concept
		if(cn == null){
			index = getPreviousConcept()
			setCurrentConcept(index)
		}
		break
	case RIGHT: // jump to the whiteboard
		if(cn == null){
			let index = document.getElementsByClassName('concept-group').length-1
			setCurrentConcept(index)
		}
		break
	case ESC:
		if(cn != null)
			endNote(cn)
		break
	default:
		break
	}
}


let endNote = (el) => {
	//if note is blank
	if(el.value == ''){
		el.parentNode.removeChild(el)
	}else{ //-- else position it correctly
		el.style.height = (el.scrollHeight)+'px'
	}

	el.blur()
	el.removeAttribute('id')
	el.onclick = (evt) => {
		if(evt.target.getAttribute('id') == 'current') return
		evt.target.setAttribute('id', 'current')
		window.currentNote = evt.target
	}

	window.currentNote = null
}

export { handle, newNote, endNote }
