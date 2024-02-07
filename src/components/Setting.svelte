<script>
    import CircleButton from "./CircleButton.svelte";
    import Input from "./Input.svelte";
    import {createEventDispatcher} from "svelte";
    import {getProfile} from "../config/profile.js";

    const dispatcher = createEventDispatcher();
    const profile = getProfile();

    let name = profile.name;
    let warning = false;

    const submit = () => {
        if (!name) {
            warning = true;
            return;
        }
        dispatcher('submit', name)
    }
</script>

<div class="backdrop">
    <div class="modal">
        <h2>Selamat Datang, Pejuang Bahasa Banjar!</h2>
        <p>{profile.name ? `` : `Kita kenalan dulu yuk`}</p>

        <div class="input-wrapper">
            <Input placeholder="Nama kamu siapa?" bind:value={name}>
                {#if (name === null || name === '') && warning}
                    <small class="warning-text">Jangan kosong ya namanya</small>
                {/if}
            </Input>
        </div>

        {#if (profile.name)}
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
        {/if}

        <CircleButton class="orange" on:click={submit}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="30" height="30"
                 viewBox="0 0 24 24" stroke-width="4" stroke="#fff" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l5 5l10 -10"/>
            </svg>
        </CircleButton>
    </div>
</div>

<style>
    .backdrop {
        height: 100%;
        width: 100%;
        z-index: 100;
        position: absolute;
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