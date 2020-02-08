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
//-- initiates the subject
//-- checks for an ID so a not to always create new ones
//------------
class Subject {
  constructor(_data){
    this.id = _data.id ? _data.id : generateId()
    this.name = _data.name.trim()
    this.path = _data.path
    this.description = _data.description
    this.created = new Date()
    this.updated = null
    this.topics = []

    this.init()
  }

  //------------
  //-- updates the subjects.json array
  //-- and creates the topics/ folder
  //-- as well as the subject.json description file
  //------------
  init(){
    //add to the internal data
    let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
    let data = this.toJSON()
    subjects.push(data)
  	fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

    //create subject folder locally
    utils.touchDirectory(`${app.getPath('userData')}/app/imports/${this.name}/topics`)

    //write the subject file locally
    fs.writeFileSync(`${app.getPath('userData')}/app/imports/${this.name}/subject.json`, JSON.stringify(data))
  }

  //------------
  //-- returns a JSON version of the current instance
  //------------
  toJSON(){
    return {
      "id": this.id,
      "name": this.name,
      "path": this.path,
      'description': this.description,
      "created": this.created,
      "updated": this.updated,
      "topics": this.topics
    }
  }

  //------------
  //-- saves changes on a subject given
  //-- a full board object
  //------------
  static save(_subject){
    console.log(`[SUBJECT] saving changes to ${_subject.name}...`);
    return new Promise((resolve, reject) => {

      //-- first we update the main subjects.json list
      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))

      let foundSubject = false
      for(let s of subjects){
        if(s.id == _subject.id){
          foundSubject = true

          if(s.name != _subject.name){
            //-- now we need to rename the folders
            console.log(`[SUBJECT] found a subject, and updating the name to ${_subject.name}...`);
            fs.ensureDirSync(`${app.getPath('userData')}/app/imports/${_subject.name}`)
            fs.copySync(`${app.getPath('userData')}/app/imports/${s.name}`, `${app.getPath('userData')}/app/imports/${_subject.name}`)
            fs.removeSync(`${app.getPath('userData')}/app/imports/${s.subject.name}`)
          }

          //-- make a deep copy into the current entry of subjects.json
          Object.assign(s, _subject)
          fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

          break;
        }
      }

      if(!foundSubject)
        reject({
          err: "Couldn't find a corresponding subject in the main list."
        })

      //-- then we need to update the subject reference inside the topics
      //-- and update the topics inside the new subject
      _subject.topics = []

      let topics = fs.readdirSync(`${app.getPath('userData')}/app/imports/${_subject.name}/topics/`)
      for(let t of topics){
        let topic = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_subject.name}/topics/${t}/topic.json`))

        //-- we need this extra line to avoid copying over the subject.topics
        //-- and avoid loop
        topic.subject = {
          name: _subject.name,
          created: _subject.created,
          path: _subject.path,
          id: _subject.id,
          description: _subject.description
        }
        _subject.topics.push(topic)
      }

      //-- finally we update the local subject.json
      fs.writeFileSync(`${app.getPath('userData')}/app/imports/${_subject.name}/subject.json`, JSON.stringify(_subject))

      resolve(_subject)
    })
  }

  //------------
  //-- removes a subject given
  //-- a name and an id
  //------------
  static remove(_subject){
    console.log(`[SUBJECT] deleting ${_subject.name}...`);
    return new Promise((resolve, reject) => {

      let foundSubject = false
      let subjects = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/data/subjects.json`))
      for(let i = 0; i < subjects.length; i++){
        if(subjects[i].id == _subject.id){
          foundSubject = true
          subjects.splice(i, 1)
          console.log('[SUBJECT] deleted from local list...');
        }
      }

      if(!foundSubject)
        reject({
          err: 404,
          info: "could not find the subject"
        })
      else if(foundSubject)
        fs.writeFileSync(`${app.getPath('userData')}/data/subjects.json`, JSON.stringify(subjects))

      console.log(`[SUBJECT] removing ${_subject.name} folder from imports/...`);
      try{
        utils.deleteFolderRecursive(`${app.getPath('userData')}/app/imports/${_subject.name}/`)
        resolve()
      }catch (e){
        console.log(e);
        reject(e)
      }
    })
  }

  //------------
  //-- imports a subject given a path
  //-- to a .mmd archive
  //------------
  static importFrom(_path){
    console.log(`[SUBJECT] importing from ${_path}...`)
    return new Promise((resolve, reject) => {
      try {
        let file = file_mgmt.extract(_path)
        console.log(`[SUBJECT] ...success importing: ${file}`);
        resolve(file)
      } catch (e) {
        reject(e)
      }
    })
  }

  //------------
  //-- exports a subject
  //-- and its topics
  //-- given a subject name, a type and a path
  //------------
  static export(_data, _type, _path){
    console.log(`[SUBJECT] exporting - ${_data.subject} - ${_type}`)

    let topics_to_export = []
    return new Promise((resolve, reject) => {
      console.log('RETURN - actually write that function! this is currently in the "topic mode"')
      reject()

      //-- first we collect all the topics of the subject
      let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/subject.json`))

      for(let topic of subject.topics){
        let data = null
        try{
          c = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/topics/${topic.name}/topic.json`))
        }catch(e){
          console.log(`[SUBJECT] couldn't open ${topic.name} for export`);
        }

        if(data != null)
          topics_to_export.push(data)
      }

      //-- then we export depending on the type
      if(_type == 'html'){
        //-- creating subject_assets directory
        utils.touchDirectory(`${_path}/${_data.subject}_assets/`)

        //-- for each topic
        for(let topic of topics_to_export){

          //-- copy all images, videos and file assets over to new folder
          for(let concept of topic.concepts)
            for(let page of concept.pages)
              for(let prep of page.preps)
                if(prep.type == 'img' || prep.type == 'vid' || prep.type == 'file')
                  fs.copySync(`${prep.src}`,`${_path}/${topic.subject.name}_assets/${prep.name}`)

          //-- render  and write an HTML file for each of these topics
          let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)
          fs.writeFileSync(`${_path}/${topic.name}.html`, render)
        }

        //-- rebuild the index
        let subject = JSON.parse(fs.readFileSync(`${app.getPath('userData')}/app/imports/${_data.subject}/subject.json`))
        subject.topics = topics_to_export
        let index = pug.renderFile(`${__dirname}/views/export-index.pug`, subject)
        fs.writeFileSync(`${_path}/index.html`, index)

        resolve()

      }else if(_type == 'pdf'){
        let counter = 0 //-- to keep track of how many renders we've finished

        //-- for each topic
        utils.touchDirectory(`${app.getPath('userData')}/app/imports/temp/${_data.subject}_assets/`)
        for(let topic of topics_to_export){

          //-- first copy all the media assets and html to a temp folder
          for(let concept of topic.concepts)
            for(let page of concept.pages)
              for(let prep of page.preps)
                if(prep.type == 'img' || prep.type == 'vid' || prep.type == 'file')
                  fs.copySync(`${prep.src}`, `${app.getPath('userData')}/app/imports/temp/${topic.subject.name}_assets/${prep.name}`)

          //-- create the html stream
      	  //-- TODO write the html file instead of passing a stream to createPDF
          let render = pug.renderFile(`${__dirname}/views/export.pug`, topic)

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

          pdf.create(render, options).toFile(`${_path}/${topic.name}.pdf`, (err, res) => {
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

        //-- TODO
        //-- render the cover page
        //-- bind all topics together

      }else{
        console.log('[SUBJECT] got wrong export type');
        reject()
      }
    })
  }
}

//------------
//-- generates a 15 digit long id string
//------------
let generateId = () => {
  let id = ''
  for(let i = 0; i < 15; i++)
    id += Math.floor(Math.random()*10).toString()

  return id
}

module.exports = Subject
