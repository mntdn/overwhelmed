export interface Letter {
    content: string;
}

export interface Word {
    content: Letter[];
    isOrdered: boolean;
}

export interface Sentence {
    content: Word[];
    isOrdered: boolean;
}