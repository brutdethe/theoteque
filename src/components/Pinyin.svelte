<style>
    .pinyin {
        font-size: 0.7em;
        color: #999;
        display: block;
    }
</style>

<script>
    import { i18n } from '../stores.js'

    export let text

    function getPinyin(text, i18n) {
        if (i18n[text]) {
            return i18n[text].pinyin
        }
    }
</script>

{text}
<span class="pinyin">{getPinyin(text, $i18n)}</span>
