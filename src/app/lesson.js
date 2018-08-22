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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

throw new Error("Module build failed: ModuleNotFoundError: Module not found: Error: Can't resolve './assets/Inter-UI/Inter-UI-Bold.woff' in '/Users/Pierre/Code/multimodal/src/renderer/sass'\n    at factoryCallback (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/Compilation.js:276:40)\n    at factory (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:235:20)\n    at resolver (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:60:20)\n    at asyncLib.parallel (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:127:20)\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:3874:9\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:473:16\n    at iteratorCallback (/Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:1048:13)\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:958:16\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:3871:13\n    at resolvers.normal.resolve (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:119:22)\n    at onError (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:65:10)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at runAfter (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:158:4)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:146:3)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)\n    at /Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/UnsafeCachePlugin.js:40:4\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at runAfter (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:158:4)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:146:3)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:144:11)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:249:35)\n    at resolver.doResolve.createInnerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:44:6)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at afterInnerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:168:10)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleNotFoundError: Module not found: Error: Can't resolve './assets/Inter-UI/Inter-UI-Bold.woff' in '/Users/Pierre/Code/multimodal/src/renderer/sass'\n    at factoryCallback (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/Compilation.js:276:40)\n    at factory (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:235:20)\n    at resolver (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:60:20)\n    at asyncLib.parallel (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:127:20)\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:3874:9\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:473:16\n    at iteratorCallback (/Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:1048:13)\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:958:16\n    at /Users/Pierre/Code/multimodal/node_modules/async/dist/async.js:3871:13\n    at resolvers.normal.resolve (/Users/Pierre/Code/multimodal/node_modules/webpack/lib/NormalModuleFactory.js:119:22)\n    at onError (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:65:10)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at runAfter (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:158:4)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:146:3)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)\n    at /Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/UnsafeCachePlugin.js:40:4\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at runAfter (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:158:4)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:146:3)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)\n    at innerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:144:11)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:249:35)\n    at resolver.doResolve.createInnerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:44:6)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at afterInnerCallback (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/Resolver.js:168:10)\n    at loggingCallbackWrapper (/Users/Pierre/Code/multimodal/node_modules/enhanced-resolve/lib/createInnerCallback.js:31:19)\n    at next (/Users/Pierre/Code/multimodal/node_modules/tapable/lib/Tapable.js:252:11)");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return initTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return jumpToTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return currentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCurrentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return setCurrentNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return setCurrrentPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return setCurrentConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getPreviousConcept; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawing_js__ = __webpack_require__(7);




let currentNote = null
let currentConcept = 0
let previousConcept = 0

let initTags = () => {
	let els = document.getElementsByClassName('prep')
	for(let e of els){
		let t = e.getAttribute('tag')
		if(t != '' && t != null)
			e.innerHTML += '<sup class="prep-tag-anchor" onclick="jumpToTag(\''+t+'\')" title="'+t+'">⮹</sup>'
		
	}

}

let jumpToTag = (_tag) => {
	let concepts = document.getElementsByClassName('concept')

	for(let co of concepts)
		if(co.getAttribute('tag') == _tag)
			setCurrentConcept(co.getAttribute('concept'))

}

let setCurrentNote = (el) => {
	currentNote = el
}

let getCurrentNote = () => {
	return currentNote
}

let setCurrentConcept = (index) => {

	previousConcept = currentConcept
	currentConcept = index ? index : 0

	let cs = document.getElementsByClassName('concept')
	for(let c of cs){
		c.setAttribute('class', 'concept concept-btn')
		if(c.getAttribute('concept') == currentConcept)
			c.setAttribute('class', 'concept concept-btn current-concept')
	}

	let ns = document.getElementsByClassName('note')
	for(let n of ns){
		if(n.getAttribute('concept') == currentConcept){
			n.style.opacity = 1
			n.style.pointerEvents = 'auto'
		}else{
			n.style.opacity = 0
			n.style.pointerEvents = 'none'
		}
	}

	__WEBPACK_IMPORTED_MODULE_0__drawing_js__["f" /* selectCanvas */](currentConcept)
}

