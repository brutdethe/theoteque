<style>
    .pinyin {
        font-weight: normal;
        font-size: 1.5em;
    }
    .ideogram {
        font-size: 1em;
        color: #999;
        font-weight: normal;
    }
    .icons {
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        display: inline-block;
        text-align: left;
        width: 1.5em;
        line-height: 3em;
    }
    .brew-title {
        display: grid;
        grid-template-columns: 3rem auto;
    }
    .brew-title .icons {
        margin: 0.5em 0;
        width: 2.5em;
    }
    .brew-title .ideogram {
        display: block;
    }
    .brew-details {
        margin: 1.5em 0;
    }
    .brew-details td {
        font-size: 1em;
        border: 1px solid #ccc;
    }
    input {
        width: 6em;
        heigth: 2em;
        border-color: #ddd;
        font-size: 1em;
        color: grey;
    }
    .mini {
        font-size: 0.8em;
        color: grey;
    }
    .voice {
        cursor: pointer;
    }
</style>

<script>
    import { onMount } from 'svelte'
    export let brew

    let i18n = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.brutdethé.fr/api/v1/pinyin`)

        if (res.ok) {
            i18n = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })
    function getPinyin(text, i18n) {
        const term = i18n.filter(term => term.ideogram === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }
    function playAudio(ideogram) {
        document.querySelector(`#${ideogram}`).play()
    }

    let ml = 100

    $: weight = (ml / +brew.quantity.split(':')[1]).toFixed(1)

    const durations = +brew.durations ? [brew.durations] : brew.durations

    const display = {
        times: times => {
            if (+times) {
                return `${times} infusions`
            } else if (times.length == 2 && Array.isArray([times])) {
                return `${times[0]} à ${times[1]} infusions`
            }
        },
        temperatures: temperatures => {
            if (+temperatures) {
                return `à partir de ${temperatures}°`
            } else if (
                temperatures.length == 2 &&
                Array.isArray(temperatures)
            ) {
                return `entre ${temperatures[0]}° et ${temperatures[1]}°`
            }
        }
    }
</script>

<aside class="brew-title">
    <img
        class="icons brew-style"
        src="/assets/icons/{brew.type}.svg"
        alt="type d'infusion"
    />
    <div class="brew-title-text">
        <audio id="{brew.type}">
            <source src="assets/audio/{brew.type}.mp3" type="audio/mpeg" />
        </audio>
        <span
            class="pinyin voice"
            title="voix"
            on:click="{playAudio(brew.type)}"
        >
            {getPinyin(brew.type, i18n)}
        </span>
        <span
            class="ideogram voice"
            title="voix"
            on:click="{playAudio(brew.type)}"
        >
            {brew.type}
        </span>
    </div>
</aside>

<table class="brew-details">
    <tr>
        <td>
            <img
                class="icons thermometer"
                src="/assets/icons/temperature.svg"
                alt="temperature"
            />
            {display.temperatures(brew.temperatures)}
        </td>

        {#if brew.times}
            <td>{display.times(brew.times)}</td>
        {/if}
    </tr>
    {#if durations}
        <tr>
            <td colspan="2">
                <table>
                    <span class="mini">Temps pour chaque infusion</span>
                    <tr>
                        {#each durations as duration, index}
                            <td>{index + 1}</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each durations as duration}
                            <td>{duration} sec</td>
                        {/each}
                    </tr>
                </table>
            </td>
        </tr>
    {/if}
    <td colspan="2">
        Vous pouvez tester pour
        <input type="number" step="20" bind:value="{ml}" />
        ml avec
        <strong>{weight} g</strong>
        de thé.
        <!-- <input type=range bind:value={b} min=0 max=10> -->
    </td>
</table>
