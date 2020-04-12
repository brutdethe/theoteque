<style>
    main {
        text-align: center;
        padding: 1em;
        width: 720px;
        margin: 0 auto;
    }

    h1 {
        color: #2bed0a;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin: 0;
    }

    blockquote {
        text-align: justify;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<script>
    import { type, criteria } from './stores.js'
    import AutoComplete from 'simple-svelte-autocomplete'
    import SelectType from './SelectType.svelte'
    import SelectCriteria from './SelectCriteria.svelte'
    import DisplayBrew from './DisplayBrew.svelte'
    import tea from './teaData.js'

    const { typeList, brewList } = tea
    let teaSelected

    teaSelected = brewList[0]
</script>

<main>
    <h1>Guide d'infusion</h1>
    <p>pour apprendre à infuser les thés de Chine</p>
    <div class="tea-search">
        <SelectType {typeList} />
        {#if $type}
            <SelectCriteria {brewList} />
        {/if}
    </div>
    {#if Number.isInteger($criteria)}
        <DisplayBrew {teaSelected} />
    {:else}
        <img src="assets/logo.jpg" alt="tasse de thé" width="100px" />
        <blockquote>
            Broutille est un outil d'apprentissage pour aborder en douceur la
            complexité de l'infusion. Ce n'est pas une table de loi, l'infusion
            des thés est un art au service de la complexité des thés et de la
            diversité des personnes qui tentent de les apprivoiser.
        </blockquote>
        <blockquote>
            Si vous découvrez le monde des thés authentiques, les indications
            prodigués vous permettront de découvrir une porte d'entrée. Vous
            comprendrez peu à peu que chaque thé, chaque instant de dégustation
            et chaque personne étant différents ces indications utiles au départ
            se révéleront pauvres au regard de vos intuitions.
        </blockquote>
    {/if}

</main>
