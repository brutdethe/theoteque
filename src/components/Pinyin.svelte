<style>
    div {
        display: inline-block;
    }
    .pinyin {
        font-size: 0.7em;
        color: #999;
    }
    p {
        margin: 0;
        padding: 0;
    }
</style>

<script>
    import { onMount } from 'svelte'

    export let text

    let i18n = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)

        if (res.ok) {
            i18n = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    function getPinyin(text, i18n) {
        const term = i18n.filter(term => term.zh === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }
</script>

<div>
    <p>{text}</p>
    <p class="pinyin">{getPinyin(text, i18n)}</p>
</div>
