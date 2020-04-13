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
    import { type, criteria, brewStyle } from './stores.js'
    import tea from './teaData.js'

    $: brew = tea.brewData.filter(
        tea => tea.type === $type && tea.criteria[0].cn === $criteria
    )[0].brew_style[$brewStyle]

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
        {display.temperature(brew.temperature)}
    </li>
    {#if brew.duration}
        <li>
            <img
                src="assets/temps.svg"
                alt="durée"
                title="durée"
                width="30px"
            />
            {brew.duration} sec
        </li>
    {/if}
    <li>
        <img
            src="assets/{$brewStyle}.svg"
            alt="{$brewStyle}"
            width="50px"
            title="{$brewStyle}"
        />
        ratio : {brew.quantity}
    </li>
    {#if brew.times}
        <li class="times">infuser {brew.times}</li>
    {/if}
</ul>
