<style>
    .ghTreeItem {
        position: relative;
        padding: 20px 0;
        margin: 0 20px;
    }
    .ghTreeTitle {
        margin-top: 1em;
        line-height: 1;
        font-size: 1.7rem;
    }
    .ghTreeTitle a {
        color: #73d56b;
    }
    .ghTreeTitle a:hover {
        color: #002920;
    }
    .ghTreeCategory {
        color: #002920;
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

    const categories = [
        { name: 'base', title: 'Pour comprendre les bases' },
        { name: 'intermediaire', title: 'Pour approfondir' },
        { name: 'expert', title: 'Pour bidouiller' },
        { name: 'contribution', title: 'Pour contribuer' }
    ]

    function getPostsByCategory(category, posts) {
        return posts.filter(post => post.categorie === category)
    }
</script>

<svelte:head>
    <title>Documentation sur les thés</title>
</svelte:head>

<section id="ghTree" class="ghTree" data-title="tree">

    <h1>Liste des articles</h1>

    {#each categories as category}
        <h2 class="ghTreeCategory">{category.title}</h2>
        {#each getPostsByCategory(category.name, posts) as post}
            <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
            <article class="ghTreeItem ghTypeFile" data-title="dir">
                <h3 class="ghTreeTitle">
                    <a
                        rel="prefetch"
                        class="folderLink"
                        data-title="folderLink"
                        href="documentation/{post.lien}"
                    >
                        {post.titre}
                    </a>
                </h3>
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
    {/each}
</section>
