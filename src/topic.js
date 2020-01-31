'use strict'

const app = require('electron').app
const fs = require('fs-extra')
const os = require('os')
const pug = require('pug')
const path = require('path')
const pdf = require('html-pdf')
const utils = require('./utils.js')
const file_mgmt = require('./file-mgmt.js')

//------------
//-- initiates the topic
//-- either from an existing subject
//-- or as the first topic of a new subject
//-- checks for an ID so a not to always create new ones
//------------
class Topic {
  constructor(_data){
    this.id = _data.id ? _data.id : generateId()

    //-- this prevents us from recursively integrating
    //-- all the topics within the subject
    this.subject = {
      name: _data.subject.name,
      id: _data.subject.id,
      path: _data.subject.path
    },

    //-- if there are no concepts or no overview, we create new ones
    this.name = _data.name ? _data.name : "new-topic"
    this.overview = _data.overview ? _data.overview : {text:""}
    this.concepts = _data.concepts ? _data.concepts : [{
      name: "new concept",
      context: {"text":"", "links": []},
      pages: [
        {
          name: "new page",
          tag: "",
          preps: [{
            "tag": "",
            "text": "",
            "type": "md"
          }],
          notes: [],
          writeup: {"text":""}
        },
    		{
    			name: "scrapboard",
    			context: {text: ""},
    			pages: [{
    				name: "first",
    				preps: [{
              "tag": "",
              "text": "",
              "type": "md"
            }],
    				notes: [],
    				writeup: {text: ""}
    			}]
    		}]
    }]

    this.created = new Date()
    this.updated = null

    this.init()
  }

