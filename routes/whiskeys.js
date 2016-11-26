var express = require('express');

var sqlite3 = require('sqlite3').verbose();						//database
var db = new sqlite3.Database('whiskey.db');					//database
var mexp = require("../wording.js") 										//import the wording.js file

var router = express.Router();

router.route('/')
	.get(function(req,res){
		db.all("SELECT * FROM whiskey", function(err, row){
			if (err){
				res.send("Hmmm there's something wrong with the root route? Server shutting down")
				throw err
			}else{
				res.jsonp(row)		
			}
		});
	})
	.post(function(req, res){
		var rName = req.body.name;
		var rType = req.body.type;
		var rPrice = req.body.price;

		var name = mexp.titleCase(rName);
		var type = mexp.titleCase(rType);
		var price = mexp.priceChecker(rPrice);

		if (isNaN(price) === true){
			res.send("You entered an invalid price, please make sure to enter an integer");
		} else {
			db.run("INSERT INTO whiskey (name, type, price) VALUES (?, ?, ?)", name, type, price, function(err){
				if(err){
					// throw err;
					res.send(name + " already exists")
				} else {
					res.send("You have created "+ name + " in our database")
				}
			})
		}
	})

// //route to let a user search by name
router.route('/:whiskey')
	.get(function(req, res){
		var whiskeyID= req.params.whiskey;

		db.get("SELECT * FROM whiskey WHERE id=?", whiskeyID, function(err, row){
			if (err){
				res.send("There seems to be an error by searching for that ID")
			} else {
				if (row === undefined){
					res.status(400).json("Sorry that whiskey does not exist");
				} else{
					res.jsonp(row)	
				}
			}
		})
	})
	.put(function(req, res){
		var whiskeyID= req.params.whiskey;
		var rName = req.body.name;
		var rType = req.body.type;
		var rPrice = req.body.price;

		var name = mexp.titleCase(rName);
		var type = mexp.titleCase(rType);
		var price = mexp.priceChecker(rPrice);

		if (isNaN(price)===true){
			res.send("You entered an invalid price, please make sure to enter an integer");
		} else {
			db.run("UPDATE whiskey SET name=?, type=?, price=? WHERE id=?",name, type, price, whiskeyID, function(err){
				if(err){
					res.status(400).json("Sorry there is already a whiskey with that name");
				} else {
					res.send("We have updated the database with " + name)
				}
			})
		}
	})

router.route('/:whiskey')
	.delete(function(req, res){
		var delID = req.params.whiskey;

		if (isNaN(delID)){
			res.send("You have entered an invalid id, please enter an integer")
		} else {
			db.run("DELETE FROM whiskey WHERE id=?", delID, function(err, row){
				if (err){
					res.send("There is an error with your request")
				} else {
					if (row === undefined){
						res.send("There is no whiskey with that ID")
					} else{
						res.sendStatus(200)
					}
				}
			})		
		}
	})


module.exports = router;
