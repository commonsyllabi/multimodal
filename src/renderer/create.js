'use strict'

let lesson = {
	'course' : '',
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name == 'new course')
		document.getElementById('new-course').style.display = 'block';
	else if(name == 'custom')
		lesson.course = document.getElementById('new-course').value
	else{
		lesson.course = name
		document.getElementById('new-course').style.display = 'none';
	}

	console.log('current course:', lesson.course)
}

let addNote = (el) => {

}

let removeNote = (el) => {

}

let addConcept = (el) => {

}

let removeConcept = (el) => {

}

export { selectCourse, addNote, removeNote, addConcept, removeConcept}
