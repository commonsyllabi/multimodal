const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const shell = electron.shell
const BrowserWindow = electron.BrowserWindow
const BrowserView = electron.BrowserView

//const path = require('path')
//const url = require('url')
const fs = require('fs-extra')
const os = require('os')
const pug = require('pug')

const utils = require('./utils.js')
const board = require('./board.js')

const Subject = require('./subject.js')
const Topic = require('./topic.js')

let mainWindow

let generateHTML = (data, template) => {
	let c = fs.readFileSync(`${os.tmpdir()}/app/imports/${data.subject}/topics/${data.name}/topic.json`)

	//-- TODO cleanup
	let compiled
	if(template == 'topic')
		compiled = pug.renderFile(`${__dirname}/views/${template}.pug`, {'data':c})
	else
		compiled = pug.renderFile(`${__dirname}/views/${template}.pug`, JSON.parse(c))

	fs.writeFileSync(`${os.tmpdir()}/app/${template}.html`, compiled)
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

	mainWindow.loadURL(`file:///${os.tmpdir()}/app/${current}.html`)

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
		mainWindow.loadURL(`file:///${os.tmpdir()}/app/${_target}.html`)
}


// ------------------------------
// ------------------------------ IPC MESSAGES
// -----------------------------

ipc.on('open-url', (event, url) => {
	shell.openExternal(url)

	//TODO one day have a URL open in a multimodal sub-window
//  let bwin = new BrowserWindow({ width: 700, height: 750})
//  bwin.on('closed', () => {
// 	 bwin = null
//  })
// fs.writeFileSync(`${__dirname}/views/navigation.html`, pug.renderFile(`${__dirname}/views/navigation.pug`))
//  bwin.loadURL(`${__dirname}/app/navigation.html`)
//
//  let view = new BrowserView()
//  bwin.setBrowserView(view)
//  view.setBounds({ x: 0, y: 50, width: 700, height: 700})
//  view.setAutoResize({width: true, height: true})
// 	view.webContents.loadURL(url)
})

ipc.on('open-topic', (event, data) => {
	generateHTML(data, 'topic')
	replaceWindow('topic')
})

// adds a new subject by appending to the subjects list, and creating the directory structure
ipc.on('save-subject', (event, data) => {
	let s = new Subject(data)

	//-- by creating a new topic with a subject, it automatically gets associated with it
	let t = new Topic({
		subject: s,
		name: 'new-topic',
		overview: {text:""},
		concepts: [{
			name: "new concept",
			context: {text: ""},
			pages: [{
				name: "new page",
				preps: [{
					text: "this is your first note",
					tag: "",
					type: "txt"
				}],
				notes: [],
				writeup: {text: ""}
			}]
		},
		{
			name: "scrapboard",
			context: {text: ""},
			pages: [{
				name: "first",
				preps: [],
				notes: [],
				writeup: {text: ""}
			}]
		}]
	})

	//-- this is all we need to open the new topic lesson
	let d = {
		"path": s.path,
		"subject": s.name,
		"name": t.name
	}

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'subject saved!', type: 'info'})
	console.log(`[COURSE] created ${data.name} successfully`)

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
			replaceWindow('board')
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
			replaceWindow('board')
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
		let sdata = JSON.parse(fs.readFileSync(`${os.tmpdir()}/app/imports/${name}/subject.json`))
		let s = new Subject(sdata)

		let topics = fs.readdirSync(`${os.tmpdir()}/app/imports/${name}/topics`)
		for(let topic of topics){
			let tdata = JSON.parse(fs.readFileSync(`${os.tmpdir()}/app/imports/${name}/topics/${topic}/topic.json`))
			let t = new Topic(tdata)
		}
		mainWindow.webContents.send('msg-log', {msg: 'imported', type: 'msg'})

		setTimeout(() => {
			board.list()
			replaceWindow('board')
		}, 1000)

	}).catch((err) => {
		console.log(err);
	})
})

// exports a subject
ipc.on('export-subject', (event, d) => {
	d = JSON.parse(d)
	Subject.export(d.subject, d.type, d.path).then(() => {
		console.log('[MAIN] export done');
		mainWindow.webContents.send('msg-log', {msg: 'exported!', type: 'msg'})
		mainWindow.webContents.send('export-success', {data: JSON.stringify(d)})
	}).catch((err) => {
		console.log(err);
	})
})

//-- show the exports results
ipc.on('open-export', (event, d) => {
	d = JSON.parse(d)
	let data = JSON.parse(d.data)

	if(data.type == 'html'){
		if(d.type == "folder"){
			shell.showItemInFolder(`${data.path}/index.html`)
		}	else if(d.type == 'show'){
			let win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png', frame: true})
			win.loadURL(`file://${data.path}/index.html`)
		} else {
			console.log('[MAIN] error on opening html export');
		}
	}else if(data.type == 'pdf'){
		//TODO there might be a weird thing about the fact that i access the subject.name even though it should be topic.name......
		if(d.type == "folder"){
			shell.showItemInFolder(`${data.path}/${data.subject.name}.pdf`)
		}	else if(d.type == 'show'){
			shell.openExternal(`file://${data.path}/${data.subject.name}.pdf`)
		} else {
			console.log('[MAIN] error on opening pdf export');
		}
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
	replaceWindow('board')
})

app.on('ready', () => {
	//-- we need to create the temp directories
	utils.touchDirectory(`${os.tmpdir()}/data`)
	utils.touchDirectory(`${os.tmpdir()}/app`)
	utils.touchDirectory(`${os.tmpdir()}/app/imports`)

	// if(!fs.existsSync(`${os.tmpdir()}/data/subjects.json`)){
		// fs.copySync(`${__dirname}/data/subjects.json`, `${os.tmpdir()}/data/subjects.json`)
		// fs.copySync(`${__dirname}/app/imports`, `${os.tmpdir()}/app/imports`)
	// }

	//-- and to copy the js and css files there
	fs.createReadStream(`${__dirname}/app/main.js`).pipe(fs.createWriteStream(`${os.tmpdir()}/app/main.js`))
	fs.createReadStream(`${__dirname}/app/topic.js`).pipe(fs.createWriteStream(`${os.tmpdir()}/app/topic.js`))
	fs.createReadStream(`${__dirname}/app/style.css`).pipe(fs.createWriteStream(`${os.tmpdir()}/app/style.css`))

	board.list()
	createWindow('board', 0.8, 0.8)
})

app.on('window-all-closed', () => { app.quit() })