let getCurrentConcept = () => {
	return currentConcept
}

let getPreviousConcept = () => {
	return previousConcept
}

let setCurrrentPosition = (pos) => {
	currentNote.style.top = pos.y+'px'
	currentNote.style.left = pos.x+'px'
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getGridPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__globals_js__ = __webpack_require__(5);




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
		Object(__WEBPACK_IMPORTED_MODULE_0__globals_js__["i" /* setCurrrentPosition */])(getGridPosition())
	}

}

let map = (value, start_1, end_1, start_2, end_2) => {
	return start_2 + (end_2 - start_2) * (value - start_1) / (end_1 - start_1)
}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beginDraw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return endDraw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return toggleDraw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return selectCanvas; });
let canvases, cnv, ctx, ctn, toggle_btn
let contexts = []
let isDrawing = false
let isDrawMode = false
let prevx, prevy

let init = () => {
	canvases = document.getElementsByClassName('drawing-board')
	ctn = document.getElementsByClassName('lessons-container')[0]
	toggle_btn = document.getElementsByClassName('toggle-draw')[0]

	for(let i in canvases){
		if(i == 'length') break
		setupCanvas(i)
	}

	selectCanvas(0)
}

let setupCanvas = (i) => {

	contexts[i] = canvases[i].getContext('2d')
	canvases[i].width = 1800
	canvases[i].height = 1000
	contexts[i].lineWidth = 5
	contexts[i].lineJoin = 'round'
	contexts[i].lineCap = 'round'
	contexts[i].strokeStyle = '#ff9933'


	contexts[i].beginPath()
}

let selectCanvas = (_currentConcept) => {

	for(let i in canvases){
		if(i == 'length') break
		if(canvases[i].getAttribute('concept') == _currentConcept){
			canvases[i].setAttribute('class', 'drawing-board active')
			cnv = canvases[i]
			ctx = contexts[i]
		}else{
			canvases[i].setAttribute('class', 'drawing-board inactive')
		}
	}
}

let beginDraw = (e) => {
	if(!isDrawMode) return

	isDrawing = true
	ctx.moveTo(e.pageX - cnv.offsetLeft, e.pageY - cnv.offsetTop)
	prevx = e.pageX - cnv.offsetLeft
	prevy = e.pageY - cnv.offsetTop
}

let draw = (e) => {
	if(!isDrawing || !isDrawMode) return

	let x = (prevx + e.pageX-cnv.offsetLeft)/2
	let y = (prevy + e.pageY-cnv.offsetTop)/2

	ctx.quadraticCurveTo(e.pageX-cnv.offsetLeft, e.pageY-cnv.offsetTop, x, y)

	prevx = e.pageX - cnv.offsetLeft
	prevy = e.pageY - cnv.offsetTop
	ctx.stroke()
}

let endDraw = () => {
	if(!isDrawMode) return
	isDrawing = false
}

let clearBoard = () => {
	ctx.beginPath()
	ctx.clearRect(0, 0, cnv.width, cnv.height)
}

let toggleDraw = () => {
	isDrawMode = !isDrawMode
	if(isDrawMode){
		cnv.setAttribute('class', 'drawing-board active')
		toggle_btn.innerText = 'draw'
		cnv.style.zIndex = 1
		ctn.style.zIndex = 0
	}else{
		cnv.setAttribute('class', 'drawing-board')
		toggle_btn.innerText = 'write'
		cnv.style.zIndex = 0
		ctn.style.zIndex = 1
	}
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lesson_mouse_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lesson_typing_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lesson_save_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__utils_js__);
'ust strict'

const ipc = __webpack_require__(0).ipcRenderer

__webpack_require__(2)
__webpack_require__(3)
__webpack_require__(4)








