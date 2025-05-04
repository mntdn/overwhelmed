import { Position } from "./interfaces/sentence";
import * as sentence from "./libs/sentence";
import './style/main.scss';

const gibberish = [];
let swapSource: Position | null = null;

for (let i = 0xA000; i < 0xA0FF; i++)
	gibberish.push(String.fromCodePoint(i));
// for (let i = 0x0041; i < 0x005A; i++)
// 	gibberish.push(String.fromCodePoint(i));

sentence.default.createSentence(gibberish);
sentence.default.toHTML();

(window as any).letterClick = (wPos: number, lPos: number) => {
	if (swapSource === null) {
		swapSource = {
			word: wPos,
			letter: lPos
		};
	}
	else {
		sentence.default.swapLetters(swapSource, {
			word: wPos,
			letter: lPos
		});
		sentence.default.toHTML();
		swapSource = null;
	}
}