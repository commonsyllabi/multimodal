/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_create_js__ = __webpack_require__(14);


const ipc = __webpack_require__(0).ipcRenderer

__webpack_require__(1)
__webpack_require__(11)
__webpack_require__(12)
__webpack_require__(2)
__webpack_require__(3)





window.setLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["f" /* setLesson */]
window.openLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* openLesson */]
window.editLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]
window.editNotesLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["c" /* editNotesLesson */]
window.createLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]
window.exportLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* exportLesson */]

window.saveLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* saveLesson */]
window.exitLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["c" /* exitLesson */]

ipc.on('menu-create', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]()})
ipc.on('menu-open', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* openLesson */]()})
ipc.on('menu-edit', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]()})
ipc.on('menu-export', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* exportLesson */]()})
ipc.on('menu-save', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* saveLesson */]()})
ipc.on('menu-exit', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["c" /* exitLesson */]()})

window.selectCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["g" /* selectCourse */]
window.selectCoursePath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["h" /* selectCoursePath */]
window.addNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["b" /* addNote */]
window.removeNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["e" /* removeNote */]
window.addConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["a" /* addConcept */]
window.removeConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["d" /* removeConcept */]


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return openLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return editLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return editNotesLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return exportLesson; });


const ipc = __webpack_require__(0).ipcRenderer

let current = {
	'course':'',
	'title':''
}

let setLesson = (_e, _c, _l) => {
	current.course = _c
	current.title = _l


	let all_lessons = document.getElementsByClassName('welcome-lesson')
	for(let less of all_lessons)
		less.setAttribute('class', 'welcome-lesson')


	_e.setAttribute('class', 'welcome-lesson selected')

	let btns = document.getElementsByClassName('inter-btn-main')
	for(let btn of btns)
		btn.disabled = false

	//TODO check if there is indeed a draft to be edited
}

let openLesson = (_c, _l) => {
	let course = _c ? _c : current.course
	let title = _l ? _l : current.title
	ipc.send('open-lesson', {'course': course, 'title': title})
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let editLesson = () => {
	if(current.course == ''){
		setMessage('no course selected!')
		return
	}
	ipc.send('edit-lesson', {'course': current.course, 'title': current.title})
}

let editNotesLesson = () => {
	if(current.course == ''){
		setMessage('no course selected!')
		return
	}
	ipc.send('edit-notes-lesson', {'course': current.course, 'title': current.title})
}

let exportLesson = () => {
	if(current.course == ''){
		setMessage('no course selected!')
		return
	}
	ipc.send('export-lesson', {'course': current.course, 'title': current.title})
	let msg = 'exported '+current.title
	setMessage(msg)
}

let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => { el.style.opacity = 0 }, 2000)
}




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return selectCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return selectCoursePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return saveLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return exitLesson; });


const {dialog} = __webpack_require__(0).remote
const ipc = __webpack_require__(0).ipcRenderer

let lesson = {
	'course' : '',
	'path': {
		'local': '',
		'remote':''
	},
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name.value == 'new course'){
		document.getElementById('new-course').style.display = 'inline'
		document.getElementById('set-new-course').style.display = 'inline'
	}else if(name == 'custom'){
		lesson.course = document.getElementById('new-course').value
	}else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none'
		document.getElementById('set-new-course').style.display = 'none'
	}
}

let selectCoursePath = () => {
	let options = {
		'title':'Select course folder',
		'defaultPath':'~/',
		'properties':['openDirectory']
	}

	dialog.showOpenDialog(options, (path) => {
		lesson.path.local = path
		document.getElementById('local-path').value = path
	})
}

