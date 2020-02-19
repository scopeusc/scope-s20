const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;

function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false});
    // load index.html into our window
    mainWindow.loadFile('index.html');
    // build the menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // insert menu into html
    Menu.setApplicationMenu(mainMenu);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Cmd + Q' : 'Ctrl + Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
];

app.on('ready', createWindow);