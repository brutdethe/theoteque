<script>
    import { type } from './stores.js'

    export let typeList

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`

    const typeParams = Object.values(typeList).map((typeTitle, index) => ({
        key: Object.keys(typeList)[index],
        title: slugifyTranslation(typeTitle)
    }))
</script>

<select name="type-list" bind:value="{$type}">
    <option disabled selected>-- sélectionner un type de thé --</option>
    {#each typeParams as typeParam}
        <option value="{typeParam.key}">{typeParam.title}</option>
    {/each}
</select>
