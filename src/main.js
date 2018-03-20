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
const lesson = require('./lesson.js')

let mainWindow

let generateHTML = (data, template) => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+data.course+'/prep/'+data.title+'.json'))
	let compiled = pug.renderFile('views/'+template+'.pug', c)

	fs.writeFileSync(__dirname+'/../app/'+template+'.html', compiled)
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

	require('./menu.js').init(mainWindow)
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
	lesson.create()
	replaceWindow('create', 1800, 1000)
})

ipc.on('export-lesson', (event, data) => {
	lesson.export(data)
})

ipc.on('save-lesson', (event, lesson) => {
	lesson.date = utils.date()
	let _path = __dirname+'/../lessons/'+lesson.course
	let _file = lesson.title+'.json'

	utils.touchDirectory(_path+'/prep/')

	fs.writeFile(__dirname+'/../lessons/'+lesson.course+'/prep/'+lesson.title+'.json', JSON.stringify(lesson), () => {
		console.log('[SAVE LESSON]',lesson.title,'to /'+_path,'at',utils.time())
	})
})

ipc.on('save-session', (event, lesson) => {
	lesson.date = utils.date()
	let _path = __dirname+'/../lessons/'+lesson.course
	let _file = utils.timestamp()+'.json'
	
	utils.touchDirectory(_path + '/in-class/' + lesson.title)

	fs.writeFile(_path+'/in-class/'+lesson.title +'/'+_file, JSON.stringify(lesson), () => {
		console.log('[SAVE SESSION]',lesson.title,'to /'+_path,'at',utils.time())
	})
})

ipc.on('exit-home', () => {
	lesson.list()
	replaceWindow('welcome', 1800, 1000)
})

app.on('ready', () => {
	lesson.list()
	createWindow('welcome', 1800, 1000)
})

app.on('window-all-closed', () => { app.quit() })
