<script>
    import {getProfile} from "../config/profile.js";

    export let index;

    const profile = getProfile();
    const today = (new Date()).toDateString();
</script>

<div class="container">
    <p><b>Keren!</b> Nilai kuis kamu hari ini:</p>
    <h1>{profile.reports[today].score}</h1>
    <p>Sampai jumpa besok ya</p>
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
