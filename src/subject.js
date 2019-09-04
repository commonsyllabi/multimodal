const fs = require('fs')
const path = require('path')
const utils = require('./utils.js')

class Subject {
  constructor(data){
    this.id = generateId(data.name)
    this.name = data.name.trim()
    this.path = data.path
    this.description = data.description
    this.created = new Date()
    this.updated = null
    this.topics = []

    this.init()
  }

  init(){
    //add to the internal data
    let subjects = JSON.parse(fs.readFileSync(`${__dirname}/data/subjects.json`))
    let data = this.toJSON()
    subjects.push(data)
  	fs.writeFileSync(`${__dirname}/data/subjects.json`, JSON.stringify(subjects))

    //create subject folder
  	utils.touchDirectory(`${this.path}/${this.name}/topics`)
    utils.touchDirectory(`${this.path}/${this.name}/exports`)
    utils.touchDirectory(`${this.path}/${this.name}/exports/assets`)
    fs.createReadStream(`${__dirname}/data/style.css`).pipe(fs.createWriteStream(`${this.path}/${this.name}/exports/style.css`))

    //write the course file
    fs.writeFileSync(`${this.path}/${this.name}/subject.json`, JSON.stringify(data))
  }

  delete(){

  }

  export(type, path){

    if(type == 'web'){
      //copy over the style.css
      utils.touchDirectory(`${path}/${this.name}-web/`)
      fs.createReadStream(`${__dirname}/data/style.css`).pipe(fs.createWriteStream(`${path}/style.css`))
    }else if(type == 'pdf'){

    }else{
      console.log('error');
    }
  }

  toJSON(){
    return {
      "id": this.id,
      "name": this.name,
      "path": this.path,
      'description': this.description,
      "created": this.created,
      "topics": this.topics
    }
  }
}

let generateId = (n) => {
  let id = `${n.substring(0, Math.max(4, n.length))}-`
  for(let i = 0; i < 10; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

module.exports = Subject
