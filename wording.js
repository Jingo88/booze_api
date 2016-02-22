var mexp = module.exports = {}

mexp.titleCase = function(x){
	var str = x.split(" ")
	for (var i = 0; i<str.length; i++){
		var copy = str[i].substring(1).toLowerCase();
		str[i] = str[i][0].toUpperCase() + copy;
		if (badWords.indexOf(str[i]) >= 0){
			str[i] = "puppies"
		}
	}
	str = str.join(" ");
	return str
}

mexp.priceChecker = function(x){
	var val = Number(x);
	var str = x.toString();
	var xArr = str.split(".");

	if (xArr.indexOf('.') === -1) {
		x = val.toFixed(2);
	} else if (res[1].length < 3){
		x = val.toFixed(2);
	}
	return x
}




/////////////////////				BELOW THESE LINES ARE 			/////////////////////
/////////////////////				BAD WORDS 	  							/////////////////////
/////////////////////				FOR MY CURSE WORD REPLACER				/////////////////////
/////////////////////				DO NOT LOOK BELOW HERE			/////////////////////
/////////////////////				YOU HAVE BEEN WARNED				/////////////////////





var badWords = [
	"5h1t",
	"5hit",
	"A2m",
	"A55",
	"Anus",
	"Ass",
	"Asses",
	"Asshat",
	"Asshole",
	"Balls",
	"Bitch",
	"Blowjob",
	"Chink",
	"Cock",
	"Cunt",
	"Die",
	"Death",
	"DumbAss",
	"Fuck",
	"Fucking",
	"Nigger",
	"Penis",
	"Penises",
	"Poop",
	"Poopie",
	"Pussies",
	"Pussy",
	"Shit",
	"Shitting",
	"Testicles",
	"Tits",
	"Twat",
	"Vagina"
];