<script>
    import { type, criteria } from './stores.js'

    export let typeList

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`

    const typeParams = Object.values(typeList).map((typeTitle, index) => ({
        key: Object.keys(typeList)[index],
        title: slugifyTranslation(typeTitle)
    }))

    const resetCriteria = () => criteria.set(undefined)
</script>

<select name="type-list" bind:value="{$type}" on:change="{resetCriteria}">
    <option disabled selected value>-- sélectionner un type de thé --</option>
    {#each typeParams as typeParam}
        <option value="{typeParam.key}">{typeParam.title}</option>
    {/each}
</select>
