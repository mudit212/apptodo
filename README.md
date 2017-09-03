# App-todo

A simple CURD (create, read, update, delete) application to understand the basics of NodeJs and to get a basic understanding that how a real world Web Development Project may look like.

Build a ToDO application that allows us to create to-do list items, list all items , update them and delete them, all on the front end.

# Data Storage

Basically, we have to store our ToDO application data so we can store in the database but for this project we have stored them in our Javascript Object. Seed.Js contains records and each record has following attributes: id , title , Status.

# App Structure

Our app should consist of one HTML file (index.html), one stylesheet file (style.css) and three JavaScript files, one that contains your app code (script.js) and one that contains the initial state of your "database" (seed-data.js) and one from which (index.js) HTTP sserver runs.

# App Layout

The Layout of the page is such that all the todos are divided according to their particular status. Active todos table contains all the todos which are active and similarly like that all the specific todos. Each todo in active status has two buttons one is checkbox to complete a task and one is delete to delete a particular task. A New Add Todo bar to add a todo to the active todo bar.

# Features Built 

Here's what the app should do:
  
   1. When the user first loads the page, the list of todo items should appear on the page with their specific status.
   
   2. When someone clicks the "add todo" button, a new record should be added to the HTML list using default information.  
   
   3. When someone clicks a input checkbox in the ACTIVE todo it will be marked as COMPLETE in the databse and will display under             the complete section.
   
   4. When someone clicks a checked input checkbox in the COMPLETE todo it will be marked as ACTIVE in the databse and will display           under the active section.
   
   5. When someone clicks on the "hide completed item" it will hide all the todos under the complete section and similarly, for the           "hide deleted items".
# Known Issues
  
  While dealing with large number of todos we need database to store so that whenever we change anything to record it will be in the   database.
  
# Helpful Resources
   
  Here are some resources that will make assit you while making this app :

  1. [Twitter Bootstrap](http://getbootstrap.com/docs/4.0/layout/overview/).
  2. [CSS Basics](https://www.w3schools.com/w3css/).
  3. [Express -NodeJs](https://expressjs.com/en/guide/routing.html).
  
# Screenshot

![alt text](https://github.com/mudit212/apptodo/blob/master/app/Screenshots/localhost-3010-(Galaxy%20S5)%20(1).png "Description goes here")
   
 



