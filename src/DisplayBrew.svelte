<style>
    .times {
        font-style: italic;
    }

    h2 {
        padding: 0.5em;
    }

    ul {
        width: 40%;
        box-shadow: 1px 1px 1px 1px #ccc;
        background: rgb(243, 248, 234);
        margin: 1em auto;
        text-align: left;
        list-style: none;
    }

    li {
        padding: 1em;
    }

    img {
        margin: 0.5em;
        vertical-align: middle;
        display: inline-block;
    }
</style>

<script>
    import { teaGroup } from './stores.js'

    const display = {
        temperature: temperature => {
            return `${temperature.join('° à ')} °`
        }
    }
</script>

<ul>
    <h2>Conseil d'infusion</h2>
    <li>
        <img
            src="assets/temperature.svg"
            alt="température"
            title="température"
            width="30px"
        />
        {display.temperature($teaGroup.temperature)}
    </li>
    <li>
        <img src="assets/temps.svg" alt="durée" title="durée" width="30px" />
        {$teaGroup.duration} sec
    </li>
    <li>
        <img
            src="assets/{$teaGroup.method}.svg"
            alt="{$teaGroup.method}"
            width="50px"
            title="{$teaGroup.method}"
        />
        ratio : {$teaGroup.quantity}
    </li>
    <li class="times">infuser {$teaGroup.times}</li>
</ul>
