<script>
    import { type, criteria } from './stores.js'
    export let brewList

    $: teas = brewList.filter(tea => tea.type === $type)

    // select by default when type as only one criteria
    $: if (teas.length === 1) {
        criteria.set(teas[0].criteria[0].cn)
    }

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`
</script>

<select name="criteria-list" bind:value="{$criteria}">
    <option disabled selected value>-- sélectionner un critère --</option>
    {#each teas as tea}
        <option value="{tea.criteria[0].cn}">
            {slugifyTranslation(tea.criteria[0])}
        </option>
    {/each}
</select>
