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
window.openLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* openLesson */]
window.editLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]
window.editNotesLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["c" /* editNotesLesson */]

window.createLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]
window.exportLesson = __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* exportLesson */]

window.createNewCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["d" /* createNewCourse */]
window.saveCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["j" /* saveCourse */]
window.exitCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["e" /* exitCourse */]
window.saveLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["k" /* saveLesson */]
window.exitLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* exitLesson */]

ipc.on('menu-create', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]()})
ipc.on('menu-open', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* openLesson */]()})
ipc.on('menu-edit', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]()})
ipc.on('menu-export', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* exportLesson */]()})
ipc.on('menu-save', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["k" /* saveLesson */]()})
ipc.on('menu-exit', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* exitLesson */]()})

ipc.on('msg-log', (event, data) => { __WEBPACK_IMPORTED_MODULE_2__utils_js__["setMessage"](data.msg, data.type)})

ipc.on('update-dropdown', (event, data) => {
	console.log('got updated dropdown course', data)
	let new_course = document.createElement('option')
	new_course.setAttribute('value', data.name)
	new_course.setAttribute('year', data.year)
	new_course.setAttribute('path', data.path)
	new_course.innerText = data.name
	new_course.setAttribute('selected', true)
	document.getElementById('course-list').appendChild(new_course)
})

window.selectCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["l" /* selectCourse */]
window.selectCoursePath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["m" /* selectCoursePath */]
window.selectMediaPath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["n" /* selectMediaPath */]
window.addPrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["c" /* addPrep */]
window.removePrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["i" /* removePrep */]
window.addConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["a" /* addConcept */]
window.removeConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["g" /* removeConcept */]
window.addNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["b" /* addNote */]
window.removeNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["h" /* removeNote */]


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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return openLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return editLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return editNotesLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return exportLesson; });


const ipc = __webpack_require__(0).ipcRenderer
const utils = __webpack_require__(1)

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
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-lesson', {'course': current.course, 'title': current.title})
}

let editNotesLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-notes-lesson', {'course': current.course, 'title': current.title})
}

let exportLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('export-lesson', {'course': current.course, 'title': current.title})
}




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createNewCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return saveCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return exitCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return selectCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return selectCoursePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return selectMediaPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addPrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return removePrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return removeNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return saveLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return exitLesson; });


const {dialog} = __webpack_require__(0).remote
const remote = __webpack_require__(0).remote
const ipc = __webpack_require__(0).ipcRenderer
const utils = __webpack_require__(1)

let lessonSaved = false
let lesson = {
	'course' : {},
	'title' : '',
	'concepts': []
}

let course = {
	'name': '',
	'path': '',
	'year':''
}

let selectCourse = (_el) => {
	let name = _el.options[_el.selectedIndex].value
	console.log(_el.options[_el.selectedIndex].value);
	if(name == 'create-course')
		createNewCourse()
}

let createNewCourse = () => {
	ipc.send('create-new-course')
}

let saveCourse = () => {
	let _course = {}
	_course.name = document.getElementById('course-name').value
	_course.year = document.getElementById('course-year').value
	_course.path = document.getElementById('course-path').value

	if(_course.name == null || _course.year == null || _course.path == null){
		alert('Some fields are missing!')
		console.log(_course);
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

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	prep.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	prep.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	prep.appendChild(b_img)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-prep')
	rem.setAttribute('onclick', 'removePrep(this)')
	rem.innerText = '-'
	prep.appendChild(rem)

	return prep
}

let addPrep = (el) => {

	if(el.getAttribute('class') == 'create-add-prep'){

		let prep = createPrep(el.value)
		if(el.parentNode.getAttribute('class') == 'create-concept'){ //if we're creating the first prep

			for(let _el of el.parentNode.children){ // we find the content-holder
				if(_el.getAttribute('class') == 'content-holder')
					_el.children[0].appendChild(prep) //and we append to its first child, the prep-holder
			}
		}else if(el.parentNode.getAttribute('class') == 'create-prep'){
			el.parentNode.insertAdjacentElement('afterend', prep)
		}

	}else if(el.getAttribute('class') == 'create-add-concept'){

		let prep = createPrep('text')
		return prep

	}
}

let removePrep = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}


let addNote = (el) => {
	let note = document.createElement('div')
	note.setAttribute('class', 'create-concept-note')
	note.setAttribute('type', 'text')

	let content = document.createElement('textarea')
	content.setAttribute('placeholder', 'empty note')
	note.appendChild(content)

	let add = document.createElement('button')
	add.setAttribute('class', 'create-add-note')
	add.setAttribute('onclick', 'addNote(this)')
	add.innerText = '+'
	note.appendChild(add)

	let rem = document.createElement('button')
	rem.setAttribute('class', 'create-remove-note')
	rem.setAttribute('onclick', 'removeNote(this)')
	rem.innerText = '-'
	note.appendChild(rem)

	el.parentNode.insertAdjacentElement('afterend', note)
}

