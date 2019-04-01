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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = {}

module.exports.setMessage = (_msg, _type) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.setAttribute('class', 'msg-log '+_type)
	el.style.opacity = 1

	setTimeout(() => {
		el.style.opacity = 0
		setTimeout(() => { el.setAttribute('class', 'msg-log') }, 500)
	}, 2000)
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_create_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utils_js__);


const ipc = __webpack_require__(0).ipcRenderer

__webpack_require__(2)
__webpack_require__(12)
__webpack_require__(13)
__webpack_require__(3)
__webpack_require__(4)






window.setLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["f" /* setLesson */]
window.openLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* openLesson */]
window.editLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]

window.createLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]
window.removeLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* removeLesson */]
window.exportLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["c" /* exportLesson */]

window.createNewCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["e" /* createNewCourse */]
window.saveCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["l" /* saveCourse */]
window.exitCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* exitCourse */]
window.saveLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["m" /* saveLesson */]
window.exitLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["g" /* exitLesson */]

ipc.on('menu-create', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]()})
ipc.on('menu-open', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* openLesson */]()})
ipc.on('menu-edit', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]()})
ipc.on('menu-remove', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* removeLesson */]()})
ipc.on('menu-export', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["c" /* exportLesson */]()})
ipc.on('menu-save', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["m" /* saveLesson */]()})
ipc.on('menu-exit', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["g" /* exitLesson */]()})

ipc.on('msg-log', (event, data) => { __WEBPACK_IMPORTED_MODULE_2__utils_js__["setMessage"](data.msg, data.type)})

ipc.on('update-dropdown', (event, data) => {
	console.log('got updated dropdown course', data)
	let new_course = document.createElement('option')
	new_course.setAttribute('value', data.name)
	new_course.setAttribute('created', data.created)
	new_course.setAttribute('path', data.path)
	new_course.setAttribute('id', data.id)
	new_course.innerText = data.name
	new_course.setAttribute('selected', true)
	document.getElementById('course-list').appendChild(new_course)
})

window.selectCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["n" /* selectCourse */]
window.selectCoursePath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["o" /* selectCoursePath */]
window.selectMediaPath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["p" /* selectMediaPath */]
window.addPrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["c" /* addPrep */]
window.removePrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["j" /* removePrep */]
window.addConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["a" /* addConcept */]
window.removeConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["h" /* removeConcept */]
window.addNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["b" /* addNote */]
window.removeNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["i" /* removeNote */]
window.addWriteup = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["d" /* addWriteup */]
window.removeWriteup = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["k" /* removeWriteup */]


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return openLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return editLesson; });
/* unused harmony export editNotesLesson */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return exportLesson; });


const ipc = __webpack_require__(0).ipcRenderer
const {dialog} = __webpack_require__(0).remote
const utils = __webpack_require__(1)

let current = {
	'course':'',
	'name':'',
	'path': ''
}

let setLesson = (_e, _c, _l, _p) => {
	current.course = _c
	current.name = _l
	current.path = _p

	let all_lessons = document.getElementsByClassName('welcome-lesson')
	for(let less of all_lessons)
		less.setAttribute('class', 'welcome-lesson')


	_e.setAttribute('class', 'welcome-lesson selected')

	let btns = document.getElementsByClassName('inter-btn-main')
	for(let btn of btns)
		btn.disabled = false
}

let openLesson = (_c, _l, _p) => {
	let course = _c ? _c : current.course
	let name = _l ? _l : current.name
	let path = _p ? _p : current.path
	ipc.send('open-lesson', current)
}

let createLesson = () => {
	ipc.send('create-lesson')
}

let removeLesson = (_c, _l) => {
	let course = _c ? _c : current.course
	let name = _l ? _l : current.name

	let options = {	'type':'info',
		'buttons':['Yes!', 'Nope.'],
		'title':'Are you sure?',
		'message':'You\'re about to delete this lesson, and all data associated with it. Are you certain?'
	}

	if(dialog.showMessageBox(options) == 0)
		ipc.send('remove-lesson', {'course': course, 'name': name})
}

let editLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-lesson', {'course': current.course, 'name': current.name})
}

let exportLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('export-lesson', {'course': current.course, 'name': current.name})
}




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createNewCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return saveCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return exitCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return selectCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return selectCoursePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return selectMediaPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addPrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return removePrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return removeNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addWriteup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return removeWriteup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return removeConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return saveLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return exitLesson; });


const {dialog} = __webpack_require__(0).remote
const remote = __webpack_require__(0).remote
const ipc = __webpack_require__(0).ipcRenderer
const utils = __webpack_require__(1)

let lessonSaved = false
let lesson = {
	'course' : {},
	'name' : '',
	'concepts': []
}

let course = {
	'name': '',
	'path': '',
	'date':''
}

let selectCourse = (_el) => {
	let val = _el.options[_el.selectedIndex].value
	console.log(_el.options[_el.selectedIndex].value)
	if(val == 'create-course')
		createNewCourse()
}

let createNewCourse = () => {
	ipc.send('create-new-course')
}

let saveCourse = () => {
	let _course = {}
	_course.name = document.getElementById('course-name').value
	_course.path = document.getElementById('course-path').value

	if(_course.name == null || _course.path == null){
		alert('Some fields are missing!')
		console.log(_course)
	}else{
		ipc.send('save-course', _course)
	}
}

let exitCourse = () => {
	let w = remote.getCurrentWindow()
	w.close()
}

let selectCoursePath = () => {
	let options = {
		'title':'Select course folder',
		'defaultPath':'~/',
		'properties':['openDirectory', 'createDirectory']
	}

	dialog.showOpenDialog(options, (path) => {
		course.path = path
		document.getElementById('course-path').value = path
	})
}

let selectMediaPath = (_el) => {
	let options = {
		'title':'Select file',
		'defaultPath': '~/',
		'properties':['openFile']
	}

	dialog.showOpenDialog(options, (path) => {
		_el.previousSibling.value = path
		_el.previousSibling.setAttribute('src', path)
	})
}

let createPrep = (kind) => {
	let prep = document.createElement('div')
	prep.setAttribute('class', 'create-prep')

	if(kind == 'txt'){
		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('kind', 'txt')
		text.setAttribute('class', 'create-concept-prep')
		prep.appendChild(text)

		let tag = document.createElement('input')
		tag.setAttribute('type', 'text')
		tag.setAttribute('placeholder', 'tag')
		tag.setAttribute('kind', 'tag')
		tag.setAttribute('class', 'create-concept-prep create-concept-tag')
		prep.appendChild(tag)
	}else if(kind == 'url'){
		let url = document.createElement('input')
		url.setAttribute('type', 'text')
		url.setAttribute('kind', 'url')
		url.setAttribute('placeholder', 'url')
		url.setAttribute('class', 'create-concept-prep')
		prep.appendChild(url)

		let text = document.createElement('input')
		text.setAttribute('type', 'text')
		text.setAttribute('kind', 'txt')
		text.setAttribute('placeholder', 'text')
		text.setAttribute('class', 'create-concept-prep url')
		prep.appendChild(text)
	}else if(kind == 'img'){
		let src = document.createElement('input')
		src.setAttribute('type', 'text')
		src.setAttribute('kind', 'img')
		src.setAttribute('placeholder', 'src')
		src.setAttribute('filename', '')
		src.setAttribute('class', 'create-concept-prep img')
		prep.appendChild(src)

		let expl = document.createElement('button')
		expl.innerText = 'select'
		expl.setAttribute('onclick', 'selectMediaPath(this)')
		expl.setAttribute('kind', 'path')
		expl.setAttribute('class', 'create-add-prep')
		prep.appendChild(expl)
	}else{
		console.log('unexpected type for new prep')
	}


	// create interface
	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-remove-holder')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	b_holder.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	b_holder.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	b_holder.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-prep')
	rem.setAttribute('onclick', 'removePrep(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	prep.appendChild(b_holder)

	return prep
}

let addPrep = (el) => {
	let prep = createPrep(el.value) //either txt, or url, or img

	if(el.parentNode.getAttribute('class') == 'create-add-holder'){ //if we're creating the first prep

		// for(let _el of el.parentNode.parentNode.children) // we find the content-holder
		// 	if(_el.getAttribute('class') == 'content-holder')
				el.parentNode.parentNode.appendChild(prep) //and we append to its first child, the content-holder

	}else if(el.parentNode.getAttribute('class') == 'create-add-remove-holder'){ //otherwise there's already a prep
		el.parentNode.parentNode.insertAdjacentElement('afterend', prep)
	}
}

