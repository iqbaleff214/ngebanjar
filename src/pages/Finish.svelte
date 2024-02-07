<script>
    import {getProfile} from "../config/profile.js";

    export let index;

    const profile = getProfile();
</script>

<div class="container">
    <p><b>Selamat!</b> Kamu udah selesaikan semua materi dengan nilai:</p>
    <h1>{(profile.score / Object.keys(profile.reports).length).toFixed(0)}</h1>
    <p>Semoga kamu makin jago bahasa Banjar ya</p>
</div>

<style>
    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1, p {
        margin: 10px;
    }

</style>
