<style>
    h3 {
        text-align: left;
        margin-top: 2em;
    }

    .pinyin {
        display: block;
        font-size: 0.7em;
        color: #999;
    }
    img {
        padding: 0;
        margin: 0;
        vertical-align: -0.4em;
        display: inline;
        width: 5%;
        border: none;
        background: transparent;
        fill: #ccc;
        cursor: pointer;
    }
</style>

<script>
    import { onMount } from 'svelte'

    let terms = []
    let themes = []

    onMount(async () => {
        const res = await fetch(`https://api-tea.oisiflorus.com/api/v1/pinyin`)

        if (res.ok) {
            terms = (await res.json()).api
        } else {
            // 404
            throw new Error(text)
        }

        const res1 = await fetch(`https://api-tea.oisiflorus.com/api/v1/themes`)

        if (res1.ok) {
            themes = (await res1.json()).api
        } else {
            // 404
            throw new Error(text)
        }
    })

    function getPinyinByThemes(pinyins, theme) {
        return pinyins.filter(pinyin => pinyin.theme === theme.en)
    }

    function playAudio(ideogram) {
        document.querySelector(`#${ideogram}`).play()
    }
</script>

<h2>Termes utilisés</h2>

<p>
    Cette page présente une liste des termes en chinois traditionnel employés
    sur le site avec leurs traduction en
    <em>pinyin</em>
</p>
{#each themes as theme}
    <h3>
        {theme.zh}
        <span class="pinyin">{theme.pinyin}</span>
    </h3>
    <div class="row">
        <table class="column column-66">
            <thead>
                <tr>
                    <td>Chinois traditionnel</td>
                    <td>Pinyin</td>
                </tr>
            </thead>
            {#each getPinyinByThemes(terms, theme) as term}
                <tr>
                    <td>
                        <span class="tooltip" title="français">{term.zh}</span>
                        <audio id="{term.zh}">
                            <source
                                src="assets/audio/{term.zh}.mp3"
                                type="audio/mpeg"
                            />
                        </audio>
                        <img
                            class="icons"
                            src="/assets/icons/sound.svg"
                            alt="sound"
                            on:click="{playAudio(term.zh)}"
                        />
                    </td>
                    <td>{term.pinyin}</td>
                </tr>
            {:else}
                <p>chargement des termes...</p>
            {/each}
        </table>
    </div>
{:else}
    <p>chargement des thèmes...</p>
{/each}
