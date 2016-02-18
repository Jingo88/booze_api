//connect your modules
var express = require('express');											//express
var app = express()																		//express
app.set('port', (process.env.PORT || 8080));					//set your port
var bodyParser = require('body-parser');							//middleware
app.use(bodyParser.json());														//middleware
app.use(bodyParser.urlencoded({ extended: true })); 	//middleware
var sqlite3 = require('sqlite3').verbose();						//database
var db = new sqlite3.Database('whiskey.db');					//database
var mexp = require("./wording.js") 										//import the wording.js file


//get rid of favicon bullshit
app.get('/favicon.ico', function(req, res){
	res.writeHead(200, {'Content-Type': 'image/x-icon'});
	res.end();
})

//HOME ROUTE
app.get('/', function(req, res){
	res.redirect('/whiskeys')
})
app.get('/whiskeys', function(req, res){
	db.all("SELECT * FROM whiskey", function(err, row){
		if (err){
			throw err
		}else{
			res.json(row)		
		}
	});
});

//route to let a user search by name
app.get('/whiskeys/search/:name', function(req,res){

	var param= req.params.name;
	var wName = mexp.titleCase(param);

	db.all("SELECT * FROM whiskey WHERE name LIKE ?", "%"+wName+"%", function(err, row){
		if(err){
			throw err
		} else {
			res.json(row)
		}
	})
});

//This is the named callback for the GET requests for a single whiskey
var singleID = function(req, res){
	var wID = req.params.id;

	db.get("SELECT * FROM whiskey WHERE id=?", wID, function(err, row){
		if (err){
			throw err
		} else {
			res.json(row)
		}
	})
}
//GET requests for a single whiskey
app.get('/whiskeys/:id', singleID);
app.get('/whiskeys/:id/update', singleID);


//POST request for creating a whiskey
app.post('/whiskeys/create', function(req,res){
	var rName = req.body.name;
	var rType = req.body.type;
	var rPrice = req.body.price;

	var name = mexp.titleCase(rName);
	var type = mexp.titleCase(rType);
	var price = rPrice;

	//if there is a curse word, run a function to replace it with a cute word, 
	//place the cute word into the sql command
	//curse word checker should run on with a split function on spacebar

	db.run("INSERT INTO whiskey (name, type, price) VALUES (?, ?, ?)", name, type, price, function(err){
		if(err){
			throw err;
		}
	})
	res.send("You have created "+ name + " in our database")
});

//POST requests for updating whiskey
app.put('/whiskeys/:id/update', function(req,res){
	var wID = req.params.id;
	var rName = req.body.name;
	var rType = req.body.type;
	var price = req.body.price;

	var name = mexp.titleCase(rName);
	var type = mexp.titleCase(rType);

	db.run("UPDATE whiskey SET name=?, type=?, price=? WHERE id=?",name, type, price, wID, function(err){
		if(err){
			throw err
		} else {
			res.send("We have updated the database with " + name)
		}
	})
});

//DELETE Whiskey
app.delete('/whiskeys/:id/delete', function(req, res){
	var delID = req.params.id;

	db.run("DELETE FROM whiskey WHERE id=?", delID, function(err, row){
		if (err){
			throw err
		} else {
			res.send("Whiskey has been deleted from the database")
		}
	})
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



//check out sqlite3 wrapper commands ---- .run / .all / .get

//ROUTES
// GET /whiskeys 												Get All Whiskeys
// GET /whiskeys/search/:name 					Search all whiskeys with a name
// GET /whiskeys/:id 										Get One Whiskey
// PUT /whiskeys/:id/update 						Update One Whiskey
// POST /whiskeys/create 								Create New Whiskey
// DELETE /whiskeys/:id/delete 					Delete One Whiskey



// TODO

// make something to prevent a billion curl posts







