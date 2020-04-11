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
    import Select from './Select.svelte'

    const typeList = {
        green: { cn: 'lǜ chá', pinyin: '綠茶', fr: 'vert' },
        yellow: { cn: 'huáng chá', pinyin: '黃茶', fr: 'jaune' },
        white: { cn: 'bái chá', pinyin: '白茶', fr: 'blanc' },
        blue: { cn: 'qīng chá', pinyin: '青茶', fr: 'bleu' },
        red: { cn: 'hóng chá', pinyin: '紅茶', fr: 'rouge' },
        black: { cn: 'hēi chá', pinyin: '紅茶', fr: 'noir' },
        'pu er': { cn: 'pu er sheng chá', pinyin: '普洱生茶', fr: 'pu er' }
    }

    const brewList = [
        {
            type: typeList.green,
            criteria_1: [
                'feuilles entières',
                'xiao zhong hong cha',
                '小種紅茶'
            ],
            temperature: [75, 85],
            quantity: '1:50',
            duration: [30, 40],
            times: '2 fois ou plus',
            method: 'gaiwan'
        },
        {
            type: typeList.green,
            criteria_1: ['feuilles hachées', 'hong sui cha', '紅碎茶'],
            temperature: [75, 85],
            quantity: '1:50',
            duration: [30, 40],
            times: '2 fois ou plus',
            method: 'gaiwan'
        },
        {
            type: typeList.yellow,
            temperature: [85, 90],
            quantity: '1:50',
            duration: [30, 60, 120],
            times: '3 fois ou plus',
            method: 'gaiwan'
        },
        {
            type: typeList.white,
            temperature: [90, 100],
            quantity: '1:20',
            duration: [30, 60, 120],
            times: '5 fois ou plus',
            method: 'gaiwan'
        },
        {
            type: typeList.white,
            temperature: [80, 85],
            quantity: '1:50',
            duration: [120, 180, 240],
            times: '3 fois ou plus',
            method: 'theiere'
        },
        {
            type: typeList.blue,
            temperature: [95, 100],
            quantity: '1:20',
            duration: [25, 20, 25, 30, 40],
            times: '5 fois ou plus',
            method: 'theiere'
        },
        {
            type: typeList.blue,
            temperature: [90, 95],
            quantity: '1:20',
            duration: [20, 15, 20, 25, 35],
            times: '4 fois ou plus',
            method: 'theiere'
        },
        {
            type: typeList.blue,
            temperature: [85, 90],
            quantity: '1:20',
            duration: [25, 20, 25, 30, 40],
            times: '5 fois ou plus',
            method: 'gaiwan'
        },
        {
            type: typeList.red,
            temperature: [85, 100],
            quantity: '1:20',
            duration: [20, 25, 30, 20],
            times: '3 ou 4 fois',
            method: 'gaiwan'
        },
        {
            type: typeList.red,
            temperature: [85],
            quantity: '1:50',
            duration: [160],
            times: "1 fois et rajouter de l'eau",
            method: 'mug'
        },
        {
            type: typeList.black,
            temperature: [100],
            quantity: '1:100',
            duration: [1200],
            times: '1 fois',
            method: 'bouilloire'
        },
        {
            type: typeList.black,
            temperature: [100],
            quantity: '1:100',
            duration: [1200],
            times: 'une fois',
            method: 'bouilloire'
        },
        {
            type: typeList['pu er'],
            temperature: [100],
            quantity: '1:100',
            duration: [60, 60, 60, 60, 60, 60, 60, 60, 60],
            times: '20 fois et plus',
            method: 'theiere'
        }
    ]

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
        if (tea) {
            teaSelected = JSON.parse(JSON.stringify(tea))
        }
    }
</script>

<main>
    <h1>Guide d'infusion</h1>
    <p>pour apprendre à infuser les thés de Chine</p>
    <div class="tea-search">
        <Select {typeList} />
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