let init = () => {

	__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["e" /* init */]()

	window.ondblclick = () => {

		let els = document.getElementsByClassName('written')
		for(let el of els)
			el.removeAttribute('id')

		if(__WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__["a" /* currentNote */] == null)
			__WEBPACK_IMPORTED_MODULE_1__lesson_typing_js__["c" /* newNote */]()
		else
			__WEBPACK_IMPORTED_MODULE_1__lesson_typing_js__["a" /* endNote */]()
	}

	window.addEventListener('keydown', (e) => {
		__WEBPACK_IMPORTED_MODULE_1__lesson_typing_js__["b" /* handle */](e)
	})

	window.addEventListener('mousemove', (e) =>{
		__WEBPACK_IMPORTED_MODULE_0__lesson_mouse_js__["b" /* handle */](e)
		__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["c" /* draw */](e)
	})

	window.addEventListener('mousedown', (e) => {
		__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["a" /* beginDraw */](e)
	})

	window.addEventListener('mouseup', () => {
		__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["d" /* endDraw */]()
	})

	__WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__["g" /* setCurrentConcept */]()
	__WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__["e" /* initTags */]();
}

window.init = init
window.saveSession = __WEBPACK_IMPORTED_MODULE_2__lesson_save_js__["b" /* saveSession */]
window.exitLesson = __WEBPACK_IMPORTED_MODULE_2__lesson_save_js__["a" /* exitLesson */]
window.switchConcept = __WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__["g" /* setCurrentConcept */]
window.jumpToTag = __WEBPACK_IMPORTED_MODULE_3__lesson_globals_js__["f" /* jumpToTag */]
window.clearBoard = __WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["b" /* clearBoard */]
window.toggleDraw = __WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["g" /* toggleDraw */]

ipc.on('menu-save', () => {window.saveSession()})
ipc.on('menu-exit', () => {window.exitLesson()})
ipc.on('menu-toggle', () => {__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["g" /* toggleDraw */]()})
ipc.on('menu-clear-board', () => {__WEBPACK_IMPORTED_MODULE_4__lesson_drawing_js__["b" /* clearBoard */]()})

ipc.on('msg-log', (event, data) => { __WEBPACK_IMPORTED_MODULE_5__utils_js__["setMessage"](data.msg, data.type)})


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return newNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return endNote; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__globals_js__ = __webpack_require__(5);





const ESC = 27
const UP = 38
const LEFT = 37
const RIGHT = 39
const DOWN = 40

let currentNote = null

let handle = (e) => {
	currentNote = Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["c" /* getCurrentNote */])()

	let index
	switch(e.keyCode){
	case UP: //concept right before
		if(currentNote == null){
			index = Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["b" /* getCurrentConcept */])()
			index = index - 1 >= 0 ? index - 1 : 0
			Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["g" /* setCurrentConcept */])(index)
		}
		break
	case DOWN: //concept right after
		if(currentNote == null){
			index = Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["b" /* getCurrentConcept */])()
			let len = document.getElementsByClassName('concept').length-1
			index = index + 1 < len ? index + 1 : len
			Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["g" /* setCurrentConcept */])(index)
		}
		break
	case LEFT: // previous concept
		if(currentNote == null){
			index = Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["d" /* getPreviousConcept */])()
			Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["g" /* setCurrentConcept */])(index)
		}
		break
	case RIGHT: // jump to the whiteboard
		if(currentNote == null){
			let index = document.getElementsByClassName('concept').length-1
			Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["g" /* setCurrentConcept */])(index)
		}
	case ESC:
		endNote()
		break
	default:
		break
	}
}

let newNote = () => {
	let cn = document.createElement('textarea')
	cn.setAttribute('type', 'text')
	cn.setAttribute('class', 'note written')
	cn.setAttribute('concept', Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["b" /* getCurrentConcept */])())
	cn.setAttribute('id', 'current')
	cn.addEventListener("input", () => { OnInput(cn)}, false)
	document.getElementById('writing-board').append(cn)

	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["h" /* setCurrentNote */])(cn)
	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["i" /* setCurrrentPosition */])(__WEBPACK_IMPORTED_MODULE_0__mouse_js__["a" /* getGridPosition */]())

	cn.focus()
}

