<script>
    import Nav from '../components/Nav.svelte'

    export let segment
</script>

<main class="container">
    <Nav {segment} />
    <article class="blobContent" data-title="content">
        <slot />
    </article>
</main>
