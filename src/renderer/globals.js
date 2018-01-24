'use strict'

let currentNote = null
let currentConcept = 1

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (evt, index) => {
	
	currentConcept = index

	let cs = document.getElementsByClassName('concept')
	for(let c of cs)
		c.setAttribute('class', 'concept')
	evt.setAttribute('class', 'current-concept concept')

	let ns = document.getElementsByClassName('note')
	for(let n of ns){
		if(n.getAttribute('concept') == currentConcept){
			setTimeout(()=>{
				n.style.opacity = 1
			}, 400)
		}else{
			n.style.opacity = 0
		}
	}
}

let getCurrentConcept = () => {
	return currentConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.cssText = 'top: '+pos.y+'px; left: '+pos.x+'px;'
}

export { currentNote, getCurrentNote, setCurrentNote, setCurrrentPosition, setCurrentConcept, getCurrentConcept}
