'use strict'

const fs  = require('fs');
const pug = require('pug');

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
	let saves = fs.readdirSync(__dirname+'/../lessons/'+lesson.course+'/in-class')
	
	let latest = {'year':0,'month':0, 'day':0, 'hour':0, 'minutes':0, 'save':''}
	for(let save of saves){
		let s = save.replace('.json', '').split('-')

		let year = parseInt(s[1].substring(0, 4))
		if(year >= latest.year){
			latest.year = year
			let month =  parseInt(s[1].substring(4, 6))
			if(month >= latest.month){
				latest.month = month
	
				let day = parseInt(s[1].substring(6, 8))

				if(day >= latest.day){
					latest.day = day

					let hour = parseInt(s[2].substring(0, 2))
					if(hour >= latest.hour){
						latest.hour = hour
						let minutes = parseInt(s[2].substring(2, 4))
						
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

module.exports.export = (lesson) => {
	let file_path = getNewest(lesson)

	let c = JSON.parse(fs.readFileSync(__dirname+'/../lessons/'+lesson.course+'/in-class/'+file_path))
	let target_directory = c.path.local + '/docs/'

	let compiled = pug.renderFile('views/export.pug', c)

	fs.writeFile(target_directory+lesson.title+'.html', compiled, () => {
		console.log('[EXPORTED]', target_directory+lesson.title+'.html')
	})
}
