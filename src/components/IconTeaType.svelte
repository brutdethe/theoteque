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
    import { i18n } from '../stores.js'

    export let type
    console.log('type', type)
    function getColor(type, i18n) {
        if (i18n.hasOwnProperty(type)) {
            return i18n[type].color
        }
        return 'white'
    }
</script>

<div style="background: {getColor(type, $i18n)}"></div>
