<style>
    div {
        display: inline-block;
        border: 1px solid black;
        width: 2em;
        height: 2em;
        margin: 0 0.5em;
    }
</style>

<script>
    import { onMount } from 'svelte'

    export let type

    let types = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/types`)

        if (res.ok) {
            types = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    function getColor(typeParam, types) {
        const typeFind = types.filter(type => type.zh === typeParam) || {}
        return 'color' in typeFind ? typeFind.color : 'white'
    }
</script>

<div style="background: {getColor(type, types)}"></div>
