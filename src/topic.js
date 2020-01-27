'use strict'

const app = require('electron').app
const fs = require('fs-extra')
const os = require('os')
const pug = require('pug')
const path = require('path')
const pdf = require('html-pdf')
const utils = require('./utils.js')
const file_mgmt = require('./file-mgmt.js')

class Topic {

  constructor(data){
    this.id = data.id != undefined ? data.id : generateId()
    console.log(data.subject);
    this.subject = {
      name: data.subject.name,
      id: data.subject.id,
      path: data.subject.path
    },
    this.name = data.name ? data.name : "new-topic"
    this.created = new Date()
    this.updated = null
    this.overview = data.overview != undefined ? data.overview : {text:""}
    this.concepts = data.concepts ? data.concepts : [{
      name: "new concept",
      context: {"text":"", "links": []},
      pages: [
        {
          name: "new page",
          tag: "",
          preps: [{
            "tag": "",
            "text": "",
            "type": "txt"
          }],
          notes: [],
          writeup: {"text":""}
        }
      ]
    }]

    this.init()
  }

  init(){
    //-- create the appropriate folders
    //-- now we only create folders in the local imports directory. they get compressed afterwards
    utils.touchDirectory(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/media`)
    utils.touchDirectory(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/other`)

    //-- find the appropriate course and update it locally
    let subject_list = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
    for(let s of subject_list)
      if(s.id == this.subject.id) //TODO -> course id doesn't match with the lesson _id
        s.topics.push(this.toJSON())
    fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subject_list))

    //-- as well as in the imports folder
    let remote_subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/subject.json`))
    remote_subject.topics.push(this.toJSON())
    fs.writeFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/subject.json`, JSON.stringify(remote_subject))

    //-- finally write the actual topic file
    fs.writeFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/topic.json`, JSON.stringify(this.toJSON()))

    file_mgmt.compress(this.subject.name, this.subject.path)
  }

  static save(data){
    data.updated = new Date()

    return new Promise((resolve, reject) => {

      console.log(`[TOPIC] checking for existing topic...`);
      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
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
                fs.renameSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/topics/${t.name}`, `${app.getPath('userData')}/app/imports/${data.subject.name}/topics/${data.name}`)

                //-- also rename the field in subject.json
                t.name = data.name
                fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

                //-- find the subject.json of the subject and update the name
                let subj = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/subject.json`));
                for(let top of subj.topics)
                  if(top.id == data.id)
                    top.name = data.name
                fs.writeFileSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/subject.json`, JSON.stringify(subj));

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

              // //-- check for existing assets
              // let existing = fs.readdirSync(`${__dirname}/app/imports/${data.subject.name}/topics/${data.name}/media`)
              // let isReplacing = false
              // for(let e of existing)
              //   if(e == p.name)
              //     isReplacing = true

              //-- here we check that we're not copying from an image that is already copied
              if(p.src.indexOf('/app/imports') == -1){
                fs.createReadStream(p.src).pipe(fs.createWriteStream(`${app.getPath('userData')}/app/imports/${data.subject.name}/topics/${data.name}/media/${p.name}`))
                // now we redirect the source to the local folder
                p.src = `${app.getPath('userData')}/app/imports/${data.subject.name}/topics/${data.name}/media/${p.name}`
                console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
              }
            }
          }
        }
      }

      console.log(`[TOPIC] writing to local subject.json...`);
      fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

      //-- update the remote file
      console.log(`[TOPIC] Writing to local topic.json...`);
      fs.writeFileSync(`${app.getPath('userData')}/app/imports/${data.subject.name}/topics/${data.name}/topic.json`, JSON.stringify(data))

      file_mgmt.compress(data.subject.name, data.subject.path)

      resolve(data)
    })
  }

  static remove(topic){
    console.log(`[TOPIC] deleting ${topic.name}...`);
    return new Promise((resolve, reject) => {

      console.log(`[TOPIC] first from: ${app.getPath('userData')}/data/subjects.json`);

      let foundTopic = false, foundSubject = false

      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
      for(let i = 0; i < subjects.length; i++){
        if(subjects[i].id == topic.subject.id){
          foundSubject = true
          for(let j = 0; j < subjects[i].topics.length; j++){
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

      //-- we have updated the subjects.json, now we write it to file again
      fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

      console.log(`[TOPIC] then remotely from: ${app.getPath('userData')}/app/imports/${topic.subject.name}/topics/${topic.name}/...`);
      try{
        utils.deleteFolderRecursive(`${app.getPath('userData')}/app/imports/${topic.subject.name}/topics/${topic.name}/`)
        resolve()
      }catch (e){
        console.log(e);
        reject(e)
      }
    })
  }



  static export(_data, _type, _path){
    console.log(`[TOPIC] exporting - ${_data.name} - ${_type}`);
    let topics_to_export = []
    return new Promise((resolve, reject) => {

      if(_data.name){ //-- we are exporting one specific topic
        let c = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/topics/${_data.name}/topic.json`))
        topics_to_export.push(c)
      }else{ //-- we are exporting all of them
        let s = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/subject.json`))

        for(let t of s.topics){
          let c = null
          try{
            c = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/topics/${t.name}/topic.json`))
          }catch(e){
            console.log(`[SUBJECT] couldn't open ${t.name} for export`);
          }

          if(c != null)
            topics_to_export.push(c)
        }

        console.log(`[SUBJECT] found ${topics_to_export.length} topics to export`);
      }

      if(_type == 'html'){
        //copy all assets over to new folder
        utils.touchDirectory(`${_path}/${_data.topic}_assets/`)

        for(let topic of topics_to_export){
          for(let concept of topic.concepts)
            for(let page of concept.pages)
              for(let prep of page.preps)
                if(prep.type == 'img' || prep.type == 'vid')
                  fs.createReadStream(`${prep.src}`).pipe(fs.createWriteStream(`${_path}/${topic.subject.name}_assets/${prep.name}`))

          let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)
          fs.writeFileSync(`${_path}/${topic.name}.html`, render)
        }

        let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/subject.json`))
        subject.topics = topics_to_export
        let index = pug.renderFile(`${__dirname}/views/export-index.pug`, subject)
        fs.writeFileSync(`${path}/index.html`, index)
        resolve()
      }else if(_type == 'pdf'){
        let counter = 0 //-- to keep track of how many renders we've finished

        //-- first copy all the media assets and html to a temp folder
        utils.touchDirectory(`${app.getPath('userData')}/app/imports/temp/${_data.subject}_assets/`)
        for(let topic of topics_to_export){
          for(let concept of topic.concepts)
            for(let page of concept.pages)
              for(let prep of page.preps)
                if(prep.type == 'img' || prep.type == 'vid')
                  fs.createReadStream(`${prep.src}`).pipe(fs.createWriteStream(`${app.getPath('userData')}/app/imports/temp/${topic.subject.name}_assets/${prep.name}`))

          //-- create the html stream
          let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)

	  //TODO
	  //-- write the html file instead of passing a stream to createPDF
	  //
	  //--TODO DELETE ALL TEMP FILES AFTER EXPORT

          //-- generate the pdf
          let options = {
            border: {
              top: "0.2in",
              right: "0.125in",
              bottom: "0.2in",
              left: "0.125in"
            },
            format: 'A4',
	          base: 'file://'+path.resolve('.')+'/'
          }

          pdf.create(render, options).toFile(`${path}/${topic.name}.pdf`, (err, res) => {
            if(err){
              console.log(err);
              utils.deleteFolderRecursive(`${__dirname}/app/imports/temp/`)
              reject(err)
            }else{
              if(++counter == topics_to_export.length){
                utils.deleteFolderRecursive(`${__dirname}/app/imports/temp/`)
                resolve()
              }
            }
          })
        }

      }else{
        console.log('[SUBJECT] got wrong type');
        reject()
      }
    })
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
      "context": this.context,
      "overview": this.overview
    }
  }
}

let generateId = (n) => {
  let id = ''
  for(let i = 0; i < 15; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

module.exports = Topic
