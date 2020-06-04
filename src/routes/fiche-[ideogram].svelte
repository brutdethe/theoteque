<style>
    .wrapper {
        display: grid;
        grid-template-columns: 400px 2fr 2fr;
        grid-gap: 1em;
        color: #444;
        font-size: 1.2em;
    }

    .brew {
        padding: 1em;
        border-top: 1px solid #ccc;
    }

    .box {
        color: #444;
        padding-left: 0.5em;
    }

    .photo-zoom {
        padding: 0;
        height: 400px; /* [1.1] Set it as per your need */
        width: 400px;
        overflow: hidden; /* [1.2] Hide the overflowing of child elements */
        -webkit-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        -moz-box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
        box-shadow: 6px 7px 5px 0px rgba(156, 154, 156, 1);
    }

    .photo-zoom img {
        margin: 0;
        padding: 0;
        max-width: 100%;
        transform-origin: 65% 75%;
        transition: transform 1s, filter 0.5s ease-out;
    }

    .photo-zoom:hover img {
        cursor: zoom-in;
        transform: scale(4);
    }

    .property-title {
        margin-top: 1.5em;
        font-size: 0.8em;
        font-weight: 800;
    }

    .property-icon {
        margin: 0;
        margin-top: 1em;
        font-size: 0.8em;
        line-height: 2.9em;
    }

    .property-value > ul {
        margin: 0;
    }
    .property-value,
    .property-value > ul > li {
        margin: 0;
        font-size: 0.8em;
    }
    .icons {
        margin: -0.3em;
        border: none;
        background: transparent;
        display: inline-block;
        width: 20%;
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

    .mountain {
        vertical-align: top;
    }
</style>

<script context="module">
    export function preload(page) {
        return { ideogram: page.params.ideogram }
    }
</script>

<script>
    import { onMount } from 'svelte'
    import Brews from '../components/Brews.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let ideogram

    let tea = {}
    let i18n = []

    onMount(async () => {
        const res = await fetch(
            `https://api-tea.oisiflorus.com/api/v1/tea/${ideogram}`
        )

        if (res.ok) {
            tea = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }

        const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)

        if (res1.ok) {
            i18n = (await res1.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    function getPinyin(text, i18n) {
        const term = i18n.filter(term => term.ideogram === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }

    const display = {
        elevations: elevations => {
            if (+elevations) {
                return `à partir de ${elevations} mètres`
            } else if (elevations.length == 2 && Array.isArray([elevations])) {
                return `${elevations[0]} à ${elevations[1]} mètres`
            }
        },
        oxidations: oxidations => {
            if (+oxidations) {
                return `à partir de ${oxidations}%`
            } else if (oxidations.length == 2 && Array.isArray(oxidations)) {
                return `entre ${oxidations[0]}% et ${oxidations[1]}%`
            }
        }
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>
{#if tea.ideogram}
    <h2>
        <div class="ideogram-pinyin">
            <p class="ideogram">{tea.ideogram}</p>
            <p class="pinyin">{getPinyin(tea.ideogram, i18n)}</p>
        </div>
    </h2>
    <div class="wrapper">
        <div class="box photo-zoom">
            <img
                src="/assets/thes/{tea.ideogram}.jpg"
                alt="{tea.ideogram}"
                title="{tea.ideogram}"
                class="photo"
            />
        </div>
        <div class="box">
            <IconTeaType
                ideogram="{tea.type}"
                pinyin="{getPinyin(tea.type, i18n)}"
            />
            <dl>
                {#if tea.families.length}
                    <dt class="property-title">Famille :</dt>
                    <dd class="property-value">
                        <ul class="ideogram-pinyin">
                            {#each tea.families as family}
                                <li class="ideogram">
                                    {family}
                                    <p class="pinyin">
                                        {getPinyin(family, i18n)}
                                    </p>
                                </li>
                            {/each}
                        </ul>
                    </dd>
                {/if}
                {#if tea.oxidations.length}
                    <dt class="property-title">Oxydation :</dt>
                    <dd class="property-value">
                        {display.oxidations(tea.oxidations)}
                    </dd>
                {/if}
                {#if tea.elevations.length}
                    <dd class="property-icon">
                        <img
                            class="icons mountain"
                            src="/assets/icons/mountain.svg"
                            alt="altitude"
                        />
                        {display.elevations(tea.elevations)}
                    </dd>
                {/if}
                {#if tea.harvests.length}
                    <dd class="property-value">
                        {#each tea.harvests as season}
                            <img
                                class="icons"
                                src="/assets/icons/{season}.svg"
                                alt="{season}"
                            />
                        {/each}
                    </dd>
                {/if}
                {#if tea.pickings.length}
                    <dt class="property-title">Ceuillette :</dt>
                    <dd class="property-value">
                        <ul class="ideogram-pinyin">
                            {#each tea.pickings as pick}
                                <li class="ideogram">
                                    {pick}
                                    <p class="pinyin">
                                        {getPinyin(pick, i18n)}
                                    </p>
                                </li>
                            {/each}
                        </ul>
                    </dd>
                {/if}
            </dl>
        </div>
        <div class="box">
            {#if tea.provinces.length}
                <dt class="property-title">Provinces :</dt>
                <dd class="property-value">
                    <ul class="ideogram-pinyin">
                        {#each tea.provinces as provinces}
                            <li class="ideogram">
                                <a
                                    href="https://map.baidu.com/search/?querytype=s&wd={tea.provinces}"
                                    target="_blank"
                                >
                                    {provinces}
                                    <p class="pinyin">
                                        {getPinyin(provinces, i18n)}
                                    </p>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </dd>
            {/if}
            {#if tea.towns.length}
                <dt class="property-title">Villes :</dt>
                <dd class="property-value">
                    <ul class="ideogram-pinyin">
                        {#each tea.towns as towns}
                            <li class="ideogram">
                                <a
                                    href="https://map.baidu.com/search/?querytype=s&wd={tea.towns}"
                                    target="_blank"
                                >
                                    {towns}
                                    <p class="pinyin">
                                        {getPinyin(towns, i18n)}
                                    </p>
                                </a>
                            </li>
                        {/each}
                    </ul>
                </dd>
            {/if}
            {#if tea.cultivars.length}
                <dt class="property-title">Cultivars :</dt>
                <dd class="property-value">
                    <ul class="ideogram-pinyin">
                        {#each tea.cultivars as cultivars}
                            <li class="ideogram">
                                {cultivars}
                                <p class="pinyin">
                                    {getPinyin(cultivars, i18n)}
                                </p>
                            </li>
                        {/each}
                    </ul>
                </dd>
            {/if}
        </div>
        <div class="box"></div>
    </div>
    <section class="brew">
        <h3>Conseils d'infusion</h3>
        <div class="row">
            {#if Array.isArray(tea.brews)}
                {#each tea.brews as brew}
                    <Brews {brew} />
                {/each}
            {/if}
        </div>
    </section>
{/if}
