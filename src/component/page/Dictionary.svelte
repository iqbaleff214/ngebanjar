<script>
    import Input from "../Input.svelte";
    import {dictionary} from "../../util/shared.svelte.js";

    let search = $state('');

    const searchFilter = (word) => {
        if (search === '' || search === null || search === undefined)
            return true;

        return word.word.includes(search);
    };
</script>
<div class="mb-5">
    <Input placeholder={`Cari di kamus, tersedia ${dictionary.words.length} kosakata`} type="text" bind:value={search} />
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto">
    {#each dictionary.words.filter(searchFilter).slice(0, 9) as word(word.word)}
        <div class="bg-slate-100 flex flex-col gap-y-1.5 rounded-4xl min-h-[100px] w-full relative border-b-4 border-black/25 shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] p-5">
            <h3 class="font-semibold">{word.word}</h3>
            {#if (word.syllables)}
                <div>
                    <small class="italic text-sm text-slate-400">{word.syllables}</small>
                </div>
            {/if}
            {#each word.meanings as meaning}
                {#each meaning.definitions as definition}
                    <p class="text-light text-sm text-slate-500">{definition.definition}</p>
                {/each}
            {/each}
        </div>
    {/each}
</div>