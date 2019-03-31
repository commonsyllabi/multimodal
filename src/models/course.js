const fs = require('fs')
const utils = require('../utils.js')

class Course {
  constructor(data){
    this.id = generateId(data.name)
    this.name = data.name.trim()
    this.path = data.path
    this.date = new Date()
    this.lessons = []

    this.init()
  }

  init(){
    //add to the internal data
    let courses = JSON.parse(fs.readFileSync(`${__dirname}/../lessons/courses.json`))
    let data = this.toJSON()
    courses.push(data)
  	fs.writeFileSync(`${__dirname}/../lessons/courses.json`, JSON.stringify(courses))

    //create empty folders for HTML exports
  	utils.touchDirectory(`${this.path}/${this.name}/`)
    utils.touchDirectory(`${this.path}/${this.name}/lessons`)

    //write the course file
    fs.writeFileSync(`${this.path}/${this.name}/${this.name}.json`, JSON.stringify(data))
  }

  delete(){

  }

  export(type, path){

    if(type == 'web'){
      //copy over the style.css
      utils.touchDirectory(`${path}/${this.name}-web/`)
      fs.createReadStream(__dirname+'/../lessons/style.css').pipe(fs.createWriteStream(`${path}/style.css`))
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
      "date": this.date,
      "lessons": this.lessons
    }
  }
}

Course.prototype.find = (_id) => {
  //open the json file
  //find the specific course
  //return a Course instance
}

let generateId = (n) => {
  let id = `${n.substring(0, 4)}-`
  for(let i = 0; i < 10; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

module.exports = Course
