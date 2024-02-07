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
        border-radius: 50%;
        width: 50px !important;
        height: 50px !important;
        padding: 0;
        vertical-align: middle;
        line-height: 1;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 4px solid black;
        user-select: none;
        box-shadow: 0 3px 3px 0 #999;
    }

    button:active {
        box-shadow: 0 1px 5px 0 #999;
        border-bottom: 1px solid black;
        transform: translateY(3px);
    }

    .orange {
        background-color: var(--orange-primary);
        border-bottom: 4px solid var(--orange-secondary);
    }

    .orange:active {
        border-bottom: 1px solid var(--orange-secondary);
    }

    .teal {
        background-color: var(--teal-primary);
        border-bottom: 4px solid var(--teal-secondary);
        color: white;
    }

    .teal:active {
        border-bottom: 1px solid var(--teal-secondary);
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

</style>