//connect your modules
//express
var express = require('express');
var app = express()

//middleware
var bodyParser = require('body-parser');

//database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('whiskey.db');


app.get('/whiskeys', function(req, res){
	db.all("SELECT * FROM whiskey", function(err, row){
		if (err){
			throw err
		}else{
			res.send(row)		
		}
	});
	console.log('HELLO WORLD')
});

app.get('/whiskeys/:id', function(req, res){
	var wID = req.params.id;

	db.get("SELECT * FROM whiskey WHERE id = ?", wID, function(err, row){
		if (err){
			throw err
		} else {
			res.send(row)
		}
	})
	console.log("GET Whiskeys id")
})

app.get('/whiskeys/edit/:id', function(req,res){
	var wID = req.params.id;

	db.get("SELECT * FROM whiskey WHERE id = ?", wID, function(err, row){
		if (err){
			throw err
		} else {
			res.send(row)
		}
	})
	console.log("GET Whiskeys id edit")
})

app.post('whiskeys/create', function(req,res){
	console.log("WE ARE IN POST CREATE")
	db.run("INSERT INTO whiskey (name, type, price) VALUE (?, ?, ?)",'Woodford Reserve', 'Whiskey Bourbon', 40, function(err){
		if(err){
			throw err;
		}
	})
	res.send("YOU HAVE CREATED A POST")
})

app.post('whiskeys/update/:id', function(req,res){
	console.log("POST Update ID")
})

app.delete('whiskeys/delete/:id', function(req, res){
	db.run("DELETE ")
	console.log("DELETE ID")
})


app.listen(3000);
console.log("We are connected to port 3000")

//check out sqlite3 wrapper commands ---- .run / .all / .get







