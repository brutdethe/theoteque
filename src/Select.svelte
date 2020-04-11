<script>
    export let typeList

    const slugifyTypeTitle = typeTitleList =>
        `${typeTitleList.cn} - ${typeTitleList.pinyin} - (thé ${typeTitleList.fr})`

    const typeParams = Object.values(typeList).map((typeTitle, index) => ({
        key: Object.keys(typeList)[index],
        title: slugifyTypeTitle(typeTitle)
    }))
</script>

<select name="type-list">
    {#each typeParams as type}
        <option value="{type.key}">{type.title}</option>
    {/each}
</select>
