<style>
    :global(input.autocomplete-input) {
        margin: 0;
        padding: 0;
    }
    .search {
        width: 22em;
        margin: 1em;
        --height: 2em;
        --placeholderColor: #73d56b;
        --cursor: text;
    }
</style>

<script>
    import { goto } from '@sapper/app'
    import { onMount } from 'svelte'
    import Select from 'svelte-select'

    let selectedTea
    let teas = []

    onMount(async () => {
        const res = await fetch('https://api-tea.brutdethé.fr/api/v1/teas')
        const normalize = str =>
            str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (res.ok) {
            teas = (await res.json()).api
            teas = teas.map(tea => ({
                value: tea.ideogram,
                label: tea.ideogram + ' - ' + normalize(tea.pinyin),
                group: tea.type
            }))
        } else {
            throw new Error(text)
        }
    })
</script>

<div class="search">
    <Select
        items="{teas}"
        bind:selectedTea
        placeholder="rechercher un thé"
        groupBy="{tea => tea.group}"
        noOptionsMessage="aucun thé trouvé"
        on:select="{tea => {
            window.location.replace(`/fiche-${tea.detail.value}`)
        }}"
        inputStyles="cursor: text;"
    />
</div>
