//connect your modules
var express = require('express');											//express
var app = express()																		//express
app.set('port', (process.env.PORT || 8080));					//set your port

var bodyParser = require('body-parser');							//middleware
app.use(bodyParser.json());														//middleware
app.use(bodyParser.urlencoded({ extended: true })); 	//middleware
var cors = require('cors');

// Grab the whiskeys.js file
var whiskey_routes = require('./routes/whiskeys');
  
// Replaced this with the CORS NPM
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
//   next();
// });

app.use(cors());

app.use('/whiskeys', whiskey_routes);

//get rid of favicon bullshit
app.get('/favicon.ico', function(req, res){
	res.writeHead(200, {'Content-Type': 'image/x-icon'});
	res.end();
});

app.get('/', function(req,res){
		res.redirect('/whiskeys')
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//check out sqlite3 wrapper commands ---- .run / .all / .get

// | Method | Endpoint               | Description                                |
// |--------|------------------------|--------------------------------------------|
// | GET    | /                      | Redirect to /whiskeys                      |
// | GET    | /whiskeys              | Get all the whiskeys                       |
// | GET    | /whiskeys/:whiskey 	   | Get all whiskeys containing name parameter |
// | POST   | /whiskeys/		       	| Create new whiskey                         |
// | PUT    | /whiskeys/:whiskey    | Update an existing whiskey                 |
// | DELETE | /whiskeys/:whiskey 	  | Delete a specific whiskey                  |







