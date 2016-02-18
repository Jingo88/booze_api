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
	"Ass",
	"Asshat",
	"Asshole",
	"Bitch",
	"Cock",
	"Cunt",
	"DumbAss",
	"Fuck",
	"Fucking",
	"Penis",
	"Penises",
	"Pussies",
	"Pussy",
	"Shit",
	"Shitting",
	"Testicles",
	"Tits",
	"Twat",
	"Vagina"
];