let removePrep = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}

let addWriteup = (el) => {
	let writeup = createWriteup()
	el.parentNode.parentNode.insertAdjacentElement('afterend', writeup)
}

let createWriteup = () => {
	let writeup = document.createElement('div')
	writeup.setAttribute('class', 'create-concept-writeup')
	writeup.setAttribute('type', 'text')

	let content = document.createElement('textarea')
	content.setAttribute('placeholder', 'empty writeup')
	writeup.appendChild(content)

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-writeup-holder')

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-writeup')
	rem.setAttribute('onclick', 'removeWriteup(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-writeup')
	add.setAttribute('onclick', 'addWriteup(this)')
	add.innerText = '+'
	b_holder.appendChild(add)

	writeup.appendChild(b_holder)

	return writeup
}

let removeWriteup = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}


let addNote = (el) => {
	let note = createNote()
	el.parentNode.parentNode.insertAdjacentElement('afterend', note)
}

let createNote = () => {
	let note = document.createElement('div')
	note.setAttribute('class', 'create-concept-note')
	note.setAttribute('type', 'text')

	let content = document.createElement('textarea')
	content.setAttribute('placeholder', 'empty note')
	note.appendChild(content)

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-note-holder')

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-note')
	rem.setAttribute('onclick', 'removeNote(this)')
	rem.innerText = '-'
	b_holder.appendChild(rem)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-note')
	add.setAttribute('onclick', 'addNote(this)')
	add.innerText = '+'
	b_holder.appendChild(add)

	note.appendChild(b_holder)

	return note
}

