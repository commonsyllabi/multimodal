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
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */,
/* 3 */,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__welcome_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_js__ = __webpack_require__(12);





window.openLesson = __WEBPACK_IMPORTED_MODULE_0__welcome_js__["b" /* openLesson */]
window.createLesson = __WEBPACK_IMPORTED_MODULE_0__welcome_js__["a" /* createLesson */]

window.selectCourse = __WEBPACK_IMPORTED_MODULE_1__create_js__["e" /* selectCourse */]
window.addNote = __WEBPACK_IMPORTED_MODULE_1__create_js__["b" /* addNote */]
window.removeNote = __WEBPACK_IMPORTED_MODULE_1__create_js__["d" /* removeNote */]
window.addConcept = __WEBPACK_IMPORTED_MODULE_1__create_js__["a" /* addConcept */]
window.removeConcept = __WEBPACK_IMPORTED_MODULE_1__create_js__["c" /* removeConcept */]


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return openLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLesson; });


const ipc = __webpack_require__(1).ipcRenderer

let openLesson = (course_name, lesson_name) => {
	ipc.send('open-lesson', {"course":course_name, "lesson": lesson_name})
}

let createLesson = () => {
	ipc.send('create-lesson')
}




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return selectCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addConcept; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return removeConcept; });


let lesson = {
	'course' : '',
	'title' : '',
	'concepts': []
}

let selectCourse = (name) => {
	if(name == 'new course')
		document.getElementById('new-course').style.display = 'block';
	else if(name == 'custom')
		lesson.course = document.getElementById('new-course').value
	else{
		lesson.course = name
		document.getElementById('new-course').style.display = 'none';
	}

	console.log('current course:', lesson.course)
}

let addNote = (el) => {

}

let removeNote = (el) => {

}

let addConcept = (el) => {

}

let removeConcept = (el) => {

}




/***/ })
/******/ ]);