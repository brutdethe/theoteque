<script>
    import { onMount } from 'svelte'
    import yaml from 'js-yaml'

    let teas = []
    let teaTranslate = []

    onMount(async () => {
        const responseTeas = await fetch('./teas.yaml')
        const responseTeaTranslate = await fetch('./teaTranslate.yaml')

        if (responseTeas.ok && responseTeaTranslate.ok) {
            teas = yaml.safeLoad(await responseTeas.text())
            teaTranslate = yaml.safeLoad(await responseTeaTranslate.text())
        } else {
            throw new Error(text)
        }
    })
</script>

<h2>Liste des thés</h2>

<div class="teas">
    <table>
        <thead>
            <tr>
                <th>nom chinois</th>
                <th>type</th>
                <th>famille</th>
                <th>récolte</th>
                <th>cultivar</th>
                <th>origine</th>
                <th>ceuillette</th>
                <th>altitude</th>
            </tr>
        </thead>
        <tbody>
            {#each teas as tea}
                <tr>
                    <td>{tea.zh}</td>
                    <td>{tea.type}</td>
                    <td>{tea.family || '-'}</td>
                    <td>{tea.harvest || '-'}</td>
                    <td>{tea.cultivar || '-'}</td>
                    <td>{tea.origin || '-'}</td>
                    <td>{tea.picking || '-'}</td>
                    <td>{tea.elevation || '-'}</td>
                </tr>
            {:else}
                <!-- this block renders when photos.length === 0 -->
                <p>loading...</p>
            {/each}
        </tbody>
    </table>
</div>
