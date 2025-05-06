import { Position } from "./interfaces/sentence";
import { Sentence } from "./libs/sentence";
import utils from "./shared/utils";
import './style/main.scss';

const gibberish = [];
let swapSource: Position | null = null;
let sentences: Sentence[] = [];

for (let i = 0xA000; i < 0xA0FF; i++)
	gibberish.push(String.fromCodePoint(i));
// for (let i = 0x0041; i < 0x005A; i++)
// 	gibberish.push(String.fromCodePoint(i));

sentences.push(new Sentence(gibberish, utils.getRandomInt(4, 9), 3, 10));
sentences.push(new Sentence(gibberish, utils.getRandomInt(4, 9), 3, 10));
sentences.push(new Sentence(gibberish, utils.getRandomInt(4, 9), 3, 10));

var d = document.getElementById('app');
sentences.forEach(s => {
	if (d !== null) {
		d.appendChild(s.toHTML());
	}
});

(window as any).letterClick = (id: string, wPos: number, lPos: number) => {
	if (swapSource === null) {
		swapSource = {
			id: id,
			word: wPos,
			letter: lPos
		};
	}
	else {
		if(swapSource.id !== id) {
			swapSource = null;
			return;
		}
		let s = sentences.filter(_ => _.id === id)[0];
		s.swapLetters(swapSource, {
			id: '',
			word: wPos,
			letter: lPos
		});
		s.render();
		swapSource = null;
	}
}