'use strict'

import * as drawing from './drawing.js'

let currentNote = null
let currentPage = 0, previousPage = 0
let currentConcept = 0, previousConcept = 0

let initTags = () => {
	let els = document.getElementsByClassName('prep')
	for(let e of els){
		let t = e.getAttribute('tag')
		if(t != '' && t != null)
			e.innerHTML += '<sup class="prep-tag-anchor" onclick="jumpToTag(\''+t+'\')" title="'+t+'">^</sup>'

	}
}

let jumpToTag = (_tag) => {
	let concepts = document.getElementsByClassName('page')

	for(let co of concepts)
		if(co.getAttribute('tag') == _tag)
			setCurrentPage(co.getAttribute('page'))

}

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (el) => {
	previousConcept = currentConcept
	currentConcept = el
}

let getCurrentConcept = () => {
	return currentConcept
}

let getPreviousConcept = () => {
	return previousConcept
}

let setCurrentPage = (page, shouldNavigate = false) => {
	previousPage = currentPage
	currentPage = page ? page : 0

	//-- highlight navigation
	let cs = document.getElementsByClassName('page')
	for(let c of cs){
		c.setAttribute('class', 'page nav')
		if(c.getAttribute('page') == `${currentConcept}-${currentPage}`)
			c.setAttribute('class', 'page nav current-page')
	}

	//-- scroll element into view
	if(shouldNavigate){
		let ns = document.getElementsByClassName('page-group')
		for(let n of ns){
			if(n.getAttribute('page') == `${currentConcept}-${currentPage}`){
				n.scrollIntoView({behavior: "smooth"})
				n.style.pointerEvents = 'auto'
			}else{
				n.style.pointerEvents = 'none'
			}
		}
	}

	drawing.selectCanvas(currentPage, currentConcept)
}

let getCurrentPage = () => {
	return currentPage
}

let getPreviousPage = () => {
	return previousPage
}

let setCurrrentPosition = (pos) => {
	currentNote.style.top = pos.y+'px'
	currentNote.style.left = pos.x+'px'
}

export { initTags, jumpToTag, currentNote, getCurrentNote, setCurrentNote, getCurrentConcept, setCurrentConcept, getPreviousConcept, setCurrrentPosition, setCurrentPage, getCurrentPage, getPreviousPage}
