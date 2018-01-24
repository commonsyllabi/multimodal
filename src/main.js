const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

let mainWindow

let lesson_path = 'views/'
let template_name = 'lesson'
let lesson_name = 'commlab/webdesign'
let lesson = {
	"path":"views/",
	"class":"commlab",
	"name":"webdesign",
	"template":"lesson"
}

let generateLesson = () => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+lesson.class+'/'+lesson.name+'.json'))
	let compiled = pug.renderFile(lesson.path +'/'+ lesson.template + '.pug', c)

	fs.writeFileSync(__dirname+'/../app/'+lesson.name+'.html', compiled)
}

let createWindow = () => {

	generateLesson()

	mainWindow = new BrowserWindow({width: 1800, height: 1000, icon: __dirname + '/icon-tmp.png'})

	mainWindow.loadURL('file:///'+__dirname+'/../app/'+lesson.name+'.html')

	mainWindow.toggleDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

ipc.on('save-session', (event, data)=>{
	console.log('received', data[0])
})

app.on('ready', createWindow)

app.on('window-all-closed', () => { app.quit() })
