'use strict'

const ipc = require('electron').ipcRenderer

let lesson = {
	'course': '',
	'title': '',
	'concepts':[]
}

let saveSession = () => {
	let data = parseDocument()
	
	if(data.length == 0){
		console.log('nothing found on the document!')
		return
	}

	ipc.send('save-session', data)
}

let parseDocument = () => {
	let _title = document.title.split('|')
	lesson.course = _title[0]
	lesson.title =  _title[1]
	lesson.concepts = []

	let _concepts = document.getElementsByClassName('concept')
	let _prep = document.getElementsByClassName('prep')
	let _written = document.getElementsByClassName('written')

	for(let i in _concepts){
		if(i == 'length') break
		let concept = []

		concept.push(_concepts[i].innerText)

		for(let j in _prep){
			if(j == 'length') break
			if(_prep[j].getAttribute('concept') == i)
				concept.push(_prep[j].innerText)  //TODO check for url and img)x
		}

		for(let k in _written){
			if(k == 'length') break
			if(_written[k].getAttribute('concept') == i)
				concept.push(_written[k].innerText)
		}

		lesson.concepts.push(concept)
	}

	console.log('saving:',lesson)

	return lesson
}

let exitLesson = () => {
	console.log('leaving lesson')
	ipc.send('exit-home', {'coming':'back'})	
}

export { saveSession, exitLesson }
