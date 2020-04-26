<style>
    main {
        text-align: center;
        padding: 1em;
        width: 900px;
        margin: 0 auto;
    }
    h1 {
        color: #2bed0a;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin: 0;
    }

    .tea-search {
        margin: 3em;
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
    import DisplayTeas from './DisplayTeas.svelte'
</script>

<main>
    <h1>Guide d'infusion</h1>
    <p>pour apprendre à infuser les thés de Chine</p>
    <div class="tea-search"></div>
    <img src="assets/logo.jpg" alt="tasse de thé" width="100px" />

    <DisplayTeas />
</main>
