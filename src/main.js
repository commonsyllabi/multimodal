const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

//const path = require('path')
//const url = require('url')
const fs = require('fs')
const pug = require('pug')

const utils = require('./utils.js')
const board = require('./board.js')

const Subject = require('./subject.js')
const Topic = require('./topic.js')

let mainWindow

let generateHTML = (data, template) => {
	let c = fs.readFileSync(`${data.path}/${data.subject}/topics/${data.name}/topic.json`)

	//-- TODO cleanup
	let compiled
	if(template == 'topic')
		compiled = pug.renderFile(__dirname+'/views/'+template+'.pug', {'data':c})
	else
		compiled = pug.renderFile(__dirname+'/views/'+template+'.pug', JSON.parse(c))

	fs.writeFileSync(__dirname+'/app/'+template+'.html', compiled)
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


	mainWindow = new BrowserWindow(
		{
			width: _width,
			height: _height,
			icon: __dirname + '/assets/icon.png',
			frame: true,
			webPreferences: {
      	nodeIntegration: true
    	}
		})

	mainWindow.loadURL('file:///'+__dirname+'/app/'+current+'.html')

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	require('./menu.js').init(mainWindow)
	require('./board.js').init(mainWindow)
}

module.exports.win = mainWindow

let replaceWindow = (_target) => {
	if(mainWindow == null)
		createWindow(_target)
	else
		mainWindow.loadURL('file:///'+__dirname+'/app/'+_target+'.html')
}


// ------------------------------
// ------------------------------ IPC MESSAGES
// -----------------------------

ipc.on('open-topic', (event, data) => {
	generateHTML(data, 'topic')
	replaceWindow('topic')
})

// creates a window with the ability to edit notes
ipc.on('edit-lesson', (event, data) => {
		generateHTML(data, 'edit')
		replaceWindow('edit')
})

// adds a new course by appending to the courses list, and creating the directory structure
ipc.on('save-subject', (event, data) => {
	let s = new Subject(data)

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'course saved!', type: 'info'})
	console.log(`[COURSE] saved ${data.name} successfully`)

	let t = new Topic({
		subject: s,
		name: 'new-topic',
		concepts: [{
			name: "new concept",
			context: "",
			pages: [{
				name: "new page",
				preps: [],
				notes: [],
				writeup: ""
			}]
		}]
	})

	let d = {
		"path": s.path,
		"subject": s.name,
		"name": t.name
	}

	generateHTML(d, 'topic')
	replaceWindow('topic')
})

// creates the 'new lesson' window
ipc.on('create-lesson', () => {
	board.create()
	replaceWindow('create')
})

ipc.on('remove-lesson', (event, data) => {
	if(board.remove(data)){
		mainWindow.webContents.send('msg-log', {msg: 'course deleted!', type: 'info'})

		setTimeout(() => {
			board.list()
			replaceWindow('welcome')
		}, 1000)

	}else{
		mainWindow.webContents.send('msg-log', {msg: 'error deleting course!', type: 'error'})
	}
})

// exports a lesson
ipc.on('export-lesson', (event, data, type, path) => {
	Lesson.export(data, 'html', path).then((url) => {
		let win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png', frame: true})
		win.loadURL('file://'+url)
	})
})

//-- save lesson
ipc.on('save-topic', (event, data) => {
	Topic.save(data).then((result) => {
		console.log(`[SAVE TOPIC] ${data.name} to ${data.subject.path} at ${utils.time()}`)
		mainWindow.webContents.send('msg-log', {msg: 'saved!', type: 'info'}) //-- confirm that the lesson is saved
	}).catch((err) => {
		console.error('NO TOPIC FOUND', err);
	})
})

ipc.on('exit-home', () => {
	board.list()
	replaceWindow('welcome')
})

app.on('ready', () => {
	board.list()
	createWindow('welcome', 0.8, 0.8)
})

app.on('window-all-closed', () => { app.quit() })
