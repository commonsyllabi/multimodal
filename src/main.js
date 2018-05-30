const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

const utils = require('./utils.js')
const lesson = require('./lesson.js')

let mainWindow

let generateHTML = (data, template) => {
	let c
	if(template != 'edit-notes')
		c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+data.course+'/prep/'+data.title+'.json'))
	else
		c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+data.course+'/in-class/'+data.title+'.json'))

	let compiled = pug.renderFile('views/'+template+'.pug', c)

	fs.writeFileSync(__dirname+'/../app/'+template+'.html', compiled)
}

// ------------------------------
// ------------------------------ WINDOW MANAGEMENT
// -----------------------------

let createWindow = (current, _w_ratio, _h_ratio) => {
	mainWindow = null
	
	_w_ratio != null ? _w_ratio : 0.95
	_h_ratio != null ? _h_ratio : 0.95
	let _width = electron.screen.getPrimaryDisplay().workAreaSize.width*_w_ratio
	let _height = electron.screen.getPrimaryDisplay().workAreaSize.height*_h_ratio


	mainWindow = new BrowserWindow({width: _width, height: _height, icon: __dirname + '/icon-tmp.png', frame: true})

	mainWindow.loadURL('file:///'+__dirname+'/../app/'+current+'.html')

	//mainWindow.toggleDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	require('./menu.js').init(mainWindow)
	require('./lesson.js').init(mainWindow)
}

module.exports.win = mainWindow

let replaceWindow = (_target) => {
	mainWindow.loadURL('file:///'+__dirname+'/../app/'+_target+'.html')
}


// ------------------------------
// ------------------------------ IPC MESSAGES
// -----------------------------

ipc.on('open-lesson', (event, data) => {
	generateHTML(data, 'lesson')
	replaceWindow('lesson')
})

ipc.on('edit-lesson', (event, data) => {
	generateHTML(data, 'edit')
	replaceWindow('edit')
})

ipc.on('edit-notes-lesson', (event, data) => {

	let edited_lessons = fs.readdirSync(__dirname+'/../lessons/'+data.course+'/in-class')
	let has_edit = false
	for(let edited_lesson of edited_lessons)
		if(edited_lesson.indexOf(data.title) > -1)
			has_edit = true


	if(has_edit){
		generateHTML(data, 'edit-notes')
		replaceWindow('edit-notes')
	}else{
		console.log('no found');
		mainWindow.webContents.send('msg-log', {msg: 'no file found!', type: 'error'})
	}
})

ipc.on('create-new-course', () => {
	createWindow('course', 0.4, 0.4)
})

ipc.on('save-course', (event, data) => {
	//this is where
	//i check for the courses file
	//and if there is no similar course
	//i append
	//then don't forget to send messages
})

ipc.on('create-lesson', () => {
	lesson.create()
	replaceWindow('create')
})

ipc.on('export-lesson', (event, data) => {
	lesson.export(data)
})

//-- save lesson prep
ipc.on('save-lesson', (event, lesson) => {
console.log('lesson prefix as received: '+lesson.prefix);
	lesson.date = utils.date()
	let _path = __dirname+'/../lessons/'+lesson.course+'/'+lesson.prefix
	console.log('lesson path: '+_path);

	utils.touchDirectory(_path)

	fs.writeFile(__dirname+'/../lessons/'+lesson.course+'/'+lesson.prefix+'/'+lesson.title+'.json', JSON.stringify(lesson), () => {
		console.log('[SAVE LESSON]',lesson.title,'to /'+_path,'at',utils.time())
		mainWindow.webContents.send('msg-log', {msg: 'saved!', type: 'info'})
	})
})

ipc.on('exit-home', () => {
	lesson.list()
	replaceWindow('welcome')
})

app.on('ready', () => {
	lesson.list()
	createWindow('welcome')
})

app.on('window-all-closed', () => { app.quit() })
