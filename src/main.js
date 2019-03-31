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

const Course = require('./course.js')
const Lesson = require('./lesson.js')

let mainWindow

let generateHTML = (data, template) => {
	let c = JSON.parse(fs.readFileSync(`${data.path}/${data.title}/${data.title}.json`))

	let compiled = pug.renderFile(__dirname+'/views/'+template+'.pug', c)

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


	mainWindow = new BrowserWindow({width: _width, height: _height, icon: __dirname + '/assets/icon.icns', frame: true})

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

ipc.on('open-lesson', (event, data) => {
	generateHTML(data, 'lesson')
	replaceWindow('lesson')
})

// creates a window with the ability to edit notes
ipc.on('edit-lesson', (event, data) => {
		generateHTML(data, 'edit')
		replaceWindow('edit')
})

ipc.on('create-new-course', () => {
	if(!fs.existsSync(`${__dirname}/app/course.html`))
		fs.writeFileSync(`${__dirname}/app/course.html`, pug.renderFile(`${__dirname}/views/course.pug`))
	createWindow('course', 0.4, 0.4)
})

// adds a new course by appending to the courses list, and creating the directory structure
ipc.on('save-course', (event, data) => {
	let c = new Course(data)

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'course saved!', type: 'info'})
	console.log(`[COURSE] saved ${data.name} successfully`)
	BrowserWindow.getFocusedWindow().close()
	mainWindow = BrowserWindow.getAllWindows()[0]
	mainWindow.webContents.send('update-dropdown', data)
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
ipc.on('export-lesson', (event, data) => {
	board.export(data)
})

//-- save lesson
ipc.on('save-lesson', (event, data) => {
	let lesson

	//-- check if you're editing a lesson or creating a new one
	if(data.id != null)
		lesson = Lesson.find(data.id)
	else
		lesson = new Lesson(data)

	if(lesson.save(data)){
		console.log(`[SAVE LESSON] ${lesson.name} to ${lesson.course.path} at ${utils.time()}`)
		mainWindow.webContents.send('msg-log', {msg: 'saved!', type: 'info'}) //-- confirm that the lesson is saved
		mainWindow.webContents.send('lesson-info', {id: lesson.id}) //-- update the id
	}else{
		console.error('NO LESSON FOUND', data);
	}
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
