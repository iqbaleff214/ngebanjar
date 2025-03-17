<script>
    let {
        value = $bindable(), ...prop
    } = $props();
</script>

<input bind:value
       class="bg-slate-100 border border-2 border-pink-400 text-gray-900 text-sm rounded-2xl focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 lg:px-5 lg:py-3"
       {...prop} />