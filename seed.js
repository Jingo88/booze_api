var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('whiskey.db');

var seedData = [
	['Blantons Single Barrel', 'Bourbon', 70],
	['Angels Envy', 'Bourbon', 55],
	['Hudson Four Grain', 'Bourbon', 60],
	['Buffalo Trace', 'Whiskey', 35],
	['Pigs Nose', 'Blend', 45],
	['Hudson Baby Bourbon', 'Bourbon', 60],
	['Woodford Reserve Kentucky Straight Bourbon', 'Bourbon', 45],
	['Woodford Reserve Kentucky Straight Rye', 'Rye Whiskey', 40],
	["'Buchanan's", 'Blend', 50]
];

for (var i=0; i<seedData.length; i++){
	db.run("INSERT INTO whiskey (name, type, price) VALUES (?, ?, ?)",
		seedData[i][0],
		seedData[i][1],
		seedData[i][2],
	function(err){
		if (err){
			throw(err)
			}
		}
	);	
};

console.log("ALL SEEDED")
