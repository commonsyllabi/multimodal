'use strict'

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

window.selectCourse = create.selectCourse
window.addNote = create.addNote
window.removeNote = create.removeNote
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept

window.saveLesson = create.saveLesson
window.exitLesson = create.exitLesson
