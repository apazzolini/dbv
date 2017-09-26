import Promise from 'bluebird'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'
import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dbv',
})
connection.query = Promise.promisify(connection.query, { context: connection })
connection.connect()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../../build/renderer/index.html'),
            protocol: 'file:',
            slashes: true,
        })

    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadURL(startUrl)
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

exports.pong = async arg => {
    const res = await connection.query(`SELECT ${arg} + 1 AS solution`)
    console.log(res)

    return res
}