let removeNote = (el) => {
	el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	let prep_holder = document.createElement('div')
	prep_holder.setAttribute('class', 'prep-holder')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

	let tag = document.createElement('input')
	tag.setAttribute('class', 'create-concept-tag')
	tag.setAttribute('placeholder', 'concept tag')
	concept.appendChild(tag)

	let prep = document.createElement('div')
	prep.setAttribute('class', 'create-prep')

	let b_holder = document.createElement('div')
	b_holder.setAttribute('class', 'create-add-holder')

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	b_holder.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	b_holder.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	b_holder.appendChild(b_img)

	prep_holder.appendChild(b_holder)

	concept.append(prep_holder)

	//-- add one note
	let notes_holder = document.createElement('div')
	notes_holder.setAttribute('class', 'notes-holder')
	let dummy = document.createElement('div')
	let note = createNote()
	dummy.append(note)
	notes_holder.append(dummy)
	concept.append(notes_holder)

	//-- add one writeup
	let writeups_holder = document.createElement('div')
	writeups_holder.setAttribute('class', 'writeups-holder')
	dummy = document.createElement('div')
	let writeup = createWriteup()
	dummy.append(writeup)
	writeups_holder.append(dummy)
	concept.append(writeups_holder)

	// add the two buttons at the bottom
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

// goes through all the information on the input fields and saves them as JSON
let parseLesson = () => {
	lesson.concepts = []

	// -- GET COURSE INFORMATION
	// here we check first if we are editing the lesson
	if(document.getElementById('existing-course') != null){
		lesson.course = {
			'name': document.getElementById('existing-course').innerText,
			'created': document.getElementById('existing-course').getAttribute('created'),
			'path': document.getElementById('local-path').value,
			'id': document.getElementById('existing-course').getAttribute('id')
		}
	}else{ // or creating the new one
		let dropdown = document.getElementById('course-list').selectedOptions[0]

		lesson.course = {
			'name': dropdown.value,
			'created': dropdown.getAttribute('created'),
			'path': dropdown.getAttribute('path'),
			'id': dropdown.getAttribute('id')
		}
	}

	// --  GET LESSON INFORMATION
	lesson.name = document.getElementById('name').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = {
			'concept': _co.childNodes[0].value,
			'tag':_co.childNodes[1].value,
			'prep': [],
			'notes': [],
			'writeups':[]
		}

		// get the correct prep-notes container
		let prepHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'prep-holder')
				prepHolder = child

		// then start going through the prep notes
		for(let prep of prepHolder.childNodes){
			if(prep.hasChildNodes() && prep.getAttribute('class') == 'create-prep'){

				let _pn = prep.childNodes

				if(_pn[0].value == '' || _pn[0] == null) break //do not save empty fields

				if(_pn[0].getAttribute('kind') == 'txt'){
					concept.prep.push({'type':'txt', 'text': _pn[0].value, 'tag': _pn[1].value ? _pn[1].value : ''})
				}else if(_pn[0].getAttribute('kind') == 'url'){
					concept.prep.push({'type':'url', 'url': _pn[0].value, 'text': _pn[1].value})
				}else if(_pn[0].getAttribute('kind') == 'img'){

					let p = _pn[0].value
					if((/\.(gif|jpg|jpeg|tiff|png|svg|bmp)$/i).test(p)){			//checking if it's an image file
						concept.prep.push({'type':'img', 'src': _pn[0].getAttribute('src'), 'name': _pn[0].getAttribute('filename')})
					}else if((/\.(mp4|mov|avi|wmv|flv|mpg|m4a)$/i).test(p)){	//checking it it's a video file
						concept.prep.push({'type':'vid', 'src': _pn[0].getAttribute('src'), 'name': _pn[0].getAttribute('filename')})
					}else{ // unsupported file
						alert(`One of the image or videos files specified on concept: ${_co.childNodes[0].value} is invalid!`)
						return false
					}

				}else if(_pn[0].getAttribute('kind') == 'tag'){ //TODO what is this?
					console.log('got tag:'+_pn[0])
					concept.prep.push({'type':'tag', 'tag':_pn[0].value})
				}
			}
		}

		// --- FIND NOTES
		let notesHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'notes-holder')
				notesHolder = child
		for(let note of notesHolder.childNodes)
			if(note.getAttribute('class') == 'create-concept-note' && (note.childNodes[0].value != '' || note.childNodes[0].value != null))
				concept.notes.push(note.childNodes[0].value)




		// --- FIND WRITEUPS
		let writeupsHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'writeups-holder')
				writeupsHolder = child


				// the problem is that the initial write up holder doesnt have an empty <div> child and the subsequent ones have
		for(let child of writeupsHolder.childNodes)
			if(child.getAttribute('class') == 'create-concept-writeup' && child.childNodes[0].value != '' && child.childNodes[0].value != null) //first case
				concept.writeups.push(child.childNodes[0].value)
			else
				for(let subchild of child.childNodes)
					if(subchild.getAttribute('class') == 'create-concept-writeup' && subchild.childNodes[0].value != '' && subchild.childNodes[0].value != null) //second case
						concept.writeups.push(subchild.childNodes[0].value)




		lesson.concepts.push(concept)
	}

	// if we're creating a lesson for the first time, we add a whiteboard
	// because, if we're editing the lesson, we don't want to keep adding
	if(document.getElementById('existing-course') == null){
		let whiteboard = {
			'concept':'whiteboard',
			'tag':'whiteboard',
			'prep':[{'type': 'wbd', 'text':'', 'tag':''}],
			'notes':[],
			'writeups': []
		}
		lesson.concepts.push(whiteboard)
	}

	console.log('[SAVE] successfully parsed:',lesson)
	return true
}

let saveLesson = (_type) => {

	if(parseLesson()){ //if we're creating a lesson
		if(lesson.course == '' || lesson.name == ''){

			let _title = 'something is missing'
			let _error = 'it seems you haven\'t specified a course or a lesson title.'

			dialog.showErrorBox(_title, _error)
		}else{
			utils.setMessage('saved!', 'info')
			lessonSaved = true
			ipc.send('save-lesson', lesson)
		}
	}
}

let exitLesson = () => {

	let options = {	'type':'info',
		'buttons':['Cancel', 'Quit anyways'],
		'title':'Are you sure?',
		'message':'The current lesson hasn\'t been saved. Do you want to quit anyways?'
	}

	if(lesson.course == '' || lesson.name == '' || !lessonSaved){
		if(dialog.showMessageBox(options) == 1)
			ipc.send('exit-home', {'coming':'back'})

	}else {
		ipc.send('exit-home', {'coming':'back'})
	}
}




/***/ })
/******/ ]);