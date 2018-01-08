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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typing_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typing_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__typing_js__);
__webpack_require__(1)



let init = () => {
	window.addEventListener('keydown', (e) => {
		__WEBPACK_IMPORTED_MODULE_0__typing_js__["handleKey"](e)
	})
}


window.init = init


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = {}

const ESC = 69
const BCK = 66
const SPC = 32

let currentNote = null

exports.handleKey = (e) => {
  let charCode = e.key.charCodeAt(0)

  if(currentNote == null && charCode != SPC){
    console.log('key pressed',e.key,'with charCode',charCode, 'but no note created, ignoring...')
    return
  }

  if(charCode == SPC)
    if(currentNote == null)
      newNote()
    else
      handleKey("\u00A0")

  if(charCode > 47 && charCode < 58 || charCode > 96 && charCode < 123)
    handleKey(e.key)

  if(charCode == BCK)
    eraseCharacter()

  if(charCode == ESC)
    endNote()
}

let newNote = () => {
	currentNote = document.createElement('div')
	currentNote.setAttribute('class', 'note')
	currentNote.setAttribute('id', 'current')
	document.body.append(currentNote)
}

let endNote = () => {
	currentNote.removeAttribute('id')
	currentNote = null
}

let handleKey = (char) => {
	currentNote.innerText += char
}

let eraseCharacter = () => {
  currentNote.innerText = currentNote.innerText.slice(0, -1)
}


/***/ })
/******/ ]);