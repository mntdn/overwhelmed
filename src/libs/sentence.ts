import { Position, Sentence, Word } from '../interfaces/sentence';
import * as utils from '../shared/utils';

let sentenceOrdered: Sentence = {
	id: "",
	content: [],
	isOrdered: true,
};

let sentence: Sentence = {
	id: "s" + utils.default.guid(),
	content: [],
	isOrdered: false,
};

const createSentence = (gibberish: string[]) => {
	let nbWords = utils.default.getRandomInt(4, 9);
	for (let i = 0; i < nbWords; i++) {
		let nbLetters = utils.default.getRandomInt(3, 10);
		const letterToUse = gibberish[utils.default.getRandomInt(0, gibberish.length)];
		let w: Word = {
			content: [],
			isOrdered: false,
		};
		for (let j = 0; j < nbLetters; j++) {
			w.content.push({
				content: letterToUse,
			});
		}
		sentence.content.push(w);
	}
	sentenceOrdered = JSON.parse(JSON.stringify(sentence));

	// scrambling the letters nbPasses times
	let nbPasses = 20;
	for (let i = 0; i < nbPasses; i++) {
		let wSrc = utils.default.getRandomInt(0, nbWords);
		let wDest = utils.default.getRandomInt(0, nbWords);
		let src: Position = {
			word: wSrc,
			letter: utils.default.getRandomInt(0, sentence.content[wSrc].content.length)
		}
		let dest: Position = {
			word: wDest,
			letter: utils.default.getRandomInt(0, sentence.content[wDest].content.length)
		}
		swapLetters(src, dest);
	}
	console.log(sentenceOrdered, sentence);
};

const toHTML = () => {
	let sHtml: HTMLElement | null = document.getElementById(sentence.id);
	if (sHtml === null) {
		var d = document.getElementById('app');
		if (d !== null) {
			sHtml = <HTMLDivElement>document.createElement('div');
			sHtml.classList = 'fixedWidth';
			sHtml.id = sentence.id;
			d.appendChild(sHtml);
		}
	}

	let result = '';
	let wPos = 0;
	let lPos = 0;
	sentence.content.forEach(w => {
		w.content.forEach(l => {
			let isOK = letterOK({ word: wPos, letter: lPos });
			result += `<span onclick="letterClick(${wPos}, ${lPos})" class="${(isOK ? "ok" : "ko")}">${l.content}</span>`;
			lPos++;
		})
		result += ' ';
		wPos++;
		lPos = 0;
	})

	if (sHtml)
		sHtml.innerHTML = result;
};

const swapLetters = (source: Position, dest: Position) => {
	let svg = "" + sentence.content[dest.word].content[dest.letter].content;
	sentence.content[dest.word].content[dest.letter].content = sentence.content[source.word].content[source.letter].content;
	sentence.content[source.word].content[source.letter].content = svg;
}

const letterOK = (p: Position): boolean => {
	return sentence.content[p.word].content[p.letter].content === sentenceOrdered.content[p.word].content[p.letter].content;
}

const _ = {
	sentence,

	swapLetters,
	createSentence,
	toHTML,
};

export default _;
