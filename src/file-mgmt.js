const app = require('electron').app
const admzip = require('adm-zip')
const fs = require('fs-extra')
const os = require('os')
const utils = require('./utils.js')

exports = module.exports = {}

//------------
//-- extracts a subject given a path
//-- returns a string of the name of the subject
//------------
module.exports.extract = (_path) => {
  console.log(`[FILE] extracting ${_path}...`);
  let zip = new admzip(_path)
  let entries = zip.getEntries()
  let subjectName = undefined

  //-- find the name of the subject we're importing
  entries.forEach(function(entry) {
    if(entry.entryName === 'subject.json')
      subjectName = JSON.parse(entry.getData().toString()).name
  })

  if(!subjectName)
    throw "no subject.json found in imported file!"

  //-- extract the contents to the app/imports directory
  utils.touchDirectory(`${app.getPath('userData')}/app/imports/${subjectName}/topics`)
  entries.forEach(function(entry) {
    try {
      zip.extractEntryTo(entry.entryName, `${app.getPath('userData')}/app/imports/${subjectName}`, true, true)
    } catch (e) {
      console.log(e)
    }
  })

  console.log('[FILE] ...done');
  return subjectName
}

//------------
//-- compresses a subject into a .mmd archive
//-- and writes it to the _targetdir
//------------
module.exports.compress = (_name, _targetdir) => {
  console.log(`[FILE] compressing ${_name} to ${_targetdir}...`);
  let zipper = new admzip()

  zipper.addLocalFile(`${app.getPath('userData')}/app/imports/${_name}/subject.json`)

  let topics = fs.readdirSync(`${app.getPath('userData')}/app/imports/${_name}/topics/`)

  //-- compressing each topics
  //-- also checking for media/ or other/ directories, since they don't always get saved (TODO)
  for(let t of topics){

    if(fs.pathExistsSync(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/topic.json`)){
      zipper.addLocalFile(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/topic.json`, `topics/${t}`)

      try {
        let media = fs.readdirSync(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/media/`)

        for(let m of media){
          zipper.addLocalFile(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/media/${m}`, `topics/${t}/media`)
        }
      } catch(e) {
        console.log(`[FILE] folder media/ was not found in the archive, skipping...`);
      }

      try {
        let other = fs.readdirSync(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/other/`)

        for(let o of other){
          zipper.addLocalFile(`${app.getPath('userData')}/app/imports/${_name}/topics/${t}/other/${o}`, `topics/${t}/other`)
        }
      } catch (e) {
        console.log(`[FILE] folder other/ was not found in the archive, skipping...`);
      }
    }else{
      console.log(`[FILE] not found at ${t}`);
    }
  }

  try {
    zipper.writeZip(`${_targetdir}/${_name}.mmd`)
  }catch(e){
    console.log(`[FILE] subject original path not found, saving at ~/`)
    // TODO: ask for alternate path and do that at the beginning of function
    zipper.writeZip(`${process.env.HOME}/${_name}.mmd`)
  }

  console.log('[FILE] ...done');
}
