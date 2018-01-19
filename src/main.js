const electron = require('electron')
const ipc = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

let createWindow = () => {
	mainWindow = new BrowserWindow({width: 1800, height: 1000, icon: __dirname + '/icon-tmp.png'})

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../app/index.html'),
		protocol: 'file',
		slashes: true
	}))

	mainWindow.toggleDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

ipc.on('save-session', (event, data)=>{
	console.log('received', data[0])
})

app.on('ready', createWindow)

app.on('window-all-closed', () => { app.quit() })
