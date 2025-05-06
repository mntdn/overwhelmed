export interface Letter {
    content: string;
}

export interface Word {
    content: Letter[];
    isOrdered: boolean;
}

export interface Position {
    word: number;
    letter: number;
}