import type {Dictionary, User} from "./type";

export const page = $state({
    current: '',
});

export const user: User = $state<User>({
    name: '',
    score: 0,
    words: [],
    wordToLearn: 5,
    reports: {},
    lastUpdatedAt: new Date(),
});

export const dictionary: Dictionary= $state<Dictionary>({
    index: {},
    words: [],
});