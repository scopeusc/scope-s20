# **Lesson 2 - Building Your First Electron App**

## **First Application**
**Basic Package Structure**
If you have ever worked with Node.js, you will see that an electron package is essentially identical.  We will start off by creating a folder for our project `first-app`, which will contain three files, `package.json`, `main.js`, and `index.html`.  Structure the folder as below:  
```
first-app/
├── package.json
├── main.js
└── index.html
```

The first file that we will be editing is `package.json`.  If you are not familiar with the JSON format, there's a great guide here (https://www.w3schools.com/js/js_json_intro.asp), but here's the jist.  JavaSript Object Notation (JSON) is a syntactical file representation that provides an easy way to store and pass around information.  It is structured like a Python dictionary, where you have a keyword and value that are easily retrievable.  You can nest more and more keyword/values into the JSON.  Ours will be pretty simple, and we will be using it to provide information to Electron about our application.  Electron provides an easy way to create the JSON.

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
**Installing Electron Locally**


There is one more thing we need to add here.  To start our Electron app, we should be able to run `npm start`.  So, we need to add a start command to our JSON.  Add `"start": "electron ."` under `"scripts"`.

{
  "name": "first-app",
  "version": "1.0.0",
  "description": "\"Hello World application\"",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
  },
  "author": "Tommy Trojan",
  "license": "ISC"
}
```