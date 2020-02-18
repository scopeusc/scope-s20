const electron = require('electron')
const {app, BrowserWindow, Menu} = electron

let mainWindow

function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})
    // load index.html into our window
    mainWindow.loadFile('index.html')
    // build the menu
   // const mainMenu = Menu.buildFromTemplate(menuTemplate)
    // insert menu into html
  //  Menu.setApplicationMenu(mainMenu)
}

app.on('ready', createWindow)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})