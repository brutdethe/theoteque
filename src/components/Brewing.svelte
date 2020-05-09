<style>
    input {
        width: 6em;
        heigth: 2em;
        border-color: #ddd;
        font-size: 0.9em;
        color: grey;
    }
    .mini {
        font-size: 0.8em;
        color: grey;
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
        font-size: 1.5em;
    }

    .brew td {
        font-size: 0.8em;
        border: 1px solid #ccc;
    }
</style>

<script>
    import { onMount } from 'svelte'
    export let brew

    let i18n = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)

        if (res.ok) {
            i18n = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })
    function getPinyin(text, i18n) {
        const term = i18n.filter(term => term.zh === text)[0] || {}
        return 'pinyin' in term ? term.pinyin : '-'
    }

    let ml = 100

    $: weight = (ml / +brew.quantity.split(':')[1]).toFixed(1)

    const durations = +brew.duration ? [brew.duration] : brew.duration

    const display = {
        times: times => {
            if (+times) {
                return `${times} infusions`
            } else if (times.length == 2 && Array.isArray([times])) {
                return `${times[0]} à ${times[1]} infusions`
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

<table class="brew">
    <tr>
        <div>
            <p class="zh">{brew.type}</p>
            <p class="pinyin">{getPinyin(brew.type, i18n)}</p>
        </div>
    </tr>
    <tr>
        <td>{display.temperature(brew.temperature)}</td>
    </tr>
    {#if brew.times}
        <tr>
            <td>{display.times(brew.times)}</td>
        </tr>
    {/if}
    {#if durations}
        <tr>
            <td>
                <table>
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
    <td>
        Vous pouvez tester avec
        <strong>{weight} g</strong>
        pour
        <input type="number" step="20" bind:value="{ml}" />
        ml -
        <!-- <input type=range bind:value={b} min=0 max=10> -->
        <span class="mini">(ratio: {brew.quantity})</span>
    </td>
</table>
