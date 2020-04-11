<script>
    export let typeList

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`

    const typeParams = Object.values(typeList).map((typeTitle, index) => ({
        key: Object.keys(typeList)[index],
        title: slugifyTranslation(typeTitle)
    }))
</script>

<select name="type-list">
    {#each typeParams as type}
        <option value="{type.key}">{type.title}</option>
    {/each}
</select>
