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
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(7);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 4:
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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("6c410b08", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./globals.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./globals.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Regular.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Bold.woff\") format(\"woff\");\n  font-weight: bold;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Italic.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: italic;\n}\n\n::-webkit-scrollbar {\n  display: none;\n}\n\nbody {\n  font-family: 'Inter UI', 'Trebuchet MS';\n  background-color: #202020;\n  color: #eeeeee;\n  overflow-x: hidden;\n  margin: 0px;\n  padding: 0px;\n}\n\na {\n  color: #e77607;\n}\n\na:hover {\n  color: #b25900;\n}\n\nbutton {\n  background-color: #202020;\n  color: #eeeeee;\n  border: 1px solid #eeeeee;\n}\n\n.msg-log {\n  float: right;\n  height: 100%;\n  margin-right: 3%;\n  padding-right: 5px;\n  padding-left: 5px;\n  font-weight: bold;\n  font-size: 2.2em;\n  opacity: 0;\n  background-color: #333333;\n  color: #f0f0f0;\n  transition: opacity 0.5s ease-in-out;\n}\n\n.info {\n  background-color: darkseagreen;\n}\n\n.error {\n  background-color: crimson;\n}\n\n.metadata {\n  visibility: hidden;\n}\n\ndiv,\nimg {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}", ""]);

// exports


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_welcome_js__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_create_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utils_js__);


const ipc = __webpack_require__(2).ipcRenderer

__webpack_require__(5)
__webpack_require__(69)
__webpack_require__(71)





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

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("79de8870", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./welcome.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./welcome.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Regular.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Bold.woff\") format(\"woff\");\n  font-weight: bold;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Italic.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: italic;\n}\n\n::-webkit-scrollbar {\n  display: none;\n}\n\nbody {\n  font-family: 'Inter UI', 'Trebuchet MS';\n  background-color: #202020;\n  color: #eeeeee;\n  overflow-x: hidden;\n  margin: 0px;\n  padding: 0px;\n}\n\na {\n  color: #e77607;\n}\n\na:hover {\n  color: #b25900;\n}\n\nbutton {\n  background-color: #202020;\n  color: #eeeeee;\n  border: 1px solid #eeeeee;\n}\n\n.msg-log {\n  float: right;\n  height: 100%;\n  margin-right: 3%;\n  padding-right: 5px;\n  padding-left: 5px;\n  font-weight: bold;\n  font-size: 2.2em;\n  opacity: 0;\n  background-color: #333333;\n  color: #f0f0f0;\n  transition: opacity 0.5s ease-in-out;\n}\n\n.info {\n  background-color: darkseagreen;\n}\n\n.error {\n  background-color: crimson;\n}\n\n.metadata {\n  visibility: hidden;\n}\n\ndiv,\nimg {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n\n.courses-container {\n  overflow-y: auto;\n}\n\n.buttons-container,\n.courses-container {\n  position: absolute;\n  width: 50%;\n  height: 100%;\n  float: left;\n}\n\n.buttons-container {\n  right: 0px;\n}\n\n.lessons {\n  padding: 5%;\n  margin-bottom: 5%;\n}\n\n.inter-class-title {\n  width: 100%;\n  font-weight: bold;\n  font-size: 2em;\n}\n\n.welcome-lesson,\n.inter-btn-main {\n  border: none;\n  color: #eeeeee;\n  background-color: #202020;\n  font-family: 'Inter UI';\n  font-size: 1.2em;\n  cursor: pointer;\n}\n\n.welcome-lesson {\n  border: 2px solid #202020;\n  padding: 5px;\n}\n\n.welcome-lesson:hover {\n  border-color: #eeeeee;\n  font-weight: bold;\n}\n\n.selected {\n  background-color: #eeeeee;\n  color: #202020;\n  border-color: #eeeeee;\n  font-weight: bold;\n}\n\n.inter-btn:hover,\n.inter-btn-main:hover {\n  background-color: #eeeeee;\n  color: #202020;\n}\n\n.inter-btn-main {\n  position: relative;\n  display: inline;\n  width: auto;\n  font-size: 2.2em;\n}\n\n@media (max-width: 1300px) {\n  .inter-btn-main {\n    font-size: 1.5em;\n  }\n}\n\n.inter-btn-main:disabled {\n  cursor: default;\n  background-color: #202020;\n  color: #202020;\n}", ""]);

