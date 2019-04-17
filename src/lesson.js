const fs = require('fs')
const utils = require('./utils.js')

class Lesson {

  constructor(data){
    this.id = generateId(data.name)
    this.course = data.course
    this.name = data.name
    this.created = new Date()
    this.updated = null
    this.concepts = data.concepts

    this.init()
  }

  init(){
    //-- create the appropriate folders
    utils.touchDirectory(`${this.course.path}/${this.course.name}/${this.name}/media`)
    utils.touchDirectory(`${this.course.path}/${this.course.name}/${this.name}/other`)

    //-- find the appropriate course and update it locally
    let local_courses = JSON.parse(fs.readFileSync(`${__dirname}/lessons/courses.json`))
    for(let c of local_courses)
      if(c.id == this.course.id)
        c.lessons.push(this.toJSON())
    fs.writeFileSync(`${__dirname}/lessons/courses.json`, JSON.stringify(local_courses))

    //-- as well as remotely
    let remote_course = JSON.parse(fs.readFileSync(`${this.course.path}/${this.course.name}/${this.course.name}.json`))
    remote_course.lessons.push(this.toJSON())
    fs.writeFileSync(`${this.course.path}/${this.course.name}/${this.course.name}.json`, JSON.stringify(remote_course))
  }

  save(data){
    //-- update the written content
    this.concepts = data.concepts

    //-- make sure the folders exist
    utils.touchDirectory(`${this.course.path}/${this.course.name}/${this.name}/media`)
    utils.touchDirectory(`${this.course.path}/${this.course.name}/${this.name}/other`)

    //-- check for external media assets and copy them in the local folder
  	for(let concept of data.concepts){
  		for(let p of concept.prep){
  			if(p.type == 'img' || p.type == 'vid'){
  				let re = (/[^/]*$/gi).exec(p.src)
  				p.name = re[0]

  				//-- check for existing assets
  				let existing = fs.readdirSync(`${this.course.path}/${this.course.name}/${this.name}/media`)
  				let isReplacing = false
  				for(let e of existing)
  					if(e == p.name)
  						isReplacing = true

  				if(!isReplacing){
  					fs.createReadStream(p.src).pipe(fs.createWriteStream(`${this.course.path}/${this.course.name}/${this.name}/media/${p.name}`))
  					// now we redirect the source to the local folder
  					p.src = `${this.course.path}/${this.course.name}/${this.name}/media/${p.name}`
  					console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
  				}
  			}
  		}
  	}

    //-- update the remote file
    fs.writeFile(`${this.course.path}/${this.course.name}/${this.name}/${this.name}.json`, JSON.stringify(this.toJSON()), (err) => {
      if(err)
        throw err
    })

    return true
  }

  export(type, path){

  }

  delete(){

  }

  toJSON(){
    return {
      "id": this.id,
      "course": this.course,
      "name": this.name,
      "created": this.created,
      "updated": this.updated,
      "concepts": this.concepts
    }
  }
}

let generateId = (n) => {
  let id = `${n.substring(0, 4)}-`
  for(let i = 0; i < 10; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

Lesson.prototype.find = (id) => {
  //open the json file
  let courses = JSON.parse(fs.readFileSync(`${__dirname}/lessons/courses.json`))

  for(let course of courses)
    for(let lesson of course.lessons)
      if(lesson.id == id) //if the id matches
        return new Lesson(lesson) //return the lesson

  return null
}

module.exports = Lesson
