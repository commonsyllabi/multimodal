'use strict'

const fs  = require('fs')
const pug = require('pug')
const { exec } = require('child_process')

exports = module.exports = {}

module.exports.list = () => {
	let data = {
		'courses':[]
	}

	let courses = fs.readdirSync(__dirname+'/../lessons')

	for(let co of courses){

		let course = {
			'title':co,
			'lessons': []
		}

		let lessons = fs.readdirSync(__dirname+'/../lessons/'+co+'/prep')

		for(let l of lessons){
			let lesson_name = l.substring(0, l.indexOf('.'))
			course.lessons.push(lesson_name)
		}

		data.courses.push(course)
	}

	let compiled = pug.renderFile('views/welcome.pug', data)
	fs.writeFileSync(__dirname+'/../app/welcome.html', compiled)
}

module.exports.create = () => {
	let data = {
		'courses':[]
	}

	data.courses = fs.readdirSync(__dirname+'/../lessons')

	let compiled = pug.renderFile('views/create.pug', data)
	fs.writeFileSync(__dirname+'/../app/create.html', compiled)
}

let getNewest = (lesson) => {
	let saves = fs.readdirSync(__dirname+'/../lessons/'+lesson.course+'/in-class/'+lesson.title)

	if(saves.length == 1) return saves

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
	let file_path = getNewest(_l)

	let lesson = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+_l.course+'/in-class/'+_l.title+'/'+file_path))

	switchBranch(lesson, 'gh-pages', render)
}

let render = (_lesson) => {
	let compiled = pug.renderFile('views/export.pug', _lesson)

	fs.writeFile(_lesson.path.local+'/'+_lesson.title+'.html', compiled, (err) => {
		if(err) throw err
		console.log('[EXPORTED]', _lesson.path.local+'/'+_lesson.title+'.html')

		//rebuild the index
		let exported_lessons = []
		let local_files = fs.readdirSync(_lesson.path.local+'/')
		for(let f of local_files)
			if(f != 'index.html' && f.indexOf('.html') > -1)
				exported_lessons.push(f.replace('.html', ''))

		let c = {
			'course': _lesson.course,
			'lessons': exported_lessons
		}

		compiled = pug.renderFile('views/export-index.pug', c)
		fs.writeFile(_lesson.path.local+'/'+'index.html', compiled, (err) => {
			if(err) throw err
			console.log('[REBUILT]', 'index.html')

			pushToRemote(_lesson)
		})
	})
}

let switchBranch = (_lesson, _branch, _callback) => {
	console.log('[BASH] switching branch to', _branch)

	//the conditional below handles the possibility
	//of uncommitted changes
	let script
	if(_branch == 'master')
		script = `cd ${_lesson.path.local} && git checkout ${_branch} && git stash apply`
	else
		script = `cd ${_lesson.path.local} && git stash && git checkout ${_branch}`

	let child = exec(script, {shell: '/bin/bash'}, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})

	if(_callback != undefined)
		child.on('close', () => {
			_callback(_lesson)
		})
}

let pushToRemote = (_lesson) => {
	let script = `cd ${_lesson.path.local} && git status && git add -A && git commit -m "exported ${_lesson.title}" && git push origin gh-pages`

	let child = exec(script, {shell: '/bin/bash'}, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})

	child.on('close', () => {
		switchBranch(_lesson, 'master')
	})
}
