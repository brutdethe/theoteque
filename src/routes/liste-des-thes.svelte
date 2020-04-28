<style>
    h3 {
        text-align: left;
    }
</style>

<script>
    import Pinyin from '../components/Pinyin.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'
    import { teas } from '../stores.js'

    const getTeaTypes = teas => [...new Set(teas.map(tea => tea.type))]
    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)
</script>

<svelte:head>
    <title>Liste des thés</title>
</svelte:head>
<div class="teas">
    {#each getTeaTypes($teas) as type}
        <h3>
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
                    <th>image</th>
                </tr>
            </thead>
            <tbody>
                {#each getTeasByType(type, $teas) as tea}
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
                        <td>{tea.image ? '📷' : '-'}</td>
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
