'use strict'

const fs  = require('fs')
const os = require('os')
const path = require('path')
const pug = require('pug')
const { exec } = require('child_process')
const BrowserWindow = require('electron').BrowserWindow

let win

exports = module.exports = {}

// lists all the lessons from subjects.json and displays them on the welcome screen
module.exports.list = () => {
	if(!fs.existsSync(`${os.tmpdir()}/data/subjects.json`))
		fs.writeFileSync(`${os.tmpdir()}/data/subjects.json`, '[]')


	let data = {
		'subjects':[]
	}

	//first we get all the subjects
	let subjects = JSON.parse(fs.readFileSync(`${os.tmpdir()}/data/subjects.json`))

	//then for each course we look for all the related lessons
	for(let s of subjects){
		let obj = {
			'subject':s,
			'topics': []
		}

		for(let t of s.topics){
			let p = `${os.tmpdir()}/app/imports/${s.name}/topics/${t.name}/topic.json`
			let l = null
			try {
				l = fs.readFileSync(p)
			} catch (e) {
				console.log(`[BOARD] Couldn't find topic at ${t.name}`);
			}

			if(l != null)
				obj.topics.push(JSON.parse(l))
		}

		if(obj.topics.length > 0)
			data.subjects.push(obj)
	}

	let compiled = pug.renderFile(`${__dirname}/views/welcome.pug`, {'data': JSON.stringify(data)})
	fs.writeFileSync(`${os.tmpdir()}/app/welcome.html`, compiled)
}

module.exports.init = (w) => {
	win = w
}

//-- TODO cross check with the current data in the imports folder as well
//-- removes all unfound subjects and topics
let cleanup = () => {
	console.log('[BOARD] cleaning up subjects.json...');
	let subjects
	try{
		subjects = JSON.parse(fs.readFileSync(`${os.tmpdir()}/data/subjects.json`))
	}catch{
		console.log('[BOARD] subjects.json does not exist, exiting...')
		return
	}

	//--backup
	fs.writeFileSync(`${os.tmpdir()}/data/subjects.json.bakup`, JSON.stringify(subjects))

	//-- first cleaning up topics
	for(let s of subjects){
		let cleaned = []
		for(let t of s.topics){
			let p = `${s.path}/${s.name}/topics/${t.name}/topic.json`
			let l = null
			try {
				l = fs.readFileSync(p)
				cleaned.push(JSON.parse(l))
			} catch (e) {
				console.log(`[BOARD] Couldn't find topic at ${t.name}, cleaning up...`);
			}
		}

		s.topics = cleaned
	}

	//-- then cleaning up subjects without topics
	let subjects_with_topics = []
	for(let s of subjects)
		if(s.topics.length > 0)
			subjects_with_topics.push(s)


	fs.writeFileSync(`${os.tmpdir()}/data/subjects.json`, JSON.stringify(subjects_with_topics))
}

// cleanup()
