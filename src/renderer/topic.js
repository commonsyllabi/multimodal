'use strict'

const ipc = require('electron').ipcRenderer

import * as globals from './lesson/globals.js'
import * as drawing from './lesson/drawing.js'
import * as utils from './utils.js'

import Vue from 'vue'
import Topic from './components/Topic.vue'
import Dialog from './components/Dialog.vue'

window.currentNote = null
window.currentConcept = 0
window.offsets = [0,0]
window.isEdit = false

const vm = new Vue({
	el: '#writing-board',
	template: '<Topic/>',
	components: {
		Topic
	}
})

window.vm = vm.$children[0]

const msgbox = new Vue({
	el: '#dialog',
	template: '<Dialog/>',
	components: {
		'Dialog':Dialog
	}
})

window.msgbox = msgbox.$children[0]

window.jumpToTag = globals.jumpToTag

//------------
//-- shortcuts
//------------
ipc.on('menu-save', () => { window.vm.saveSession() })
ipc.on('menu-exit', () => {	window.vm.exitSession() })
ipc.on('menu-toggle-draw', () => {window.vm.toggleDraw() })
ipc.on('menu-clear-board', () => {window.vm.clearBoard() })

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})
