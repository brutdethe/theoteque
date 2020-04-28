<script context="module">
    export function preload(page) {
        return { pinyin: page.params.pinyin }
    }
</script>

<script>
    export let pinyin
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>
pinyin: {pinyin}
