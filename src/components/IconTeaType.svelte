<style>
    span {
        display: block;
        border: 1px solid black;
        width: 1em;
        height: 1em;
        margin-top: 0.5em;
    }
</style>

<script>
    import { i18n } from '../stores.js'

    export let type

    function getColor(type, i18n) {
        if (i18n.hasOwnProperty(type)) {
            return i18n[type].color
        }
        return 'white'
    }
</script>

<span style="background: {getColor(type, $i18n)}"></span>
