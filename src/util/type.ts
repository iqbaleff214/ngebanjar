export interface Report {
    words: string[],
    score: number,
}

export interface User {
    name: string,
    score: number,
    words: string[],
    wordToLearn: number,
    reports: Record<string, Report>,
    lastUpdatedAt: Date,
}


export interface Example {
    bjn: string;
    id: string;
}

export interface Definition {
    definition?: string;
    partOfSpeech: string;
    examples?: Example[];
}

export interface Meaning {
    definitions: Definition[];
}

export interface Derivative {
    word: string;
    syllables?: string;
    definitions: Definition[];
}

export interface Word {
    word: string;
    syllables?: string;
    alphabet: string;
    meanings: Meaning[];
    derivatives?: Derivative[];
}

export interface Dictionary {
    index: Record<string, number>;
    words: Word[];
}