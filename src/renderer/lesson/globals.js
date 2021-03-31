'use strict'

import * as drawing from './drawing.js'

let currentPage = 0, previousPage = 0
let currentConcept = 0, previousConcept = 0

//------------
//-- this adds a link to the tag
//-- so that we can jump from one concept to another
//TODO: this can probably be replaced with vue
//------------
let initTags = () => {
	let els = document.getElementsByClassName('prep')
	for(let e of els){
		let t = e.getAttribute('tag')
		if(t != '' && t != null)
			e.innerHTML += '<sup class="prep-tag-anchor" onclick="jumpToTag(\''+t+'\')" title="'+t+'">^</sup>'

	}
}

//------------
//-- jumps to specified tag
//------------
let jumpToTag = (_tag) => {
	let concepts = document.getElementsByClassName('page')

	for(let co of concepts)
		if(co.getAttribute('tag') == _tag){
			setCurrentPage(co.getAttribute('page'))
			setCurrentConcept(co.getAttribute('concept'))
		}

}

//------------
//-- takes the index from a CONCEPT element
//-- and sets it as the current concept
//-- and keeps track of the previous concept
//------------
let setCurrentConcept = (_index) => {
	console.log('1 - setting current concept', _index)
	previousConcept = currentConcept
	currentConcept = _index
	window.currentConcept = _index
}

let getCurrentConcept = () => {
	return currentConcept
}

let getPreviousConcept = () => {
	return previousConcept
}


//------------
//-- takes the index from a PAGE element
//-- and sets it as the current PAGE
//-- and highlights the navigation
//-- and keeps track of the previous concept
//------------
let setCurrentPage = (_index, _navigate = false) => {
	previousPage = currentPage
	currentPage = _index ? _index : 0
	window.currentPage = currentPage

	//-- highlight navigation
	let cs = document.getElementsByClassName('page')
	for(let c of cs){
		c.setAttribute('class', 'page nav')
		if(c.getAttribute('page') == `${currentConcept}-${currentPage}`)
			c.setAttribute('class', 'page nav current-page')
	}

	//-- scroll element into view
	if(_navigate){
		let ns = document.getElementsByClassName('page-group')
		for(let n of ns){
			if(n.getAttribute('page') == `${currentConcept}-${currentPage}`){
				n.scrollIntoView({behavior: 'smooth'})
				n.style.pointerEvents = 'auto'
			}else{
				n.style.pointerEvents = 'none'
			}
		}
	}

	//-- select the corresponding canvas
	if(!window.isEdit)
		drawing.selectCanvas(currentPage, currentConcept)
}

let getCurrentPage = () => {
	return currentPage
}

let getPreviousPage = () => {
	return previousPage
}

export { initTags, jumpToTag, getCurrentConcept, setCurrentConcept, getPreviousConcept, setCurrentPage, getCurrentPage, getPreviousPage}
