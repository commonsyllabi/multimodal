'use strict'

const ipc = require('electron').ipcRenderer
const {dialog} = require('electron').remote
let lessonSaved = false

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
