<script>
    import Home from "./pages/Home.svelte";
    import Learn from "./pages/Learn.svelte";
    import Quiz from "./pages/Quiz.svelte";
    import Dictionary from "./pages/Dictionary.svelte";
    import {onMount} from "svelte";
    import {getProfile, saveProfile} from "./config/profile.js";
    import Setting from "./components/Setting.svelte";
    import CircleButton from "./components/CircleButton.svelte";
    import Menu from "./components/Menu.svelte";
    import Hint from "./components/Hint.svelte";
    import {words} from "./config/dictionary.js";
    import Tomorrow from "./pages/Tomorrow.svelte";
    import Finish from "./pages/Finish.svelte";
    import TimeOut from "./pages/TimeOut.svelte";
    import WrongAnswer from "./pages/WrongAnswer.svelte";

    let page;

    const profile = getProfile();
    const pages = {
        null: Home,
        '': Home,
        'home': Home,
        'learn': Learn,
        'quiz': Quiz,
        'dictionary': Dictionary,
        'tomorrow': Tomorrow,
        'finish': Finish,
        'timeout': TimeOut,
        'wrong': WrongAnswer,
    };

    const menu = {
        setting: false,
        hint: true,
    };

    const getPage = () => {
        page = window.location.hash.substring(1) ?? '';
        if (page === 'learn' && (profile.reports[today].words.length >= 5 || profile.words.length === words.length)) {
            page = 'quiz';
        }

        if (page === 'quiz' && profile.reports[today].score) {
            if (profile.words.length === words.length) {
                page = 'finish';
            } else {
                page = 'tomorrow';
            }
        }
    }
    addEventListener("hashchange", (_) => getPage());

    const today = (new Date()).toDateString();
    let startIndex = profile.words.length;
    $: learnedToday = profile.reports[today].words.length;
    $: wayToGoToday = 5 - learnedToday;

    let index = startIndex;

    const submitSetting = (e) => {
        profile.name = e.detail
        saveProfile(profile);
        menu.setting = false;
    }

    const submitQuiz = (e) => {
        const score = e.detail.score;

        if (score < 0) {
            location.href = '#wrong';
            return;
        }

        profile.reports[today].score = score;
        profile.score += score;

        saveProfile(profile);

        if (profile.words.length === words.length) {
            page = 'finish';
        } else {
            page = 'tomorrow';
        }
    };

    const nextPage = () => {
        profile.words = [...profile.words, words[index]];
        profile.reports[today].words = [...profile.reports[today].words, words[index]];
        profile.lastUpdatedAt = new Date().toISOString();
        learnedToday++;

        index++;

        saveProfile(profile);

        if (wayToGoToday <= 1 || index > words.length - 1) {
            getPage();
        }
    }

    onMount(() => getPage());
</script>

<div class="setting-menu">
    <CircleButton class="background-purple" on:click={() => menu.setting = true}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings-filled" width="30"
             height="30"
             viewBox="0 0 24 24" stroke-width="4" stroke="#fff" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                  stroke-width="0" fill="currentColor"/>
        </svg>
    </CircleButton>
</div>

<Menu/>

{#if (!profile.name) || menu.setting}
    <Setting on:submit={submitSetting} on:cancel={() => menu.setting = false}/>
{:else if profile.reports[today].words.length === 0 && page === 'learn' && menu.hint}
    <Hint on:cancel={() => menu.hint = false}/>
{/if}

{#key index}
    <svelte:component bind:index={index} this={pages[page]} on:quiz={submitQuiz} on:next={nextPage}/>
{/key}

<style>
    .setting-menu {
        position: fixed;
        top: 15px;
        right: 25px;
        z-index: 101;
    }
</style>