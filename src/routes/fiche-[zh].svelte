<style>
    .container {
        margin: 2em 0;
    }

    .photo {
        border: 1px solid #73d56b;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
    }

    .icons {
        text-align: left;
        width: 10%;
    }
</style>

<script context="module">
    export function preload(page) {
        return { zh: page.params.zh }
    }
</script>

<script>
    import { onMount } from 'svelte'
    import { teas, i18n } from '../stores.js'
    import Pinyin from '../components/Pinyin.svelte'
    import IconTeaType from '../components/IconTeaType.svelte'

    export let zh

    $: tea = $teas.filter(t => t.zh === zh)[0]

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
                return `à partir de ${fermentation}%`
            } else if (
                fermentation.length == 2 &&
                Array.isArray(fermentation)
            ) {
                return `entre ${fermentation[0]}% et ${fermentation[1]}%`
            }
        },
        temperature: temperature => {
            if (+temperature) {
                return `à partir de ${temperature}°`
            } else if (temperature.length == 2 && Array.isArray(temperature)) {
                return `entre ${temperature[0]}° et ${temperature[1]}°`
            }
        }
    }
</script>

<svelte:head>
    <title>Fiche de thé</title>
</svelte:head>

{#if tea && i18n}
    <h2>
        <Pinyin text="{tea.zh}" />
    </h2>

    <div class="container">
        <div class="row">
            <div class="column column-66">
                <table>
                    <thead></thead>
                    <tbody>
                        {#if tea.type}
                            <tr>
                                <td>
                                    <a href="/liste-des-thes-{tea.type}">
                                        <Pinyin text="{tea.type}" />
                                    </a>
                                    <IconTeaType type="{tea.type}" />
                                </td>
                            </tr>
                        {/if}
                        {#if tea.family}
                            <tr>
                                <td>Famille :</td>
                                <td>
                                    <Pinyin text="{tea.family}" />
                                </td>
                            </tr>
                        {/if}
                        {#if tea.cultivar}
                            <tr>
                                <td>Cultivar :</td>

                                <td>
                                    <Pinyin text="{tea.cultivar}" />
                                </td>
                            </tr>
                        {/if}
                        {#if tea.town}
                            <tr>
                                <td>Ville :</td>
                                <td>
                                    <a
                                        href="https://www.openstreetmap.org/search?query={tea['town']}"
                                    >
                                        <Pinyin text="{tea.town}" />
                                    </a>
                                </td>
                            </tr>
                        {/if}
                        {#if tea.province}
                            <tr>
                                <td>Province :</td>
                                <td>
                                    <a
                                        href="https://www.openstreetmap.org/search?query={tea['province']}"
                                    >
                                        <Pinyin text="{tea.province}" />
                                    </a>
                                </td>

                            </tr>
                        {/if}
                        {#if tea.elevation}
                            <tr>
                                <td>Altitude :</td>
                                <td>{display.elevation(tea.elevation)}</td>
                            </tr>
                        {/if}
                        {#if tea.harvest}
                            <tr>
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
                            </tr>
                        {/if}
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
                        {#if tea.fermentation}
                            <tr>
                                <td>Fermentation :</td>
                                <td>
                                    {display.fermentation(tea.fermentation)}
                                </td>
                            </tr>
                        {/if}
                        {#if tea.temperature}
                            <tr>
                                <td>Température :</td>
                                <td>{display.temperature(tea.temperature)}</td>
                            </tr>
                        {/if}
                    </tbody>
                </table>

            </div>
            <div class="column">
                {#if tea.image}
                    <img
                        src="/assets/thes/{tea.zh}.jpg"
                        alt="{tea.zh}"
                        title="{tea.zh}"
                        class="photo"
                    />
                {/if}
            </div>
        </div>
    </div>
{/if}
