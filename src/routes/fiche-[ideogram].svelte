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
        border-radius: 5px;
        padding: 20px;
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
        max-width: 100%;
        transform-origin: 65% 75%;
        transition: transform 1s, filter 0.5s ease-out;
    }

    .photo-zoom:hover img {
        cursor: zoom-in;
        transform: scale(4);
    }

    .icons {
        border: none;
        background: transparent;
        display: inline-block;
        text-align: left;
        width: 40%;
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
                return `entre ${elevations[0]} et ${elevations[1]} mètres`
            }
        },
        oxidations: oxidations => {
            if (+oxidations) {
                return `à partir de ${oxidations}% de oxidations`
            } else if (oxidations.length == 2 && Array.isArray(oxidations)) {
                return `entre ${oxidations[0]}% et ${oxidations[1]}% d'oxydation`
            }
        }
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>
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
        {#if tea.oxidations}
            <td>{display.oxidations(tea.oxidations)}</td>
        {/if}
    </div>
    <div class="box">
        {#if tea.families}
            Famille :
            <ul class="ideogram-pinyin">
                {#each tea.families as family}
                    <li class="ideogram">
                        {family}
                        <p class="pinyin">{getPinyin(family, i18n)}</p>
                    </li>
                {/each}
            </ul>
        {/if}
        {#if tea.cultivars}
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
            {#if tea.elevations}
                <td>{display.elevations(tea.elevations)}</td>
            {/if}
        </tr>
        <tr>
            <td>Localisation :</td>
            <td>
                <a
                    href="https://map.baidu.com/search/?querytype=s&wd={tea['province']}"
                    target="_blank"
                >
                    <div class="ideogram-pinyin">
                        <p class="ideogram">{tea.provinces}</p>
                        <p class="pinyin">{getPinyin(tea.provinces, i18n)}</p>
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
                            <p class="pinyin">{getPinyin(tea.towns, i18n)}</p>
                        </div>
                    </a>
                </td>
            {/if}
        </tr>
        <tr>
            {#if tea.harvests}
                <td>Récolte :</td>
                <td>
                    {#if typeof tea.harvests === 'string'}
                        <img
                            class="icons"
                            src="/assets/icons/{tea.harvests}.svg"
                            alt="{tea.harvests}"
                        />
                    {:else}
                        {#each tea.harvests as season}
                            <img
                                class="icons"
                                src="/assets/icons/{season}.svg"
                                alt="{season}"
                            />
                        {/each}
                    {/if}
                </td>
            {/if}
        </tr>
        {#if tea.pickings}
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
                                        <p class="ideogram">{tea.pickings}</p>
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
