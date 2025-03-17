import type {User, Word} from "./type";
import {dictionary, user} from "./shared.svelte";
import {words} from "../data/dictionaries";

const localStorageKey: string = "ngebanjar-iqbaleff214";

export const init = (): void => {
    dictionary.words = words;
    dictionary.index = words.reduce((acc, item, index) => {
        acc[item.word] = index;
        return acc;
    }, {} as Record<string, number>)

    if (!isLocalStorageAvailable()) {
        return;
    }

    const existing: string | null = localStorage.getItem(localStorageKey);
    if (existing !== null) {
        const profile: User = JSON.parse(existing);
        user.name = profile.name;
        user.score = profile.score;
        user.words = profile.words;
        user.wordToLearn = profile.wordToLearn;
        user.reports = profile.reports;
        user.lastUpdatedAt = profile.lastUpdatedAt;

        if (!user.reports[todayLocale()]) {
            user.reports[todayLocale()] = {
                score: -1,
                words: []
            };
        }
    } else {
        user.reports[todayLocale()] = {
            score: -1,
            words: []
        };

        localStorage.setItem(localStorageKey, JSON.stringify(user));
    }
};

export const todayLocale = (): string => new Date().toLocaleDateString("id-ID", {
    day: "2-digit", month: "2-digit", year: "numeric"
});

export const save = (): void => {
    user.lastUpdatedAt = new Date();
    localStorage.setItem(localStorageKey, JSON.stringify(user));
};

export const getLearnedWord = (): Word => {
    const length: number = user.words.length;
    const randomIndex: number = Math.floor(Math.random() * length);
    const index: number = dictionary.index[user.words[randomIndex]];
    return dictionary.words[index];
};

export const getTodayLearnedWord = (): Word => {
    const key = todayLocale();
    const length: number = user.reports[key].words.length;
    const randomIndex: number = Math.floor(Math.random() * length);
    const index: number = dictionary.index[user.reports[key].words[randomIndex]];
    return dictionary.words[index];
};

export const getWord = (): Word => {
    const length: number = dictionary.words.length;
    const index: number = Math.floor(Math.random() * length);
    const selectedWord: Word = dictionary.words[index];

    if (user.words.includes(selectedWord?.word)) {
        return getWord();
    }

    return selectedWord;
};

export const isLocalStorageAvailable = (): boolean => {
    try {
        const testKey: string = "__test";
        localStorage.setItem(testKey, "1");
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

export const getRandomElements = (arr: string[], exclude: string, count: number = 3): string[] => {
    const filteredArr = arr.filter(item => item !== exclude);
    const shuffled = filteredArr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}