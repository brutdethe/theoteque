<style>
    a,
    a:hover {
        border: none;
    }

    .type {
        display: grid;
        grid-template-columns: 4em 4em;
    }
    .color {
        border: 1px solid black;
        width: 2.5em;
        height: 2.5em;
        margin: 0 0.5em;
        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
    }
    .pinyin {
        font-size: 0.7em;
        color: #999;
        border-bottom: 1px solid #002920;
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
</script>

<aside class="type">
    <span class="color" style="background: {colors[ideogram]}"></span>
    <a class="text" href="/liste-des-thes-{ideogram}">
        <span class="ideogram">{ideogram}</span>
        <span class="pinyin">{pinyin}</span>
    </a>
</aside>
