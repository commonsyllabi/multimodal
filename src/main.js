const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

let mainWindow

let generateHTML = (data, template) => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+data.course+'/'+data.lesson+'.json'))
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

		let lessons = fs.readdirSync(__dirname+'/../lessons/'+co)

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
	replaceWindow('edit', 1200, 800)
})

ipc.on('create-lesson', (event, data) => {
	createLesson()
	replaceWindow('create', 1200, 800)
})

ipc.on('save-lesson', (event, lesson) => {
	fs.writeFile(__dirname+'/../lessons/'+lesson.course+'/'+lesson.title+'.json', JSON.stringify(lesson), () => {
		console.log('SAVE LESSON: written:',lesson.title,'to /',lesson.course)
	})
})

ipc.on('save-session', (event, lesson) => {
	fs.writeFile(__dirname+'/../lessons/'+lesson.course+'/'+lesson.title+'-live.json', JSON.stringify(lesson), () => {
		console.log('SAVE SESSION: written:',lesson.title,'to /',lesson.course)
	}
})

ipc.on('exit-home', (event, data) => {
	listLessons()
	createWindow('welcome', 900, 500)
})

app.on('ready', () => { 
	listLessons()
	createWindow('welcome', 900, 500) 
})

app.on('window-all-closed', () => { app.quit() })
