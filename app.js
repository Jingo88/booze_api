//connect your modules
//express
var express = require('express');
var app = express()

//set your port
app.set('port', (process.env.PORT || 3000));

//middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('whiskey.db');


// var http = require('http');

app.get('/favicon.ico', function(req, res){
	res.writeHead(200, {'Content-Type': 'image/x-icon'});
	res.end();
})

// http.createServer(function (q, r) { 

//   // control for favicon
//   if (q.url === '/favicon.ico') {
//     r.writeHead(200, {'Content-Type': 'image/x-icon'} );
//     r.end();
//     console.log('favicon requested');
//     return;
//   }

//   // not the favicon? say hai
//   console.log('hello');
//   r.writeHead(200, {'Content-Type': 'text/plain'} );
//   r.write('Hello, world!');
//   r.end();
  
// }).listen(8000);

// console.log('Server running at http://127.0.0.1:8000/');



//route for all whiskeys in database
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

	var wName= req.params.name;

	db.all("SELECT * FROM whiskey WHERE name LIKE ?", "%"+wName+"%", function(err, row){
		if(err){
			throw err
		} else {
			res.json(row)
		}
	})
})

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

//POST requests for updating whiskey
app.post('/whiskeys/update/:id', function(req,res){
	var wID = req.params.id;
	var name = req.body.name;
	var type = req.body.type;
	var price = req.body.price;

	db.run("UPDATE whiskey SET name=?, type=?, price=? WHERE id=?",name, type, price, function(err){
		if(err){
			throw err
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
// app.listen(3000);
// console.log("We are connected to port 3000")

//check out sqlite3 wrapper commands ---- .run / .all / .get



//ROUTES

// GET /whiskeys 												Get All Whiskeys
// GET /whiskeys/new										Get Create Whiskey Form
// GET /whiskeys/id 										Get One Whiskey
// GET /whiskeys/id/edit 								Get One Whiskey Edit Form
// PUT /whiskeys/id/update 							Update One Whiskey
// POST /whiskeys/create 								Create New Whiskey
// DELETE /whiskeys/id/delete 					Delete One Whiskey






