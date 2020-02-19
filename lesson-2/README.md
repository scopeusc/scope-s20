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
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})
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
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})
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
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})

    // load index.html into our window
    mainWindow.loadFile('index.html')

    // build the menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate)

    // insert menu into html
    Menu.setApplicationMenu(mainMenu)
}
```
Now, run `npm start`, and you should see only the File option, with the three submenu items we created.  

Except, oh the woes of Apple, there is a problem on a Mac.  When you load this menuTemplate without the empty curly braces at the top, all the submenu options appear under the Electron tab, **not** the File.  Who knows why, but for Macs, you have to add an empty item beforehand.  However, if we do this simply by adding empty braces to the menuTemplate, it shifts it over for non-Macs, which we don't want.  

So, we are going to add an `if` statement in `createWindow` that says, if we are on a Mac, prepend `menuTemplate` with an empty item, otherwise do nothing.  We will do this with `unshift` which is an array operator that allows you to prepend the array.  Make sure you add it **before** you build the menu.

```
function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})

    // load index.html into our window
    mainWindow.loadFile('index.html')

    // add empty item for macs only
    if (process.platform == 'darwin') {
        menuTemplate.unshift({})
    }

    // build the menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate)

    // insert menu into html
    Menu.setApplicationMenu(mainMenu)
}
```

The first functionality we will add will be for `Quit`.  This is relatively easy, so take a couple minutes and try to find a way to do it on your own.

...

There are two main components to our `Quit`.  The first is obvious, if you click on it you want to quit the app.  The second part adding keyboard shortcuts to exit, in particular, Cmd + Q on a Mac, and Ctrl + Q on others.  Let's start with the click.  We want to add an onclick event to our label `Quit`, and can do this really easily with Electron.

```
{
    label: 'Quit',
    click() {
        app.quit()
    }
}
```

A comma separated `click()` allows you to define onclick functions inline for many elements in Electron.  Now, for hotkeys.  An element called `accelerator` allows us to define hotkeys as strings (e.g. you can simply create an accelerator, and write something like `Cmd + Q`, and it registers your meaning).  Let's look.

```
{
    label: 'Quit',
    accelerator: process.platform == 'darwin' ? 'Cmd + Q' : 'Ctrl + Q',
    click() {
        app.quit()
    }
}
```

A couple things to note.  `process.platform` refers to what OS your machine is running.  If you're curious, you can run `node` from your terminal, then `process.platform` in the node shell to see what you're running.  Also, we are using a ternary operator here, which simply says create an accelerator with the shortcut `Cmd + Q` if we are on a Mac, and `Ctrl + Q` otherwise.  Just one way electron makes cross-compilation super simple.

Next, let's move onto `Add Item`.  When we click, we want another, smaller window to appear that will allow us to add an item to our grocery list.  Since we have gone over how to create a window (see createWindow), and use onclick functionality, try to get an empty window to pop up when you click `Add Item` (note: create a function called createAddWindow())

...

Hopefully you were able to get this working.  Let's look at code for it together.

```
let mainWindow
let addWindow
...
{
    label: 'Add Item',
    click() {
        createAddWindow()
    }
},
...

function createAddWindow() {
    addWindow = new BrowserWindow({width: 400, height: 300, resizable: false})
    addWindow.loadFile('addWindow.html')
}

```

This will bring up a blank page, just like we wanted.  Make sure you have defined `addWindow` outside of functions, where `mainWindow` is.  Now, we want to create another html page to load into addWindow.  So, create a new file called `addWindow.html`.  What we want is to have a title/heading of Add Item, and a form where you can submit an item.  Take some time and do this on your own (if you're not familiar with HTML, consult W3 Schools or a neighbor to try and do this!)

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Add Item</title>
    </head>
    <body>
        <form>
            <div>
                <label>Enter Item</label>
                <input type="text" id="item" autofocus>
            </div>
            <button type="submit">Add Item</button>
        </form>
    </body>
</html>
```

Here is the basic format.  We have a form, and a submit button.  Note that we will be using the item ID later on, so please add that to your input if not already there.  Try out your app by running `npm start` again, and make sure that you are able to open the window.  There's something weird here.  If you close our main window, but not the add window, the app stays open.  I want you to fix this.  I'll give you a hint -- you have to create a listener function in `createWindow` to see if it's closed.  Take a few minutes.

...
```
function createWindow() {
    // a window without the option to resize (we will go over in later lessons)
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false})

    // load index.html into our window
    mainWindow.loadFile('index.html')

    // build the menu
    const mainMenu = Menu.buildFromTemplate(menuTemplate)

    // insert menu into html
    Menu.setApplicationMenu(mainMenu)

    // add a listener to see if the main window has been closed
    mainWindow.on('closed', function(){
        app.quit()
    })
}
```

Question: Why did we not add an accelerator here?

...

Answer: Because the only way this listener will be called is if the main window is shut and not the smaller one, which can only occur if someone manually X's out of one and not the other.  Aka if they were to Cmd + Q, both would already close automatically.

As another optimization, we want to nullify our addWindow once it is closed.  We can do this in `createAddWindow()` by adding an on close listener again.

