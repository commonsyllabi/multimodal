const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

let mainWindow

let lesson = {
	'class':'commlab',
	'name':'webdesign',
	'template':'lesson'
}

let generateLesson = (cl, le) => {
	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+cla+'/'+le+'.json'))
	let compiled = pug.renderFile('views/'+ lesson.template + '.pug', c)

	fs.writeFileSync(__dirname+'/../app/'+le+'.html', compiled)
}

let listLessons = () => {
	let data = {
		'classes':[]
	}

	let classes = fs.readdirSync(__dirname+'/../lessons')

	for(let cl of classes){
		
		let _class = {
			'title':cl,
			'lessons': []
		}

		let lessons = fs.readdirSync(__dirname+'/../lessons/'+cl)

		for(let l of lessons){
			_class.lessons.push(l)	
		}

		data.classes.push(_class)
	}

	let compiled = pug.renderFile('views/welcome.pug', data)
	fs.writeFileSync(__dirname+'/../app/welcome.html', compiled)
}


let createWindow = () => {

	listLessons()

	mainWindow = new BrowserWindow({width: 900, height: 500, icon: __dirname + '/icon-tmp.png'})

	mainWindow.loadURL('file:///'+__dirname+'/../app/welcome.html')

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
