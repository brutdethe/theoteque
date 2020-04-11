<script>
    const criterias = [
        { cn: 'dan ya', pinyin: '單芽', fr: 'bourgeon' },
        {
            cn: 'yi ya yi er ye',
            pinyin: '一芽一',
            fr: 'bourgeon et 1, 2, ou 3 feuilles'
        }
    ]

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (thé ${expression.fr})`
</script>

<select name="criteria-list">
    {#each criterias as criteria, index}
        <option value="{index}">{slugifyTranslation(criteria)}</option>
    {/each}
</select>
