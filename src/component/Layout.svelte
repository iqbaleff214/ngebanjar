<script>
    import GearIcon from "./icon/gear.svg";
    import HomeIcon from "./icon/home.svg";
    import LearnIcon from "./icon/learn.svg";
    import CloseIcon from "./icon/close.svg";
    import BookmarkIcon from "./icon/bookmark.svg";
    import Button from "./Button.svelte";
    import Input from "../component/Input.svelte";
    import {fly, fade} from 'svelte/transition';
    import {page, user} from "../util/shared.svelte.js";
    import {save} from "../util/helper.js";
    import {onMount} from "svelte";

    let {children} = $props();

    let showSetting = $state(false);
    let isSaving = $state(false);

    const pages = [
        {
            title: 'Utama',
            page: 'HOME',
            icon: HomeIcon,
        },
        {
            title: 'Belajar',
            page: 'LEARN',
            icon: LearnIcon,
        },
        {
            title: 'Kamus',
            page: 'DICTIONARY',
            icon: BookmarkIcon,
        },
    ];

    const changeMenu = (menu) => {
        window.location.hash = menu?.toLowerCase();
        page.current = menu?.toUpperCase();
    };

    onMount(() => {
        setTimeout(() => {
            showSetting = user.name === '';
        }, 250);
    });
</script>


<div class="flex flex-col md:flex-col-reverse w-full h-screen bg-radial from-pink-500 from-40% to-fuchsia-700 relative">
    <div class="flex-1 h-full">
        {@render children?.()}
    </div>
    <div class="bg-black/25 md:bg-transparent h-min-[40px] flex justify-evenly md:justify-start md:gap-x-2 text-white p-1.5">
        {#each pages as menu(menu.page)}
            <div class="">
                <button onclick={() => changeMenu(menu.page)} class="flex flex-col gap-y-1 items-center cursor-pointer p-2.5 rounded-lg {page.current === menu.page ? 'bg-black/25' : 'hover:bg-black/10'}">
                    <img src={menu.icon} alt={`${menu.title} icon`} class="md:hidden">
                    <span class="uppercase text-sm font-medium">{menu.title}</span>
                </button>
            </div>
        {/each}
    </div>

    <div class="absolute top-1.5 right-1.5">
        <Button onclick={() => showSetting = true}
                class="cursor-pointer rounded-full bg-black/25 min-h-[40px] min-w-[40px] flex items-center justify-center">
            <img src={GearIcon} alt="setting icon">
        </Button>
    </div>

    {#if (showSetting)}
        <div class="absolute w-full h-full bg-black/45 flex items-center justify-center" transition:fade>
            <div transition:fly={{ y: -50, duration: 200 }}
                 class="bg-slate-100 flex flex-col rounded-4xl min-h-[300px] w-[75%] md:w-[50%] relative border-b-4 border-black/25 shadow-[0_3px_3px_0_rgba(0,0,0,0.25)]">
                <Button onclick={() => showSetting = false} disabled={(user.name === ''||user.name === null||user.name === undefined)||(user.wordToLearn < 2)}
                        class="absolute -top-3 -right-3 cursor-pointer rounded-full bg-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center">
                    <img src={CloseIcon} alt="close icon">
                </Button>
                <div class="p-6 flex flex-col items-end flex-1 gap-y-5 justify-between">
                    <h1 class="capitalize text-center font-semibold text-xl md:text-2xl text-fuchsia-800 w-full">
                        {user.name === '' ? `Selamat datang, wahai pejuang bahasa Banjar!` : `Pengaturan`}
                    </h1>
                    <div class="w-full flex flex-col gap-y-3">
                        <div class="flex flex-col gap-y-1">
                            <small class="text-slate-400 text-xs ms-3">Nama kamu</small>
                            <Input placeholder="Masukkan namamu di sini" type="text" bind:value={user.name}/>
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <small class="text-slate-400 text-xs ms-3">Kosakata per hari</small>
                            <Input placeholder="Berapa kosakata per hari" type="number" min="2" max="25" bind:value={user.wordToLearn}/>
                        </div>
                    </div>
                    <Button
                            disabled={isSaving||user.name === ''||user.name === null||user.name === undefined||user.wordToLearn < 2}
                            onclick={() => {isSaving = true; save(); isSaving = false; showSetting = false;}}
                            class="min-w-[90px] bg-fuchsia-800 rounded-2xl text-white">
                        Simpan
                    </Button>
                </div>
            </div>
        </div>
    {/if}
</div>