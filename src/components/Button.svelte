<script>
    import {clickedDown, clickedUp} from "../config/audio.js";

    let buttonProps = { class: [ $$restProps.class ] }


    const clickDown = () => {
        clickedDown.load();
        clickedDown.play();
    }
    const clickUp = () => {
        clickedUp.load();
        clickedUp.play();
    }
</script>

<button
        type="button"
        {...buttonProps}
        on:mousedown={clickDown}
        on:mouseup={clickUp}
        on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        on:focus>
    <slot/>
</button>

<style>
    button {
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 50px;
        height: 50px !important;
        padding: 0 25px;
        vertical-align: middle;
        line-height: 1;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 4px solid black;
        user-select: none;
        box-shadow: 0 3px 3px 0 #999;
        font-family: Poppins, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-weight: bold;
    }

    button:active {
        box-shadow: 0 1px 5px 0 #999;
        border-bottom: 1px solid black;
        transform: translateY(3px);
    }

    .orange {
        background-color: var(--orange-primary);
        border-bottom: 4px solid var(--orange-secondary);
        color: var(--white-primary);
    }

    .orange:active {
        border-bottom: 1px solid var(--orange-secondary);
    }

    .red {
        background-color: var(--red-primary);
        border-bottom: 4px solid var(--red-secondary);
    }

    .red:active {
        border-bottom: 1px solid var(--red-secondary);
    }

    .background-purple {
        box-shadow: 0 3px 3px 0 var(--bg-secondary);
    }

    .background-purple:active {
        box-shadow: 0 1px 5px 0 var(--bg-secondary);
    }

    .background-none, .background-none:active {
        box-shadow: none;
    }

    .fixed-size {
        min-width: 200px !important;
    }

    @media (max-width: 480px) {

        .fixed-size {
            min-width: 125px !important;
        }
    }

</style>