let removeNote = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	let content_holder = document.createElement('div')
	content_holder.setAttribute('class', 'content-holder')

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

	let b_txt = document.createElement('button')
	b_txt.setAttribute('class', 'create-add-prep')
	b_txt.setAttribute('onclick', 'addPrep(this)')
	b_txt.setAttribute('value', 'txt')
	b_txt.innerText = 'txt'

	concept.appendChild(b_txt)

	let b_url = document.createElement('button')
	b_url.setAttribute('class', 'create-add-prep')
	b_url.setAttribute('onclick', 'addPrep(this)')
	b_url.setAttribute('value', 'url')
	b_url.innerText = 'url'

	concept.appendChild(b_url)

	let b_img = document.createElement('button')
	b_img.setAttribute('class', 'create-add-prep')
	b_img.setAttribute('onclick', 'addPrep(this)')
	b_img.setAttribute('value', 'img')
	b_img.innerText = 'img'

	concept.appendChild(b_img)

	let dummy = document.createElement('div')
	concept.append(dummy)


	let prep_holder = document.createElement('div')
	content_holder.appendChild(prep_holder)
	concept.append(content_holder)

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
	if(document.getElementById('course-list') == null){
		lesson.course = {
			'name': document.getElementById('existing-course'),
			'year': 2018, //TODO fix
			'path': document.getElementById('local-path').value
		}
	}else{ // or creating the new one
		let dropdown = document.getElementById('course-list').selectedOptions[0]

		lesson.course = {
			'name': dropdown.value,
			'year': dropdown.getAttribute('year'),
			'path': dropdown.getAttribute('path')
		}
	}

	// --  GET LESSON INFORMATION
	lesson.title = document.getElementById('title').value

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []

		// first get the main title of the concept
		concept.push({'concept':_co.childNodes[0].value, 'tag':_co.childNodes[1].value})

		// get the correct prep-notes container
		let contentHolder
		for(let child of _co.childNodes)
			if(child.getAttribute('class') == 'content-holder')
				contentHolder = child

		// then start going through the prep notes
		for(let note of contentHolder.childNodes[0].childNodes){ //go through all notes, first finding the 'content-holder' and then finding the 'prep-holder'
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-prep'){

				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields

				if(_cn[0].getAttribute('kind') == 'txt'){
					concept.push({'type':'txt', 'text': _cn[0].value, 'tag': _cn[1].value ? _cn[1].value : ''})
				}else if(_cn[0].getAttribute('kind') == 'url'){
					concept.push({'type':'url', 'url': _cn[0].value, 'text': _cn[1].value})
				}else if(_cn[0].getAttribute('kind') == 'img'){

					let p = _cn[0].value
					if((/\.(gif|jpg|jpeg|tiff|png|svg|bmp)$/i).test(p)){			//checking if it's an image file
						concept.push({'type':'img', 'src': _cn[0].value})
					}else if((/\.(mp4|mov|avi|wmv|flv|mpg|m4a)$/i).test(p)){	//checking it it's a video file
						concept.push({'type':'vid', 'src': _cn[0].value})
					}else{ // unsupported file
						alert(`One of the image or videos files specified on concept: ${_co.childNodes[0].value} is invalid!`)
						return false
					}

				}else if(_cn[0].getAttribute('kind') == 'tag'){
					concept.push({'type':'tag', 'tag':_cn[0].value})
				}

			}
		}

		// then go through the in-class notes
		// if we are creating a new lesson, just add an empty array
		if(document.getElementById('course-list') != null){
			concept.push({"notes":[]})
		}else{
			let notes = []
			for(let note of contentHolder.childNodes[1].childNodes){
				notes.push(note.childNodes[0].value)
			}
			concept.push({"notes":notes})
		}


		lesson.concepts.push(concept)
	}

	// if we're creating a lesson for the first time, we add a whiteboard
	// because, if we're editing the lesson, we don't want to keep adding
	if(document.getElementById('course-list') == null){
		let whiteboard = [
			{'concept':'whiteboard', 'tag':'whiteboard'},
			{'type': 'wbd', 'text':'', 'tag':''}
		]
		lesson.concepts.push(whiteboard)
	}

	console.log('successfully parsed:',lesson)
	return true
}

let saveLesson = (_type) => {

	if(parseLesson()){
		if(lesson.course == '' || lesson.title == ''){

			let _title = 'something is missing'
			let _error = 'it seems you haven\'t specified a course or a lesson title.'

			dialog.showErrorBox(_title, _error)
		}else{

				lesson.prefix = _type == undefined ? 'prep' : _type //either prep or in-class
				utils.setMessage('saved!', 'info')
				lessonSaved = true
				ipc.send('save-lesson', lesson)
		}
	}
}

let exitLesson = () => {

	let options = {	'type':'info',
		'buttons':['cancel', 'Quit anyways'],
		'title':'are you sure?',
		'message':'the current lesson hasn\'t been saved. do you want to quit anyways?'
	}

	if(lesson.course == '' || lesson.title == '' || !lessonSaved){
		if(dialog.showMessageBox(options) == 1)
			ipc.send('exit-home', {'coming':'back'})

	}else {
		ipc.send('exit-home', {'coming':'back'})
	}
}




/***/ })
/******/ ]);