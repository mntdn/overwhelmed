import { Position, Word } from "../interfaces/sentence";
import utils from "../shared/utils";

export abstract class SentenceBase {
    id: string = '';
    content: Word[] = [];
    isOrdered: boolean = false;
	private charsUsed: string[];
	private orderedContent: Word[];


    constructor(c: string[], nbWords: number, nbLettersLow: number, nbLettersHigh: number){
        this.id = "s" + utils.guid();
        this.content = [];
        this.orderedContent = [];
        this.isOrdered = false;
        this.charsUsed = c;

        for (let i = 0; i < nbWords; i++) {
            let nbLetters = utils.getRandomInt(nbLettersLow, nbLettersHigh);
            const letterToUse = this.charsUsed[utils.getRandomInt(0, this.charsUsed.length)];
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
            let wSrc = utils.getRandomInt(0, nbWords);
            let wDest = utils.getRandomInt(0, nbWords);
            let src: Position = {
                id: '',
                word: wSrc,
                letter: utils.getRandomInt(0, this.content[wSrc].content.length)
            }
            let dest: Position = {
                id: '',
                word: wDest,
                letter: utils.getRandomInt(0, this.content[wDest].content.length)
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

    abstract getInnerHTML(): string;

	toHTML = (): HTMLElement => {
		let result: HTMLElement = <HTMLDivElement>document.createElement('div');
		result.classList = 'fixedWidth';
		result.id = this.id;
		
		result.innerHTML = this.getInnerHTML();
		return result;
	};

    // Force a render of this string HTML code, needs to already be in the DOM
	render = () => {
		var e = document.getElementById(this.id);
		if(e !== null){
			e.innerHTML = this.getInnerHTML();
		}
	}
}