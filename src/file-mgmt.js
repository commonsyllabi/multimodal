const admzip = require('adm-zip')
const fs = require('fs')
const utils = require('./utils.js')

exports = module.exports = {}

module.exports.extract = (path) => {
  console.log(`[FILE] extracting ${path}...`);
  let zip = new admzip(path)
  let entries = zip.getEntries()
  let subject = undefined

  //-- extract to temp
  entries.forEach(function(entry) {
    if(entry.entryName === 'subject.json')
      subject = JSON.parse(entry.getData().toString()).name
  })

  if(!subject)
    throw "no subject.json found in imported file!"

  utils.touchDirectory(`${__dirname}/app/imports/${subject}/topics`)
  entries.forEach(function(entry) {
    try {
      zip.extractEntryTo(entry.entryName, `src/app/imports/${subject}`, true, true)
    } catch (e) {
      console.log(e)
    }
  })

  console.log('[FILE] ...done');
  return subject
}


module.exports.compress = (name, target) => {
  console.log(`[FILE] compressing ${name} to ${target}...`);
  let zipper = new admzip()

  zipper.addLocalFile(`${__dirname}/app/imports/${name}/subject.json`)

  let topics = fs.readdirSync(`${__dirname}/app/imports/${name}/topics/`)

  //-- compressing each topics
  for(let t of topics){
    zipper.addLocalFile(`${__dirname}/app/imports/${name}/topics/${t}/topic.json`, `topics/${t}`)
    let media = fs.readdirSync(`${__dirname}/app/imports/${name}/topics/${t}/media/`)

    for(let m of media){
      zipper.addLocalFile(`${__dirname}/app/imports/${name}/topics/${t}/media/${m}`, `topics/${t}/media`)
    }

    let other = fs.readdirSync(`${__dirname}/app/imports/${name}/topics/${t}/other/`)

    for(let o of other){
      zipper.addLocalFile(`${__dirname}/app/imports/${name}/topics/${t}/other/${o}`, `topics/${t}/other`)
    }
  }

  zipper.writeZip(`${target}/${name}.mmd`)
  console.log('[FILE] ...done');
}

// module.exports.extract('/home/pierre/teaching/pierre lesson.mmd')
// module.exports.compress('test', '/home/pierre/Documents')
