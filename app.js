//connect your modules
var express = require('express');											//express
var app = express()																		//express
app.set('port', (process.env.PORT || 8080));					//set your port

var bodyParser = require('body-parser');							//middleware
app.use(bodyParser.json());														//middleware
app.use(bodyParser.urlencoded({ extended: true })); 	//middleware

var whiskey_routes = require('./routes/whiskeys');
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  next();
});

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

//ROUTES
// GET /whiskeys 												Get All Whiskeys
// GET /whiskeys/search/:name 					Search all whiskeys with a name
// GET /whiskeys/:id 										Get One Whiskey
// PUT /whiskeys/:id/update 						Update One Whiskey
// POST /whiskeys/create 								Create New Whiskey
// DELETE /whiskeys/:id/delete 					Delete One Whiskey






