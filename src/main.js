const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const shell = electron.shell
const BrowserWindow = electron.BrowserWindow
const BrowserView = electron.BrowserView

const fs = require('fs-extra')
const os = require('os')
const pug = require('pug')

const utils = require('./utils.js')
const board = require('./board.js')

const Subject = require('./subject.js')
const Topic = require('./topic.js')

let mainWindow

//------------
//-- renders an HTML file to the disk
//-- given a JSON object and a string `_template`
//------------
let generateHTML = (_subjectname, _topicname) => {
	console.log(`[MAIN] generating HTML for: ${_subjectname} - ${_topicname}`)

	//-- read the `topic.json` file given a subject name and a topic name
	let c = fs.readFileSync(`${app.getPath('userData')}/app/imports/${_subjectname}/topics/${_topicname}/topic.json`)

	//-- the topic.pug template needs a particular format
	let compiled = pug.renderFile(`${__dirname}/views/topic.pug`, {'data': c})

	//-- write that file to disk
	fs.writeFileSync(`${app.getPath('userData')}/app/topic.html`, compiled)
}

// ------------------------------
// ------------------------------ WINDOW MANAGEMENT
// -----------------------------

//------------
//-- creates the actual electron window
//-- takes _filename
//-- it replaces any existing mainWindow
//-- however, due to the vue layer there should be
//-- no need to create new windows
//------------
let createWindow = (_filename) => {
	//-- reset any existing window
	mainWindow = null

	//-- set window dimensions
	let _w_ratio = _h_ratio = 1
	let _w = electron.screen.getPrimaryDisplay().workAreaSize.width*_w_ratio
	let _h = electron.screen.getPrimaryDisplay().workAreaSize.height*_h_ratio


	//-- create the electron window
	mainWindow = new BrowserWindow(
		{
			width: _w,
			height: _h,
			icon: __dirname + '/assets/icon.png',
			frame: true,
			webPreferences: {
      	nodeIntegration: true
    	}
		})

	//-- load the file created by generateHTML into the main window
	mainWindow.loadURL(`file:///${app.getPath('userData')}/app/${_filename}.html`)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	//-- pass a reference to the window to the menu scripts
	require('./menu.js').init(mainWindow)
}

//------------
//-- replaces the HTML file loaded into the main window
//-- it should always be called with a mainWindow set
//------------
let replaceWindow = (_filename) => {
	mainWindow.loadURL(`file:///${app.getPath('userData')}/app/${_filename}.html`)
}


// ------------------------------
// ------------------------------ IPC MESSAGES
// -----------------------------

//------------
//-- opens the path to a local file
//------------
ipc.on('open-path', (event, _path) => {
	shell.openExternal(_path)
})

//------------
//-- opens a URL in a web browser
//------------
ipc.on('open-url', (event, _url) => {
	shell.openExternal(_url)

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

//------------
//-- opens the topic window
//-- takes a JSON object
//-- generates an HTML and loads it
//------------
ipc.on('open-topic', (event, _d) => {
	generateHTML(_d.subject.name, _d.topic.name)
	replaceWindow('topic')
})

//------------
//-- adds a new subject
//-- takes a JSON object,
//-- and opens up the topic window immediately
//------------
ipc.on('create-subject', (event, _d) => {
	let subject = new Subject(_d)

	//-- by creating a new topic with a subject, it automatically gets associated with it
	let topic = new Topic({
		subject: subject,
		name: undefined,
		overview: {text:""},
		concepts: [{
			name: "new concept",
			context: {text: ""},
			pages: [{
				name: "new page",
				preps: [{
					text: "...",
					tag: "",
					type: "md"
				}],
				notes: [],
				writeup: {text: ""}
			}]
		}]
	})

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'subject saved!', type: 'info'})
	console.log(`[SUBJECT] created ${subject.name} successfully`)

	generateHTML(topic.subject.name, topic.name)
	replaceWindow('topic')
})

