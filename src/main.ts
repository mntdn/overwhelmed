import * as sentence from "./libs/sentence";

const gibberish = [];

for(let i = 0xA000; i < 0xA0FF; i++)
	gibberish.push(String.fromCodePoint(i));

var d = document.getElementById('app');
if(d !== null) {
	var page = <HTMLDivElement>document.createElement('div');
	page.classList = 'fixedWidth';
	let s = sentence.default.createSentence(gibberish);
	page.innerHTML = sentence.default.toHTML(s);
	d.appendChild(page);
}
