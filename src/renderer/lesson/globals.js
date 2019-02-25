'use strict'

import * as drawing from './drawing.js'

let currentNote = null
let currentConcept = 0
let previousConcept = 0

let initTags = () => {
	let els = document.getElementsByClassName('prep')
	for(let e of els){
		let t = e.getAttribute('tag')
		if(t != '' && t != null)
			e.innerHTML += '<sup class="prep-tag-anchor" onclick="jumpToTag(\''+t+'\')" title="'+t+'">⮹</sup>'

	}

}

let jumpToTag = (_tag) => {
	let concepts = document.getElementsByClassName('concept')

	for(let co of concepts)
		if(co.getAttribute('tag') == _tag)
			setCurrentConcept(co.getAttribute('concept'))

}

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (index) => {

	previousConcept = currentConcept
	currentConcept = index ? index : 0

	let cs = document.getElementsByClassName('concept')
	for(let c of cs){
		c.setAttribute('class', 'concept concept-btn')
		if(c.getAttribute('concept') == currentConcept)
			c.setAttribute('class', 'concept concept-btn current-concept')
	}

	let ns = document.getElementsByClassName('concept-bound')
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

let getPreviousConcept = () => {
	return previousConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.top = pos.y+'px'
	currentNote.style.left = pos.x+'px'
}

export { initTags, jumpToTag, currentNote, getCurrentNote, setCurrentNote, setCurrrentPosition, setCurrentConcept, getCurrentConcept, getPreviousConcept}
