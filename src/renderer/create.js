'use strict'

let lesson = {
	'course' : '',
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name.value == 'new course')
		document.getElementById('new-course').style.display = 'block';
	else if(name == 'custom')
		lesson.course = document.getElementById('new-course').value
	else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none';
	}
}

let addNote = (el) => {
//need to add a main div + input div + select + options + remove
	let note = document.createElement('div')
	note.setAttribute('class', 'create-note')
	
	if(el.value == 'text'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('class', 'create-concept-note')
		note.appendChild(text)
	}else if(el.value == 'link'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('class', 'create-concept-note')
		note.appendChild(text)

		let url = document.createElement('input')
		url.setAttribute('type', 'text')
		url.setAttribute('placeholder', 'url')
		note.appendChild(url)
	}else if(el.value == 'img'){
		let src = document.createElement('input')
		src.setAttribute('type', 'text')
		src.setAttribute('placeholder', 'src')
		note.appendChild(src)
	}else{
		console.log('unexpected type for new note')
	}

	let select = document.createElement('select')
	select.setAttribute('class', 'create-add-note')
	select.setAttribute('onchange', 'addNote(this)')

	let add = document.createElement('option')
	add.setAttribute('value', 'add')
	add.innerText = 'add -'
	select.appendChild(add)

	let o_text = document.createElement('option')
	o_text.innerText = '- text note'
	o_text.value = 'text'
	select.appendChild(o_text)

	let o_url = document.createElement('option')
	o_url.innerText = '- url note'
	o_url.value = 'url'
	select.appendChild(o_url)

	let o_img = document.createElement('option')
	o_img.innerText = '- img note'
	o_img.value = 'img'
	select.appendChild(o_img)

	note.appendChild(select)

	el.parentNode.parentNode.appendChild(note)
	

}

let removeNote = (el) => {

}

let addConcept = (el) => {

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
}

let removeConcept = (el) => {

}

export { selectCourse, addNote, removeNote, addConcept, removeConcept}
