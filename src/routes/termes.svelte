<style>
    h3 {
        text-align: left;
        margin-top: 2em;
    }
</style>

<script>
    import { onMount } from 'svelte'
    import Pinyin from '../components/Pinyin.svelte'

    let terms = []
    let themes = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.herokuapp.com/api/v1/pinyin`)

        if (res.ok) {
            terms = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }

        const res1 = await fetch(`https://api-tea.herokuapp.com/api/v1/themes`)

        if (res1.ok) {
            themes = (await res1.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    function getPinyinByThemes(pinyins, theme) {
        console.log(pinyins)
        return pinyins.filter(pinyin => pinyin.theme === theme.en)
    }
</script>

<h2>Termes utilisés</h2>

<p>
    Cette page présente une liste des termes en chinois traditionnel employés
    sur le site avec leurs traduction en
    <em>pinyin</em>
</p>
{#each themes as theme}
    <h3>
        <Pinyin text="{theme.zh}" />
    </h3>
    <table>
        <thead>
            <tr>
                <td>Chinois traditionnel</td>
                <td>Pinyin</td>
                <td>Themes</td>
            </tr>
        </thead>
        {#each getPinyinByThemes(terms, theme) as term}
            <tr>
                <td>{term.zh}</td>
                <td>{term.pinyin}</td>
            </tr>
        {:else}
            <p>chargement des termes...</p>
        {/each}
    </table>
{:else}
    <p>chargement des thèmes...</p>
{/each}
