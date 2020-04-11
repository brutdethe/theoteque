<script>
    import { type } from './stores.js'
    export let brewList

    const teas = brewList.filter(tea => tea.type === $type)

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`
</script>

<select name="criteria-list">
    <option disabled selected>-- sélectionner un critère --</option>
    {#each teas as tea, index}
        <option value="{index}">{slugifyTranslation(tea.criteria[0])}</option>
    {/each}
</select>
