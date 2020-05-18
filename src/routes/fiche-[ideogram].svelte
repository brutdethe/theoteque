<style>
    .wrapper {
        display: grid;
        grid-template-columns: 350px 2fr 2fr;
        grid-gap: 1em;
        color: #444;
        font-size: 1.2em;
    }

    .box {
        color: #444;
        padding-left: 1em;
    }

    .photo-zoom {
        padding: 0;
        height: 350px; /* [1.1] Set it as per your need */
        width: 350px;
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
        margin-top: 1.5em;
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
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        display: inline-block;
        text-align: left;
        width: 18%;
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
    .box td {
        font-size: 0.8em;
        border: none;
    }

    .box td:first-child {
        width: 30%;
        color: #999;
        font-size: 0.7em;
        font-weight: normal;
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
            <a href="/liste-des-thes-{tea.type}">
                <div class="ideogram-pinyin">
                    <p class="ideogram">{tea.type}</p>
                    <p class="pinyin">{getPinyin(tea.type, i18n)}</p>
                </div>
            </a>
            <IconTeaType type="{tea.type}" />
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
                    <dt class="property-icon">
                        <img
                            class="icons mountain"
                            src="/assets/icons/mountain.svg"
                            alt="altitude"
                        />
                    </dt>
                    <dd class="property-value">
                        {display.elevations(tea.elevations)}
                    </dd>
                {/if}
                {#if tea.harvests.length}
                    <dt class="property-title">Récolte :</dt>
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
            </dl>
        </div>
        <div class="box">
            {#if tea.families.length}
                Cultivars :
                <ul class="ideogram-pinyin">
                    {#each tea.cultivars as cultivars}
                        <li class="ideogram">
                            {cultivars}
                            <p class="pinyin">{getPinyin(cultivars, i18n)}</p>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
        <div class="box">
            <tr>
                <td>Localisation :</td>
                <td>
                    <a
                        href="https://map.baidu.com/search/?querytype=s&wd={tea['province']}"
                        target="_blank"
                    >
                        <div class="ideogram-pinyin">
                            <p class="ideogram">{tea.provinces}</p>
                            <p class="pinyin">
                                {getPinyin(tea.provinces, i18n)}
                            </p>
                        </div>
                    </a>
                </td>
                {#if tea.towns}
                    <td>
                        <a
                            href="https://map.baidu.com/search/?querytype=s&wd={tea['towns']}"
                            target="_blank"
                        >
                            <div class="ideogram-pinyin">
                                <p class="ideogram">{tea.towns}</p>
                                <p class="pinyin">
                                    {getPinyin(tea.towns, i18n)}
                                </p>
                            </div>
                        </a>
                    </td>
                {/if}
            </tr>
            {#if tea.families.length}
                <tr>
                    <td>Ceuillette :</td>
                    <td>
                        {#if typeof tea.pickings === 'string'}
                            <div class="ideogram-pinyin">
                                <p class="ideogram">{tea.pickings}</p>
                                <p class="pinyin">
                                    {getPinyin(tea.pickings, i18n)}
                                </p>
                            </div>
                        {:else}
                            <div class="row">
                                {#each tea.pickings as pick}
                                    <div class="column">
                                        <div class="ideogram-pinyin">
                                            <p class="ideogram">
                                                {tea.pickings}
                                            </p>
                                            <p class="pinyin">
                                                {getPinyin(tea.pickings, i18n)}
                                            </p>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </td>
                </tr>
            {/if}
        </div>
    </div>
    <hr />
    <h3>Conseil d'infusion</h3>
    <div class="row">
        {#if Array.isArray(tea.brews)}
            {#each tea.brews as brew}
                <Brews {brew} />
            {/each}
        {/if}
    </div>
{/if}
