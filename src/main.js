const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
//const dialog = electron.dialog

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

const utils = require('./utils.js')

let mainWindow

let generateHTML = (data, template) => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+data.course+'/prep/'+data.title+'.json'))
	let compiled = pug.renderFile('views/'+template+'.pug', c)

	fs.writeFileSync(__dirname+'/../app/'+template+'.html', compiled)
}

let listLessons = () => {
	let data = {
		'courses':[]
	}

	let courses = fs.readdirSync(__dirname+'/../lessons')

	for(let co of courses){
		
		let course = {
			'title':co,
			'lessons': []
		}

		let lessons = fs.readdirSync(__dirname+'/../lessons/'+co+'/prep')

		for(let l of lessons){
			let lesson_name = l.substring(0, l.indexOf('.'))
			course.lessons.push(lesson_name)	
		}

		data.courses.push(course)
	}

	let compiled = pug.renderFile('views/welcome.pug', data)
	fs.writeFileSync(__dirname+'/../app/welcome.html', compiled)
}

let createLesson = () => {
	let data = {
		'courses':[]
	}

	data.courses = fs.readdirSync(__dirname+'/../lessons')
	
	let compiled = pug.renderFile('views/create.pug', data)
	fs.writeFileSync(__dirname+'/../app/create.html', compiled)
}

let exportLesson = (lesson) => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+lesson.course+'/'+lesson.title+'.json'))
	let compiled = pug.renderFile('views/export.pug', c)
	fs.writeFile(__dirname+'/../export/'+lesson.course+'/'+lesson.title+'.html', compiled, () => {
		console.log('EXPORTED:',lesson.title,'to /export/'+lesson.title+'.html')
	})
}

// ------------------------------
// ------------------------------ WINDOW MANAGEMENT
// -----------------------------

let createWindow = (current, _width, _height) => {
	mainWindow = null

	mainWindow = new BrowserWindow({width: _width, height: _height, icon: __dirname + '/icon-tmp.png', frame: true})

	mainWindow.loadURL('file:///'+__dirname+'/../app/'+current+'.html')

	//mainWindow.toggleDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

let replaceWindow = (_target, _width, _height) => {
	mainWindow.setSize(_width,_height)

	mainWindow.loadURL('file:///'+__dirname+'/../app/'+_target+'.html')
}


// ------------------------------
// ------------------------------ IPC MESSAGES
// -----------------------------

ipc.on('open-lesson', (event, data) => {
	generateHTML(data, 'lesson')
	replaceWindow('lesson', 1800, 1000)
})

ipc.on('edit-lesson', (event, data) => {
	generateHTML(data, 'edit')
	replaceWindow('edit', 1800, 1000)
})

ipc.on('create-lesson', () => {
	createLesson()
	replaceWindow('create', 1800, 1000)
})

ipc.on('export-lesson', (event, data) => {
	exportLesson(data)
})

ipc.on('save-lesson', (event, lesson) => {
	lesson.date = utils.date()
	fs.writeFile(__dirname+'/../lessons/'+lesson.course+'/prep/'+lesson.title+'-'+utils.timestamp()+'.json', JSON.stringify(lesson), () => {
		console.log('[SAVE LESSON]',lesson.title,'to /'+lesson.course,'at',utils.time())
	})
})

ipc.on('save-session', (event, lesson) => {
	lesson.date = utils.date()
	fs.writeFile(__dirname+'/../sessions/'+lesson.course+'/in-class/'+lesson.title+'-'+utils.timestamp()+'.json', JSON.stringify(lesson), () => {
		console.log('[SAVE SESSION]',lesson.title,'to /'+lesson.course,'at',utils.time())
	})
})

ipc.on('exit-home', () => {
	listLessons()
	replaceWindow('welcome', 1800, 1000)
})

app.on('ready', () => { 
	listLessons()
	createWindow('welcome', 1800, 1000) 
})

app.on('window-all-closed', () => { app.quit() })
