const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')
const pug = require('pug')

let mainWindow

let lesson_path = "views/"
let lesson_name = "test"

let generateLesson = () => {
	let content = JSON.parse(fs.readFileSync(__dirname+'/../lessons/commlab/week1a.json'))
	let compiled_lesson = pug.renderFile(lesson_path + lesson_name + '.pug', content)

	fs.writeFileSync(__dirname+'/../app/'+lesson_name+'.html', compiled_lesson)
}

let createWindow = () => {

	generateLesson()

	mainWindow = new BrowserWindow({width: 1800, height: 1000, icon: __dirname + '/icon-tmp.png'})

	/*
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/'+lesson_name+'.html'),
		protocol: 'file',
		slashes: true
	}))*/

	mainWindow.loadURL('file:///'+__dirname+'/../app/'+lesson_name+'.html')

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
