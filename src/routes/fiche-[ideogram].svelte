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
        margin: -0.45em auto;
        border: none;
        background: transparent;
        display: inline-block;
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
    h1 span {
        display: block;
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
    .voice {
        cursor: pointer;
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
    function playAudio(ideogram) {
        document.querySelector(`#${ideogram.replace(/\s/g, '')}`).play()
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>
<article class="blobContent" data-title="content">
    {#if tea.ideogram}
        <h1>
            <div class="ideogram-pinyin">
                <audio id="{tea.ideogram}">
                    <source
                        src="assets/audio/{tea.ideogram}.mp3"
                        type="audio/mpeg"
                    />
                </audio>
                <span
                    class="ideogram voice"
                    title="voix"
                    on:click="{playAudio(tea.ideogram)}"
                >
                    {tea.ideogram}
                </span>
                <span
                    class="pinyin voice"
                    title="voix"
                    on:click="{playAudio(tea.ideogram)}"
                >
                    {getPinyin(tea.ideogram, i18n)}
                </span>
            </div>
        </h1>
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
                                        <audio id="{family}">
                                            <source
                                                src="assets/audio/{family}.mp3"
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                        <span
                                            class="voice"
                                            title="voix"
                                            on:click="{playAudio(family)}"
                                        >
                                            {family}
                                        </span>
                                        <p
                                            class="pinyin voice"
                                            title="voix"
                                            on:click="{playAudio(family)}"
                                        >
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
                    {#if tea.pickings.length}
                        <dt class="property-title">Cueillette :</dt>
                        <dd class="property-value">
                            <ul class="ideogram-pinyin">
                                {#each tea.pickings as pick}
                                    <li class="ideogram">
                                        <audio id="{pick.replace(/\s/g, '')}">
                                            <source
                                                src="assets/audio/{pick}.mp3"
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                        <span
                                            class="voice"
                                            title="voix"
                                            on:click="{playAudio(pick)}"
                                        >
                                            {pick}
                                        </span>
                                        <p
                                            class="pinyin voice"
                                            title="voix"
                                            on:click="{playAudio(pick)}"
                                        >
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
                                        href="https://map.baidu.com/search/?querytype=s&wd={provinces}"
                                        target="_blank"
                                    >
                                        <audio id="{provinces}">
                                            <source
                                                src="assets/audio/{provinces}.mp3"
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                        <span
                                            class="voice"
                                            title="voix"
                                            on:click="{playAudio(provinces)}"
                                        >
                                            {provinces}
                                        </span>
                                    </a>
                                    <p
                                        class="pinyin voice"
                                        title="voix"
                                        on:click="{playAudio(provinces)}"
                                    >
                                        {getPinyin(provinces, i18n)}
                                    </p>

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
                                        href="https://map.baidu.com/search/?querytype=s&wd={towns}"
                                        target="_blank"
                                    >
                                        <audio id="{towns}">
                                            <source
                                                src="assets/audio/{towns}.mp3"
                                                type="audio/mpeg"
                                            />
                                        </audio>
                                        <span
                                            class="voice"
                                            title="voix"
                                            on:click="{playAudio(towns)}"
                                        >
                                            {towns}
                                        </span>
                                    </a>
                                    <p
                                        class="pinyin voice"
                                        title="voix"
                                        on:click="{playAudio(towns)}"
                                    >
                                        {getPinyin(towns, i18n)}
                                    </p>
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
                                    <audio id="{cultivars}">
                                        <source
                                            src="assets/audio/{cultivars}.mp3"
                                            type="audio/mpeg"
                                        />
                                    </audio>
                                    <span
                                        class="voice"
                                        title="voix"
                                        on:click="{playAudio(cultivars)}"
                                    >
                                        {cultivars}
                                    </span>
                                    <p
                                        class="pinyin voice"
                                        title="voix"
                                        on:click="{playAudio(cultivars)}"
                                    >
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
</article>
