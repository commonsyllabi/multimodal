'use strict'

const fs  = require('fs')
const path = require('path')
const pug = require('pug')
const { exec } = require('child_process')
const BrowserWindow = require('electron').BrowserWindow
const PUSH_TO_GITHUB = false

let win

exports = module.exports = {}

// lists all the lessons from courses.json and displays them on the welcome screen
module.exports.list = () => {
	let data = {
		'courses':[]
	}

	//first we get all the courses
	let courses = JSON.parse(fs.readFileSync(__dirname+'/lessons/courses.json'))

	//then for each course we look for all the related lessons
	for(let course of courses){
		let obj = {
			'course':course,
			'lessons': []
		}

		for(let lesson of course.lessons){
			let p = `${course.path}/${course.name}/lessons/${lesson.name}/${lesson.name}.json`
			let l = null
			try {
				l = fs.readFileSync(p)
			} catch (e) {
				console.log(`[BOARD] Couldn't find lesson at ${lesson.name}`);
			}

			if(l != null)
				obj.lessons.push(JSON.parse(l))
		}

		if(obj.lessons.length > 0)
			data.courses.push(obj)
	}

	let compiled = pug.renderFile(__dirname+'/views/welcome.pug', {'data': JSON.stringify(data)})
	fs.writeFileSync(__dirname+'/app/welcome.html', compiled)
}

// creates a `new lesson` screen with a list of existing courses
module.exports.create = () => {
	let courses = JSON.parse(fs.readFileSync(__dirname+'/lessons/courses.json'))
	let data = {
		'courses': courses
	}

	let compiled = pug.renderFile(__dirname+'/views/create.pug', data)
	fs.writeFileSync(__dirname+'/app/create.html', compiled)
}

module.exports.remove = (_l) => {
	if(fs.existsSync(`${__dirname}/lessons/${_l.course}/${_l.name}.json`)){
		fs.unlinkSync(`${__dirname}/lessons/${_l.course}/${_l.name}.json`)
		console.log(`[DELETED] ${_l.name}`)
		return true
	}else{
		return false
	}
}

module.exports.init = (w) => {
	win = w
}
