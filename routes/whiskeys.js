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

// //route to let a user search by name
router.route('/search/:name')
	.get(function(req, res){
		var param= req.params.name;
		var wName = mexp.titleCase(param);

		db.all("SELECT * FROM whiskey WHERE name LIKE ?", "%"+wName+"%", function(err, row){
			if(err){
				res.send("There was an error searching for that name")
			} else {
				if (row.length < 1){
					res.send("Sorry that whiskey does not exist");
				} else {
					res.jsonp(row)
				}
			}
		})
	})

//This is the named callback for the GET requests for a single whiskey
var singleID = function(req, res){
	var wID = req.params.id;

	if (isNaN(wID)){
		res.send("Sorry that is not a valid ID. Please enter a integer")
	} else {
		db.get("SELECT * FROM whiskey WHERE id=?", wID, function(err, row){
			if (err){
				res.send("There seems to be an error by searching for that ID")
			} else {
				if (row === undefined){
					res.send("There is no whiskey with that ID")
				} else{
					res.jsonp(row)	
				}
			}
		})
	}
}

router.route('/:id')
	.get(singleID)

// take this out?
router.route('/:id/update')
	.get(singleID)

router.route('/create')
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

router.route('/:id/update')
	.put(function(req, res){
		var wID = req.params.id;
		var rName = req.body.name;
		var rType = req.body.type;
		var rPrice = req.body.price;

		var name = mexp.titleCase(rName);
		var type = mexp.titleCase(rType);
		var price = mexp.priceChecker(rPrice);

		if (isNaN(price)===true){
			res.send("You entered an invalid price, please make sure to enter an integer");
		} else {
			db.run("UPDATE whiskey SET name=?, type=?, price=? WHERE id=?",name, type, price, wID, function(err){
				if(err){
					throw err
				} else {
					res.send("We have updated the database with " + name)
				}
			})
		}
	})

router.route('/:id/delete')
	.delete(function(req, res){
		var delID = req.params.id;

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
						res.send("Whiskey has been deleted from the database")
					}
				}
			})		
		}
	})


module.exports = router;