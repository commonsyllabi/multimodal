const fs = require('fs')
const pug = require('pug')
const path = require('path')
const utils = require('./utils.js')

class Topic {

  constructor(data){
    this.id = generateId(data.name)
    this.subject = data.subject
    this.name = data.name
    this.created = new Date()
    this.updated = null
    this.concepts = data.concepts
    this.context = data.context

    this.init()
  }

  init(){
    //-- create the appropriate folders
    utils.touchDirectory(`${this.subject.path}/${this.subject.name}/topics/${this.name}/media`)
    utils.touchDirectory(`${this.subject.path}/${this.subject.name}/topics/${this.name}/other`)

    //-- find the appropriate course and update it locally
    let subject_list = JSON.parse(fs.readFileSync(`${__dirname}/data/subjects.json`))
    for(let s of subject_list)
      if(s.id == this.subject.id) //TODO -> course id doesn't match with the lesson _id
        s.topics.push(this.toJSON())
    fs.writeFileSync(`${__dirname}/data/subjects.json`, JSON.stringify(subject_list))

    //-- as well as remotely
    let remote_subject = JSON.parse(fs.readFileSync(`${this.subject.path}/${this.subject.name}/subject.json`))
    remote_subject.topics.push(this.toJSON())
    fs.writeFileSync(`${this.subject.path}/${this.subject.name}/subject.json`, JSON.stringify(remote_subject))

    //-- finally write the actual topic file
    fs.writeFileSync(`${this.subject.path}/${this.subject.name}/topics/${this.name}/topic.json`, JSON.stringify(this.toJSON()))
  }

  save(data){
    //-- update the written content
    this.concepts = data.concepts

    //-- make sure the folders exist
    utils.touchDirectory(`${this.subject.path}/${this.subject.name}/topics/${this.name}/media`)
    utils.touchDirectory(`${this.subject.path}/${this.subject.name}/topics/${this.name}/other`)

    //-- check for external media assets and copy them in the local folder
  	for(let concept of data.concepts){
  		for(let p of concept.prep){
  			if(p.type == 'img' || p.type == 'vid'){
  				let re = (/[^/]*$/gi).exec(p.src)
  				p.name = re[0]

  				//-- check for existing assets
  				let existing = fs.readdirSync(`${this.subject.path}/${this.subject.name}/topics/${this.name}/media`)
  				let isReplacing = false
  				for(let e of existing)
  					if(e == p.name)
  						isReplacing = true

  				if(!isReplacing){
  					fs.createReadStream(p.src).pipe(fs.createWriteStream(`${this.subject.path}/${this.subject.name}/topics/${this.name}/media/${p.name}`))
  					// now we redirect the source to the local folder
  					p.src = `${this.subject.path}/${this.subject.name}/topics/${this.name}/media/${p.name}`
  					console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
  				}
  			}
  		}
  	}

    //-- update the remote file
    fs.writeFile(`${this.subject.path}/${this.subject.name}/topics/${this.name}/topic.json`, JSON.stringify(this.toJSON()), (err) => {
      if(err)
        throw err
    })

    return true
  }

  static export(_info, _type, _path = undefined, resolve, reject){

    let topic = JSON.parse(fs.readFileSync(`${_info.path}/${_info.subject}/topics/${_info.name}/topic.json`))

    if(_type == 'html'){
      let compiled = pug.renderFile(__dirname+'/views/export.pug', topic)

      // we copy all the existing assets from the multimodal to the html exports
      let media_path = `${topic.subject.path}/${topic.subject.name}/topics/${topic.name}/media/`

      fs.readdirSync(media_path).forEach((file) => {
        if(file != '.DS_Store')
          fs.createReadStream(path.join(media_path, file)).pipe(fs.createWriteStream(path.join(`${topic.subject.path}/${topic.subject.name}/exports/assets/`, file)))
      })

      // generating the HTML
      fs.writeFileSync(`${topic.subject.path}/${topic.subject.name}/exports/${topic.name}.html`, compiled)
      console.log(`[EXPORTED] ${topic.subject.path}/exports/${topic.name}.html`)

      //-- rebuild the index with all the already exported topics
      //-- find the topic
      let exportedtopics = []
      let local_files = fs.readdirSync(`${topic.subject.path}/${topic.subject.name}/exports`)
      for(let f of local_files)
        if(f != 'index.html' && f.indexOf('.html') > -1)
          exportedtopics.push(f.replace('.html', ''))

      let c = {
        'subject': topic.subject.name,
        'topics': exportedtopics
      }

      //-- render the template
      compiled = pug.renderFile(`${__dirname}/views/export-index.pug`, c)
      fs.writeFileSync(`${topic.subject.path}/${topic.subject.name}/exports/index.html`, compiled)

      console.log('[REBUILT]', 'index.html')

      //-- return the url to open the window
      let url = `${topic.subject.path}/${topic.subject.name}/exports/index.html`
      return new Promise((resolve, reject) => {resolve(url)})
    }
  }

  delete(){

  }

  toJSON(){
    return {
      "id": this.id,
      "subject": this.subject,
      "name": this.name,
      "created": this.created,
      "updated": this.updated,
      "concepts": this.concepts,
      "context": this.context
    }
  }
}

let generateId = (n) => {
  let id = `${n.substring(0, 4)}-`
  for(let i = 0; i < 10; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

Topic.prototype.find = (id) => {
  //open the json file
  let courses = JSON.parse(fs.readFileSync(`${__dirname}/topics/subjects.json`))

  for(let course of courses)
    for(let lesson of course.lessons)
      if(lesson.id == id) //if the id matches
        return true //return the lesson

  return false
}

module.exports = Topic
