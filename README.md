# Make a whiskey API for CRUD Practice

### Set Up

* Clone the repo
* Install packages from the package.json file using `npm install`
	* If you don't have node install that first
* Create the database and import the schema

```
sqlite3 whiskey.db < schema.sql
```
* Run the seed file

```
node seed.js
```
* Set the port to `3000` in the `app.js` file
* Use `nodemon` to start the server and test it

```
nodemon app.js
```
* Now use Postman to test the routes
	* This is a Google Chrome extension, download it, it's awesome.
	
### Hosting on Heroku