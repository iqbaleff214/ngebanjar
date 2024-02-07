<script>
    import Input from "../components/Input.svelte";
    import {dictionaries, words} from "../config/dictionary.js";
    import {createEventDispatcher, onMount} from "svelte";

    export let index;

    const dispatcher = createEventDispatcher();

    let search = '';

    const sortedWords = words.toSorted();

    const sayWord = new SpeechSynthesisUtterance("Hai IQBAL!");
    sayWord.lang = 'id-ID';
    const voices = speechSynthesis.getVoices().filter(v => v.lang === 'id-ID');
    sayWord.voice = voices[0];
    sayWord.rate = 1;
    sayWord.rate = 0.05;

    const speak = (text) => {
        sayWord.text = text;
        speechSynthesis.speak(sayWord);
    }

    onMount(() => dispatcher('open', true));
</script>

<div class="search-wrapper">
    <div class="search-bar">
        <Input placeholder="Cari di kamus..." bind:value={search}/>
    </div>
</div>

<div class="container">
    {#each sortedWords.filter(s => s.includes(search)) as word}
        <div>
            <div class="main-word">
                <h3 aria-label={word} on:click={() => speak(word)}>{word}</h3>
                {#if (dictionaries[word].translation.length === 1)}
                    {dictionaries[word].translation[0]}
                {/if}
            </div>
            {#if (dictionaries[word].translation.length > 1)}
                <ul class="translations">
                    {#each dictionaries[word].translation as translation}
                        <li>{translation}</li>
                    {/each}
                </ul>
            {/if}
            {#if (dictionaries[word].others)}
                {#each Object.keys(dictionaries[word].others) as other}
                    <p><span class="other-word" aria-hidden="true" on:click={() => speak(other)}>{other}</span> {dictionaries[word].others[other]}</p>
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style>
    .search-wrapper {
        width: 50%;
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        display: flex;
        justify-content: right;
    }

    .search-bar {
        position: sticky;
        top: 0;
        right: 0;
        width: 50%;
        padding: 15px 100px 15px 25px;
        z-index: 100;
    }

    .container {
        margin: 88px 25px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(10px, auto);
    }

    .container > div {
        text-align: start;
    }

    .container > div > .main-word > h3 {
        margin: 5px 5px 5px 0;
        cursor: pointer;
    }

    .container > div > ul.translations {
        margin: 0;
    }

    .container > div > p {
        margin: 5px 0 5px 25px;
    }

    .main-word {
        display: flex;
        align-items: center;
    }

    .other-word {
        font-weight: bold;
        font-size: 1.17em;
        cursor: pointer;
    }

    @media (max-width: 480px) {
        .search-wrapper {
            justify-content: left;
            background-color: rgba(78, 41, 143, 0.5);
            backdrop-filter: blur(10px);
            width: 100%;
        }

        .search-bar {
            width: 100%;
            right: unset;
            left: 0;
        }

        .container {
            grid-template-columns: repeat(1, 1fr);
        }

        .container > div {
            flex: 100%;
        }
    }

</style>