const fs = require('fs')
const pug = require('pug')
const path = require('path')
const utils = require('./utils.js')

class Lesson {

  constructor(data){
    this.id = generateId(data.name)
    this.course = data.course
    this.name = data.name
    this.created = new Date()
    this.updated = null
    this.concepts = data.concepts
    this.context = data.context

    this.init()
  }

  init(){
    //-- create the appropriate folders
    utils.touchDirectory(`${this.course.path}/${this.course.name}/lessons/${this.name}/media`)
    utils.touchDirectory(`${this.course.path}/${this.course.name}/lessons/${this.name}/other`)

    //-- find the appropriate course and update it locally
    let local_courses = JSON.parse(fs.readFileSync(`${__dirname}/lessons/courses.json`))
    for(let c of local_courses)
      if(c.id == this.course.id) //TODO -> course id doesn't match with the lesson _id
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
    utils.touchDirectory(`${this.course.path}/${this.course.name}/lessons/${this.name}/media`)
    utils.touchDirectory(`${this.course.path}/${this.course.name}/lessons/${this.name}/other`)

    //-- check for external media assets and copy them in the local folder
  	for(let concept of data.concepts){
  		for(let p of concept.prep){
  			if(p.type == 'img' || p.type == 'vid'){
  				let re = (/[^/]*$/gi).exec(p.src)
  				p.name = re[0]

  				//-- check for existing assets
  				let existing = fs.readdirSync(`${this.course.path}/${this.course.name}/lessons/${this.name}/media`)
  				let isReplacing = false
  				for(let e of existing)
  					if(e == p.name)
  						isReplacing = true

  				if(!isReplacing){
  					fs.createReadStream(p.src).pipe(fs.createWriteStream(`${this.course.path}/${this.course.name}/lessons/${this.name}/media/${p.name}`))
  					// now we redirect the source to the local folder
  					p.src = `${this.course.path}/${this.course.name}/lessons/${this.name}/media/${p.name}`
  					console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
  				}
  			}
  		}
  	}

    //-- update the remote file
    fs.writeFile(`${this.course.path}/${this.course.name}/lessons/${this.name}/${this.name}.json`, JSON.stringify(this.toJSON()), (err) => {
      if(err)
        throw err
    })

    return true
  }

  static export(_info, _type, _path = undefined, resolve, reject){

    let lesson = JSON.parse(fs.readFileSync(`${_info.path}/${_info.course}/lessons/${_info.name}/${_info.name}.json`))

    if(_type == 'html'){
      let compiled = pug.renderFile(__dirname+'/views/export.pug', lesson)

      // we copy all the existing assets from the multimodal to the html exports
      let media_path = `${lesson.course.path}/${lesson.course.name}/lessons/${lesson.name}/media/`

      fs.readdirSync(media_path).forEach((file) => {
        if(file != '.DS_Store')
          fs.createReadStream(path.join(media_path, file)).pipe(fs.createWriteStream(path.join(`${lesson.course.path}/${lesson.course.name}/exports/assets/`, file)))
      })

      // generating the HTML
      fs.writeFileSync(`${lesson.course.path}/${lesson.course.name}/exports/${lesson.name}.html`, compiled)
      console.log(`[EXPORTED] ${lesson.course.path}/exports/${lesson.name}.html`)

      //-- rebuild the index with all the already exported lessons
      //-- find the lesson
      let exportedlessons = []
      let local_files = fs.readdirSync(`${lesson.course.path}/${lesson.course.name}/exports`)
      for(let f of local_files)
        if(f != 'index.html' && f.indexOf('.html') > -1)
          exportedlessons.push(f.replace('.html', ''))

      let c = {
        'course': lesson.course.name,
        'lessons': exportedlessons
      }

      //-- render the template
      compiled = pug.renderFile(`${__dirname}/views/export-index.pug`, c)
      fs.writeFileSync(`${lesson.course.path}/${lesson.course.name}/exports/index.html`, compiled)

      console.log('[REBUILT]', 'index.html')

      //-- return the url to open the window
      let url = `${lesson.course.path}/${lesson.course.name}/exports/index.html`
      return new Promise((resolve, reject) => {resolve(url)})
    }
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
        return true //return the lesson

  return false
}

module.exports = Lesson
