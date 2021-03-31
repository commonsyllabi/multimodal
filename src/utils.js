'use strict'

exports = module.exports = {}

const fs = require('fs-extra')
const path = require('path')

//------------
//-- returns a time string formatted as HH:MM
//------------
module.exports.time = () => {
	let d = new Date()
	let time = d.getHours()+':'+d.getMinutes()
	return time
}

module.exports.deleteFolderRecursive = (path) => {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file){
			let curPath = path + '/' + file
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				module.exports.deleteFolderRecursive(curPath)
			} else { // delete file
				fs.unlinkSync(curPath)
			}
		})
		fs.rmdirSync(path)
	}
}

module.exports.touchDirectory = (_path) => {
	const sep = path.sep
	const initDir = path.isAbsolute(_path) ? sep : ''
	const baseDir = '.'

	return _path.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(baseDir, parentDir, childDir)
		try {
			fs.mkdirSync(curDir)
		} catch (err) {
			if (err.code === 'EEXIST') { // curDir already exists!
				return curDir
			}

			// To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
			if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
				throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`)
			}

			const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1
			if (!caughtErr || caughtErr && _path === curDir) {
				throw err // Throw if it's just the last created dir.
			}
		}

		return curDir
	}, initDir)
}
