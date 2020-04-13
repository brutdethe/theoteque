<script>
    import { type, criteria, brewStyle } from './stores.js'

    export let brewData

    $: teaList = brewData.filter(tea => tea.type === $type)

    // select by default when type as only one criteria
    $: if (teaList.length === 1) {
        criteria.set(teaList[0].criteria[0].cn)
    }

    const slugifyTranslation = expression =>
        `${expression.cn} - ${expression.pinyin} - (${expression.fr})`

    const resetBrewStyle = () => {
        brewStyle.set('')
    }
</script>

<select
    name="criteria-list"
    bind:value="{$criteria}"
    on:change="{resetBrewStyle}"
>
    <option disabled selected value>-- sélectionner un critère --</option>
    {#each teaList as tea}
        <option value="{tea.criteria[0].cn}">
            {slugifyTranslation(tea.criteria[0])}
        </option>
    {/each}
</select>
