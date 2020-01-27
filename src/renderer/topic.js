'use strict'

const ipc = require('electron').ipcRenderer

import * as globals from './lesson/globals.js'
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

const msgbox = new Vue({
	el: '#dialog',
	template: '<Dialog/>',
	components: {
		'Dialog':Dialog
	}
})

//------------
//-- this allows us to access
//-- vue elements from non-vue scripts
//------------
window.vm = vm.$children[0]
window.msgbox = msgbox.$children[0]
window.jumpToTag = globals.jumpToTag

//------------
//-- shortcuts
//------------
ipc.on('menu-toggle-draw', () => {window.vm.toggleDraw() })
ipc.on('menu-clear-board', () => {window.vm.clearBoard() })
ipc.on('menu-save', () => { window.vm.saveTopic() })
ipc.on('menu-exit', () => {	window.vm.exitTopic() })
ipc.on('menu-edit', () => { window.vm.editTopic() })


ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})
