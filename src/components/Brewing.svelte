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
</style>

<script>
    import Pinyin from '../components/Pinyin.svelte'
    export let brew

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

<table class="column column-50">
    <tr>
        <Pinyin text="{brew.type}" />
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
        <span class="mini">(ratio: {brew.quantity})</span>
    </td>
</table>
