<script>
    import { type, criteria, brewStyle } from './stores.js'

    export let brewList, brewStyleList

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`

    $: teas = brewList.filter(tea => tea.type === $type)

    // les critères uniques sont sélectionnés par défaut
    $: if (teas.length === 1) {
        brewStyle.set(0)
    }
</script>

<select name="brew-list" bind:value="{$brewStyle}">
    <option disabled selected value>
        -- sélectionner un style d'infusion --
    </option>
    {#each teas as tea, index}
        <option value="{index}">{slugifyTranslation(tea.methods[0])}</option>
    {/each}
</select>
