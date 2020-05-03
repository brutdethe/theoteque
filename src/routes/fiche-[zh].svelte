<style>
    .container {
        margin: 2em 0;
        text-align: left;
    }
    .photo-zoom {
        padding: 0;
        border: 1px solid #73d56b;
        border-radius: 4px;
        height: 350px; /* [1.1] Set it as per your need */
        width: 350px;
        overflow: hidden; /* [1.2] Hide the overflowing of child elements */
    }

    .photo-zoom img {
        transform-origin: 65% 75%;
        transition: transform 1s, filter 0.5s ease-out;
    }

    .photo-zoom:hover img {
        cursor: zoom-in;
        transform: scale(4);
    }

    .icons {
        text-align: left;
        width: 20%;
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
    import Pinyin from '../components/Pinyin.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let zh

    let tea = {}

    onMount(async () => {
        const res = await fetch(
            `https://api-tea.herokuapp.com/api/v1/tea/${zh}`
        )

        if (res.ok) {
            tea = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    const display = {
        elevation: elevation => {
            if (+elevation) {
                return `à partir de ${elevation} mètres`
            } else if (elevation.length == 2 && Array.isArray([elevation])) {
                return `entre ${elevation[0]} et ${elevation[1]} mètres`
            }
        },
        fermentation: fermentation => {
            if (+fermentation) {
                return `à partir de ${fermentation}% de fermentation`
            } else if (
                fermentation.length == 2 &&
                Array.isArray(fermentation)
            ) {
                return `entre ${fermentation[0]}% et ${fermentation[1]}% de fermentation`
            }
        }
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>

<div class="container">
    <h2>
        <Pinyin text="{tea.zh}" />
    </h2>
    <hr />
    <div class="row">
        <div class="column column-66">
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <a href="/liste-des-thes-{tea.type}">
                                <Pinyin text="{tea.type}" />
                            </a>
                            <IconTeaType type="{tea.type}" />
                        </td>
                    </tr>
                    <tr>
                        {#if tea.family}
                            <td>Famille :</td>
                            <td>
                                <Pinyin text="{tea.family}" />
                            </td>
                        {/if}
                        {#if tea.elevation}
                            <td>{display.elevation(tea.elevation)}</td>
                        {/if}
                    </tr>
                    {#if tea.cultivar}
                        <tr>
                            <td>Cultivar :</td>

                            <td>
                                <Pinyin text="{tea.cultivar}" />
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
                                <Pinyin text="{tea.province}" />
                            </a>
                        </td>
                        {#if tea.town}
                            <td>
                                <a
                                    href="https://map.baidu.com/search/?querytype=s&wd={tea['town']}"
                                    target="_blank"
                                >
                                    <Pinyin text="{tea.town}" />
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
                        {#if tea.fermentation}
                            <td>{display.fermentation(tea.fermentation)}</td>
                        {/if}
                    </tr>
                    {#if tea.picking}
                        <tr>
                            <td>Ceuillette :</td>
                            <td>
                                {#if typeof tea.picking === 'string'}
                                    <Pinyin text="{tea.picking}" />
                                {:else}
                                    <div class="row">
                                        {#each tea.picking as pick}
                                            <div class="column">
                                                <Pinyin text="{pick}" />
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
        <div class="column photo-zoom">
            <img
                src="/assets/thes/{tea.zh}.jpg"
                alt="{tea.zh}"
                title="{tea.zh}"
                class="photo"
            />
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
</div>
