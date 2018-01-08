const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

createWindow = () => {
	mainWindow = new BrowserWindow({width: 800, height: 800})

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file',
		slashes: true
	}))

	mainWindow.toggleDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => { app.quit() })
