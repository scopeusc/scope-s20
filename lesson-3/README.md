# **Lesson 3 - (CONT) Building Your First Electron App: Grocery List**

# Quick Recap #

From the project folder we created last week, run `npm start`, and you should see only the File option, with the three submenu items we created.  

Except, oh the woes of Apple, there is a problem on a Mac.  When you load this menuTemplate without the empty curly braces at the top, all the submenu options appear under the Electron tab, **not** the File.  Challenge: try to figure out how to shift in an empty menu header, so `File` will appear on Macs.


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
    addWindow = new BrowserWindow({width: 400, height: 300, resizable: false, webPreferences: {nodeIntegration: true}})
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
    mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, webPreferences: {nodeIntegration: true}})

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
    addWindow = new BrowserWindow({width: 400, height: 300, resizable: false, webPreferences: {nodeIntegration: true}})
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
