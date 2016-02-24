# Make a whiskey API for CRUD Practice

### Introduction

* This is an API built using `Express.js` and `SQLite3`
* This API is intended to help others practice building CRUD applications

### Database

* The database is SQLite3
* The database name is `whiskey.db` 
* The table name is `whiskey`
* Each row will have three properties
	* name
	* type
	* price
	
### App.js

* Users will be able to Create, Read, Update, or Delete from this database
* Curse words will be replaced with the word `"Puppies"`
* If a user wants to enter data through a form, it must be passed in as the three properties:
	* name
	* type
	* price
* Users can search by `id` or `name`


### Set Up

* Clone this repository
* Use `npm install` to install all the packages inside the `package.json` file
	* If you do not have node installed follow there directions [here](https://nodejs.org/en/download/package-manager/)
		* You can most likely use a package manager such as `brew` or `apt-get`
* Create the database and import the schema
	* **IMPORTANT:** Make sure the database is named `whiskey.db`

```
sqlite3 whiskey.db < schema.sql
```
* Feel free to open up the seed file and check out the data
* Populate the database with the seed file

```
node seed.js
```
* Inside the `app.js` file, set the port to whatever you want
* Use `nodemon` to start the server and test it
	* Not familiar with nodemon? It's pretty cool, visit the docs [here](http://nodemon.io/)

```
nodemon app.js
```
* Now use Postman to test the routes
	* This is a Google Chrome extension, download it, it's awesome.
* The routes in this api are below:

| Method | Endpoint               | Description                                |
|--------|------------------------|--------------------------------------------|
| GET    | /                      | Redirect to /whiskeys                      |
| GET    | /whiskeys              | Get all the whiskeys                       |
| GET    | /whiskeys/search/:name | Get all whiskeys containing name parameter |
| GET    | /whiskeys/:id          | Get specific whiskey by ID                 |
| POST   | /whiskeys/create       | Create new whiskey                         |
| PUT    | /whiskeys/:id/update   | Update an existing whiskey                 |
| DELETE | /whiskeys/:id/delete   | Delete a specific whiskey                  |

	
### Hosting

* Don't bother trying to host on Heroku. sqlite3 does not play well with it
* When hosting the application make sure you set the `port number`, and load the `schema` and `seed`


### BE CAREFUL

* Do not push your `node modules` or your `database` to your github
* When you host this it will be open and free for anybody to use
* Don't let your jerk friends run 10,000 curl requests
* Just start this server and practice your CRUD!!!