import { Position, Word } from '../interfaces/sentence';
import * as utils from '../shared/utils';

export class Sentence {
	id: string;
    content: Word[];
    isOrdered: boolean;

	private charsUsed: string[];
	private orderedContent: Word[];

	constructor(c: string[]){
		this.id = "s" + utils.default.guid();
		this.content = [];
		this.orderedContent = [];
		this.isOrdered = false;
		this.charsUsed = c;

		let nbWords = utils.default.getRandomInt(4, 9);
		for (let i = 0; i < nbWords; i++) {
			let nbLetters = utils.default.getRandomInt(3, 10);
			const letterToUse = this.charsUsed[utils.default.getRandomInt(0, this.charsUsed.length)];
			let w: Word = {
				content: [],
				isOrdered: false,
			};
			for (let j = 0; j < nbLetters; j++) {
				w.content.push({
					content: letterToUse,
				});
			}
			this.content.push(w);
		}
		this.orderedContent = JSON.parse(JSON.stringify(this.content));

		// scrambling the letters nbPasses times
		let nbPasses = 20;
		for (let i = 0; i < nbPasses; i++) {
			let wSrc = utils.default.getRandomInt(0, nbWords);
			let wDest = utils.default.getRandomInt(0, nbWords);
			let src: Position = {
				word: wSrc,
				letter: utils.default.getRandomInt(0, this.content[wSrc].content.length)
			}
			let dest: Position = {
				word: wDest,
				letter: utils.default.getRandomInt(0, this.content[wDest].content.length)
			}
			this.swapLetters(src, dest);
		}
	}

	swapLetters = (source: Position, dest: Position) => {
		let svg = "" + this.content[dest.word].content[dest.letter].content;
		this.content[dest.word].content[dest.letter].content = this.content[source.word].content[source.letter].content;
		this.content[source.word].content[source.letter].content = svg;
	}
	
	letterOK = (p: Position): boolean => {
		return this.content[p.word].content[p.letter].content === this.orderedContent[p.word].content[p.letter].content;
	}

	toHTML = (): HTMLElement => {
		let result: HTMLElement = <HTMLDivElement>document.createElement('div');
		result.classList = 'fixedWidth';
		result.id = this.id;
		
		result.innerHTML = this.getInnerHTML();
		return result;
	};

	private getInnerHTML = (): string => {
		let htmlContent = '';
		let wPos = 0;
		let lPos = 0;
		this.content.forEach(w => {
			w.content.forEach(l => {
				let isOK = this.letterOK({ word: wPos, letter: lPos });
				htmlContent += `<span onclick="letterClick(${wPos}, ${lPos})" class="${(isOK ? "ok" : "ko")}">${l.content}</span>`;
				lPos++;
			})
			htmlContent += ' ';
			wPos++;
			lPos = 0;
		})
		return htmlContent;
	}

	// Force a render of this string HTML code, needs to already be in the DOM
	render = () => {
		var e = document.getElementById(this.id);
		if(e !== null){
			e.innerHTML = this.getInnerHTML();
		}
	}
}