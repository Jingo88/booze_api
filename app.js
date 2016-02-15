//connect your modules
//express
var express = require('express');
var app = express()

//middleware
var bodyParser = require('body-parser');

//database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('whiskey.db');


app.get('/', function(req, res){
	db.all("SELECT * FROM whiskey", function(err, row){
		if (err){
			throw err
		}else{
			res.send(row)		
		}
	});
	console.log('HELLO WORLD')
	
});

app.listen(3000);
console.log("We are connected to port 3000")

//check out sqlite3 wrapper commands ---- .run / .all / .get


//What are your routes?
// GET    /drinks[/]        =>drinks.list()
// GET    /drinks/new       =>drinks.new()
// GET    /drinks/:id       =>drinks.show()
// GET    /drinks/:id/edit  =>drinks.edit()
// POST   /drinks[/]        =>drinks.create()
// PATCH  /drinks/:id       =>drinks.update()
// DELETE /drinks/:id       =>drinks.destroy()