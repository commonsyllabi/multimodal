'use strict'

import * as welcome from './welcome.js'
import * as create from './create.js'

window.openLesson = welcome.openLesson
window.createLesson = welcome.createLesson

window.selectCourse = create.selectCourse
window.addNote = create.addNote
window.removeNote = create.removeNote
window.addConcept = create.addConcept
window.removeConcept = create.removeConcept
