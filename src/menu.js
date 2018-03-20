'use strict'

exports = module.exports = {}

const Menu = require('electron').Menu
const app = require('electron').app

let win

const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Create Lesson...',
				click() { win.webContents.send('menu-create') },
				accelerator: 'CmdOrCtrl+N'
			},
			{
				label: 'Open Lesson...',
				click() { win.webContents.send('menu-open') },
				accelerator: 'CmdOrCtrl+O'
			},
			{
				label: 'Edit lesson...',
				click() { win.webContents.send('menu-edit') },
				accelerator: 'CmdOrCtrl+E'
			},
			{
				label: 'Save lesson...',
				click() { win.webContents.send('menu-save') },
				accelerator: 'CmdOrCtrl+S'
			},
			{
				label: 'Export lesson...',
				click() { win.webContents.send('menu-export') },
				accelerator: 'CmdOrCtrl+Shift+E'
			},
			{
				label: 'Go home',
				click() { win.webContents.send('menu-exit') },
				accelerator: 'CmdOrCtrl+H'
			},
			{
				label:'Quit',
				click() { app.quit() },
				accelerator: 'CmdOrCtrl+Q'
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'}
		]
	},
	{
		label: 'Lesson',
		submenu: [
			{label: 'Toggle whiteboard',
				click() { win.webContents.send('menu-toggle') },
				accelerator: 'CmdOrCtrl+D'},
			{label: 'Clear whiteboard',
				click() { win.webContents.send('menu-clear-board')},
				accelerator: 'CmdOrCtrl+K'},
			{label: 'Show markers'}
		]
	},
	{
		label: 'View',
		submenu: [
			{role: 'reload'},
			{role: 'forcereload'},
			{role: 'toggledevtools'},
			{type: 'separator'},
			{role: 'resetzoom'},
			{role: 'zoomin'},
			{role: 'zoomout'},
			{type: 'separator'},
			{role: 'togglefullscreen'}
		]
	},
	{
		role: 'window',
		submenu: [
			{role: 'minimize'},
			{role: 'close'}
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'View Dev Website',
				click () { require('electron').shell.openExternal('https://github.com/periode/multimodal') }
			}
		]
	}
]

if (process.platform === 'darwin') {
	template.unshift({
		label: app.getName(),
		submenu: [
			{role: 'about'},
			{type: 'separator'},
			{role: 'services', submenu: []},
			{type: 'separator'},
			{role: 'hide'},
			{role: 'hideothers'},
			{role: 'unhide'},
			{type: 'separator'},
			{role: 'quit'}
		]
	})

	// Edit menu
	template[1].submenu.push(
		{type: 'separator'},
		{
			label: 'Speech',
			submenu: [
				{role: 'startspeaking'},
				{role: 'stopspeaking'}
			]
		}
	)

	// Window menu
	template[3].submenu = [
		{role: 'close'},
		{role: 'minimize'},
		{role: 'zoom'},
		{type: 'separator'},
		{role: 'front'}
	]
}

module.exports.init = (w) => {
	win = w
	const m = Menu.buildFromTemplate(template)

	Menu.setApplicationMenu(m)
}
