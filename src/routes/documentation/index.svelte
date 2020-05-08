<style>
    .ghTreeTitle a {
        color: #73d56b;
    }

    .ghTreeTitle a:hover {
        color: rgb(56, 153, 47);
    }
</style>

<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`documentation.json`)
            .then(r => r.json())
            .then(posts => {
                return { posts }
            })
    }
</script>

<script>
    export let posts
</script>

<svelte:head>
    <title>Documentation sur les thés</title>
</svelte:head>

<section id="ghTree" class="ghTree" data-title="tree">
    <header>
        <h1>Liste des articles</h1>
    </header>

    {#each posts as post}
        <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->

        <article class="ghTreeItem ghTypeFile" data-title="dir">
            <h2 class="ghTreeTitle">
                <a
                    rel="prefetch"
                    class="folderLink"
                    data-title="folderLink"
                    href="documentation/{post.lien}"
                >
                    {post.titre}
                </a>
            </h2>
            <p class="ghTreeExcerpt" data-title="fileExcerpt">
                {post.description}
            </p>
            <a
                class="ghTreeReadmore"
                title="Lire la suite de la fiche : {post.titre}"
                data-title="fileReadmoreLink"
                href="documentation/{post.lien}"
            >
                Lire la suite de la fiche
            </a>
        </article>
    {/each}
</section>
