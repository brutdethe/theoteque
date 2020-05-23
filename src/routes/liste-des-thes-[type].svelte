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
    img {
        padding: 0;
        width: 200px;
        opacity: 70%;
        overflow: hidden; /* [1.2] Hide the overflowing of child elements */
        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
    }
    img:hover {
        opacity: 100%;
    }
    .container {
        display: grid;
        grid-template-columns: 250px 250px 250px;
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
        <div class="container">
            {#each getTeasByType(type, teas) as tea}
                <div class="item">
                    <a href="fiche-{tea.ideogram}">
                        <img
                            src="../assets/thes/{tea.ideogram}.jpg"
                            alt="{tea.pinyin}"
                        />

                        <div>
                            <p class="ideogram">{tea.ideogram}</p>
                            <p class="pinyin">
                                {getPinyin(tea.ideogram, i18n)}
                            </p>
                        </div>
                    </a>
                </div>
            {:else}
                <!-- this block renders when teas.length === 0 -->
                <p>chargement des thés...</p>
            {/each}
        </div>
    {:else}
        <!-- this block renders when teas.length === 0 -->
        <p>chargement des types thés...</p>
    {/each}
</div>
