'use strict'

const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
let lessonSaved = false

// function called from the window. parses the document,
// appends the "in-class" prefix and send the IPC message to the main process
let saveSession = () => {
	let lesson = parseDocument()
	lesson.prefix = 'in-class'

	if(lesson.length == 0){
		console.log('nothing found on the document!')
		return
	}

	ipc.send('save-lesson', lesson)

	lessonSaved = true
}

// parses the document for all information
let parseDocument = () => {
	let lesson = {
		'course': {
			'path':'',
			'year':'',
			'name':'',
		},
		'title': '',
		'contents':[]
	}

	lesson.course.name = document.getElementById('course-name').innerHTML
	lesson.course.year = document.getElementById('course-year').innerHTML
	lesson.course.path = document.getElementById('course-path').innerHTML
	lesson.title =  document.title.split('|')[1].trim()
	lesson.concepts = []

	let _concepts = document.getElementsByClassName('concept')
	let _prep = document.getElementsByClassName('prep')
	let _written = document.getElementsByClassName('written')

	for(let i in _concepts){
		if(i == 'length') break

		let ct = _concepts[i].innerText
		let tc = ct.substring(ct.indexOf('.')+2, ct.length) //trim the concept title

		let content =  {
			'concept': tc,
			'tag': _concepts[i].getAttribute('tag'),
			'prep':[],
			'notes':[]
		}

		//going through all the prep notes
		//and appending them to content.prep
		//as txt, url or img objects
		for(let j in _prep){
			if(j == 'length') break

			if(_prep[j].getAttribute('concept') == i){
				if(_prep[j].childNodes[0].tagName == 'A'){
					content.prep.push({
						'type':'url',
						'url':_prep[j].childNodes[0].getAttribute('href'),
						'text':_prep[j].childNodes[0].innerText
					})
				}else if(_prep[j].childNodes[0].tagName == 'IMG'){
					content.prep.push({
						'type':'img',
						'src':_prep[j].childNodes[0].getAttribute('src'),
						'name':_prep[j].childNodes[0].getAttribute('name')
					})
				}else if(_prep[j].childNodes[0].tagName == 'VIDEO'){
					content.prep.push({
						'type':'vid',
						'src':_prep[j].childNodes[0].childNodes[0].getAttribute('src'),
						'name':_prep[j].childNodes[0].childNodes[0].getAttribute('name')
					})
				} else{
					content.prep.push({
						'type':'txt',
						'text':_prep[j].innerText,
						'tag': _prep[j].getAttribute('tag')
					})
				}
			}
		}

		//this line removes the first element of the prep which is the title of the concept
		content.prep.splice(0, 1)

		for(let k in _written){
			if(k == 'length') break
			if(_written[k].getAttribute('concept') == i)
				content.notes.push(_written[k].value)
		}

		lesson.concepts.push(content)
	}

	console.log('saving:',lesson)

	return lesson
}

let exitLesson = () => {
	if(!lessonSaved){
		let options = {	'type':'info',
			'buttons':['Cancel', 'Quit anyways'],
			'title':'Are you sure?',
			'message':'The current lesson hasn\'t been saved. Do you want to quit anyways?'
		}

			if(dialog.showMessageBox(options) == 1)
				ipc.send('exit-home', {'coming':'back'})

		}else {
			ipc.send('exit-home', {'coming':'back'})
		}
}

export { saveSession, exitLesson }
