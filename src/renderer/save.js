'use strict'

const ipc = require('electron').ipcRenderer

let saveSession = () => {
	let data = parseDocument()
	
	if(data.length == 0){
		console.log('nothing found on the document!')
		return
	}

	ipc.send('save-session', data)
}

let parseDocument = () => {
	let el_notes = document.getElementsByClassName('note')
	console.log(el_notes)	
	let notes = []
	for(let n of el_notes)
		notes.push(n.innerText)

	return notes
}

export { saveSession }
