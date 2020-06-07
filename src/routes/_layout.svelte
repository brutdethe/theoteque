<script>
    import Nav from '../components/Nav.svelte'

    export let segment
</script>

<main class="container">
    <Nav {segment} />
    <slot />
</main>
