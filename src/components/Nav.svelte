<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        font-size: 1.2em;
        text-decoration: none;
        padding: 1em 1em 0.5em 0;
        display: block;
    }
</style>

<script>
    import Search from '../components/Search.svelte'
    export let segment
</script>

<nav>
    <ul>
        <li>
            <a
                aria-current="{segment === undefined ? 'page' : undefined}"
                href="."
            >
                Accueil
            </a>
        </li>
        <li>
            <a
                rel="prefetch"
                aria-current="{segment === 'liste-des-thes-tous' ? 'page' : undefined}"
                href="liste-des-thes-tous"
            >
                Liste des thés
            </a>
        </li>
        <li>
            <a
                rel="prefetch"
                href="documentation"
                aria-current="{segment === 'documentation' ? 'page' : undefined}"
            >
                Documentation
            </a>
        </li>
        <li>
            <a
                rel="prefetch"
                href="termes"
                aria-current="{segment === 'termes' ? 'page' : undefined}"
            >
                Termes
            </a>
        </li>
        <li>
            <Search />
        </li>

    </ul>
</nav>
