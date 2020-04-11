<script>
    export let brewList
    const teas = brewList.filter(tea => tea.type === 'green')

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`
</script>

<select name="criteria-list">
    {#each teas as tea, index}
        <option value="{index}">{slugifyTranslation(tea.criteria[0])}</option>
    {/each}
</select>
