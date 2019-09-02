'use strict'

import { getCurrentNote, setCurrentNote, getCurrentConcept, setCurrentConcept, setCurrentPosition, getPreviousPage, getCurrentPage, setCurrentPage } from './globals.js'

const ESC = 27
const UP = 38
const LEFT = 37
const RIGHT = 39
const DOWN = 40

let cn = null

let handle = (e, data) => {
	cn = window.currentNote

	let page, concept
	switch(e.keyCode){
	case UP: //page right before
		if(cn == null){
			e.preventDefault()
			// page = getCurrentPage()
			// page = page - 1 > 0 ? page - 1 : 0
			// setCurrentPage(page, true)

			page = getCurrentPage()
			concept = getCurrentConcept()
			if(page > 0){
				page--
			}else{
				//-- check for concept overflow
				if(concept > 0)
					concept--
				else
					concept = 0

				page = data.concepts[concept].pages.length - 1
			}

			setCurrentConcept(concept)
			setCurrentPage(page, true)
		}
		break
	case DOWN: //page right after
		if(cn == null){
			e.preventDefault()
			page = getCurrentPage()
			concept = getCurrentConcept()
			if(page < data.concepts[concept].pages.length-1){
				page++
			}else{
				page = 0
				//-- check for concept overflow
				if(concept < data.concepts.length-1)
					concept++
				else
					concept = 0
			}

			setCurrentConcept(concept)
			setCurrentPage(page, true)
		}
		break
	case LEFT: // previous page
		if(cn == null){
			index = getPreviousPage()
			setCurrentPage(index)
		}
		break
	case RIGHT: // jump to the whiteboard
		if(cn == null){
			let index = document.getElementsByClassName('page-group').length-1
			setCurrentPage(index)
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
		el.style.display = 'none'
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