//------------
//-- creates a new topic
//-- given a JSON object
//-- and opens it up in the window
//------------
ipc.on('create-topic', (event, _d) => {
	let topic = new Topic(_d)

	generateHTML(topic.subject.name, topic.name)
	replaceWindow('topic')
})

//------------
//-- saves the changes on a subject
//-- given a JSON object
//------------
ipc.on('save-subject', (event, _d) => {
		Subject.save(_d).then((_result) => {
		console.log(`[MAIN] saved changes to ${_result.name}`);
		mainWindow.webContents.send('msg-log', {msg: 'saved changes!', type: 'info'})
	}).catch((err) => {
		console.log(err);
		mainWindow.webContents.send('msg-log', {msg: 'error saving subject!', type: 'error'})
	})
})

//------------
//-- removes a topic
//-- then sends a confirmation message
//-- to the mainWindow
//------------
ipc.on('remove-topic', (event, _d) => {
	Topic.remove(_d).then((result) => {
		mainWindow.webContents.send('msg-log', {msg: 'topic deleted!', type: 'info'})

		//-- refresh the page
		//-- TODO: there is a better way to do it
		//-- by sending a message to the window telling it
		//-- which topic to remove from the front-end data
		setTimeout(() => {
			board.list()
			replaceWindow('board')
		}, 1000)

	}).catch((err) => {
		console.log(err);
		mainWindow.webContents.send('msg-log', {msg: 'error deleting topic!', type: 'error'})
	})
})

//------------
//-- removes a subject
//-- then sends a confirmation message
//-- to the mainWindow
//------------
ipc.on('remove-subject', (event, _d) => {
	Subject.remove(_d).then((result) => {
		mainWindow.webContents.send('msg-log', {msg: 'subject deleted!', type: 'info'})
		setTimeout(() => {

			//-- refresh the page
			//-- TODO: there is a better way to do it
			//-- by sending a message to the window telling it
			//-- which topic to remove from the front-end data
			board.list()
			replaceWindow('board')
		}, 1000)
	}).catch((err) => {
		console.log(err);
		mainWindow.webContents.send('msg-log', {msg: 'error deleting subject!', type: 'error'})
	})
})

//------------
//-- imports a subject
//-- takes a JSON object with a 'path' attribute
//------------
ipc.on('import-subject', (event, _d) => {
	let path = JSON.parse(_d).path

	Subject.importFrom(path).then((filename) => {
		console.log(`[MAIN] import of ${filename} done`);
		//-- we read from the `subject.json` file we've just imported, and create a new subject instance
		let data = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${filename}/subject.json`))
		let s = new Subject(data)

		//-- we scan for any existing topics, and create as many topic instances as necessary
		//-- we reuse the data variable since there is no asynchronous processing involved
		//-- in the topic creation process
		let topics = fs.readdirSync(`${app.getPath('userData')}/app/imports/${filename}/topics`)
		for(let topic of topics){
			data = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${filename}/topics/${topic}/topic.json`))
			let t = new Topic(data)
		}

		//-- we send confirmation
		mainWindow.webContents.send('msg-log', {msg: 'imported', type: 'msg'})

		//-- refresh the page
		//-- TODO: there is a better way to do it
		//-- by sending a message to the window giving it
		//-- a JSON object which whould contain the newly imported
		//-- subject data
		setTimeout(() => {
			board.list()
			replaceWindow('board')
		}, 1000)

	}).catch((err) => {
		console.log(err);
	})
})

