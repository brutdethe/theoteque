<script>
    import { onMount } from 'svelte'
    import yaml from 'js-yaml'

    let teas = []

    onMount(async () => {
        const response = await fetch('./teas.yaml')

        if (response.ok) {
            teas = yaml.safeLoad(await response.text())
        } else {
            throw new Error(text)
        }
    })
</script>

<h2>Liste des thés</h2>

<div class="teas">
    {#each teas as tea}
        {tea.zh}
    {:else}
        <!-- this block renders when photos.length === 0 -->
        <p>loading...</p>
    {/each}
</div>
