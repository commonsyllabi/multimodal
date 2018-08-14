'use strict'

import * as drawing from './drawing.js'

let currentNote = null
let currentConcept = 0

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (index) => {

	currentConcept = index ? index : 0

	let cs = document.getElementsByClassName('concept')
	for(let c of cs){
		c.setAttribute('class', 'concept concept-btn')
		if(c.getAttribute('concept') == currentConcept)
			c.setAttribute('class', 'concept concept-btn current-concept')
	}

	let ns = document.getElementsByClassName('note')
	for(let n of ns){
		if(n.getAttribute('concept') == currentConcept){
			n.style.opacity = 1
			n.style.pointerEvents = 'auto'
		}else{
			n.style.opacity = 0
			n.style.pointerEvents = 'none'
		}
	}

	drawing.selectCanvas(currentConcept)
}

let getCurrentConcept = () => {
	return currentConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.top = pos.y+'px'
	currentNote.style.left = pos.x+'px'
}

export { currentNote, getCurrentNote, setCurrentNote, setCurrrentPosition, setCurrentConcept, getCurrentConcept}
