'use strict'

let currentNote = null
let currentConcept = 1

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (index) => {
	currentConcept = index
}

let getCurrentConcept = () => {
	return currentConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.cssText = 'top: '+pos.y+'px; left: '+pos.x+'px;'
	console.log(currentNote.style.cssText)
}

export { currentNote, getCurrentNote, setCurrentNote, setCurrrentPosition, setCurrentConcept, getCurrentConcept}
