<script>

    import {createEventDispatcher, onDestroy} from "svelte";
    import {getProfile} from "../config/profile.js";
    import {dictionaries, words} from "../config/dictionary.js";
    import Button from "../components/Button.svelte";
    import {clickedUp} from "../config/audio.js";

    const dispatcher = createEventDispatcher();

    const getWordIndex = () => {
        const min = Math.ceil(startIndex);
        const max = Math.floor(index - 1);
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        if (dictionaries[words[randomInt]].examples) {
            return randomInt;
        }

        return getWordIndex();
    }
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    export let index;

    const profile = getProfile();
    const todayLearnedWord = profile.reports[new Date().toDateString()].words.length;
    const startIndex = index - todayLearnedWord;

    const wordIndex = getWordIndex();
    const word = words[wordIndex];
    const dictionary = dictionaries[word];

    const getRandomWord = () => {
        const min = Math.ceil(0);
        const max = Math.floor(index);
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

        if (randomInt === wordIndex) {
            return getRandomWord();
        }

        return words[randomInt];
    };

    const choices = new Array(3).fill(null).map((_) => getRandomWord());
    choices.push(words[wordIndex]);
    const shuffledChoices = shuffleArray(choices);

    let question = dictionary.examples[0];


    if (profile.words.length === words.length) {
        dispatcher('finish');
    }

    const maxCounter = 60;
    let counter = maxCounter;

    const interval = setInterval(() => {
        clickedUp.load();
        clickedUp.play().then(() => {
            counter--;

            if (counter <= 0) {
                clearInterval(interval);
                location.href = '#timeout';
            }
        });
    }, 1000);

    const submit = (w) => {
        clearInterval(interval);
        if (w === word) {
            const score = Math.ceil(counter / 60 * 100);
            dispatcher('quiz', {score})
        } else {
            dispatcher('quiz', {score: -1});
        }
    };

    onDestroy(() => clearInterval(interval));
</script>

<div class="container">
    <h1>KUIS</h1>
    <h2>{counter.toString().padStart(2, '0')}</h2>
    <p class="instruction">Lengkapi kalimat berikut:</p>
    <p class="question">"{question.banjar.replace(word, '___')}"</p>
    <p class="hint">{question.indonesia}</p>

    <div class="answer-wrapper">
        <div class="answers">
            {#each shuffledChoices as choice}
                <Button on:click={() => submit(choice)} class="fixed-size background-purple orange">{choice}</Button>
            {/each}
        </div>
    </div>
</div>

<style>
    .container {
        margin: 0 25px;
        padding-top: 88px;
    }

    .instruction {
        margin-bottom: 0;
        font-size: 0.85em;
    }

    .question {
        margin-top: 5px;
        margin-bottom: 0;
        font-size: 1.5em;
        font-style: italic;
        font-weight: bold;
    }

    .hint {
        margin-top: 5px;
        font-weight: bold;
    }

    .answers {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        grid-auto-rows: minmax(10px, auto);
    }

    .answer-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    h1 {
        margin-bottom: 0;
    }

    @media (max-width: 480px) {
        .container {
            margin-bottom: 85px;
            padding-top: 25px;
        }

        .answers {
            gap: 10px;
        }
    }
</style>
