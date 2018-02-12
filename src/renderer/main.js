'use strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')
require('./sass/welcome.scss')
require('./sass/create.scss')
require('./sass/notes.scss')
require('./sass/interface.scss')


import * as welcome from './main/welcome.js'
import * as create from './main/create.js'

window.setLesson = welcome.setLesson
window.openLesson = welcome.openLesson
window.editLesson = welcome.editLesson
window.createLesson = welcome.createLesson
window.exportLesson = welcome.exportLesson

window.saveLesson = create.saveLesson
window.exitLesson = create.exitLesson

ipc.on('menu-create', (event) => { welcome.createLesson()})
ipc.on('menu-open', (event) => { welcome.openLesson()})
ipc.on('menu-edit', (event) => { welcome.editLesson()})
ipc.on('menu-export', (event) => { welcome.exportLesson()})
ipc.on('menu-save', (event) => { create.saveLesson()})
ipc.on('menu-exit', (event) => { create.exitLesson()})

window.selectCourse = create.selectCourse
window.selectCoursePath = create.selectCoursePath
window.addNote = create.addNote
window.removeNote = create.removeNote
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept
