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
	"Bitch",
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