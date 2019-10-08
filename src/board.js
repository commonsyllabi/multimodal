'use strict'

const fs  = require('fs')
const path = require('path')
const pug = require('pug')
const { exec } = require('child_process')
const BrowserWindow = require('electron').BrowserWindow
const PUSH_TO_GITHUB = false

let win

exports = module.exports = {}

// lists all the lessons from subjects.json and displays them on the welcome screen
module.exports.list = () => {
	if(!fs.existsSync(`${__dirname}/data/subjects.json`))
		fs.writeFileSync(`${__dirname}/data/subjects.json`, '[]')

	let data = {
		'subjects':[]
	}

	//first we get all the subjects
	let subjects = JSON.parse(fs.readFileSync(__dirname+'/data/subjects.json'))

	//then for each course we look for all the related lessons
	for(let s of subjects){
		let obj = {
			'subject':s,
			'topics': []
		}

		for(let t of s.topics){
			let p = `${__dirname}/app/imports/${s.name}/topics/${t.name}/topic.json`
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

	let compiled = pug.renderFile(__dirname+'/views/welcome.pug', {'data': JSON.stringify(data)})
	fs.writeFileSync(__dirname+'/app/welcome.html', compiled)
}

module.exports.init = (w) => {
	win = w
}

//-- cross check with the current data in the imports folder as well
//-- removes all unfound subjects and topics
let cleanup = () => {
	console.log('[BOARD] cleaning up subjects.json...');
	let subjects = JSON.parse(fs.readFileSync(__dirname+'/data/subjects.json'))

	//--backup
	fs.writeFileSync(`${__dirname}/data/subjects.json.bakup${Math.floor(Math.random()*1000)}`, JSON.stringify(subjects))

	//-- first cleaning up topics
	for(let s of subjects){
		let cleaned = []
		let current_topics = fs.readdirSync(`${__dirname}/app/imports/${s.name}/topics`)

		let topic_ids = [] //-- we get all the ids of the current topics
		for (let current_topic of current_topics)
			topic_ids.push(JSON.parse(fs.readFileSync(`${__dirname}/app/imports/${s.name}/topics/${current_topic}/topic.json`)).id)

		//-- now we cross-check
		for(let t of s.topics)
			for(let topic_id of topic_ids)
				if(topic_id == t.id)
					cleaned.push(t)


		s.topics = cleaned
	}

	//-- then cleaning up subjects without topics
	let subjects_with_topics = []
	for(let s of subjects)
		if(s.topics.length > 0)
			subjects_with_topics.push(s)


	fs.writeFileSync(__dirname+'/data/subjects.json', JSON.stringify(subjects_with_topics))
}

// cleanup()
