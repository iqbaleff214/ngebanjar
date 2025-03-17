<script>
    import Layout from "./component/Layout.svelte";
    import {onMount} from "svelte";
    import {init} from "./util/helper";
    import {page} from "./util/shared.svelte.js";
    import Home from "./component/page/Home.svelte";
    import Learn from "./component/page/Learn.svelte";
    import Dictionary from "./component/page/Dictionary.svelte";

    const pages = {
        HOME: {
            key: 'HOME',
            component: Home,
        },
        LEARN: {
            key: 'LEARN',
            component: Learn,
        },
        DICTIONARY: {
            key: 'DICTIONARY',
            component: Dictionary,
        },
    };

    onMount(() => {
        init();
        page.current = pages[window.location.hash?.substring(1)?.toUpperCase()]?.key ?? pages.HOME.key;
    });
</script>

<Layout>
    <div class="p-4 w-full h-full">
        {@render pages[page.current]?.component()}
    </div>
</Layout>