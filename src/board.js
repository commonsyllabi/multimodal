'use strict'

const app = require('electron').app
const fs  = require('fs-extra')
const os = require('os')
const path = require('path')
const pug = require('pug')
const { exec } = require('child_process')
const BrowserWindow = require('electron').BrowserWindow

exports = module.exports = {}

//------------
//-- lists all the lessons from subjects.json and
//-- displays them on the board screen
//------------
module.exports.list = () => {
	if(!fs.existsSync(`${app.getPath('userData')}/data/subjects.json`))
		fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, '[]')


	let data = {
		'subjects':[]
	}

	//-- first we get all the subjects
	let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))

	//-- then for each subject we look for all the existing topics
	for(let s of subjects){
		let obj = {
			'subject':s,
			'topics': []
		}

		for(let t of s.topics){
			let path = `${app.getPath('userData')}/app/imports/${s.name}/topics/${t.name}/topic.json`
			let topic = null
			try {
				topic = JSON.parse(fs.readFileSync(path))
			} catch (e) {
				console.log(`[BOARD] Couldn't find topic at ${t.name}`);
			}

			if(topic != null)
				obj.topics.push(topic)
		}

		//-- even if a subject has no topics, we still display it (@pat)
		data.subjects.push(obj)
	}

	//-- we finish by generating a new board.html
	let compiled = pug.renderFile(__dirname+'/views/board.pug', {'data': JSON.stringify(data)})
	fs.writeFileSync(`${app.getPath('userData')}/app/board.html`, compiled)
}

//------------
//-- removes any reference to a topic
//-- which doesn't have its own imports/ folder or .json description
//-- cross check with the current data in the imports folder
//-- removes all unfound subjects and topics
//------------
let cleanup = () => {
	console.log('[BOARD] cleaning up ghost topics...');
	let subjects
	try{
		subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
	}catch{
		console.log('[BOARD] subjects.json does not exist, exiting...')
		return
	}

	//-- backup
	console.log('[BOARD] backing up subjects.json...');
	fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json.bakup${Math.floor(Math.random()*1000)}`, JSON.stringify(subjects))

	let new_subjects = []
	for(let s of subjects){
		let new_topics = []

		//-- first cleaning up topics
		try {
			let current_topics = fs.readdirSync(`${app.getPath('userData')}/app/imports/${s.name}/topics`)

			let external_topic_ids = [] //-- we get all the ids of the current topics
			for (let current_topic of current_topics)
				external_topic_ids.push(JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${s.name}/topics/${current_topic}/topic.json`)).id)

			//-- now we cross-check
			for(let t of s.topics)
				for(let topic_id of external_topic_ids)
					if(topic_id == t.id)
						new_topics.push(t)

			s.topics = new_topics
			console.log(`[BOARD] found ${new_topics.length}/${s.topics.length} topics for ${s.name}...`);

			new_subjects.push(s)
		} catch (e) {
			console.log(`[BOARD] couldn't find subject ${s.name}, skipping...`);
		}
	}

	console.log(`[BOARD] cleaned up ${new_subjects.length} subjects, writing to file...`);
	fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(new_subjects))
	console.log(`[BOARD] ...done.`);
}
