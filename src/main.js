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
	let c = JSON.parse(fs.readFileSync(__dirname+'/lessons/'+data.course+'/'+data.title+'.json'))

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
	require('./lesson.js').init(mainWindow)
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
	let courses = JSON.parse(fs.readFileSync(__dirname+'/lessons/courses.json'))

	// check for existing courses
	for(let course of courses){
		if(course.name == data.name && course.year == data.year && course.path == data.path){
			console.log(`[COURSE] ${data.name} already exists`)
			BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'course already exists!', type: 'error'})
			return
		}
	}

	// update courses data
	courses.push(data)
	fs.writeFileSync(__dirname+'/lessons/courses.json', JSON.stringify(courses))

	//create empty folders for HTML exports
	utils.touchDirectory(data.path+'/')
	utils.touchDirectory(data.path+'/assets')
	fs.createReadStream(__dirname+'/lessons/style.css').pipe(fs.createWriteStream(data.path+'/style.css'))

	//send a confirmation message
	BrowserWindow.getFocusedWindow().webContents.send('msg-log', {msg: 'course saved!', type: 'info'})
	console.log(`[COURSE] saved ${data.name} successfully`)
	BrowserWindow.getFocusedWindow().close()
	mainWindow = BrowserWindow.getAllWindows()[0]
	mainWindow.webContents.send('update-dropdown', data)
})

// creates the 'new lesson' window
ipc.on('create-lesson', () => {
	lesson.create()
	replaceWindow('create')
})

ipc.on('remove-lesson', (event, data) => {
	if(lesson.remove(data)){
		mainWindow.webContents.send('msg-log', {msg: 'course deleted!', type: 'info'})

		setTimeout(() => {
			lesson.list()
			replaceWindow('welcome')
		}, 1000)

	}else{
		mainWindow.webContents.send('msg-log', {msg: 'error deleting course!', type: 'error'})
	}
})

// exports a lesson
ipc.on('export-lesson', (event, data) => {
	lesson.export(data)
})

//-- save lesson
ipc.on('save-lesson', (event, lesson) => {
	lesson.date = utils.date()

	utils.touchDirectory(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/img`)
	utils.touchDirectory(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/vid`)

	//-- check for external media assets and copy them in the local folder

	for(let concept of lesson.concepts){
		for(let p of concept.prep){
			if(p.type == 'img' || p.type == 'vid'){
				let re = (/[^/]*$/gi).exec(p.src)
				p.name = re[0]

				//-- check for existing assets
				let existing = fs.readdirSync(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/${p.type}`)
				let isReplacing = false
				for(let e of existing)
					if(e == p.name)
						isReplacing = true

				if(!isReplacing){
					fs.createReadStream(p.src).pipe(fs.createWriteStream(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/${p.type}/${p.name}`))
					// now we redirect the source to the local folder
					p.src = `${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/${p.type}/${p.name}`
					console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
				}
			}
		}
	}


	let _path = __dirname+'/lessons/'+lesson.course.name
	utils.touchDirectory(_path)

	fs.writeFile(__dirname+'/lessons/'+lesson.course.name+'/'+lesson.title+'.json', JSON.stringify(lesson), () => {
		console.log(`[SAVE LESSON] ${lesson.title} to ${_path} at ${utils.time()}`)
		mainWindow.webContents.send('msg-log', {msg: 'saved!', type: 'info'})
	})
})

ipc.on('exit-home', () => {
	lesson.list()
	replaceWindow('welcome')
})

app.on('ready', () => {
	lesson.list()
	createWindow('welcome', 0.8, 0.8)
})

app.on('window-all-closed', () => { app.quit() })
