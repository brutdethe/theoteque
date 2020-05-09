<style>
    h3 {
        text-align: left;
        margin-top: 2em;
        font-weight: normal;
        font-size: 2em;
    }
    .zh-pinyin {
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
    .zh {
        font-weight: normal;
        font-size: 1em;
    }
    .teas td,
    .teas th {
        font-size: 0.8em;
        border: 1px solid #ccc;
    }

    .teas td:first-child .zh {
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

        const res1 = await fetch('https://api-tea.oisiflorus.com/api/v1/types')

        if (res1.ok) {
            types = (await res1.json()).api.map(type => type.zh)
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
        const term = i18n.filter(term => term.zh === text)[0] || {}
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
            <div class="zh-pinyin">
                <p class="zh">{type}</p>
                <p class="pinyin">{getPinyin(type, i18n)}</p>
            </div>
            <IconTeaType {type} />
        </h3>
        <table>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>famille</th>
                    <th>récolte</th>
                    <th>cultivar</th>
                    <th>province</th>
                    <th>ville</th>
                    <th>ceuillette</th>
                    <th>altitude</th>
                    <th>oxydation</th>
                </tr>
            </thead>
            <tbody>
                {#each getTeasByType(type, teas) as tea}
                    <tr>
                        <td>
                            <a href="fiche-{tea.zh}">
                                <div>
                                    <p class="zh">{tea.zh}</p>
                                    <p class="pinyin">
                                        {getPinyin(tea.zh, i18n)}
                                    </p>
                                </div>
                            </a>
                        </td>
                        <td>
                            {#if tea.family}
                                <div>
                                    <p class="zh">{tea.family}</p>
                                    <p class="pinyin">
                                        {getPinyin(tea.family, i18n)}
                                    </p>
                                </div>
                            {:else}-{/if}
                        </td>
                        <td>{tea.harvest || '-'}</td>
                        <td>
                            {#if tea.cultivar}
                                {#if typeof tea.cultivar === 'string'}
                                    <div>
                                        <p class="zh">{tea.cultivar}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.cultivar, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.cultivar as cultivar}
                                            <li>
                                                {cultivar} - {getPinyin(cultivar, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.province}
                                {#if typeof tea.province === 'string'}
                                    <div>
                                        <p class="zh">{tea.province}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.province, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.province as province}
                                            <li>
                                                {province} - {getPinyin(province, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.town}
                                {#if typeof tea.town === 'string'}
                                    <div>
                                        <p class="zh">{tea.town}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.town, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.town as town}
                                            <li>
                                                {town} - {getPinyin(town, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>
                            {#if tea.picking}
                                {#if typeof tea.picking === 'string'}
                                    <div>
                                        <p class="zh">{tea.picking}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.picking, i18n)}
                                        </p>
                                    </div>
                                {:else}
                                    <ul>
                                        {#each tea.picking as pick}
                                            <li>
                                                {pick} - {getPinyin(pick, i18n)}
                                            </li>
                                        {/each}
                                    </ul>
                                {/if}
                            {:else}-{/if}
                        </td>
                        <td>{tea.elevation || '-'}</td>
                        <td>{tea.oxidation || '-'}</td>
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
