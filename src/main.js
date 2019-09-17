const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const shell = electron.shell
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
	let c = fs.readFileSync(`${__dirname}/app/imports/${data.subject}/topics/${data.name}/topic.json`)

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

// adds a new subject by appending to the subjects list, and creating the directory structure
ipc.on('save-subject', (event, data) => {
	let s = new Subject(data)

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'subject saved!', type: 'info'})
	console.log(`[COURSE] created ${data.name} successfully`)

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

//-- creates a new board
ipc.on('create-topic', (event, data) => {
	let t = new Topic(data)

	let d = {
		"path": t.subject.path,
		"subject": t.subject.name,
		"name": t.name
	}

	generateHTML(d, 'topic')
	replaceWindow('topic')
})

ipc.on('remove-topic', (event, data) => {

	Topic.remove(data).then((result) => {
		mainWindow.webContents.send('msg-log', {msg: 'topic deleted!', type: 'info'})
		setTimeout(() => {
			board.list()
			replaceWindow('welcome')
		}, 1000)
	}).catch((err) => {
		console.log(err);
		mainWindow.webContents.send('msg-log', {msg: 'error deleting topic!', type: 'error'})
	})
})

ipc.on('remove-subject', (event, data) => {
	Subject.remove(data).then((result) => {
		mainWindow.webContents.send('msg-log', {msg: 'subject deleted!', type: 'info'})
		setTimeout(() => {
			board.list()
			replaceWindow('welcome')
		}, 1000)
	}).catch((err) => {
		console.log(err);
		mainWindow.webContents.send('msg-log', {msg: 'error deleting subject!', type: 'error'})
	})
})

ipc.on('import-subject', (event, d) => {
	d = JSON.parse(d)
	Subject.importFrom(d.path).then((name) => {
		//-- once we have extracted all the folders in the local directory, we update the subjects list by creating a new subject
		let sdata = JSON.parse(fs.readFileSync(`${__dirname}/app/imports/${name}/subject.json`))
		let s = new Subject(sdata)

		let topics = fs.readdirSync(`${__dirname}/app/imports/${name}/topics`)
		for(let topic of topics){
			let tdata = JSON.parse(fs.readFileSync(`${__dirname}/app/imports/${name}/topics/${topic}/topic.json`))
			let t = new Topic(tdata)
		}
		mainWindow.webContents.send('msg-log', {msg: 'import!', type: 'msg'})
	}).catch((err) => {
		console.log(err);
	})
})

// exports a subject
ipc.on('export-subject', (event, d) => {
	d = JSON.parse(d)
	Subject.export(d.subject, d.type, d.path).then(() => {
		mainWindow.webContents.send('msg-log', {msg: 'exported!', type: 'msg'})
		mainWindow.webContents.send('export-success', {data: JSON.stringify(d)})
	}).catch((err) => {
		console.log(err);
	})
})

//-- show the exports results
ipc.on('open-export', (event, d) => {
	d = JSON.parse(d)
	let path = JSON.parse(d.data).path
	if(d.type == "folder"){
		shell.showItemInFolder(`${path}/index.html`)
	}	else if(d.type == 'show'){
		let win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png', frame: true})
		win.loadURL(`file://${path}/index.html`)
	} else {
		console.log('[MAIN] error on opening export');
	}
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
