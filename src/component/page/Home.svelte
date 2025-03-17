<script>
    import {user} from "../../util/shared.svelte.js";
</script>

{#if (user.name !== '')}
    <div class="text-center mb-5 text-xl text-slate-100 font-semibold">
        Halo, <br> {user.name}!
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each Object.keys(user.reports) as date}
            {@const score = user.reports[date].score}
            {#if (score >= 0)}
                {@const words = user.reports[date].words}
                <div class="bg-slate-100 flex flex-col gap-y-2.5 rounded-4xl min-h-[100px] w-full relative border-b-4 border-black/25 shadow-[0_3px_3px_0_rgba(0,0,0,0.25)] p-5">
                    <div class="flex items-start justify-between">
                        <div class="flex flex-col items-start gap-y-1">
                            <small class="text-xs text-slate-400">tanggal</small>
                            <small class="text-sm text-slate-800">{date}</small>
                        </div>
                        <div class="flex flex-col items-end gap-y-1">
                            <small class="text-xs text-slate-400">skor</small>
                            <small class="text-sm text-slate-800 font-semibold">
                                {score}
                            </small>
                        </div>
                    </div>
                    <div class="flex flex-col items-start gap-y-1">
                        <small class="text-xs text-slate-400">kosakata</small>
                        <div class="flex flex-wrap justify-between gap-1">
                            {#each words as word(word)}
                                <div class="bg-slate-200 text-sm px-2 rounded-lg">{word}</div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}