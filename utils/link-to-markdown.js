const titleCase = require('./title-case');

module.exports = function(file){
	let start = file.lastIndexOf('/') + 1;
	let end = file.indexOf('.', start);
	let name = titleCase(file.substring(start, end));
	return `- [${name}](${file})`;
};
