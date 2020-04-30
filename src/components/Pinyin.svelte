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
    import { i18n } from '../stores.js'

    export let text

    function getPinyin(text, i18n) {
        if (i18n[text]) {
            return i18n[text].pinyin
        }
    }
</script>

<div>
    <p>{text}</p>
    <p class="pinyin">{getPinyin(text, $i18n)}</p>
</div>
