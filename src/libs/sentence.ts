import { Sentence, Word } from '../interfaces/sentence';
import getRandomInt from '../shared/utils';

const createSentence = (gibberish: string[]): Sentence => {
	let nbWords = getRandomInt(2, 7);
	let s: Sentence = {
		content: [],
		isOrdered: false,
	};
	for (let i = 0; i < nbWords; i++) {
		let nbLetters = getRandomInt(2, 7);
		const letterToUse = gibberish[getRandomInt(0, gibberish.length)];
		let w: Word = {
			content: [],
			isOrdered: false,
		};
		for (let j = 0; j < nbLetters; j++) {
			w.content.push({
				content: letterToUse,
			});
		}
		s.content.push(w);
	}
	return s;
};

const toHTML = (sentence: Sentence): string => {
    let result = '';
    sentence.content.forEach(w => {
        w.content.forEach(l => {
            result += `<span>${l.content}</span>`;
        })
        result += ' ';
    })
    return result;
};

const _ = {
	createSentence,
	toHTML,
};

export default _;
