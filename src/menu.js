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
				label: 'Create Subject...',
				click() { win.webContents.send('menu-create-subject') },
				accelerator: 'CmdOrCtrl+N'
			},
			{
				label: 'Open Subject...',
				click() { win.webContents.send('menu-open-topic') },
				accelerator: 'CmdOrCtrl+O'
			},
			{
				label: 'Edit Topic...',
				click() { win.webContents.send('menu-edit') },
				accelerator: 'CmdOrCtrl+E'
			},
			{
				label: 'Save Topic...',
				click() { win.webContents.send('menu-save') },
				accelerator: 'CmdOrCtrl+S'
			},
			{
				label: 'Export lesson...',
				click() { win.webContents.send('menu-export') },
				accelerator: 'CmdOrCtrl+Shift+E'
			},
			{label: 'Toggle drawing',
				click() { win.webContents.send('menu-toggle-draw') },
				accelerator: 'CmdOrCtrl+D'
			},
			{label: 'Clear whiteboard',
				click() { win.webContents.send('menu-clear-board')},
				accelerator: 'CmdOrCtrl+K'
			},
			{
				label: 'Go to board',
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
		label: 'Topic',
		submenu: [
			{label: 'Toggle drawing',
				click() { win.webContents.send('menu-toggle-draw') },
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
			{label: "Back",
				click() { win.history.back() }
			},
			{label: "Forward",
				click() { win.history.forward() }
			},
			{role: 'reload',
				accelerator: 'CmdOrCtrl+Shift+R'},
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
