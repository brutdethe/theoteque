<style>
    .pinyin {
        font-size: 0.8em;
        color: #999;
        display: block;
    }
</style>

<script>
    import { onMount } from 'svelte'
    import yaml from 'js-yaml'

    export let text

    let i18n = []

    onMount(async () => {
        const responsei18n = await fetch('./teaTranslate.yaml')

        if (responsei18n.ok) {
            i18n = yaml.safeLoad(await responsei18n.text())
        } else {
            throw new Error(text)
        }
    })

    function getPinyin(text, i18n) {
        if (i18n[text]) {
            return i18n[text].pinyin
        }
    }
</script>

{text}
<span class="pinyin">{getPinyin(text, i18n)}</span>
