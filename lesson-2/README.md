# **Lesson 2 - Building Your First Electron App: Grocery List**

## **Setup**
**Basic Package Structure**

If you have ever worked with Node.js, you will see that an electron package is essentially identical.  We will start off by creating a folder for our project `first-app`, which will contain three files, `package.json`, `main.js`, and `index.html`.  Structure the folder as below:  
```
first-app/
├── package.json
├── main.js
└── index.html
```

The first file that we will be editing is `package.json`.  If you are not familiar with the JSON format, there's a great guide here (https://www.w3schools.com/js/js_json_intro.asp), but here's the jist.  JavaScript Object Notation (JSON) is a syntactical file representation that provides an easy way to store and pass around information.  It is structured like a Python dictionary, where you have a keyword and value that are easily retrievable.  You can nest more and more keyword/values into the JSON.  Ours will be pretty simple, and we will be using it to provide information to Electron about our application.  Electron provides an easy way to create the JSON.

Since we're all be working in VSCode (see lesson-1), simply open a new terminal (Terminal->New Terminal), and navigate to `first-app` as your workspace.  Now, run `npm init`

Keep the defaults it provides, and add a description for your app, e.g. "Hello World application".

This will automatically create a JSON that should look like this: 
```
{
  "name": "first-app",
  "version": "1.0.0",
  "description": "\"Hello World application\"",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Tommy Trojan",
  "license": "ISC"
}
```

We're going to make one change.  When we develop our app, we want to be able to run it by saying `npm start`.  To do this, we are going to remove the test line from scripts, and replace it with `"start": "electron ."`.  Our JSON should now look like this
```
{
  "name": "first-app",
  "version": "1.0.0",
  "description": "\"Hello World application\"",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "Tommy Trojan",
  "license": "ISC"
}
```

**Installing Electron Locally**

If you've gotten here and are confused, or thinking "if we're installing Electron now, what were we doing all of last week?" don't fret!  We installed Node and Node Package Manager (NPM) which are necessary prerequisites to running Electron.  Now, we will be installing Electron as a development dependency in our app.  There are many ways to install Electron (see here: https://www.electronjs.org/docs/tutorial/installation) but this is the preferred method, because it makes version control and updates a whole lot easier. 

From your app's highest directory `first-app`, run `npm install --save electron`

This will create and update a `dependencies` field in our JSON.

## **Build and Render**
**Hello World App**

We will be editing our `main.js` to build our first Electron window.  The first thing we are going to do is require the `electron` module.  This module is what provides all APIs and features of Electron that we will be using.  We do this by storing the module in a `const`, like this:

`const electron = require('electron')`

Now, we are going to grab some objects from the `electron` module.

`const {app, BrowserWindow} = electron`

The `app` object is the top-level controller of our application.  It loads and creates windows, etc.  The `BrowserWindow` object is, well... a browser window.  It will allow us to then load and render our page.

At the bottom of our `main.js`, we will write

`app.on('ready', createWindow)`

In Electron, we wait for the app to be ready, and when it is, we load our windows.  This is saying, when the app is ready, run a function called `createWindow`.  Before we define that function, we will create an instance of of `BrowserWindow`.

`let mainWindow`

This will be customized inside the function, which we define now.

```
function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, webPreferences: {nodeIntegration: true}})
    // load index.html into our window
    mainWindow.loadFile('index.html')
}
```

Now, let's actually create our `index.html` that will load!  Since we are going to be creating a Grocery List next, we will have the most basic HTML in the file to demonstrate.

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Grocery List</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

Now, at the bottom of `main.js` add these functions:
```
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
```

The function purposes are explained inline, but they are generally for aiding common MacOS functionality.  Your whole `main.js` should look like this:

```
const electron = require('electron')
const {app, BrowserWindow} = electron

let mainWindow

function createWindow() {
    // the size of a Chrome window, without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, webPreferences: {nodeIntegration: true}})
    // load index.html into our window
    mainWindow.loadFile('index.html')
}
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

Now, run `npm start` from your `first-app` directory.  Note that MacOS's and others have different defaults (a Mac native menu is not contained in the window, but non-Mac menus may be), but your app should look something like this:
<img width="801" alt="Screen Shot 2020-02-18 at 12 23 40 PM" src="https://user-images.githubusercontent.com/35272150/74774974-93900180-5249-11ea-9079-2abd46d9795c.png">

Great!  We have created our first window.  Now, we will be starting to build an actual project.

## **Grocery List App**
**Menu Bar**

We are going to add a native menu bar to our application, which will allow us to do things like add items to our grocery list and remove them.  In Electron, menu bars are simple arrays.  You can nest arrays within arrays to create submenus, and add functionality with onclick functions to each element.

In order to do this, we need to import the Electron object `Menu`.  So, in `main.js` change
`const {app, BrowserWindow} = electron` to
`const {app, BrowserWindow, Menu} = electron`

Now, we will create a menu template.  This should be outside our function `createWindow()`
```
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
                label: 'Quit'
            }
        ]
    }
]
```

In our `createWindow()` we are actually going to build the menu, and insert in into our html.  Luckily, Electron provides methods to do this without touching our `index.html`

```
function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, webPreferences: {nodeIntegration: true}})

    // load index.html into our window
    mainWindow.loadFile('index.html')

    // build the menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate)

    // insert menu into html
    Menu.setApplicationMenu(mainMenu)
}
```
That's all we will be going over today.  Next week, we will continue working on this project, and add functionality.  Try and see how you can improve on it before then.
