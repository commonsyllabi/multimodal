const admzip = require('adm-zip')
const fs = require('fs')
const utils = require('./utils.js')

exports = module.exports = {}

module.exports.extract = (path) => {
  console.log(`[FILE] extracting ${path}...`);
  let zip = new admzip(path)
  let entries = zip.getEntries()

  entries.forEach(function(entry) {
    utils.touchDirectory(`${__dirname}/app/imports/tmp/`)

    console.log(entry.entryName.substring(entry.entryName.indexOf('test')));
    zip.extractEntryTo(entry.entryName, `${__dirname}/app/imports/tmp`, true, true)
    try {
      fs.renameSync(`${__dirname}/app/imports/tmp/${entry.entryName}`, `${__dirname}/app/imports/${entry.entryName.substring(entry.entryName.indexOf('test'))}`)
    } catch (e) {
      if(e.errno != -2)
        console.log(e)
    }
  })

  utils.deleteFolderRecursive(`${__dirname}/app/imports/tmp/`)

  console.log('[FILE] ...done');
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

// module.exports.extract('/home/pierre/Desktop/test.mmd')
// module.exports.compress('test', '/home/pierre/Documents')
