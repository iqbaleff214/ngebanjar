<script>
    import CircleButton from "./CircleButton.svelte";
    import {createEventDispatcher} from "svelte";
    import {getProfile} from "../config/profile.js";

    const dispatcher = createEventDispatcher();

    const tips = [
        {
            title: '[Tips] Singkatan-singkatan',
            content: '(BH) adalah Bahasa Halus, sedangkan (BK) adalah Bahasa Kasar',
        },
        {
            title: '[Tips] Belajar Pengucapan',
            content: 'Pada saat belajar, klik tombol kecil bergambar pengeras suara agar dapat mendengarkan cara pengucapannya',
        },
        {
            title: '[Tips] Semakin Jago',
            content: 'Perbanyak praktik dengan berbicara bahasa Banjar, jangan lupa perbanyak kosakata juga ya',
        },
        {
            title: '[Tips] Buka Kamus',
            content: 'Ngebanjar juga menyediakan kamus Banjar-Indonesia, kalau kamu klik kata yang bercetak tebal (kata dalam bahasa Banjar) maka kamu dapat mendengarkan cara pengucapannya',
        },
    ];

    const profile = getProfile();
    const getTipsIndex = () => {
        if (profile.words.length === 0) return 0;

        const min = Math.ceil(0);
        const max = Math.floor(tips.length - 1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export let tipsIndex = getTipsIndex();
</script>

<div class="backdrop">
    <div class="modal">
        <h2>{tips[tipsIndex].title}</h2>
        <p>{tips[tipsIndex].content}</p>

        <div class="close-button">
            <CircleButton class="red background-none" on:click={() => dispatcher('cancel', true)}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="30"
                     height="30" viewBox="0 0 24 24" stroke-width="4" stroke="#fff" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 6l-12 12"/>
                    <path d="M6 6l12 12"/>
                </svg>
            </CircleButton>
        </div>

    </div>
</div>

<style>
    .backdrop {
        height: 100%;
        width: 100%;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
    }

    .modal {
        padding: 25px 50px;
        background-color: var(--white-primary);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50px;
        color: var(--bg-primary);
        box-shadow: 0 15px 15px 5px rgba(1, 1, 1, .2);
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 10px solid var(--white-secondary);
    }

    .warning-text {
        color: red;
    }

    .input-wrapper {
        margin-bottom: 30px;
    }

    .close-button {
        position: absolute;
        top: -10px;
        right: -10px;
    }
</style>