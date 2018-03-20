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

ipc.on('menu-create', () => { welcome.createLesson()})
ipc.on('menu-open', () => { welcome.openLesson()})
ipc.on('menu-edit', () => { welcome.editLesson()})
ipc.on('menu-export', () => { welcome.exportLesson()})
ipc.on('menu-save', () => { create.saveLesson()})
ipc.on('menu-exit', () => { create.exitLesson()})

window.selectCourse = create.selectCourse
window.selectCoursePath = create.selectCoursePath
window.addNote = create.addNote
window.removeNote = create.removeNote
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept
