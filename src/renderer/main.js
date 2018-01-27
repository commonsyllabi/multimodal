'use strict'

require('./sass/welcome.scss')
require('./sass/create.scss')


import * as welcome from './main/welcome.js'
import * as create from './main/create.js'

window.openLesson = welcome.openLesson
window.createLesson = welcome.createLesson

window.selectCourse = create.selectCourse
window.addNote = create.addNote
window.removeNote = create.removeNote
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept

window.saveLesson = create.saveLesson
window.exitLesson = create.exitLesson
