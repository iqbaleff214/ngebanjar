<script>
    import {onMount} from "svelte";

    let page;

    const getPage = () => page = window.location.hash.substring(1) ?? '';
    addEventListener("hashchange", (_) => getPage());

    onMount(() => getPage());
</script>

<nav class="menu">
    <a href="#home" class:active={page === 'home' || page === '' || page === null}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-box-bottom-center-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-9.333 13a1 1 0 0 0 -1 1v2l.007 .117a1 1 0 0 0 1.993 -.117v-2l-.007 -.117a1 1 0 0 0 -.993 -.883zm3 -4a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117a1 1 0 0 0 -.993 -.883zm3 2a1 1 0 0 0 -1 1v4l.007 .117a1 1 0 0 0 1.993 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor" />
        </svg>
        <div>Hasil</div>
    </a>
    <a href="#learn" class:active={page === 'learn'}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play-filled" width="20"
             height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
                  stroke-width="0" fill="currentColor"/>
        </svg>
        <div>Belajar</div>
    </a>
    <a href="#dictionary" class:active={page === 'dictionary'}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book-filled" width="20" height="20"
             viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12.088 4.82a10 10 0 0 1 9.412 .314a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -8 0a1 1 0 0 1 -1 0a8 8 0 0 0 -7.733 -.148l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -.068v-13a1 1 0 0 1 .5 -.866a10 10 0 0 1 9.412 -.314l.088 .044l.088 -.044z"
                  stroke-width="0" fill="currentColor"/>
        </svg>
        <div>Kamus</div>
    </a>
</nav>

<style>
    nav.menu {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        padding: 20px 0;
        z-index: 99;
        background-color: rgba(78, 41, 143, 0.5);
        backdrop-filter: blur(10px);
    }

    a {
        font-weight: 500;
        color: var(--white-secondary);
        text-decoration: inherit;
        transition: all 0.2s ease;
    }

    a:active, a:hover {
        color: var(--white-primary);
    }

    a.active {
        font-weight: 600;
        color: var(--white-primary);
    }

    a > div {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 12px;
        transition: all 0.02s ease;
    }

    a.active > div {
        font-weight: 600;
    }

    @media (min-width: 480px) {
        nav.menu {
            top: 0;
            left: 0;
            bottom: unset;
            justify-content: start;
            width: 100%;
            background-color: rgba(78, 41, 143, 0.5);
            backdrop-filter: blur(10px);
        }

        nav.menu a {
            padding: 0 25px;
        }

        nav.menu svg {
            display: none;
        }
    }
</style>