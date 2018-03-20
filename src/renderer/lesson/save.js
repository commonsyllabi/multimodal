'use strict'

const ipc = require('electron').ipcRenderer

let lesson = {
	'course': '',
	'path':{
		'local':'',
		'remote': ''
	},
	'title': '',
	'contents':[]
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
	lesson.course = _title[0].trim()
	lesson.path.local = document.getElementById('local-path').innerHTML
	lesson.title =  _title[1].trim()
	lesson.contents = []

	let _concepts = document.getElementsByClassName('concept')
	let _prep = document.getElementsByClassName('prep')
	let _written = document.getElementsByClassName('written')

	for(let i in _concepts){
		if(i == 'length') break

		let content =  {
			'concept':_concepts[i].innerText,
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
						'src':_prep[j].childNodes[0].getAttribute('src')
					})
				} else{
					content.prep.push({
						'type':'txt',
						'text':_prep[j].innerText
					})
				}
			}
		}

		for(let k in _written){
			if(k == 'length') break
			if(_written[k].getAttribute('concept') == i)
				content.notes.push(_written[k].value)
		}

		lesson.contents.push(content)
	}

	console.log('saving:',lesson)

	return lesson
}

let exitLesson = () => {
	console.log('leaving lesson')
	ipc.send('exit-home', {'coming':'back'})	
}

export { saveSession, exitLesson }
