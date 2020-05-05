<style>
    h3 {
        text-align: left;
        margin-top: 2em;
    }
</style>

<script context="module">
    export function preload(page) {
        return { typeParam: page.params.type }
    }
</script>

<script>
    import { onMount } from 'svelte'
    import Pinyin from '../components/Pinyin.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let typeParam

    let teas = []
    let types = []

    onMount(async () => {
        const res = await fetch('https://api-tea.herokuapp.com/api/v1/teas')

        if (res.ok) {
            teas = (await res.json()).api
        } else {
            throw new Error(text)
        }

        const res1 = await fetch('https://api-tea.herokuapp.com/api/v1/types')

        if (res1.ok) {
            types = (await res1.json()).api.map(type => type.zh)
        } else {
            throw new Error(text)
        }
    })

    const typeToDisplay = () =>
        types.includes(typeParam) ? [typeParam] : types
    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)
</script>

<h2>Liste des thés par type</h2>
<p>
    Cette liste regroupe l'ensemble des thés proposés sur le site. Pour voir le
    détail d'un thé suivez le lien sur son nom.
</p>

<svelte:head>
    <title>Liste des thés</title>
</svelte:head>
<div class="teas">
    {#each typeToDisplay(typeParam, types) as type}
        <h3 id="{type}">
            <Pinyin text="{type}" />
            <IconTeaType {type} />
        </h3>
        <table>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>famille</th>
                    <th>récolte</th>
                    <th>cultivar</th>
                    <th>origine</th>
                    <th>ceuillette</th>
                    <th>altitude</th>
                </tr>
            </thead>
            <tbody>
                {#each getTeasByType(type, teas) as tea}
                    <tr>
                        <td>
                            <a href="fiche-{tea.zh}">
                                <Pinyin text="{tea.zh}" />
                            </a>
                        </td>
                        <td>
                            {#if tea.family}
                                <Pinyin text="{tea.family}" />
                            {:else}-{/if}
                        </td>
                        <td>{tea.harvest || '-'}</td>
                        <td>
                            {#if tea.cultivar}
                                <Pinyin text="{tea.cultivar}" />
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.province}
                                <Pinyin text="{tea.province}" />
                            {:else}-{/if}
                            {#if tea.town}
                                <Pinyin text="{tea.town}" />
                            {:else}-{/if}
                        </td>
                        <td>
                            <!-- 🌱 ☀️ 🍂 ❄️ -->
                            {#if tea.picking}
                                <Pinyin text="{tea.picking}" />
                            {:else}-{/if}
                        </td>
                        <td>{tea.elevation || '-'}</td>
                    </tr>
                {:else}
                    <!-- this block renders when teas.length === 0 -->
                    <p>chargement des thés...</p>
                {/each}
            </tbody>
        </table>
    {:else}
        <!-- this block renders when teas.length === 0 -->
        <p>chargement des types thés...</p>
    {/each}
</div>
