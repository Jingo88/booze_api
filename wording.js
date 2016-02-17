var mexp = module.exports = {}

mexp.titleCase = function(x){
	var str = x.split(" ");
	for (var i=0; i<str.length; i++){
		var copy = str[i].substring(1).toLowerCase();
		str[i] = str[i][0].toUpperCase() + copy;
	}
	str = str.join(" ");
	return str
}
