<style>
    a,
    a:hover {
        border: none;
    }

    .type {
        display: grid;
        grid-template-columns: 2.5rem 5rem;
    }
    .text {
        margin: 0 0.8rem;
        line-height: 1.2rem;
    }
    .color {
        border: 1px solid black;
        width: 2.5rem;
        height: 2.5rem;
        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
    }
    .ideogram {
        font-size: 0.8rem;
        color: #999;
    }
    .voice {
        cursor: pointer;
    }
</style>

<script>
    import { onMount } from 'svelte'

    export let ideogram, pinyin

    const colors = {
        綠茶: '#58D68D',
        白茶: 'white',
        黃茶: '#F4D03F',
        青茶: '#002fa7',
        紅茶: '#C0392B',
        黑茶: 'black'
    }

    function playAudio(ideogram) {
        document.querySelector(`#${ideogram}`).play()
    }
</script>

<aside class="type">
    <span class="color" style="background: {colors[ideogram]}"></span>
    <a class="text" href="/liste-des-thes-{ideogram}">
        <audio id="{ideogram}">
            <source src="assets/audio/{ideogram}.mp3" type="audio/mpeg" />
        </audio>
        <span
            class="pinyin voice"
            title="voix"
            on:click="{playAudio(ideogram)}"
        >
            {pinyin}
            <span
                class="ideogram voice"
                title="voix"
                on:click="{playAudio(ideogram)}"
            >
                {ideogram}
            </span>
        </span>
    </a>
</aside>
