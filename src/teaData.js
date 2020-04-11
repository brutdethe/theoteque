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
        criteria: [{ cn: 'dān yá', pinyin: '單芽', fr: '1 bourgeon' }],
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
                cn: 'yī yá yī, èr yè',
                pinyin: '一芽一, 二葉',
                fr: '1 bourgeon et 1, 2, ou 3 feuilles'
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
                cn: 'bái háo yín zhēn',
                pinyin: '白毫銀針',
                fr: '1 bourgeon et 1 feuille ou bourgeon seul'
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
                cn: 'bái mǔ dān',
                pinyin: '白牡丹',
                fr: '1 bourgeon et 1 ou 2 feuilles'
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
                cn: 'shòu méi',
                pinyin: '壽眉',
                fr: '1 bourgeon et 3 feuilles'
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
        criteria: [
            {
                cn: 'Huáng yá chá, huáng xiǎo chá, huáng dà chá',
                pinyin: '黃芽茶, 黃小茶, 黃大茶',
                fr: '1 bourgeon et 1, 2 ou 3 feuilles'
            }
        ],
        temperature: [85, 90],
        quantity: '1:50',
        duration: [30, 60, 120],
        times: '3 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'blue',
        criteria: [
            {
                cn:
                    'mǐn běi wū lóng（yán chá)， guǎng dōng wū lóng (dān cōng）',
                pinyin: '閩北烏龍 （岩茶)， 廣東烏龍（單樅）',
                fr: 'sombre, brun, rouge'
            }
        ],
        temperature: [95, 100],
        quantity: '1:20',
        duration: [25, 20, 25, 30, 40],
        times: '5 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'mǐnnán wū lóng (Ānxī tiě guān yīn)，Táiwān wū lóng',
                pinyin: '閩南烏龍 (安溪鐵觀音)，臺灣烏龍',
                fr: 'vert clair, vert foncé'
            }
        ],
        temperature: [90, 95],
        quantity: '1:20',
        duration: [20, 15, 20, 25, 35],
        times: '4 fois ou plus',
        method: 'theiere'
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'oriental beauty',
                pinyin: 'oriental beauty',
                fr: 'oriental beauty'
            }
        ],
        temperature: [85, 90],
        quantity: '1:20',
        duration: [25, 20, 25, 30, 40],
        times: '5 fois ou plus',
        method: 'gaiwan'
    },
    {
        type: 'red',
        criteria: [
            {
                cn: 'xiǎo zhǒng hóng chá, gōng fū hóng chá',
                pinyin: '小種紅茶, 工夫紅茶',
                fr: 'feuilles entières'
            }
        ],
        temperature: [85, 100],
        quantity: '1:20',
        duration: [20, 25, 30, 20],
        times: '3 ou 4 fois',
        method: 'gaiwan'
    },
    {
        type: 'red',
        criteria: [
            {
                cn: 'hóng sui chá',
                pinyin: '紅碎茶',
                fr: 'feuilles concassées ou en perle'
            }
        ],
        temperature: [85],
        quantity: '1:50',
        duration: [160],
        times: "1 fois et rajouter de l'eau",
        method: 'mug'
    },
    {
        type: 'black',
        criteria: [
            {
                cn: 'hēi chá',
                pinyin: '黑茶',
                fr: 'thé noir'
            }
        ],
        temperature: [100],
        quantity: '1:100',
        duration: [1200],
        times: '1 fois',
        method: 'bouilloire'
    },
    {
        type: 'black',
        criteria: [
            {
                cn: "pǔ'ěr shú chá",
                pinyin: '普洱熟茶',
                fr: 'pu er cuit'
            }
        ],
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