let createNote = (kind) => {
	let note = document.createElement('div')
	note.setAttribute('class', 'create-note')

	if(kind == 'text'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('kind', 'text')
		text.setAttribute('class', 'create-concept-note')
		note.appendChild(text)
	}else if(kind == 'url'){
		let url = document.createElement('input')
		url.setAttribute('type', 'text')
		url.setAttribute('kind', 'url')
		url.setAttribute('placeholder', 'url')
		url.setAttribute('class', 'create-concept-note')
		note.appendChild(url)

		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('kind', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('class', 'create-concept-note url')
		note.appendChild(text)
	}else if(kind == 'img'){
		let src = document.createElement('input')
		src.setAttribute('type', 'text')
		src.setAttribute('kind', 'img')
		src.setAttribute('placeholder', 'src')
		src.setAttribute('class', 'create-concept-note url')
		note.appendChild(src)
	}else{
		console.log('unexpected type for new note')
	}

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-note')
	b_txt.setAttribute('onclick', 'addNote(this)')
	b_txt.setAttribute('value', 'text')
	b_txt.innerText = 'txt'

	note.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-note')
	b_url.setAttribute('onclick', 'addNote(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	note.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-note')
	b_img.setAttribute('onclick', 'addNote(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	note.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-note')
	rem.setAttribute('onclick', 'removeNote(this)')
	rem.innerText = '-'
	note.appendChild(rem)

	return note
}

let addNote = (el) => {

	if(el.getAttribute('class') == 'create-add-note'){

		let note = createNote(el.value)
		el.parentNode.insertAdjacentElement('afterend', note)

	}else if(el.getAttribute('class') == 'create-add-concept'){

		let note = createNote('text')
		return note

	}
}

let removeNote = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

	let note = document.createElement('div')
	note.setAttribute('class', 'create-note')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-note')
	b_txt.setAttribute('onclick', 'addNote(this)')
	b_txt.setAttribute('value', 'text')
	b_txt.innerText = 'txt'

	note.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-note')
	b_url.setAttribute('onclick', 'addNote(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	note.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-note')
	b_img.setAttribute('onclick', 'addNote(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	note.appendChild(b_img)

	concept.append(note)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-concept')
	add.setAttribute('onclick', 'addConcept(this)')
	add.innerText = '+'
	concept.appendChild(add)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-concept')
	rem.setAttribute('onclick', 'removeConcept(this)')
	rem.innerText = '-'
	concept.appendChild(rem)

	el.parentNode.insertAdjacentElement('afterend', concept)
}

let removeConcept = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

//TODO delete later
/*
let createOption = (val) => {
	let el = document.createElement('option')
	el.innerText = '- '+val
	el.value = val
	return el
}
*/
let parseLesson = () => {

	lesson.concepts = []

	let dropdown = document.getElementById('course-list') != null ? document.getElementById('course-list').value :  document.getElementById('existing-course').innerText
	lesson.course = dropdown != 'new course' ? dropdown : document.getElementById('new-course').value
	lesson.title = document.getElementById('title').value

	lesson.path.local = document.getElementById('local-path').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []
		concept.push(_co.childNodes[0].value) //find its name

		for(let note of _co.childNodes){ //go through all notes
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-note'){

				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields

				if(_cn[0].getAttribute('kind') == 'text')
					concept.push({'type':'text', 'text': _cn[0].value})
				else if(_cn[0].getAttribute('kind') == 'url')
					concept.push({'type':'url', 'url': _cn[0].value, 'text': _cn[1].value})
				else if(_cn[0].getAttribute('kind') == 'img')
					concept.push({'type':'img', 'src': _cn[0].value})
			}
		}

		lesson.concepts.push(concept)
	}

	console.log('parsed:',lesson)
}

let saveLesson = () => {
	parseLesson()

	if(lesson.course == '' || lesson.title == ''){

		let _title = 'something is missing'
		let _error = 'it seems you haven\'t specified a course or a lesson title.'

		dialog.showErrorBox(_title, _error)
	}else{
		setMessage('saved!')
		ipc.send('save-lesson', lesson)
	}
}

let exitLesson = () => {

	parseLesson()

	let options = {	'type':'info',
		'buttons':['cancel', 'Quit anyways'],
		'title':'are you sure?',
		'message':'it seems you haven\'t specified a course or a lesson title. do you want to quit anyways?'
	}

	if(lesson.course == '' || lesson.title == ''){
		if(dialog.showMessageBox(options) == 1)
			ipc.send('exit-home', {'coming':'back'})

	}else {
		ipc.send('exit-home', {'coming':'back'})
	}
}

let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => {el.style.opacity = 0}, 2000)
}




/***/ })
/******/ ]);