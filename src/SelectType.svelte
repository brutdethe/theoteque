<script>
    import { type, criteria, brewStyle } from './stores.js'

    export let typeData

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`

    const typeParams = Object.values(typeData).map((type, index) => ({
        key: Object.keys(typeData)[index],
        title: slugifyTranslation(type)
    }))

    const resetCriteriaAndBrewStyle = () => {
        brewStyle.set('')
        criteria.set('')
    }
</script>

<select
    name="type-list"
    bind:value="{$type}"
    on:change="{resetCriteriaAndBrewStyle}"
>
    <option disabled selected value>-- sélectionner un type de thé --</option>
    {#each typeParams as typeParam}
        <option value="{typeParam.key}">{typeParam.title}</option>
    {/each}
</select>
