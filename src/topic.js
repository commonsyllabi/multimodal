const fs = require('fs')
const pug = require('pug')
const path = require('path')
const utils = require('./utils.js')

class Topic {

  constructor(data){
    this.subject = data.subject
    this.name = data.name ? data.name : "new-topic"
    this.id = generateId(this.name)
    this.created = new Date()
    this.updated = null
    this.concepts = data.concepts ? data.concepts : [{
      name: "new concept",
      context: "",
      pages: [
        {
          name: "new page",
          tag: "",
          preps: [{
            "tag": "",
            "text": "type here",
            "type": "txt"
          }],
          notes: [],
          writeups: ""
        }
      ]
    }]

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

  static save(data){
    //TODO check for name change!
    data.updated = new Date()

    return new Promise((resolve, reject) => {

      console.log(`[TOPIC] checking for existing topic...`);
      let subjects = JSON.parse(fs.readFileSync(`${__dirname}/data/subjects.json`))
      let foundTopic = false
      let foundSubject = false

      for(let i = 0; i < subjects.length; i++){
        let s = subjects[i]

        if(s.id == data.subject.id){ //we have found the subject of the topic we're trying to

          foundSubject = true
          console.log(`[TOPIC] found subject...`);

          for(let j = 0; j < s.topics.length; j++){
            let t = s.topics[j]
            if(t.id == data.id){
              if(t.name != data.name){ //--this is where I check for the name change
                console.log('[TOPIC] found different name, renaming folder...');
                fs.renameSync(`${t.subject.path}/${t.subject.name}/topics/${t.name}`, `${data.subject.path}/${data.subject.name}/topics/${data.name}`)
              }

              console.log(`[TOPIC] found existing topic...`);
              subjects[i].topics[j] = data
              foundTopic = true
            }
          }

          //-- we add the topic to the end of the array
          if(!foundTopic)
            s.topics.push(data)
        }
      }

      if(!foundSubject)
        reject({
          err: 404,
          info: `subject ${data.subject.id} not found`
        })

      console.log('[MEDIA] checking for media to copy...');
      //-- check for external media assets and copy them in the local folder
      for(let concept of data.concepts){
        for(let page of concept.pages){
          for(let p of page.preps){
            if(p.type == 'img' || p.type == 'vid'){
              let re = (/[^/]*$/gi).exec(p.src)
              p.name = re[0]

              //-- check for existing assets
              let existing = fs.readdirSync(`${data.subject.path}/${data.subject.name}/topics/${data.name}/media`)
              let isReplacing = false
              for(let e of existing)
                if(e == p.name)
                  isReplacing = true

              if(!isReplacing){
                fs.createReadStream(p.src).pipe(fs.createWriteStream(`${data.subject.path}/${data.subject.name}/topics/${data.name}/media/${p.name}`))
                // now we redirect the source to the local folder
                p.src = `${data.subject.path}/${data.subject.name}/topics/${data.name}/media/${p.name}`
                console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
              }
            }
          }
        }
      }

      console.log(`[TOPIC] writing to local file...`);
      fs.writeFileSync(`${__dirname}/data/subjects.json`, JSON.stringify(subjects))

      //-- update the remote file
      console.log(`[TOPIC] Writing to remote file topic.json...`);
      fs.writeFileSync(`${data.subject.path}/${data.subject.name}/topics/${data.name}/topic.json`, JSON.stringify(data))

      resolve(data)
    })
  }

  static remove(topic){
    console.log(`[TOPIC] deleting ${topic.name}...`);
    return new Promise((resolve, reject) => {

      console.log('[TOPIC] first locally');
      let foundTopic = false
      let foundSubject = false
      let subjects = JSON.parse(fs.readFileSync(`${__dirname}/data/subjects.json`))
      for(let i = 0; i < subjects.length; i++){
        if(subjects[i].id == topic.subject.id){
          foundSubject = true
          for(let j = 0; j < subjects[i].topics; j++){
            if(subjects[i].topics[j].id == topic.id){
              foundTopic = true
              console.log('[TOPIC] found the topic to be deleted...');
              subjects[i].topics.splice(j, 1)
              console.log('[TOPIC] deleted from local list...');
            }
          }
        }
      }

      if(!foundSubject)
        reject({
          err: 404,
          info: "could not find the subject"
        })

      if(!foundTopic)
        reject({
          err: 404,
          info: "could not find the topic"
        })

      console.log('[TOPIC] then remotely..');
      try{
        utils.deleteFolderRecursive(`${topic.subject.path}/${topic.subject.name}/topics/${topic.name}/`)
        resolve()
      }catch (e){
        console.log(e);
        reject(e)
      }
    })
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
  let id = `${n.substring(0, Math.max(4, n.length))}-`
  for(let i = 0; i < 10; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

Topic.prototype.find = (id) => {
  //open the json file
  let subjects = JSON.parse(fs.readFileSync(`${__dirname}/topics/subjects.json`))

  for(let subject of subjects)
    for(let topic of subject.topics)
      if(topic.id == id) //if the id matches
        return true //return the lesson

  return false
}

module.exports = Topic
