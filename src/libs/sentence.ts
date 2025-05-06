import { SentenceBase } from './sentenceBase';

export class Sentence extends SentenceBase {
	getInnerHTML = (): string => {
		let htmlContent = '<div>';
		let wPos = 0;
		let lPos = 0;
		this.content.forEach(w => {
			w.content.forEach(l => {
				let isOK = this.letterOK({ id: '', word: wPos, letter: lPos });
				htmlContent += `<span onclick="letterClick('${this.id}',${wPos}, ${lPos})" class="${(isOK ? "ok" : "ko")}">${l.content}</span>`;
				lPos++;
			})
			htmlContent += ' ';
			wPos++;
			lPos = 0;
		})
		return htmlContent + '</div>';
	}
}