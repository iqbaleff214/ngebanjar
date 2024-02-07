<script>
    import {dictionaries, words} from "../config/dictionary.js";
    import {createEventDispatcher} from "svelte";
    import Button from "../components/Button.svelte";
    import CircleButton from "../components/CircleButton.svelte";

    const dispatcher = createEventDispatcher();

    export let index = 0;

    const word = words[index]
    const wordObject = dictionaries[word];

    const msg = new SpeechSynthesisUtterance(word);
    msg.lang = 'id-ID';
    const voices = speechSynthesis.getVoices().filter(v => v.lang === 'id-ID');
    msg.voice = voices[0];
    msg.rate = 0.05;

    const speak = () => speechSynthesis.speak(msg);

</script>

<div class="container">
    <div class="word-container">
        <h1>{word}</h1>
        <p>{wordObject.translation.join(', ')}</p>
    </div>
    <div class="navigation">
        <div>
            <CircleButton class="background-purple teal" on:click={() => speak()}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="25"
                     height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 8a5 5 0 0 1 0 8"/>
                    <path d="M17.7 5a9 9 0 0 1 0 14"/>
                    <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"/>
                </svg>
            </CircleButton>
        </div>
        <div>
            <Button class="background-purple orange" on:click={() => setTimeout(() => dispatcher('next', true), 50)}>
                Selanjutnya
            </Button>
        </div>
    </div>
    <div class="explanation-container">
        <div>
            <h4>Turunan</h4>
            {#if (Object.keys(wordObject.others ?? {}).length > 0)}
                <div class="other-container">
                    {#each Object.keys(wordObject.others) as other}
                        <div class="other-word">{other}</div>
                        <div class="other-translation">{wordObject.others[other]}</div>
                    {/each}
                </div>
            {:else}
                <p>-</p>
            {/if}
        </div>
        <div>
            <h4>Contoh</h4>
            {#if (wordObject.examples)}
                {#each wordObject.examples as ex}
                    <div class="example">
                        <p class="banjar"><i>"{ex.banjar}"</i></p>
                        <p class="indonesia">{ex.indonesia}</p>
                    </div>
                {/each}
            {:else}
                <p>-</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .container {
        margin: 0 25px;
        padding-top: 88px;
    }

    .word-container h1 {
        margin-top: 0;
    }

    .explanation-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(10px, auto);
    }

    .explanation-container h4 {
        text-decoration: underline;
    }

    .other-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(10px, auto);
    }

    .other-container > .other-word {
        text-align: end;
        font-weight: bold;
        font-size: 1.17em;
    }

    .other-container > .other-translation {
        text-align: start;
    }

    .navigation {
        display: flex;
        justify-content: center;
    }

    .navigation > div {
        margin: 5px;
    }

    .example > .banjar {
        margin-bottom: 0;
    }

    .example > .indonesia {
        margin-top: 0;
        font-weight: 500;
    }

    @media (max-width: 480px) {
        .explanation-container {
            grid-template-columns: repeat(1, 1fr);
        }

        .container {
            margin-bottom: 85px;
            padding-top: 25px;
        }
    }
</style>