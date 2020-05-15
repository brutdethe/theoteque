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
        return { zh: page.params.zh }
    }
</script>

<script>
    import { onMount } from 'svelte'
    import Brewing from '../components/Brewing.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let zh

    let tea = {}
    let i18n = []

    onMount(async () => {
        const res = await fetch(
            `https://api-tea.oisiflorus.com/api/v1/tea/${zh}`
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
        const term = i18n.filter(term => term.zh === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }

    const display = {
        elevation: elevation => {
            if (+elevation) {
                return `à partir de ${elevation} mètres`
            } else if (elevation.length == 2 && Array.isArray([elevation])) {
                return `entre ${elevation[0]} et ${elevation[1]} mètres`
            }
        },
        oxidation: oxidation => {
            if (+oxidation) {
                return `à partir de ${oxidation}% de oxidation`
            } else if (oxidation.length == 2 && Array.isArray(oxidation)) {
                return `entre ${oxidation[0]}% et ${oxidation[1]}% d'oxydation`
            }
        }
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>
<h2>
    <div class="zh-pinyin">
        <p class="zh">{tea.zh}</p>
        <p class="pinyin">{getPinyin(tea.zh, i18n)}</p>
    </div>
</h2>
<div class="wrapper">
    <div class="box photo-zoom">
        <img
            src="/assets/thes/{tea.zh}.jpg"
            alt="{tea.zh}"
            title="{tea.zh}"
            class="photo"
        />
    </div>
    <div class="box">
        <a href="/liste-des-thes-{tea.type}">
            <div class="zh-pinyin">
                <p class="zh">{tea.type}</p>
                <p class="pinyin">{getPinyin(tea.type, i18n)}</p>
            </div>
        </a>
        <IconTeaType type="{tea.type}" />
    </div>
    <div class="box">
        {#if tea.family}
            Famille :
            <ul class="zh-pinyin">
                <li class="zh">
                    {tea.family}
                    <p class="pinyin">{getPinyin(tea.family, i18n)}</p>
                </li>
            </ul>
        {/if}
        {#if tea.cultivar}
            Cultivars :
            <ul class="zh-pinyin">
                {#each tea.cultivar as cultivar}
                    <li class="zh">
                        {cultivar}
                        <p class="pinyin">{getPinyin(cultivar, i18n)}</p>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="box">
        <tr>
            {#if tea.elevation}
                <td>{display.elevation(tea.elevation)}</td>
            {/if}
        </tr>
        {#if tea.cultivar}
            <tr>
                <td>Cultivar :</td>

                <td>
                    <div class="zh-pinyin">
                        <p class="zh">{tea.cultivar}</p>
                        <p class="pinyin">{getPinyin(tea.cultivar, i18n)}</p>
                    </div>
                </td>
            </tr>
        {/if}
        <tr>
            <td>Localisation :</td>
            <td>
                <a
                    href="https://map.baidu.com/search/?querytype=s&wd={tea['province']}"
                    target="_blank"
                >
                    <div class="zh-pinyin">
                        <p class="zh">{tea.province}</p>
                        <p class="pinyin">{getPinyin(tea.province, i18n)}</p>
                    </div>
                </a>
            </td>
            {#if tea.town}
                <td>
                    <a
                        href="https://map.baidu.com/search/?querytype=s&wd={tea['town']}"
                        target="_blank"
                    >
                        <div class="zh-pinyin">
                            <p class="zh">{tea.town}</p>
                            <p class="pinyin">{getPinyin(tea.town, i18n)}</p>
                        </div>
                    </a>
                </td>
            {/if}
        </tr>
        <tr>
            {#if tea.harvest}
                <td>Récolte :</td>
                <td>
                    {#if typeof tea.harvest === 'string'}
                        <img
                            class="icons"
                            src="/assets/icons/{tea.harvest}.svg"
                            alt="{tea.harvest}"
                        />
                    {:else}
                        {#each tea.harvest as season}
                            <img
                                class="icons"
                                src="/assets/icons/{season}.svg"
                                alt="{season}"
                            />
                        {/each}
                    {/if}
                </td>
            {/if}
            {#if tea.oxidation}
                <td>{display.oxidation(tea.oxidation)}</td>
            {/if}
        </tr>
        {#if tea.picking}
            <tr>
                <td>Ceuillette :</td>
                <td>
                    {#if typeof tea.picking === 'string'}
                        <div class="zh-pinyin">
                            <p class="zh">{tea.picking}</p>
                            <p class="pinyin">{getPinyin(tea.picking, i18n)}</p>
                        </div>
                    {:else}
                        <div class="row">
                            {#each tea.picking as pick}
                                <div class="column">
                                    <div class="zh-pinyin">
                                        <p class="zh">{tea.picking}</p>
                                        <p class="pinyin">
                                            {getPinyin(tea.picking, i18n)}
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
    {#if Array.isArray(tea.brewing)}
        {#each tea.brewing as brew}
            <Brewing {brew} />
        {/each}
    {/if}
</div>
