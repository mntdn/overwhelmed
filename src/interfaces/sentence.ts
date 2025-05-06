export interface Letter {
    content: string;
}

export interface Word {
    content: Letter[];
    isOrdered: boolean;
}

export interface Position {
    id: string;
    word: number;
    letter: number;
}