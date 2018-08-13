'use strict'

const fs  = require('fs')
const pug = require('pug')
const { exec } = require('child_process')

let win

exports = module.exports = {}

module.exports.list = () => {

	//first we get all the courses
	let courses = JSON.parse(fs.readFileSync(__dirname+'/lessons/courses.json'))

	let data = {
		'courses':[]
	}

	//then for each course we look for all the related lessons
	for(let co of courses){
		let course = {
			'course':co,
			'lessons': []
		}

		let lessons = fs.readdirSync(__dirname+'/lessons/'+co.name+'/prep')

		//then we get the name of all the associated lessons
		for(let l of lessons){
			let lesson_name = l.substring(0, l.indexOf('.'))
			course.lessons.push(lesson_name)
		}

		data.courses.push(course)
	}

	let compiled = pug.renderFile(__dirname+'/views/welcome.pug', data)
	fs.writeFileSync(__dirname+'/app/welcome.html', compiled)
}

module.exports.create = () => {

	let courses = JSON.parse(fs.readFileSync(__dirname+'/lessons/courses.json'))
	let data = {
		'courses': courses
	}

	let compiled = pug.renderFile('views/create.pug', data)
	fs.writeFileSync(__dirname+'/app/create.html', compiled)
}

module.exports.getNewest = (lesson) => {
	let saves = fs.readdirSync(__dirname+'/lessons/'+lesson.course+'/in-class/'+lesson.title)

	if(saves.length == 1) return saves[0]

	let latest = {'year':0,'month':0, 'day':0, 'hour':0, 'minutes':0, 'save':''}
	for(let save of saves){
		let s = save.replace('.json', '').split('-')

		let year = parseInt(s[0].substring(0, 4))
		if(year >= latest.year){
			latest.year = year
			let month =  parseInt(s[0].substring(4, 6))
			if(month >= latest.month){
				latest.month = month

				let day = parseInt(s[0].substring(6, 8))

				if(day >= latest.day){
					latest.day = day

					let hour = parseInt(s[1].substring(0, 2))
					if(hour >= latest.hour){
						latest.hour = hour
						let minutes = parseInt(s[1].substring(2, 4))

						if(minutes >= latest.minutes){
							latest.save = save
						}
					}
				}
			}
		}
	}

	console.log('[EXPORT] found newest save:',latest.save)

	return latest.save
}

module.exports.export = (_l) => {
	let lesson = JSON.parse(fs.readFileSync(__dirname+'/lessons/'+_l.course+'/in-class/'+_l.title+'.json'))

	switchBranch(lesson, 'gh-pages', render)
}

let render = (_lesson) => {
	let compiled = pug.renderFile('views/export.pug', _lesson)

	fs.writeFile(_lesson.course.path+'/'+_lesson.title+'.html', compiled, (err) => {
		if(err) throw err
		console.log('[EXPORTED]', _lesson.course.path+'/'+_lesson.title+'.html')

		//rebuild the index
		let exported_lessons = []
		let local_files = fs.readdirSync(_lesson.course.path+'/')
		for(let f of local_files)
			if(f != 'index.html' && f.indexOf('.html') > -1)
				exported_lessons.push(f.replace('.html', ''))

		let c = {
			'course': _lesson.course.name,
			'lessons': exported_lessons
		}

		compiled = pug.renderFile('views/export-index.pug', c)
		fs.writeFile(_lesson.course.path+'/'+'index.html', compiled, (err) => {
			if(err) throw err
			console.log('[REBUILT]', 'index.html')

			pushToRemote(_lesson)
		})
	})
}

let switchBranch = (_lesson, _branch, _callback) => {
	console.log(`[BASH] switching branch to ${_branch}, in repo ${_lesson.course.path}`)

	//-- the conditional below handles the possibility
	//-- of uncommitted changes
	let script
	if(_branch == 'master')
		script = `cd ${_lesson.course.path} && git checkout ${_branch} && git stash apply`
	else
		script = `cd ${_lesson.course.path} && git stash && git checkout ${_branch}`

	let child = exec(script, {shell: '/bin/bash'}, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			console.log('[STDERR]',stderr)
			win.webContents.send('msg-log', {msg: `failed to find path for ${_lesson.title}`, type: 'error'})
			return
		}
		console.log(stdout)

		if(_branch == 'gh-pages'){
			for(let concept of _lesson.concepts){
				for(let prep of concept.prep){
					if(prep.type == 'img'){
						let file_path = __dirname+'/app/'+prep.src
						console.log(`[MEDIA] found img: ${file_path}`);
						fs.createReadStream(file_path).pipe(fs.createWriteStream(_lesson.course.path+'/assets/img/'+prep.src))
					}
				}
			}
		}
	})

	if(_callback != undefined)
		child.on('close', () => {
			_callback(_lesson)
		})
}

let pushToRemote = (_lesson) => {
	let script = `cd ${_lesson.course.path} && git add -A && git commit -m "exported ${_lesson.title}"`// && git push origin gh-pages`

	let child = exec(script, {shell: '/bin/bash'}, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			console.log('[STDERR]',stderr)
			win.webContents.send('msg-log', {msg: `failed to upload ${_lesson.title}`, type: 'error'}) //this type of error doesn't return whether the git process has failed
			return
		}else{
			win.webContents.send('msg-log', {msg: `exported ${_lesson.title}`, type: 'info'})
		}

		console.log(stdout)
	})

	child.on('close', () => {
		switchBranch(_lesson, 'master')
	})
}

module.exports.init = (w) => {
	win = w
}
