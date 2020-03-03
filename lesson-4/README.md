# **Lesson 4 - (CONT) Building Your First Electron App: Grocery List**

# Quick Recap #

From the project folder we created last week, run `npm start`, and you should see only the File option, with the three submenu items we created.  
We've just created an app where we've got the front and back-end communicating with each other! Exciting!

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

But what if we just want to remove one item? We'll do that with a double-click property that Electron has:
```
<script>
    // remove item
    ul.addEventListener('dblclick', removeItem);

    function removeItem(e) {
      e.target.remove();
    }
</script>
```

Cool! Now that we have the basic functionality of the app, let's make it look sexy.

There are lots of different frameworks you can use to style like Bootstrap is probably something that's common to you. But we're gonna use MaterializeCSS which is like Google's version of Bootstrap.
Let's get started: https://materializecss.com/getting-started.html

Add the following to the <head> of both your HTML files, like this:

```
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
```

Now when you run `npm start`,  you can see the different changes that MaterializeCSS has already made. Let's make some more changes!!


Let's get rid of the ugly title and have a nice lookin' nav bar at the top by adding this `<nav>` tag in place of the `<h1>` tag we had before:

```
<nav>
  <div class="nav-wrapper">
    <a href="#" class="brand-logo">GROCERY LIST</a>
  </div>
</nav>
```

Now when we do Add Item, the text looks all ugly and unformatted ): We can fix that by adding class names to the list items to give them more aesthetic.

In the script where we're rendering the list items, we'll fix the formatting. Your ipcRenderer should look like this now:

```
ipcRenderer.on('item:add', function(event, item){
    ul.className = 'collection';
    const li = document.createElement('li');
    li.className = 'collection-item';
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
});
```

Let's fix up AddWindow.html now. I'll let you guys play around with the different components of Materialize. Just browse through what they have and mess around with the CSS.




