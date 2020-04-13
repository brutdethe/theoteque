<script>
    import { type, criteria, brewStyle } from './stores.js'

    export let brewData, brewStyleData

    const getTeaByTypeAndCriteria = (teaList, type, criteria) =>
        teaList.filter(
            tea => tea.type === type && tea.criteria[0].cn === criteria
        )[0]

    const getBrewStyleList = tea => Object.keys(tea.brew_style)

    $: brewStyleList = getBrewStyleList(
        getTeaByTypeAndCriteria(brewData, $type, $criteria)
    )

    // les critères uniques sont sélectionnés par défaut
    $: if (brewStyleList.length === 1) {
        brewStyle.set(brewStyleList[0])
    }

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`
</script>

<select name="brew-list" bind:value="{$brewStyle}">
    <option disabled selected value>
        -- sélectionner un style d'infusion --
    </option>
    {#each brewStyleList as brewStyle}
        <option value="{brewStyle}">
            {slugifyTranslation(brewStyleData[brewStyle])}
        </option>
    {/each}
</select>
