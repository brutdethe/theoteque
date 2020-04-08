<style>
    main {
        text-align: center;
        padding: 1em;
        width: 640px;
        margin: 0 auto;
    }

    .tea-type {
        text-align: left;
        width: 50%;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    ul {
        border: 1px solid grey;
        width: 45%;
        margin: 1em auto;
        text-align: left;
        list-style: none;
    }

    li {
        padding: 1em;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<script>
    import AutoComplete from 'simple-svelte-autocomplete'

    const colorList = [
        {
            name: 'vert',
            temperature: '75° à 85°',
            quantity: '1:50',
            duration: [30, 40],
            times: ['2', 'plus'],
            method: 'gaïwan'
        },
        {
            name: 'jaune',
            temperature: '85° à 90°',
            quantity: '1:50',
            duration: [30, 60, 120],
            times: ['3', 'plus'],
            method: 'gaïwan'
        },
        {
            name: 'blanc Fujian (traditionnel)',
            temperature: '90° et 100°',
            quantity: '1:20',
            duration: [30, 60, 120],
            times: ['5', 'plus'],
            method: 'gaïwan'
        },
        {
            name: 'blanc Yunnan (récent)',
            temperature: '80° et 85°',
            quantity: '1:50',
            duration: [120, 180, 240],
            times: ['3', 'plus'],
            method: 'théière'
        },
        {
            name: 'wulong perlé',
            temperature: '95° à 100°',
            quantity: '1:20',
            duration: [25, 20, 25, 30, 40],
            times: ['5', 'plus'],
            method: 'théière'
        },
        {
            name: 'wulong torsadé',
            temperature: '90° à 95°',
            quantity: '1:20',
            duration: [20, 15, 20, 25, 35],
            times: ['4', 'plus'],
            method: 'théière'
        },
        {
            name: 'wulong oriental beauty',
            temperature: '85° à 90°',
            quantity: '1:20',
            duration: [25, 20, 25, 30, 40],
            times: ['5', 'plus'],
            method: 'gaïwan'
        },
        {
            name: 'rouge feuille entière',
            temperature: '85° à 100°',
            quantity: '1:20',
            duration: [20, 25, 30, 20],
            times: ['3', '4'],
            method: 'gaïwan'
        },
        {
            name: 'rouge brisure',
            temperature: '85°',
            quantity: '1:50',
            duration: [160],
            times: ['1'],
            method: 'mug'
        },
        {
            name: 'noir',
            temperature: '100°',
            quantity: '1:100',
            duration: [1200],
            times: ['1'],
            method: 'bouilloire'
        },
        {
            name: "pu'er cuit",
            temperature: '100°',
            quantity: '1:100',
            duration: [1200],
            times: ['1'],
            method: 'bouilloire'
        },
        {
            name: "pu'er cru",
            temperature: '100°',
            quantity: '1:100',
            duration: [60, 60, 60, 60, 60, 60, 60, 60, 60],
            times: [20, 'plus'],
            method: 'théière'
        }
    ]

    let selectedColorObject
    let teaSelected = {
        name: '',
        temperature: '',
        quantity: '',
        duration: [],
        times: '',
        method: ''
    }

    function onChange(tea) {
        if (tea) {
            teaSelected = JSON.parse(JSON.stringify(tea))
        }
    }
</script>

<main>
    <h1>Guide d'infusion</h1>
    <p>pour aider à déguster les thés de Chine</p>
    <div class="tea-type">
        <AutoComplete
            items="{colorList}"
            bind:selectedItem="{selectedColorObject}"
            labelFieldName="name"
            onChange="{tea => onChange(tea)}"
            placeholder="saisissez votre thé ici"
        />
    </div>
    {#if teaSelected.name}
        <ul>
            <li>Température : {teaSelected.temperature}</li>
            <li>Quantité : {teaSelected.quantity}</li>
            <li>Durée : {teaSelected.duration} sec</li>
            <li>Nombre d'infusions : {teaSelected.times}</li>
            <li>Méthode : {teaSelected.method}</li>
        </ul>
    {/if}

</main>
