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
        criteria_1: ['feuilles entières', 'xiao zhong hong cha', '小種紅茶'],
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

const tea = {
    typeList: typeList,
    brewList: brewList
}

export default tea