  init(){
    //-- create the media/ and other/ folders
    utils.touchDirectory(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/media`)
    utils.touchDirectory(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/other`)

    //-- update the corresponding subject in the subjects.json list
    let subject_list = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
    for(let s of subject_list)
      if(s.id == this.subject.id)
        s.topics.push(this.toJSON())
    fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subject_list))

    //-- update subject.json description in the imports/ folder as well
    let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/subject.json`))
    subject.topics.push(this.toJSON())
    fs.writeFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/subject.json`, JSON.stringify(subject))

    //-- finally write the actual topic file
    fs.writeFileSync(`${app.getPath('userData')}/app/imports/${this.subject.name}/topics/${this.name}/topic.json`, JSON.stringify(this.toJSON()))

    file_mgmt.compress(this.subject.name, this.subject.path)
  }

  //------------
  //-- returns a JSON version of the current instance
  //------------
  toJSON(){
    return {
      "id": this.id,
      "subject": this.subject,
      "name": this.name,
      "overview": this.overview,
      "concepts": this.concepts,
      "created": this.created,
      "updated": this.updated
    }
  }

  //------------
  //-- saves a topic during a session
  //-- given all of the session data
  //------------
  static save(_data){
    _data.updated = new Date()

    return new Promise((resolve, reject) => {

      //-- is it an existing topic, or are we saving a new one?
      //-- we check if the topic and subject do exist
      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
      let foundTopic = false
      let foundSubject = false

      for(let i = 0; i < subjects.length; i++){
        let s = subjects[i]

        //-- we have found the parent subject of the topic we're trying to save
        if(s.id == _data.subject.id){
          foundSubject = true

          for(let j = 0; j < s.topics.length; j++){
            let t = s.topics[j]
            if(t.id == _data.id){

              //-- if the name of the topic has changed
              //-- we need to rename the folders and subjects.json
              if(t.name != _data.name){
                console.log(`[TOPIC] found a topic, and updating the name to ${_data.name}...`);
                fs.copySync(`${app.getPath('userData')}/app/imports/${t.subject.name}/topics/${t.name}`, `${app.getPath('userData')}/app/imports/${_data.subject.name}/topics/${_data.name}`)
                fs.removeSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/topics/${t.name}`)

                t.name = _data.name
                fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

                //-- find the subject.json description of the subject and update the name as well
                let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/subject.json`));
                for(let topic of subject.topics)
                  if(topic.id == _data.id)
                    topic.name = _data.name
                fs.writeFileSync(`${app.getPath('userData')}/app/imports/${t.subject.name}/subject.json`, JSON.stringify(subject));
              }

              //-- we insert the topic (updating)
              subjects[i].topics[j] = _data
              foundTopic = true
            }
          }

          //-- this means we just created a new topic
          //-- we add it to the end of the array
          if(!foundTopic)
            s.topics.push(_data)
        }
      }

      if(!foundSubject)
        reject({
          err: 404,
          info: `[TOPIC] parent subject ${_data.subject.name} (${_data.subject.id}) not found`
        })

      //-- check for external media assets and copy them in the local folder
      for(let concept of _data.concepts){
        for(let page of concept.pages){
          for(let p of page.preps){
            if(p.type == 'img' || p.type == 'vid'){
              let re = (/[^/]*$/gi).exec(p.src)
              p.name = re[0]

              //-- here we check that we're not copying from an image that is already copied
              if(p.src.indexOf('/app/imports') == -1){
                fs.copySync(p.src, `${app.getPath('userData')}/app/imports/${_data.subject.name}/topics/${_data.name}/media/${p.name}`)
                // now we update the source of each of these assets to point the local folder
                p.src = `${app.getPath('userData')}/app/imports/${_data.subject.name}/topics/${_data.name}/media/${p.name}`
                console.log(`[MEDIA] copied ${p.name} to ${p.src}`)
              }
            }
          }
        }
      }

      //-- update the subjects.json list
      fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

      //-- update the imports/topic.json description file
      fs.writeFileSync(`${app.getPath('userData')}/app/imports/${_data.subject.name}/topics/${_data.name}/topic.json`, JSON.stringify(_data))

      file_mgmt.compress(_data.subject.name, _data.subject.path)

      resolve(_data)
    })
  }

  //------------
  //-- removes a topic, given data with
  //-- name, id, subject name, subject id
  //------------
  static remove(_topic){
    console.log(`[TOPIC] removing ${_topic.name}...`)

    return new Promise((resolve, reject) => {

      //-- removing reference from the subjects.json list
      //-- by checking ids of both topic and subject
      let foundTopic = false, foundSubject = false
      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
      for(let i = 0; i < subjects.length; i++){
        if(subjects[i].id == _topic.subject.id){
          foundSubject = true
          for(let j = 0; j < subjects[i].topics.length; j++){
            if(subjects[i].topics[j].id == _topic.id){
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
          info: "[TOPIC] could not find the subject"
        })

      if(!foundTopic)
        reject({
          err: 404,
          info: "[TOPIC] could not find the topic"
        })

      //-- we have updated the subjects.json list
      //-- now we write it to disk again
      fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

      //-- and deleting the reference in imports/subject.json
      let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_topic.subject.name}/subject.json`))
      for(let i = 0; i < subject.topics.length; i++)
        if(subject.topics[i].id == _topic.id)
          subject.topics.splice(i, 1)
      fs.writeFileSync(`${app.getPath('userData')}/app/imports/${_topic.subject.name}/subject.json`, JSON.stringify(subject))

      //-- and the associated folders
      try{
        utils.deleteFolderRecursive(`${app.getPath('userData')}/app/imports/${_topic.subject.name}/topics/${_topic.name}/`)
        resolve()
      }catch (e){
        console.log(e);
        reject(e)
      }
    })
  }

  //------------
  //-- exports a topic, given data with
  //-- name, subject name, type and path
  //------------
  static export(_data, _type, _path){
    console.log(`[TOPIC] exporting - ${_data.name} - ${_type}`)

    return new Promise((resolve, reject) => {
      let topic = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/topics/${_data.name}/topic.json`))

      if(topic == null)
        reject()

      if(_type == 'html'){
        //-- making sure the assets directory exists
        utils.touchDirectory(`${_path}/${_data.topic}_assets/`)

        //-- copy all images, videos and file assets over to new folder
        for(let concept of topic.concepts)
          for(let page of concept.pages)
            for(let prep of page.preps)
              if(prep.type == 'img' || prep.type == 'vid' || prep.type == 'file')
                fs.copySync(`${prep.src}`, `${_path}/${topic.subject.name}_assets/${prep.name}`)

        //-- render and write an HTML file
        let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)
        fs.writeFileSync(`${_path}/${topic.name}.html`, render)

        //-- rebuild the index
        let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/subject.json`))
        let index = pug.renderFile(`${__dirname}/views/export-index.pug`, subject)
        fs.writeFileSync(`${_path}/index.html`, index)

        resolve()

      }else if(_type == 'pdf'){
        //-- first copy all the media assets and html to a temp folder
        utils.touchDirectory(`${app.getPath('userData')}/app/imports/temp/${_data.subject}_assets/`)
        for(let concept of topic.concepts)
          for(let page of concept.pages)
            for(let prep of page.preps)
              if(prep.type == 'img' || prep.type == 'vid' || prep.type == 'file')
                fs.copySync(`${prep.src}`, `${app.getPath('userData')}/app/imports/temp/${topic.subject.name}_assets/${prep.name}`)

        //-- create the html stream
        //-- TODO write the html file instead of passing a stream to createPDF
        let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)
        fs.writeFileSync(`${app.getPath('userData')}/app/imports/temp/render.html`, render)
        let writtenFile = fs.readFileSync(`${app.getPath('userData')}/app/imports/temp/render.html`, 'utf8')

        //-- generate the pdf
        let options = {
          border: {
            top: "0.2in",
            right: "0.125in",
            bottom: "0.2in",
            left: "0.125in"
          },
          format: 'A4',
          base: `file://${app.getPath('userData')}/app/imports/temp/`
        }

        pdf.create(writtenFile, options).toFile(`${_path}/${topic.name}.pdf`, (err, res) => {
          if(err){
            console.log(err);
            utils.deleteFolderRecursive(`${__dirname}/app/imports/temp/`)
            reject(err)
          }else{
            utils.deleteFolderRecursive(`${__dirname}/app/imports/temp/`)
            resolve()
          }
        })

      }else{
        console.log('[TOPIC] got wrong type');
        reject()
      }
    })
  }
}

//------------
//-- generates a 15 digit long id string
//------------
let generateId = (n) => {
  let id = ''
  for(let i = 0; i < 15; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

module.exports = Topic
