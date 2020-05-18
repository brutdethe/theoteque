<style>
    h3 {
        text-align: left;
        margin-top: 2em;
        font-weight: normal;
        font-size: 2em;
    }
    .ideogram-pinyin {
        display: inline-block;
    }
    .pinyin {
        font-size: 0.7em;
        color: #999;
        font-weight: normal;
    }
    p {
        margin: 0;
        padding: 0;
    }
    .ideogram {
        font-weight: normal;
        font-size: 1em;
    }
    .teas td,
    .teas th {
        font-size: 0.8em;
        border: 1px solid #ccc;
    }

    .teas td:first-child .ideogram {
        font-size: 1.2em;
        text-decoration: underline;
        width: 90px;
    }
    ul {
        font-size: 0.8em;
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>

<script context="module">
    export function preload(page) {
        return { typeParam: page.params.type }
    }
</script>

<script>
    import { onMount } from 'svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let typeParam

    let teas = []
    let types = []
    let i18n = []

    onMount(async () => {
        const res = await fetch('https://api-tea.oisiflorus.com/api/v1/teas')

        if (res.ok) {
            teas = (await res.json()).api
        } else {
            throw new Error(text)
        }

        const res1 = await fetch('https://api-tea.oisiflorus.com/api/v1/type')

        if (res1.ok) {
            types = (await res1.json()).api.map(type => type.ideogram)
        } else {
            throw new Error(text)
        }

        const res2 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)

        if (res2.ok) {
            i18n = (await res2.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    const typeToDisplay = () =>
        types.includes(typeParam) ? [typeParam] : types
    const getTeasByType = (type, teas) => teas.filter(tea => tea.type === type)

    function getPinyin(text, i18n) {
        const term = i18n.filter(term => term.ideogram === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }
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
            <div class="ideogram-pinyin">
                <p class="ideogram">{type}</p>
                <p class="pinyin">{getPinyin(type, i18n)}</p>
            </div>
            <IconTeaType {type} />
        </h3>
        <table>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>familles</th>
                    <th>récoltes</th>
                    <th>cultivarss</th>
                    <th>provinces</th>
                    <th>villes</th>
                    <th>ceuillettes</th>
                    <th>altitudes</th>
                    <th>oxydations</th>
                </tr>
            </thead>
            <tbody>
                {#each getTeasByType(type, teas) as tea}
                    <tr>
                        <td>
                            <a href="fiche-{tea.ideogram}">
                                <div>
                                    <p class="ideogram">{tea.ideogram}</p>
                                    <p class="pinyin">
                                        {getPinyin(tea.ideogram, i18n)}
                                    </p>
                                </div>
                            </a>
                        </td>
                        <td>
                            {#if tea.families}
                                {#each tea.families as family}
                                    <div>
                                        <p class="ideogram">{family}</p>
                                        <p class="pinyin">
                                            {getPinyin(family, i18n)}
                                        </p>
                                    </div>
                                {/each}
                            {:else}-{/if}
                        </td>
                        <td>{tea.harvests || '-'}</td>
                        <td>
                            {#if tea.cultivars}
                                {#if typeof tea.cultivars === 'string'}
                                    <div>
                                        <p class="ideogram">{tea.cultivars}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.cultivars, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.cultivars as cultivars}
                                            <li>
                                                {cultivars} - {getPinyin(cultivars, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.provinces}
                                {#if typeof tea.provinces === 'string'}
                                    <div>
                                        <p class="ideogram">{tea.provinces}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.provinces, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.provinces as provinces}
                                            <li>
                                                {provinces} - {getPinyin(provinces, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.towns}
                                {#if typeof tea.towns === 'string'}
                                    <div>
                                        <p class="ideogram">{tea.towns}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.towns, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.towns as towns}
                                            <li>
                                                {towns} - {getPinyin(towns, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.pickings}
                                {#if typeof tea.pickings === 'string'}
                                    <div>
                                        <p class="ideogram">{tea.pickings}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.pickings, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.pickings as pick}
                                            <li>
                                                {pick} - {getPinyin(pick, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>{tea.elevations || '-'}</td>
                        <td>{tea.oxidations || '-'}</td>
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