let OnInput = (el) => {
	el.style.height = 'auto';
  el.style.height = (el.scrollHeight) + 'px';
}

let endNote = () => {
	//if note is blank
	if(currentNote != null && currentNote.value == ''){
		document.getElementById('writing-board').removeChild(currentNote)
	}else{
		currentNote.style.height = (currentNote.scrollHeight)+'px'
		// currentNote.style.overflowY = 'hidden'
	}

	currentNote.blur()
	currentNote.removeAttribute('id')
	currentNote.onclick =(evt) => {
		if(evt.target.getAttribute('id') == 'current') return
		evt.target.setAttribute('id', 'current')
		Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["h" /* setCurrentNote */])(evt.target)
	}
	Object(__WEBPACK_IMPORTED_MODULE_1__globals_js__["h" /* setCurrentNote */])(null)
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return saveSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exitLesson; });


const ipc = __webpack_require__(0).ipcRenderer

let saveSession = () => {
	let lesson = parseDocument()
	lesson.prefix = 'in-class'

	if(lesson.length == 0){
		console.log('nothing found on the document!')
		return
	}

	ipc.send('save-lesson', lesson)
}

let parseDocument = () => {
	let lesson = {
		'course': {
			'path':'',
			'year':'',
			'name':'',
		},
		'title': '',
		'contents':[]
	}

	lesson.course.name = document.getElementById('course-name').innerHTML
	lesson.course.year = document.getElementById('course-year').innerHTML
	lesson.course.path = document.getElementById('course-path').innerHTML
	lesson.title =  document.title.split('|')[1].trim()
	lesson.concepts = []

	let _concepts = document.getElementsByClassName('concept')
	let _prep = document.getElementsByClassName('prep')
	let _written = document.getElementsByClassName('written')

	for(let i in _concepts){
		if(i == 'length') break

		let ct = _concepts[i].innerText
		let tc = ct.substring(ct.indexOf('.')+2, ct.length) //trim the concept title

		let content =  {
			'concept': tc,
			'tag': _concepts[i].getAttribute('tag'),
			'prep':[],
			'notes':[]
		}

		//going through all the prep notes
		//and appending them to content.prep
		//as txt, url or img objects
		for(let j in _prep){
			if(j == 'length') break

			if(_prep[j].getAttribute('concept') == i){
				if(_prep[j].childNodes[0].tagName == 'A'){
					content.prep.push({
						'type':'url',
						'url':_prep[j].childNodes[0].getAttribute('href'),
						'text':_prep[j].childNodes[0].innerText
					})
				}else if(_prep[j].childNodes[0].tagName == 'IMG'){
					content.prep.push({
						'type':'img',
						'src':_prep[j].childNodes[0].getAttribute('src'),
						'name':_prep[j].childNodes[0].getAttribute('name')
					})
				}else if(_prep[j].childNodes[0].tagName == 'VIDEO'){
					content.prep.push({
						'type':'vid',
						'src':_prep[j].childNodes[0].childNodes[0].getAttribute('src'),
						'name':_prep[j].childNodes[0].childNodes[0].getAttribute('name')
					})
				} else{
					content.prep.push({
						'type':'txt',
						'text':_prep[j].innerText,
						'tag': _prep[j].getAttribute('tag')
					})
				}
			}
		}

		//this line removes the first element of the prep which is the title of the concept
		content.prep.splice(0, 1)

		for(let k in _written){
			if(k == 'length') break
			if(_written[k].getAttribute('concept') == i)
				content.notes.push(_written[k].value)
		}

		lesson.concepts.push(content)
	}

	console.log('saving:',lesson)

	return lesson
}

let exitLesson = () => {
	console.log('leaving lesson')
	ipc.send('exit-home', {'coming':'back'})
}




/***/ })
/******/ ]);