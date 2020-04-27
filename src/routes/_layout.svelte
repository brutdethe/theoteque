<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
    h1 {
        color: #2bed0a;
    }
</style>

<script>
    import Nav from '../components/Nav.svelte'

    export let segment
</script>

<Nav {segment} />

<main>
    <h1>Guide d'infusion</h1>
    <p>pour apprendre à infuser les thés de Chine</p>
    <img src="/assets/logo.jpg" alt="tasse de thé" width="100px" />
    <hr />
    <slot />
</main>
