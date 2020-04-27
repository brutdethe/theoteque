<style>
    h3 {
        text-align: left;
    }
</style>

<script>
    import { onMount } from 'svelte'
    import Pinyin from '../components/Pinyin.svelte'
    import yaml from 'js-yaml'

    let teas = []

    onMount(async () => {
        const responseTeas = await fetch('./teas.yaml')

        if (responseTeas.ok) {
            teas = yaml.safeLoad(await responseTeas.text())
        } else {
            throw new Error(text)
        }
    })

    const getTeaTypes = teas => [...new Set(teas.map(tea => tea.type))]
    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)
</script>

<svelte:head>
    <title>Liste des thés</title>
</svelte:head>
<div class="teas">
    {#each getTeaTypes(teas) as type}
        <h3>
            <Pinyin text="{type}" />
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
                            <Pinyin text="{tea.zh}" />
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
                            {#if tea.picking}
                                <Pinyin text="{tea.picking}" />
                            {:else}-{/if}
                        </td>
                        <td>{tea.elevation || '-'}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <!-- this block renders when teas.length === 0 -->
        <p>chargement des thés...</p>
    {/each}
</div>
