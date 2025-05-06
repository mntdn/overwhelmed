import { Position } from "./interfaces/sentence";
import { Sentence } from "./libs/sentence";
import './style/main.scss';

const gibberish = [];
let swapSource: Position | null = null;

for (let i = 0xA000; i < 0xA0FF; i++)
	gibberish.push(String.fromCodePoint(i));
// for (let i = 0x0041; i < 0x005A; i++)
// 	gibberish.push(String.fromCodePoint(i));

var s = new Sentence(gibberish);

var d = document.getElementById('app');
if (d !== null) {
	d.appendChild(s.toHTML());
}

(window as any).letterClick = (wPos: number, lPos: number) => {
	if (swapSource === null) {
		swapSource = {
			word: wPos,
			letter: lPos
		};
	}
	else {
		s.swapLetters(swapSource, {
			word: wPos,
			letter: lPos
		});
		s.render();
		swapSource = null;
	}
}