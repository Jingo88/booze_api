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
	console.log('HELLO WORLD')
	res.send("MOAR ELLO WARLDS")
});

app.listen(3000);
console.log("We are connected to port 3000")


//What are your routes?
// GET    /drinks[/]        =>drinks.list()
// GET    /drinks/new       =>drinks.new()
// GET    /drinks/:id       =>drinks.show()
// GET    /drinks/:id/edit  =>drinks.edit()
// POST   /drinks[/]        =>drinks.create()
// PATCH  /drinks/:id       =>drinks.update()
// DELETE /drinks/:id       =>drinks.destroy()