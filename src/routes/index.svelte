<style>
    @media (min-width: 480px) {
    }

    p {
        text-align: left;
    }
</style>

<script context="module">
    export async function preload() {
        const res = await this.fetch(`./teas.json`)
        const teas = await res.json()

        return { teas }
    }
</script>

<script>
    export let teas
</script>

<h1>{console.log(teas)}</h1>

<svelte:head>
    <title>Broutille</title>
</svelte:head>
<p>
    Broutille est un outil d'apprentissage pour aborder en douceur la complexité
    de l'infusion. Ce n'est pas une table de loi, l'infusion des thés est un art
    au service de la complexité des thés et de la diversité des personnes qui
    tentent de les apprivoiser.
</p>
<p>
    Si vous découvrez le monde des thés authentiques, les indications prodiguées
    vous permettront de découvrir une porte d'entrée. Vous comprendrez peu à peu
    que chaque thé, chaque instant de dégustation et chaque personne étant
    différents ces indications utiles au départ se révéleront pauvres au regard
    de vos intuitions.
</p>
