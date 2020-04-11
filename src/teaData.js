const typeList = {
    green: { cn: 'lǜ chá', pinyin: '綠茶', fr: 'vert' },
    yellow: { cn: 'huáng chá', pinyin: '黃茶', fr: 'jaune' },
    white: { cn: 'bái chá', pinyin: '白茶', fr: 'blanc' },
    blue: { cn: 'qīng chá', pinyin: '青茶', fr: 'bleu' },
    red: { cn: 'hóng chá', pinyin: '紅茶', fr: 'rouge' },
    black: { cn: 'hēi chá', pinyin: '紅茶', fr: 'noir' }
}

const brewList = [
    {
        type: 'green',
        criteria: [{ cn: 'dan ya', pinyin: '單芽', fr: 'bourgeon' }],
        temperature: [75, 85],
        quantity: '1:50',
        duration: [30, 40],
        times: '2 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'green',
        criteria: [
            {
                cn: 'yi ya yi er ye',
                pinyin: '一芽一',
                fr: 'bourgeon et 1, 2, ou 3 feuilles'
            }
        ],
        temperature: [75, 85],
        quantity: '1:50',
        duration: [30, 40],
        times: '2 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'white',
        criteria: [
            {
                cn: 'bai hao yin zhen',
                pinyin: '白毫銀針',
                fr: 'bourgeon et 1 feuille ou bourgeon seul'
            }
        ],
        temperature: [90, 100],
        quantity: '1:20',
        duration: [30, 60, 120],
        times: '5 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'white',
        criteria: [
            {
                cn: 'bai mu dan',
                pinyin: '白牡丹',
                fr: 'bourgeon et 1 ou 2 feuilles'
            }
        ],
        temperature: [80, 85],
        quantity: '1:50',
        duration: [120, 180, 240],
        times: '3 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'white',
        criteria: [
            {
                cn: 'shou mei',
                pinyin: '壽眉',
                fr: 'bourgeon et 3 feuilles'
            }
        ],
        temperature: [80, 85],
        quantity: '1:50',
        duration: [120, 180, 240],
        times: '3 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'yellow',
        temperature: [85, 90],
        quantity: '1:50',
        duration: [30, 60, 120],
        times: '3 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'blue',
        temperature: [95, 100],
        quantity: '1:20',
        duration: [25, 20, 25, 30, 40],
        times: '5 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'blue',
        temperature: [90, 95],
        quantity: '1:20',
        duration: [20, 15, 20, 25, 35],
        times: '4 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'blue',
        temperature: [85, 90],
        quantity: '1:20',
        duration: [25, 20, 25, 30, 40],
        times: '5 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'red',
        temperature: [85, 100],
        quantity: '1:20',
        duration: [20, 25, 30, 20],
        times: '3 ou 4 fois',
        method: 'gaiwan'
    },
    {
        type: 'red',
        temperature: [85],
        quantity: '1:50',
        duration: [160],
        times: "1 fois et rajouter de l'eau",
        method: 'mug'
    },
    {
        type: 'black',
        temperature: [100],
        quantity: '1:100',
        duration: [1200],
        times: '1 fois',
        method: 'bouilloire'
    },
    {
        type: 'black',
        temperature: [100],
        quantity: '1:100',
        duration: [1200],
        times: 'une fois',
        method: 'bouilloire'
    }
]

const tea = {
    typeList: typeList,
    brewList: brewList
}

export default tea
