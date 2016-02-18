# Make a whiskey API for CRUD Practice

### Introduction

* This is an API built using `Express.js` and `SQLite3`
* This API is intended to help others practice building applications that will make CRUD Requests

### Usage

* The database will hold whiskeys
* Each whiskey has three properties
	* name
	* type
	* price
* Users will be able to Create, Read, Update, or Delete from this database
* Curse words will be replaced with the word `"Puppies"`
* If a user wants to enter data through a form, it must be passed in as the three properties:
	* name
	* type
	* price
* Users can search by `id` or `name`


### Set Up

* Clone the repo
* Install packages from the package.json file using `npm install`
	* If you don't have node install that first
* Create the database and import the schema
	* Make sure the database is named "whiskey"

```
sqlite3 whiskey.db < schema.sql
```
* Run the seed file

```
node seed.js
```
* Inside the `app.js` file, set the port to whatever you want
* Use `nodemon` to start the server and test it

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