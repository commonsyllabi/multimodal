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

window.saveLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["h" /* saveLesson */]
window.exitLesson = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["d" /* exitLesson */]

ipc.on('menu-create', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["a" /* createLesson */]()})
ipc.on('menu-open', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["e" /* openLesson */]()})
ipc.on('menu-edit', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["b" /* editLesson */]()})
ipc.on('menu-export', () => { __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__["d" /* exportLesson */]()})
ipc.on('menu-save', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["h" /* saveLesson */]()})
ipc.on('menu-exit', () => { __WEBPACK_IMPORTED_MODULE_1__main_create_js__["d" /* exitLesson */]()})

ipc.on('msg-log', (event, data) => { __WEBPACK_IMPORTED_MODULE_2__utils_js__["setMessage"](data.msg, data.type)})

window.selectCourse = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["i" /* selectCourse */]
window.selectCoursePath = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["j" /* selectCoursePath */]
window.addPrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["c" /* addPrep */]
window.removePrep = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["g" /* removePrep */]
window.addNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["b" /* addNote */]
window.removeNote = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["f" /* removeNote */]
window.addConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["a" /* addConcept */]
window.removeConcept = __WEBPACK_IMPORTED_MODULE_1__main_create_js__["e" /* removeConcept */]


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

let setMessage = (_msg, _type) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.setAttribute('class', 'msg-log '+_msg)
	el.style.opacity = 1

	setTimeout(() => { 
		el.style.opacity = 0 
		el.setAttribute('class', 'msg-log')
	}, 2000)
}




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return selectCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return selectCoursePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return removeNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addPrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removePrep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return saveLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return exitLesson; });


const {dialog} = __webpack_require__(0).remote
const ipc = __webpack_require__(0).ipcRenderer
const utils = __webpack_require__(1)

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
	}else if(name == 'custom'){
		lesson.course = document.getElementById('new-course').value
	}else{
		lesson.course = name.value
		document.getElementById('new-course').style.display = 'none'
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
		src.setAttribute('class', 'create-concept-prep url')
		prep.appendChild(src)
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
		let prep_holder
		if(el.parentNode.getAttribute('class') == 'create-concept'){ //if we're creating the first prep

			for(let _el of el.parentNode.children){ // we find the content-holder
				if(_el.getAttribute('class') == 'content-holder')
					_el.children[0].appendChild(prep) //and we append to its first child, the prep-holder
			}
			//prep_holder = el.parentNode.children[el.parentNode.children.length-1]
		//	prep_holder.appendChild(prep)
		}else if(el.parentNode.getAttribute('class') == 'create-prep'){
			el.parentNode.insertAdjacentElement('afterend', prep)
		}

	}else if(el.getAttribute('class') == 'create-add-concept'){

		let prep = createPrep('text')
		return prep

	}
}

let addNote = (el) => {
	//TODO
}

let removeNote = (el) => {
	//TODO
}

let removePrep = (el) => {
	el.parentNode.parentNode.removeChild(el.parentNode)
}

let addConcept = (el) => {

	let concept = document.createElement('div')
	concept.setAttribute('class', 'create-concept')

	//TODO add content-holder and prep-holder
	let content_holder = document.createElement('div')
	content_holder.setAttribute('class', 'content-holder')

	let name = document.createElement('input')
	name.setAttribute('class', 'create-concept-name')
	name.setAttribute('placeholder', 'concept name')
	concept.appendChild(name)

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

let parseLesson = () => {
	//TODO adapt parsing to new structure of edit-notes.pug (div.content-holder and div.prep-holder)
	lesson.concepts = []

	let dropdown = document.getElementById('course-list') != null ? document.getElementById('course-list').value :  document.getElementById('existing-course').innerText
	lesson.course = dropdown != 'new course' ? dropdown : document.getElementById('new-course').value
	lesson.title = document.getElementById('title').value

	lesson.path.local = document.getElementById('local-path').value
	//TODO remove remote path

	let concepts = document.getElementsByClassName('create-concept')
	for(let _co of concepts){ // for each concepts
		let concept = []
		concept.push(_co.childNodes[0].value) //find its name

		for(let note of _co.childNodes[5].childNodes[0].childNodes){ //go through all notes, first finding the 'content-holder' and then finding the 'prep-holder'
			if(note.hasChildNodes() && note.getAttribute('class') == 'create-prep'){

				let _cn = note.childNodes

				if(_cn[0].value == '' || _cn[0] == null) break //do not save empty fields

				if(_cn[0].getAttribute('kind') == 'txt')
					concept.push({'type':'txt', 'text': _cn[0].value})
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

let saveLesson = (_type) => {
	parseLesson()

	if(lesson.course == '' || lesson.title == ''){

		let _title = 'something is missing'
		let _error = 'it seems you haven\'t specified a course or a lesson title.'

		dialog.showErrorBox(_title, _error)
	}else{
		utils.setMessage('saved!', 'info')

		lesson.prefix = _type //either prep or in-class
		console.log(lesson);
	//		ipc.send('save-lesson', lesson)
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

/*
let setMessage = (_msg) => {
	let el = document.getElementById('msg-log')
	el.innerText = _msg
	el.style.opacity = 1
	setTimeout(() => {el.style.opacity = 0}, 2000)
}
*/



/***/ })
/******/ ]);