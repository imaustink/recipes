const fs = require('fs');
const promisify = require('./utils/promisify');
const makeLink = require('./utils/link-to-markdown');
const titleCase = require('./utils/title-case');
const glob = promisify(require('glob'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const templatePath = './readme-template.md';
const folders = [
	'recipes/**',
	'reheating-instructions/**'
];

Promise.all(folders.map(path => {
	return glob(path);
})).then(results => {
	return results.map(files => {
		let title = titleCase(files.shift());
		let list = files.sort().map(makeLink).join('\n');
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
