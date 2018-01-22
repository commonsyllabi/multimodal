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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return currentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCurrentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setCurrentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setCurrrentPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setCurrentConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentConcept; });


let currentNote = null
let currentConcept = 1

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (index) => {
	
	currentConcept = index

	let ns = document.getElementsByClassName('note')
	for(let n of ns){
		if(n.getAttribute('concept') == currentConcept)
			n.style.display = 'block'
		else
			n.style.display = 'none'
	}
}

let getCurrentConcept = () => {
	return currentConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.cssText = 'top: '+pos.y+'px; left: '+pos.x+'px;'
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getGridPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globals_js__ = __webpack_require__(0);




let position = {
	x : 0,
	y: 0
}

let getGridPosition = () =>{
	let normalized_pos = {
		x : 0,
		y : 0
	}

	normalized_pos.x = Math.floor(map(position.x, 0, 1800, 0, 18))*100
	normalized_pos.y = Math.floor(map(position.y, 0, 1000, 0, 25))*40

	return normalized_pos
}

let handle = (event) => {
	position.x = event.pageX
	position.y = event.pageY

	if(__WEBPACK_IMPORTED_MODULE_0__globals_js__["a" /* currentNote */] != null){
		Object(__WEBPACK_IMPORTED_MODULE_0__globals_js__["f" /* setCurrrentPosition */])(getGridPosition())
	}

}

let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typing_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__save_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globals_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawing_js__ = __webpack_require__(9);
__webpack_require__(3)
__webpack_require__(8)







let init = () => {

	__WEBPACK_IMPORTED_MODULE_4__drawing_js__["d" /* init */]()

	window.addEventListener('keydown', (e) => {
		__WEBPACK_IMPORTED_MODULE_1__typing_js__["a" /* handle */](e)
	})

	window.addEventListener('mousemove', (e) =>{
	
		__WEBPACK_IMPORTED_MODULE_0__mouse_js__["b" /* handle */](e)

		__WEBPACK_IMPORTED_MODULE_4__drawing_js__["b" /* draw */](e)
	})

	window.addEventListener('mousedown', (e) => {
		__WEBPACK_IMPORTED_MODULE_4__drawing_js__["a" /* beginDraw */](e)
	})

	window.addEventListener('mouseup', (e) => {
		__WEBPACK_IMPORTED_MODULE_4__drawing_js__["c" /* endDraw */](e)
	})

}


window.init = init
window.saveSession = __WEBPACK_IMPORTED_MODULE_2__save_js__["a" /* saveSession */]
window.switchConcept = __WEBPACK_IMPORTED_MODULE_3__globals_js__["d" /* setCurrentConcept */]


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals_js__ = __webpack_require__(0);





const ESC = 27
const BCK = 8
const SPC = 32
const RET = 13
const TAB = 9

let currentNote = null

let handle = (e) => {
	currentNote = Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["c" /* getCurrentNote */])()

	if(currentNote == null && e.keyCode != SPC)
		return
	

	switch (e.keyCode) {
	case SPC:
		if(currentNote == null)
			newNote()
		else
			handleKey('\u00A0')
		break
	case BCK:
		eraseCharacter()
		break
	case ESC:
		endNote()
		break
	case TAB:
		handleKey('\u00A0\u00A0\u00A0\u00A0')
		break
	case RET:
		handleKey('\n')
		break
	default:
		if(e.keyCode > 47)
			handleKey(e.key)
		break
	}


}

let newNote = () => {
	let cn = document.createElement('div')
	cn.setAttribute('class', 'note')
	cn.setAttribute('concept', Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["b" /* getCurrentConcept */])())
	cn.setAttribute('id', 'current')
	cn.innerText = '_'
	document.getElementById('writing-board').append(cn)

	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["e" /* setCurrentNote */])(cn)
	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["f" /* setCurrrentPosition */])(__WEBPACK_IMPORTED_MODULE_0__mouse_js__["a" /* getGridPosition */]())
}

let endNote = () => {
	// if current note has no text
	if(currentNote.innerText == '_')
		document.getElementById('container').removeChild(currentNote)

	currentNote.removeAttribute('id')
	currentNote.innerText = currentNote.innerText.slice(0, -1)
	currentNote.onclick =(evt) => {
		evt.target.setAttribute('id', 'current')
		evt.target.innerText += '_'
		Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["e" /* setCurrentNote */])(evt.target)
	}
	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["e" /* setCurrentNote */])(null)
}

let handleKey = (char) => {
	if(char == 'Meta') return
	currentNote.innerText = currentNote.innerText.slice(0, -1)
	currentNote.innerText += char + '_'
}

let eraseCharacter = () => {
	currentNote.innerText = currentNote.innerText.slice(0, -2) + '_'
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveSession; });


const ipc = __webpack_require__(6).ipcRenderer

let saveSession = () => {
	let data = parseDocument()
	
	if(data.length == 0){
		console.log('nothing found on the document!')
		return
	}

	ipc.send('save-session', data)
}

let parseDocument = () => {
	let el_notes = document.getElementsByClassName('note')
console.log(el_notes)	
	let notes = []
	for(let n of el_notes)
		notes.push(n.innerText)

	return notes
}




/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beginDraw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return endDraw; });
let cnv, ctx
let isDrawing = false

let init = () => {
	cnv = document.getElementById('drawing-board')
	cnv.width = 1800
	cnv.height = 1000
	ctx = cnv.getContext('2d')
	ctx.lineWidth = 5
	ctx.lineJoin = 'round'
	ctx.lineCap = 'round'
	ctx.strokeStyle = 'red'
}

let beginDraw = (e) => {

	isDrawing = true
	ctx.moveTo(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
	
	ctx.beginPath()
}

let draw = (e) => {
	if(!isDrawing) return

	//ctx.beginPath()
	ctx.lineTo(e.pageX-cnv.offsetLeft, e.pageY-cnv.offsetTop)
	//ctx.closePath()
	ctx.stroke()
}

let endDraw = (e) => {
	isDrawing = false
}




/***/ })
/******/ ]);