//------------
//-- exports a topic or a subject
//-- takes a JSON object containing
//-- the subject name, the type of the export (pdf, html) and
//-- where to write it to
//------------
ipc.on('export', (event, _d) => {
	let d = JSON.parse(_d)

	if(d.format == 'subject'){
		Subject.export(d.info, d.type, d.path).then(() => {
			console.log(`[MAIN] export of ${d.info.subject.name} done`);

			//-- send back a confirmation and the path to the exported files
			mainWindow.webContents.send('msg-log', {msg: 'exported!', type: 'msg'})
			mainWindow.webContents.send('export-success', {data: JSON.stringify(d)})
		}).catch((err) => {
			console.log(err);
		})
	}else if(d.format == 'topic'){
		Topic.export(d.info, d.type, d.path).then(() => {
			console.log(`[MAIN] export of ${d.info.topic.name} done`);

			//-- send back a confirmation and the path to the exported files
			mainWindow.webContents.send('msg-log', {msg: 'exported!', type: 'msg'})
			mainWindow.webContents.send('export-success', {data: JSON.stringify(d)})
		}).catch((err) => {
			console.log(err);
		})
	}else{
		console.log(`[MAIN] Error exporting ${_d}`);
	}
})

//------------
//-- show the exports results
//-- takes a JSON object
//-- opens a file or directory of exports
//-- containing a type, a path and a subject name
//------------
ipc.on('open-export', (event, _d) => {
	let data = JSON.parse(_d) //-- this is ridiculous

	if(data.type == 'html'){

		if(data.location == "folder"){
			shell.showItemInFolder(`${data.path}/index.html`)
		}	else if(data.location == 'show'){
			let win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png', frame: true})
			win.loadURL(`file://${data.path}/index.html`)
		} else {
			console.log(`[MAIN] error on opening HTML export: ${data.location}`);
		}

	}else if(data.type == 'pdf'){

		if(data.location == "folder"){
			shell.showItemInFolder(`${data.path}/${data.name}.pdf`)
		}	else if(data.location == 'show'){
			shell.openExternal(`file://${data.path}/${data.name}.pdf`)
		} else {
			console.log(`[MAIN] error on opening PDF export: ${data.location}`);
		}

	}
})

//------------
//-- save topic during a session
//-- takes all the session data
//-- passes it to the Topic class
//-- and passes the response back
//------------
ipc.on('save-topic', (event, _data) => {
	Topic.save(_data).then((result) => {
		console.log(`[SAVE TOPIC] ${_data.name} to ${_data.subject.path} at ${utils.time()}`)
		mainWindow.webContents.send('msg-log', {msg: 'saved!', type: 'info'})
	}).catch((err) => {
		console.log(`[MAIN] error on save topic: ${err}`);
	})
})

//------------
//-- replace the mainWindow with the board
//------------
ipc.on('exit-home', () => {
	board.list()
	replaceWindow('board')
})

//------------
//-- start up the process the first time
//-- handles making sure the necessary directories exist
//-- and the most recent subjects.json is there
//-- finishes with listing the subjects
//-- and opening the board
//------------
app.on('ready', () => {
	//-- we need to create the temp directories
	utils.touchDirectory(`${app.getPath('userData')}/data`) //-- for all data
	utils.touchDirectory(`${app.getPath('userData')}/app`) //-- for the HTML renders and the JS scripts
	utils.touchDirectory(`${app.getPath('userData')}/app/imports`) //-- for storing and importing the user's subjects

	//-- if there is no subjects.json in the working directory
	//-- we copy it from our local directory
	//-- as long with all the imported data
	if(!fs.existsSync(`${app.getPath('userData')}/data/subjects.json`)){
		console.log(`[MAIN] list of subjects not found in tmp dir ${app.getPath('userData')}, copying existing subjects.json found in /app`);
		fs.copySync(`${__dirname}/data/subjects.json`, `${app.getPath('userData')}/data/subjects.json`)
		fs.copySync(`${__dirname}/app/imports`, `${app.getPath('userData')}/app/imports`)
	}

	//-- clean up any ghost references from old created topics
	//-- list all the subjects and topics we actually have
	board.cleanup()
	board.list()
	createWindow('board')
})

//------------
//-- clean exit
//------------
app.on('window-all-closed', () => { app.quit() })
