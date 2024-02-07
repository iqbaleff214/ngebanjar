<script>
    import {getProfile} from "../config/profile.js";

    export let index;

    const profile = getProfile();
</script>

<div class="container">
    <div class="header">
        <h2>Selamat Datang, {profile.name ?? 'kamu'}!</h2>
    </div>

    <div class="progress">
        {#each Object.keys(profile.reports) as date}
            <div class="progress-card">
                <div class="progress-header">
                    <div class="date">{new Date(date).toLocaleDateString('id-ID')}</div>
                    <div class="score">{profile.reports[date].score}</div>
                </div>
                <p><b>Kata:</b> {profile.reports[date].words.join(', ')}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        margin: 0 25px;
        padding-top: 88px;
    }

    .progress {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(10px, auto);
        text-align: start;
    }

    .progress-card {
        background-color: white;
        color: var(--bg-primary);
        padding: 25px 30px;
        box-shadow: 0 15px 15px 5px rgba(1, 1, 1, .2);
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 5px solid var(--white-secondary);
        border-radius: 30px;
    }

    .progress-card p {
        margin-bottom: 0;
    }

    .progress-header {
        display: flex;
        justify-content: space-between;
    }

    .date {
        font-weight: bold;
    }

    .score {
        font-size: 2em;
    }

    @media (max-width: 480px) {
        .container {
            margin-bottom: 85px;
            padding-top: 55px;
        }

        .progress {
            grid-template-columns: repeat(1, 1fr);
        }

    }
</style>