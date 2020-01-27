'use strict'

const ipc = require('electron').ipcRenderer

require('./sass/globals.scss')

import * as utils from './utils.js'

import Vue from 'vue'
import Board from './components/Board.vue'
import Dialog from './components/Dialog.vue'

const vm = new Vue({
	el: '#notice-board',
	template: '<Board/>',
	components: {
		Board
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

ipc.on('menu-create-subject', () => { window.vm.showCreate = true})
ipc.on('menu-remove', () => { window.vm.removeLesson()})
ipc.on('menu-export', () => { window.vm.exportLesson()})

ipc.on('msg-log', (event, data) => { utils.setMessage(data.msg, data.type)})
