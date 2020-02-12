# **Lesson 1 - Introduction to Electron, Machine Setup, and Overview of Concepts**

## **Introduction**
**Welcome to Scope - Spring 2020!**

We're psyched to be teaching Electron this semester, a framework that allows you to develop native desktop applications with Javascript.  Essentially, Electron allows you to develop cross-platform desktop applications in the same way that you would create a website.  For anyone who's tried to create a desktop app... that's pretty freaking cool.

If you've ever created a website, you can get started developing Electron applications really quickly.  Knowing the basics of HTML, CSS, and Javascript are the main components of Electron, so if you have a firm handle on these, you're set!  If not, no worries, we will be going over the basics of these languages early on so everyone is caught up.  We will also be integrating more frameworks on top of Electron to create even more beautiful applications.

How is this different from building a website?  Why would we even want to do this?  While a very simple API, Electron is so much more than a web app.  It allows you to access the OS, read and write to the file system, and much more you wouldn't be able to do with just a website.  Let's go!

## **Setup**
Before we get started with the coding aspect, we need to get a few things set up.  First, make sure that you have a good text editor.  Scope's favorite (Julia's really, but who's doing curriculum) is Visual Studio Code.  It's incredible for debugging.  However, the new MacOS's no longer support it (sigh).  If you're running a different OS (or earlier Apple), get it here:
https://code.visualstudio.com/Download

Another good editor not supported by current macOS is Atom.  You can review them on your own time, get it here:
https://atom.io

For everyone running new macOS without a favorite editor, you can download Sublime for now.  Get it here:
https://www.sublimetext.com

Now, we are going to install Node.js and npm (Node Package Manager).  If you've worked with any other Javascript frameworks before, chances are you already have this downloaded.  Go through these very simple steps to verify it's installed, or install from scratch.

To download Node.js, go here:
https://nodejs.org/en/download/

If you already have it installed, run: `node -v` in terminal window.  This will tell you the version of node that you're running.  Make sure you have the latest installed (v12.16.0 or v13.8.0)

Once node is installed, you can install npm just with
`npm install`

Once again, make sure you're running the latest version with `npm -v`.  You should be running v6.13.7.  If not, use `npm install -g npm`

## **Overview of HTML, CSS, and Javascript**

All of our Electron projects this semester will be using HTML, CSS, and Javascript because Electron application windows are basically webpages with extra fuctionality. Therefore, its important that everyone understand the basics of these three languages. There a short descriptions provided below as well as links for those of you who don't have much experience with HTML, CSS, or Javascript and we encourage you to explore these topics in more detail before our next meeting.

**HTML - Hypertext Markup Language**
* The language that describes the components of a webpage like the text, buttons, forms, and so on
* Here's a few links that are great for learning HTML 
  * https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started 
  * https://www.w3schools.com/html/,
  * https://www.codecademy.com/learn/learn-html

**CSS - Cascading Style Sheets**
* Used to style the design of the components of the page
* Changing the font color or size, setting the size of components or changing how they appear to the user
* Here's a few links that are great for learning CSS 
  * https://developer.mozilla.org/en-US/docs/Learn/CSS 
  * https://www.w3schools.com/css/
  * https://www.codecademy.com/learn/learn-css

**Javascript**
* Make websites dynamic by giving us the ability to change parts of the page based on certain conditions like user actions
* For example, triggering a message to pop up once a form is submitted
* Here's a few links that are great for learning Javascript 
  * https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics 
  * https://www.w3schools.com/js/
  * https://www.codecademy.com/learn/introduction-to-javascript

## **Electron API Demo App**
Electron has a helpful demo app that demonstrates a ton of cool things it can do and will be a useful reference throughout the semester. You can download the zip for your specific operating system at https://github.com/electron/electron-api-demos/releases. 

Once you unzip the folder you can run the application, which will give you a good idea of what an Electron app actually looks and feels like. After exploring the app a little, you'll be ready for the first mini-project next week. 