// exports


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(1).default
var update = add("5a3adc70", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./create.scss", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/resolve-url-loader/index.js!../../../node_modules/sass-loader/lib/loader.js?sourceMap!./create.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Regular.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Bold.woff\") format(\"woff\");\n  font-weight: bold;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Inter UI';\n  src: url(\"/fonts/Inter-UI-Italic.woff\") format(\"woff\");\n  font-weight: normal;\n  font-style: italic;\n}\n\n::-webkit-scrollbar {\n  display: none;\n}\n\nbody {\n  font-family: 'Inter UI', 'Trebuchet MS';\n  background-color: #202020;\n  color: #eeeeee;\n  overflow-x: hidden;\n  margin: 0px;\n  padding: 0px;\n}\n\na {\n  color: #e77607;\n}\n\na:hover {\n  color: #b25900;\n}\n\nbutton {\n  background-color: #202020;\n  color: #eeeeee;\n  border: 1px solid #eeeeee;\n}\n\n.msg-log {\n  float: right;\n  height: 100%;\n  margin-right: 3%;\n  padding-right: 5px;\n  padding-left: 5px;\n  font-weight: bold;\n  font-size: 2.2em;\n  opacity: 0;\n  background-color: #333333;\n  color: #f0f0f0;\n  transition: opacity 0.5s ease-in-out;\n}\n\n.info {\n  background-color: darkseagreen;\n}\n\n.error {\n  background-color: crimson;\n}\n\n.metadata {\n  visibility: hidden;\n}\n\ndiv,\nimg {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n\n.create-container {\n  width: 90%;\n  margin-left: 5%;\n  margin-bottom: 100px;\n  overflow: auto;\n}\n\n.create-course {\n  width: 95%;\n  height: auto;\n  overflow: auto;\n  margin-top: 2%;\n  padding: 2%;\n  text-align: left;\n  border: 3px solid #eeeeee;\n}\n\n.create-course h1 {\n  margin-left: 3%;\n}\n\n.create-lesson {\n  margin: 10px;\n  font-size: 20px;\n}\n\n.create-lesson-title {\n  font-size: 64px;\n  color: #333333;\n  border: none;\n  border-bottom: 2px solid #333333;\n  padding: 2px;\n  width: 70%;\n}\n\n@media (max-width: 1300px) {\n  .create-lesson-title {\n    font-size: 48px;\n  }\n}\n\n.create-lesson-save:hover,\n.create-lesson-exit:hover {\n  background-color: #eeeeee;\n  color: #202020;\n}\n\n.create-new-course {\n  font-size: 36px;\n  padding: 0px 15px 5px 15px;\n  float: right;\n  margin-left: 5px;\n  background-color: #eeeeee;\n  color: #202020;\n  border: none;\n  cursor: pointer;\n}\n\n/* COURSE WINDOW */\n\n.course-name,\n.course-year,\n.course-path {\n  width: 94%;\n  font-size: 24px;\n  height: 48px;\n  display: block;\n  float: left;\n  margin: 3%;\n}\n\n.course-path {\n  width: 70%;\n  margin: 10px;\n  float: left;\n}\n\n.create-course-save {\n  float: left;\n}\n\n.show-local-path {\n  width: 85%;\n  font-size: 36px;\n}\n\n.create-local-path {\n  display: inline;\n  border: none;\n  font-size: 24px;\n  height: 48px;\n  padding: 5px;\n  margin-left: 5px;\n  margin-top: 3%;\n  background-color: #eeeeee;\n  color: #202020;\n}\n\n/* ---------------------------- */\n\n.edit-existing-course {\n  width: 100%;\n  text-align: right;\n  font-size: 48px;\n  font-weight: bold;\n  background-color: #202020;\n  color: #eeeeee;\n}\n\n.create-btn {\n  float: right;\n  height: 32px;\n  cursor: pointer;\n}\n\n.create-courses-list {\n  font-size: 36px;\n  background-color: #202020;\n  color: #eeeeee;\n  border: 2px solid #eeeeee;\n  width: 50%;\n  cursor: pointer;\n}\n\n.create-path {\n  padding: 10px;\n}\n\n.content-holder {\n  width: 100%;\n  height: auto;\n  overflow: auto;\n}\n\n.prep-holder {\n  width: 50%;\n  float: left;\n}\n\n.prep-holder-create {\n  width: 100%;\n}\n\n.create-add-note-holder {\n  margin-left: 5%;\n}\n\n.notes-holder,\n.writeups-holder {\n  width: 20%;\n  float: left;\n  border-left: 2px solid #eeeeee;\n}\n\n.notes-holder textarea,\n.writeups-holder textarea {\n  width: 90%;\n  margin-left: 5%;\n  background-color: #eeeeee;\n  font-size: 0.8em;\n  font-style: italic;\n}\n\ninput[type=text],\ntextarea {\n  border: none;\n  border-bottom: 1px solid #eeeeee;\n}\n\ninput:disabled {\n  float: left;\n  background-color: #202020;\n}\n\n.create-concept {\n  float: left;\n  margin: 1% 0 1% 0;\n  padding: 10px;\n  padding-bottom: 5px;\n  border: 2px solid #eeeeee;\n  width: 90%;\n}\n\n.create-concept-prep {\n  font-size: 24px;\n  margin-right: 10px;\n  width: 100%;\n}\n\n.create-concept-tag {\n  width: 40%;\n}\n\n.create-concept-note,\n.create-concept-writeup {\n  font-size: 24px;\n  width: 100%;\n}\n\n.create-concept-note textarea,\n.create-concept-note textarea {\n  font-size: 24px;\n}\n\n.create-concept-name {\n  color: #333333;\n  border: none;\n  border-bottom: 2px solid #eeeeee;\n  width: 60%;\n  float: left;\n  font-size: 48px;\n  margin-bottom: 10px;\n}\n\n.create-concept-tag {\n  color: #333333;\n  border: none;\n  border-bottom: 1px solid #eeeeee;\n  width: 50%;\n  float: left;\n  font-size: 24px;\n  margin-bottom: 20px;\n}\n\n.create-prep {\n  margin-bottom: 10px;\n  width: 95%;\n  margin-left: 20px;\n}\n\n.url {\n  font-style: italic;\n}\n\n.create-add-holder {\n  float: left;\n  margin-bottom: 2%;\n  width: 100%;\n}\n\n.create-add-remove-holder {\n  float: right;\n}\n\n.create-add-prep,\n.create-remove-prep,\n.create-add-note,\n.create-remove-note,\n.create-add-writeup,\n.create-remove-writeup {\n  border: none;\n  margin: 5px;\n  font-size: 18px;\n  color: #eeeeee;\n  background-color: #202020;\n  border: 2px solid #eeeeee;\n  cursor: pointer;\n}\n\n.create-concept-buttons {\n  width: 100%;\n  height: 20px;\n}\n\n.create-add-concept,\n.create-remove-concept,\n.create-btn {\n  float: right;\n  border: none;\n  width: 30px;\n  height: 30px;\n  font-size: 15px;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 5px;\n  margin-right: 5px;\n  color: #eeeeee;\n  background-color: #202020;\n  border: 2px solid #eeeeee;\n  cursor: pointer;\n}\n\n.create-add-concept:hover,\n.create-remove-concept:hover,\n.create-add-note:hover,\n.create-remove-note:hover,\n.create-add-prep:hover,\n.create-remove-prep:hover {\n  background-color: #eeeeee;\n  color: #202020;\n  cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return openLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return editLesson; });
/* unused harmony export editNotesLesson */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return setLesson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return exportLesson; });


const ipc = __webpack_require__(2).ipcRenderer
const {dialog} = __webpack_require__(2).remote
const utils = __webpack_require__(4)

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
		ipc.send('remove-lesson', current)
}

let editLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('edit-lesson', current)
}

let exportLesson = () => {
	if(current.course == ''){
		utils.setMessage('no course selected!', 'error')
		return
	}
	ipc.send('export-lesson', current)
}




/***/ }),

/***/ 74:
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


const {dialog} = __webpack_require__(2).remote
const remote = __webpack_require__(2).remote
const ipc = __webpack_require__(2).ipcRenderer
const utils = __webpack_require__(4)

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
			'id': document.getElementById('existing-course').getAttribute('course-id')
		}
	}else{ // or creating the new one
		let dropdown = document.getElementById('course-list').selectedOptions[0]

		lesson.course = {
			'name': dropdown.value,
			'created': dropdown.getAttribute('created'),
			'path': dropdown.getAttribute('path'),
			'id': dropdown.getAttribute('course-id')
		}
	}

	// --  GET LESSON INFORMATION
	lesson.name = document.getElementById('name').value
	lesson.id = document.getElementById('name').getAttribute('lesson-id')

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

/******/ });