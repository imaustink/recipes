const fs = require('fs');
const glob = require('glob');
const promisify = require('./utils/promisify');
const makeName = require('./utils/get-name');
const titleCase = require('./utils/title-case');
const g = promisify(glob);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const templatePath = './readme-template.md';
const folders = [
	'recipes/**',
	'reheating-instructions/**'
];

Promise.all(folders.map(path => {
	return g(path);
})).then(results => {
	return results.map(files => {
		let title = titleCase(files.shift());
		let list = files.sort().map(makeName).join('\n');
		return `## ${title}\n${list}`;
	}).join('\n\n');
}).then(toc => {
	return readFile(templatePath, 'utf8').then(template => {
		return writeFile('./README.md', `${template}\n${toc}\n`);
	});
}).then(() => {
	console.log('Done!');
}).catch(err => {
	console.error(err);
});
