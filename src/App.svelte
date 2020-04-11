<style>
    main {
        text-align: center;
        padding: 1em;
        width: 640px;
        margin: 0 auto;
    }

    .tea-search {
        text-align: left;
        width: 50%;
        margin: 4em auto;
    }

    .times {
        font-style: italic;
    }

    h1 {
        color: #2bed0a;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin: 0;
    }

    ul {
        position: absolute;
        z-index: -1;
        top: 250px;
        left: 41.6%;
        width: 50%;
        box-shadow: 1px 1px 1px 1px #ccc;
        width: 280px;
        background: rgb(243, 248, 234);
        margin: 1em auto;
        text-align: left;
        list-style: none;
    }

    li {
        padding: 1em;
    }

    img {
        margin: 0.5em;
        vertical-align: middle;
        display: inline-block;
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
    import AutoComplete from 'simple-svelte-autocomplete'
    import SelectType from './SelectType.svelte'
    import SelectCriteria from './SelectCriteria.svelte'
    import tea from './teaData.js'

    const typeList = tea.typeList

    let selectedType
    let selectedColorObject

    let teaSelected = {
        type: '',
        temperature: '',
        quantity: '',
        duration: [],
        times: '',
        method: ''
    }

    const display = {
        temperature: temperature => {
            return `${temperature.join('° à ')} °`
        }
    }

    function onChange(tea) {
        if (typeList) {
            teaSelected = JSON.parse(JSON.stringify(tea))
        }
    }
</script>

<main>
    <h1>Guide d'infusion</h1>
    <p>pour apprendre à infuser les thés de Chine</p>
    <div class="tea-search">
        <SelectType {typeList} />
        <SelectCriteria />
        {#if selectedType}
            <AutoComplete
                items="{brewList}"
                bind:selectedItem="{selectedColorObject}"
                labelFieldName="name"
                onChange="{tea => onChange(tea)}"
                placeholder="trouvez votre type de feuille ici"
                minCharactersToSearch="2"
                noResultsText="pas de type de feuille correspondant"
            />
        {/if}
    </div>
    {#if teaSelected.name}
        <ul>
            <h3>{teaSelected.name}</h3>
            <li>
                <img
                    src="assets/temperature.svg"
                    alt="température"
                    title="température"
                    width="30px"
                />
                {display.temperature(teaSelected.temperature)}
            </li>
            <li>
                <img
                    src="assets/temps.svg"
                    alt="durée"
                    title="durée"
                    width="30px"
                />
                {teaSelected.duration} sec
            </li>
            <li>
                <img
                    src="assets/{teaSelected.method}.svg"
                    alt="{teaSelected.method}"
                    width="50px"
                    title="{teaSelected.method}"
                />
                ratio : {teaSelected.quantity}
            </li>
            <li class="times">infuser {teaSelected.times}</li>
        </ul>
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
