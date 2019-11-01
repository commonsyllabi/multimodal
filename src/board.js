'use strict'

const app = require('electron').app
const fs  = require('fs-extra')
const os = require('os')
const path = require('path')
const pug = require('pug')
const { exec } = require('child_process')
const BrowserWindow = require('electron').BrowserWindow

let win

exports = module.exports = {}

// lists all the lessons from subjects.json and displays them on the board screen
module.exports.list = () => {
	if(!fs.existsSync(`${app.getPath('userData')}/data/subjects.json`))
		fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, '[]')


	let data = {
		'subjects':[]
	}

	//first we get all the subjects
	let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))

	//then for each course we look for all the related lessons
	for(let s of subjects){
		let obj = {
			'subject':s,
			'topics': []
		}

		for(let t of s.topics){
			let p = `${app.getPath('userData')}/app/imports/${s.name}/topics/${t.name}/topic.json`
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

	let compiled = pug.renderFile(__dirname+'/views/board.pug', {'data': JSON.stringify(data)})
	fs.writeFileSync(`${app.getPath('userData')}/app/board.html`, compiled)
}

module.exports.init = (w) => {
	win = w
}

//-- cross check with the current data in the imports folder as well
//-- removes all unfound subjects and topics
let cleanup = () => {
	console.log('[BOARD] cleaning up subjects.json...');
	let subjects
	try{
		subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
	}catch{
		console.log('[BOARD] subjects.json does not exist, exiting...')
		return
	}

	//--backup
	console.log('[BOARD] backing up subjects.json...');
	fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json.bakup${Math.floor(Math.random()*1000)}`, JSON.stringify(subjects))

	let subjects_with_topics = []
	//-- first cleaning up topics
	for(let s of subjects){
		let cleaned = []

		try {
			let current_topics = fs.readdirSync(`${app.getPath('userData')}/app/imports/${s.name}/topics`)

			let topic_ids = [] //-- we get all the ids of the current topics
			for (let current_topic of current_topics)
				topic_ids.push(JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${s.name}/topics/${current_topic}/topic.json`)).id)

			//-- now we cross-check
			for(let t of s.topics)
				for(let topic_id of topic_ids)
					if(topic_id == t.id)
						cleaned.push(t)

			s.topics = cleaned
			console.log(`[BOARD] found ${cleaned.length}/${s.topics.length} topics for ${s.name}...`);

			subjects_with_topics.push(s)
		} catch (e) {
			console.log(`[BOARD] couldn't find subject ${s.name}, skipping...`);
		}
	}

	console.log(`[BOARD] found ${subjects_with_topics.length} subjects with topics, writing to file...`);
	fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects_with_topics))
	console.log(`[BOARD] ...done.`);
}

// cleanup()
