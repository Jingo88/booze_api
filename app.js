//connect your modules
//express
var express = require('express');
var app = express()

//middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

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

app.post('/whiskeys/create', function(req,res){
	console.log("WE ARE IN POST CREATE")
	var name = req.body.name;
	var type = req.body.type;
	var price = req.body.price;

	db.run("INSERT INTO whiskey (name, type, price) VALUES (?, ?, ?)", name, type, price, function(err){
		if(err){
			throw err;
		}
	})
	res.send("You have created "+ name + " in our database")
});

app.post('/whiskeys/update/:id', function(req,res){
	var data = req.body
	console.log(data)
	console.log("POST Update ID")
	res.send(data)
});

app.delete('/whiskeys/delete/:id', function(req, res){
	var delID = req.params.id;

	db.run("DELETE FROM whiskey WHERE id=?", delID, function(err, row){
		if (err){
			throw err
		} else {
			res.send("Whiskey has been deleted")
		}
	})
});


app.listen(3000);
console.log("We are connected to port 3000")

//check out sqlite3 wrapper commands ---- .run / .all / .get



//ROUTES

// GET /whiskeys
// GET /whiskeys/new
// GET /whiskeys/id
// GET /whiskeys/id/edit
// PUT /whiskeys/id/update
// POST /whiskeys/create
// DELETE /whiskeys/id/delete




