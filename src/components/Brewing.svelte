<style>

</style>

<script>
    import Pinyin from '../components/Pinyin.svelte'
    export let brew

    const display = {
        times: times => {
            if (+times) {
                return `${times} fois`
            } else if (times.length == 2 && Array.isArray([times])) {
                return `entre ${times[0]} et ${times[1]} fois`
            }
        }
    }
</script>

<table class="column" column-20>
    <thead>
        <tr>
            <td>Conseil d'infusion</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            {#if brew.type}
                <tr>
                    <Pinyin text="{brew.type}" />
                </tr>
            {/if}
        </tr>
        <!--
        <tr>
            {#if brew.temperature}
                <tr>
                    <td>Température :</td>
                    <td>{display.temperature(brew.temperature)}</td>
                </tr>
            {/if}
        </tr>
        -->
        <tr>
            {#if brew.quantity}
                <tr>
                    <td>Quantité :</td>
                    <td>{brew.quantity}</td>
                </tr>
            {/if}
        </tr>
        <tr>
            {#if brew.duration}
                <tr>
                    <td>Duration :</td>
                    <td>
                        <table>
                            <thead>
                                <tr>
                                    {#each brew.duration as duration, index}
                                        <td>{index + 1}</td>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {#each brew.duration as duration}
                                        <td>{duration} sec</td>
                                    {/each}
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            {/if}
        </tr>
        <tr>
            {#if brew.times}
                <tr>
                    <td>Nombre d'infusion :</td>
                    <td>{display.times(brew.times)}</td>
                </tr>
            {/if}
        </tr>
    </tbody>

</table>
