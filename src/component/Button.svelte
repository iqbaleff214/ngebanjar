<script module>
    const clickedDownAudio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3');
    const clickedUpAudio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3');

    clickedDownAudio?.load();
    clickedUpAudio?.load();
</script>

<script>
    let {children, ...props} = $props();

    const onmousedown = () => {
        clickedDownAudio?.play();
    };
    const onmouseup = () => {
        clickedUpAudio?.play();
    };
</script>

<button {onmousedown} {onmouseup} type="button" {...props}>
    {@render children?.()}
</button>


<style>
    button {
        cursor: pointer;
        transition: all 0.2s ease;
        width: 50px;
        height: 50px;
        padding: 0;
        vertical-align: middle;
        line-height: 1;
        user-select: none;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 4px solid rgba(0, 0, 0, 0.25);
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.25);
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    button:active {
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
        border-bottom: 1px solid rgba(0, 0, 0, 0.50);
        transform: translateY(3px);
    }

    button:disabled:active {
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.25);
        border-bottom: 4px solid rgba(0, 0, 0, 0.25);
        transform: none;
    }
</style>