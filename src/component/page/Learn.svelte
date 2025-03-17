<script>
    import {user} from "../../util/shared.svelte.js";
    import VolumeIcon from "../icon/volume.svg";
    import RefreshIcon from "../icon/refresh.svg";
    import Button from "../Button.svelte";
    import {getRandomElements, getTodayLearnedWord, getWord, save, todayLocale} from "../../util/helper.js";
    import {onDestroy, onMount} from "svelte";

    const reportKey = todayLocale();
    const maxCountdown = 10;

    let interval;
    let countdown = $state(maxCountdown);
    let word = $state(getWord());
    let options = $state([]);

    const msg = new SpeechSynthesisUtterance();
    const voices = speechSynthesis.getVoices().filter(v => v.lang === 'id-ID');
    msg.lang = 'id-ID';
    msg.voice = voices[0];
    msg.rate = 0.05;

    const load = () => {
        if (user.reports[reportKey].words.length >= user.wordToLearn) {
            word = getTodayLearnedWord();
            let wrongs = getRandomElements(user.words, word.word, Math.min(user.reports[reportKey].words.length, 4) - 1);
            options = [word.word, ...wrongs].sort(() => 0.5 - Math.random());

            if (user.reports[reportKey].score >= 0)
                return;

            countdown = maxCountdown;
            const tickAudio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
            tickAudio.load();
            interval = setInterval(() => {
                tickAudio.play().then(() => {
                    countdown--;
                    if (countdown < 0) {
                        clearInterval(interval);
                        interval = null;
                    }
                });
            }, 1000);
        } else {
            word = getWord();
        }
    };

    const speak = () => {
        msg.text = word?.syllables ?? word?.word;
        speechSynthesis.speak(msg);
    };

    const next = () => {
        user.words.push(word.word);
        user.reports[reportKey].words.push(word.word);
        user.reports[reportKey].score = -1;
        save();
        console.log('current:', user.reports[reportKey].words.length, word.word);
        load();
    };

    const submit = (w) => {
        clearInterval(interval);
        if (word.word === w) {
            user.reports[reportKey].score = Math.ceil(countdown / maxCountdown * 100);
            save();
        }
        countdown = -1;
    };

    onMount(load);
    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    })
</script>

{#if (user.reports[reportKey].words.length < user.wordToLearn)}
    <div class="flex flex-col items-center gap-y-3 text-slate-100">
        <h1 class="text-center mb-4 mt-5 text-5xl font-semibold">{word.word}</h1>
        {#if (word.syllables)}
            <h3 class="italic font-light">{word.syllables}</h3>
        {/if}
        {#each word.meanings as meaning}
            {#each meaning.definitions as definition}
                <p class="font-light text-center text-xl text-slate-100">{definition.definition}</p>
            {/each}
        {/each}
        <div class="flex gap-x-3 mt-4">
            <Button onclick={speak}
                    class="rounded-full bg-teal-600 min-h-[40px] min-w-[40px] flex items-center justify-center">
                <img src={VolumeIcon} alt="volume icon">
            </Button>
            <Button onclick={next}
                    class="bg-amber-500 min-h-[40px] min-w-[130px] rounded-full text-white">
                Selanjutnya
            </Button>
        </div>
    </div>
{:else if (user.reports[reportKey].score < 0 && countdown >= 0)}
    <div class="flex flex-col items-center gap-y-3 text-slate-100 mt-4">
        <div class="text-2xl">{countdown}</div>
        <h1 class="text-center mb-4 mt-5 text-3xl font-semibold">KUIS</h1>
        <p class="font-light text-center text-2xl text-slate-100">
            {word?.meanings?.[0]?.definitions?.[0]?.definition}
        </p>
        <h3 class="font-light">merupakan definisi dari ...</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {#each options as option}
                <Button onclick={() => submit(option)}
                        class="bg-amber-500 min-h-[40px] min-w-[130px] rounded-full text-white">
                    {option}
                </Button>
            {/each}
        </div>
    </div>
{:else if (user.reports[reportKey].score < 0)}
    <div class="flex flex-col items-center gap-y-3 text-slate-100 mt-4">
        <h1 class="text-center mb-4 mt-5 text-3xl font-semibold">SALAH!</h1>
        <p class="font-light text-center text-2xl text-slate-100">Yuk dicoba lagi...</p>
        <Button onclick={load}
                class="rounded-full bg-teal-600 min-h-[40px] min-w-[40px] flex items-center justify-center">
            <img src={RefreshIcon} alt="volume icon">
        </Button>
    </div>
{:else if (user.reports[reportKey].score >= 0 && countdown >= 0)}
    <div class="flex flex-col items-center gap-y-3 text-slate-100 mt-4">
        <h1 class="text-center mb-4 mt-5 text-3xl font-semibold">KEREN! 😎</h1>
        <p class="font-light text-center text-2xl text-slate-100">Skor kuis kamu hari ini adalah</p>
        <h3 class="font-bold text-6xl text-slate-100">{user.reports[reportKey].score}</h3>
        <p class="font-light text-center text-2xl text-slate-100">Sampai jumpa besok ya 😉</p>
    </div>
{:else }
    <div class="flex flex-col items-center gap-y-3 text-slate-100 mt-4">
        <h1 class="text-center mb-4 mt-5 text-3xl font-semibold">SELAMAT! 🎉</h1>
        <p class="font-light text-center text-2xl text-slate-100">Kamu telah menyelesaikan kuis hari ini dengan skor</p>
        <h3 class="font-bold text-6xl text-slate-100">{user.reports[reportKey].score}</h3>
        <p class="font-light text-center text-2xl text-slate-100">Sampai jumpa besok ya 😉</p>
    </div>
{/if}

