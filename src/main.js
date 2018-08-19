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
		c = JSON.parse(fs.readFileSync(__dirname+'/lessons/'+data.course+'/prep/'+data.title+'.json'))
	else
		c = JSON.parse(fs.readFileSync(__dirname+'/lessons/'+data.course+'/in-class/'+data.title+'.json'))

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


	mainWindow = new BrowserWindow({width: _width, height: _height, icon: __dirname + '/icon.png', frame: true})

	mainWindow.loadURL('file:///'+__dirname+'/app/'+current+'.html')

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	require('./menu.js').init(mainWindow)
	require('./lesson.js').init(mainWindow)
}

module.exports.win = mainWindow

let replaceWindow = (_target) => {
	mainWindow.loadURL('file:///'+__dirname+'/app/'+_target+'.html')
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

// creates a window with the ability to edit notes
ipc.on('edit-notes-lesson', (event, data) => {

	let edited_lessons = fs.readdirSync(__dirname+'/lessons/'+data.course+'/in-class')
	let has_edit = false
	for(let edited_lesson of edited_lessons)
		if(edited_lesson.indexOf(data.title) > -1)
			has_edit = true


	if(has_edit){
		generateHTML(data, 'edit-notes')
		replaceWindow('edit-notes')
	}else{
		console.log('no file found for editing with notes')
		mainWindow.webContents.send('msg-log', {msg: 'no file found!', type: 'error'})
	}
})

ipc.on('create-new-course', () => {
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
	utils.touchDirectory(data.path+'/html-exports')
	utils.touchDirectory(data.path+'/html-exports/assets')
	fs.createReadStream(__dirname+'/lessons/style.css').pipe(fs.createWriteStream(data.path+'/html-exports/style.css'))

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

// exports a lesson
ipc.on('export-lesson', (event, data) => {
	lesson.export(data)
})

//-- save lesson (both prep and in-class, see lesson.prefix)
ipc.on('save-lesson', (event, lesson) => {
	lesson.date = utils.date()

	utils.touchDirectory(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/img`)
	utils.touchDirectory(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/vid`)

	//-- check for external media assets
	if(lesson.prefix == 'prep'){
		for(let [i, c] of lesson.concepts.entries()){
			for(let [j, prep] of c.entries()){
				if(prep.type == 'img' || prep.type == 'vid'){
					console.log(`[MEDIA] found image ${prep.src}`)
					let file_type = prep.src.substring(prep.src.indexOf('.'), prep.src.length)
					let file_num = i+j
					let file_name = prep.type+'-'+lesson.course.name+'-'+lesson.title+'-'+file_num+file_type
					prep.name = file_num+'_'+(/[^/]*$/gi).exec(prep.src)
					fs.createReadStream(prep.src).pipe(fs.createWriteStream(`${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/${prep.type}/${prep.name}`))
					prep.src = `${__dirname}/app/assets/${lesson.course.name}/${lesson.title}/${prep.type}/${prep.name}`
					console.log(`[MEDIA] copied ${prep.name} to ${prep.src}`)
				}
			}
		}
	}

	let _path = __dirname+'/lessons/'+lesson.course.name+'/'+lesson.prefix

	utils.touchDirectory(_path)

	fs.writeFile(__dirname+'/lessons/'+lesson.course.name+'/'+lesson.prefix+'/'+lesson.title+'.json', JSON.stringify(lesson), () => {
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
	createWindow('welcome', 0.8, 0.8)
})

app.on('window-all-closed', () => { app.quit() })
