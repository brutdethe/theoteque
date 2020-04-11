<script>
    import { type, criteria } from './stores.js'
    export let brewList

    $: teas = brewList.filter(tea => tea.type === $type)

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`
</script>

<select name="criteria-list" bind:value="{$criteria}">
    <option disabled selected value>-- sélectionner un critère --</option>
    {#each teas as tea, index}
        <option value="{index}">{slugifyTranslation(tea.criteria[0])}</option>
    {/each}
</select>
