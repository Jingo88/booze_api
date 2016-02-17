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
});

//Think about how to let users search, build an endpoint that takes name OR id? 
//endpoint that takes in containing a name? 
//maybe make two endpoints, so users can choose how to write their code and pass back data?
//one way would be to have a search bar that will take in a name. Still need to use params instead of body because the /whiskeys endpoint already exists


//This is the named callback for the GET requests for a single whiskey
var singleID = function(req, res){
	var wID = req.params.id;

	db.get("SELECT * FROM whiskey WHERE id=?", wID, function(err, row){
		if (err){
			throw err
		} else {
			res.send(row)
		}
	})
}

app.get('/whiskeys/:id', singleID)

app.get('/whiskeys/:id/edit', singleID);



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
	var wID = req.params.id;
	var name = req.body.name;
	var type = req.body.type;
	var price = req.body.price;

	db.run("UPDATE whiskey SET name=?, type=?, price=? WHERE id=?",name, type, price, function(err){
		if(err){
			throw err
		}
	} )
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

// GET /whiskeys 												Get All Whiskeys
// GET /whiskeys/new										Get Create Whiskey Form
// GET /whiskeys/id 										Get One Whiskey
// GET /whiskeys/id/edit 								Get One Whiskey Edit Form
// PUT /whiskeys/id/update 							Update One Whiskey
// POST /whiskeys/create 								Create New Whiskey
// DELETE /whiskeys/id/delete 					Delete One Whiskey


//START USING THE express.Router() class