```
function createAddWindow() {
    addWindow = new BrowserWindow({width: 400, height: 300, resizable: false})
    addWindow.loadFile('addWindow.html')
    addWindow.on('close', function(){
        addWindow = null
    })
}
```

Let's switch gears, and go back to our `addWindow.html`.  We are going to add the functionality now.  Basically, when an item is added to our list in the new window, we want it to appear on the main window.  We will be using some vanilla JavaScript to do this.  First, we're going to add some `script` tags to our `addWindow.html`, which will allow us to import Electron to the page (so we can pass the added item to our main page).

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Add Item</title>
    </head>
    <body>
        <form>
            <div>
                <label>Enter Item</label>
                <input type="text" id="item" autofocus>
            </div>
            <button type="submit">Add Item</button>
        </form>
        <script>
            const electron = require('electron');
            const {ipcRenderer} = electron;
        </script>
    </body>
</html>
```

Notice the module `ipcRenderer` that we brought in.  This is an object that allows you to communicate  asynchronously from a renderer process to the main proess.  The renderer process is the HTML page, which is formatting thus "rendering" information.  The main process is the Electron backend, which is written in `main.js`.  So, this is allowing us to send information from the HTML page back to `main.js`.

We are going to add an event listener into our JavaScript tags that listens for a submit event from our form.  Using vanilla JavaScript, take a couple minutes and try to define that (consulting necessary resources).

...

Hopefully you got that.  We will be implementing that function now.  Once the listener is triggered, we will call a function `submitForm` that uses `ipcRenderer` to send the item back to `main.js`.

```
<script>
    const electron = require('electron');
    const {ipcRenderer} = electron;

    const form = document.querySelector('form');
    form.addEventListener('submit', submitForm);

    function submitForm(event) {
        event.preventDefault();
        const item = document.querySelector('#item').value;
        ipcRenderer.send('item:add', item);
    }
</script>
```

This sends the item's payload back to `main.js`.  Now, we will go back to that file to catch the information.  The first thing we have to do is bring in the module `ipcMain` from electron itno `main.js`.  So, at the top, change `const {app, BrowserWindow, Menu} = electron` to `const {app, BrowserWindow, Menu, ipcMain} = electron`.

Outside of any functions, we want to catch the information.  We can do this with an on information function.  

```
ipcMain.on('item:add', function(event, item){
    mainWindow.webContents.send('item:add', item)
    addWindow.close()
})

```

Now that we have caught the item in our main process, we have to get it in the main html page, our `index.html`.  We will bring in Electron and `ipcRenderer` just like before in our `script` tags.  We also want to add each item to a list when it's caught.  So, let's add a set of `<ul></ul>` tags below our heading.  We can leave these blank, because we will update it dynamically in our JavaScript tags.  We now create a listener function with `ipcRenderer` that says, once an item is received from the main process, execute the function. 

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Grocery List</title>
    </head>
    <body>
        <h1>Grocery List</h1>
        <ul></ul>

        <script>
            const electron = require('electron');
            const {ipcRenderer} = electron;
            const ul = document.querySelector('ul');

            ipcRenderer.on('item:add', function(event, item){ 
            });
        </script>
    </body>
</html>
```

For our function, we are going to want to create a list element, `<li>`, then add a text node that has the item name.
```
ipcRenderer.on('item:add', function(event, item){ 
    const li = document.createElement('li');
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
});
```

Your `index.html` should look like this:
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Grocery List</title>
    </head>
    <body>
        <h1>Grocery List</h1>
        <ul></ul>

        <script>
            const electron = require('electron');
            const {ipcRenderer} = electron;
            const ul = document.querySelector('ul');

            // catch add item
            ipcRenderer.on('item:add', function(event, item){ 
                const li = document.createElement('li');
                const itemText = document.createTextNode(item);
                li.appendChild(itemText);
                ul.appendChild(li);
            });
        </script>
    </body>
</html>
```

Run `npm start`.  You should now be able to add to the list, and see it updated in the main screen.

Finally, we are going to implement `Clear Items`.  We are going to add an onclick event to the `Clear Items` tab that sends an event `item:clear` to `index.html`.

```
{
    label: 'Clear Items',
    click() {
        mainWindow.webContents.send('item:clear')
    }
},
```

Now, we go back to `index.html` to catch this clear item.  Take a few minutes, and try to add a listener for `item:clear` which gets rid of the list elements.

...

Let's do it together now.

```
<script>
    const electron = require('electron');
    const {ipcRenderer} = electron;
    const ul = document.querySelector('ul');

    // catch add item
    ipcRenderer.on('item:add', function(event, item){ 
        const li = document.createElement('li');
        const itemText = document.createTextNode(item);
        li.appendChild(itemText);
        ul.appendChild(li);
    });

    // catch clear item
    ipcRenderer.on('item:clear', function(event, item){
        ul.innerHTML = '';
    });
</script>
```

That's all we will be going over today.  Next week, we will continue working on this project, and will add styling and additional functionality.  Try and see how you can improve on it before then.
