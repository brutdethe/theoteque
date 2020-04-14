const typeData = {
    green: { cn: 'lǜ chá', pinyin: '綠茶', fr: 'vert' },
    white: { cn: 'bái chá', pinyin: '白茶', fr: 'blanc' },
    yellow: { cn: 'huáng chá', pinyin: '黃茶', fr: 'jaune' },
    blue: { cn: 'qīng chá', pinyin: '青茶', fr: 'bleu' },
    red: { cn: 'hóng chá', pinyin: '紅茶', fr: 'rouge' },
    black: { cn: 'hēi chá', pinyin: '黑茶', fr: 'noir' }
}

const brewStyleData = {
    gaiwan: { cn: 'gàiwǎn pào fa', pinyin: '蓋碗泡法', fr: 'gaiwan' },
    zhong: { cn: 'cha zhōng pào fa', pinyin: '茶盅泡法', fr: 'zhong' },
    teapot: { cn: 'xiao hu pao fa', pinyin: '小壺泡法', fr: 'gong fu cha' },
    granpa: { cn: 'cha bēi pào fa', pinyin: '茶杯泡法', fr: 'classique' },
    kettle: { cn: 'zhu pao fa', pinyin: '煮泡法', fr: 'bouilloire' }
}

const brewData = [
    {
        type: 'green',
        criteria: [{ cn: 'dān yá', pinyin: '單芽', fr: '1 bourgeon' }],
        brew_style: {
            gaiwan: {
                temperature: [75, 80],
                quantity: '1:30',
                duration: [25, 30, 45],
                times: '2 fois ou plus'
            },
            granpa: {
                temperature: [75, 80],
                quantity: '1:50'
            }
        }
    },
    {
        type: 'green',
        criteria: [
            {
                cn: 'yi ya èr san yè',
                pinyin: '一芽二，三 葉',
                fr: '1 bourgeon et 2 ou 3 feuilles'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [80, 85],
                quantity: '1:30',
                duration: [20, 30, 40, 60],
                times: '2 fois ou plus'
            },
            granpa: {
                temperature: [80, 85],
                quantity: '1:50'
            }
        }
    },
    {
        type: 'green',
        criteria: [
            {
                cn: 'yī yá yī yè',
                pinyin: '一芽一葉',
                fr: '1 bourgeon et 1 feuille'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [80, 85],
                quantity: '1:30',
                duration: [20, 30, 40, 60],
                times: '2 fois ou plus'
            },
            granpa: {
                temperature: [80, 85],
                quantity: '1:50'
            }
        }
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
        brew_style: {
            gaiwan: {
                temperature: [90],
                quantity: '1:20',
                duration: [30, 40, 50, 60, 70, 90],
                times: '5 fois ou plus'
            }
        }
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
        brew_style: {
            gaiwan: {
                temperature: [95],
                quantity: '1:30',
                duration: [30, 40, 50, 60],
                times: '4 fois ou plus'
            }
        }
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
        brew_style: {
            gaiwan: {
                temperature: [100],
                quantity: '1:30',
                duration: [50, 60, 80, 100],
                times: '4 fois ou plus'
            }
        }
    },
    {
        type: 'yellow',
        criteria: [
            {
                cn: 'huáng yá cháá',
                pinyin: '黃芽茶',
                fr: '1 bourgeon et 1 feuille'
            }
        ],
        brew_style: {
            granpa: {
                temperature: [85, 90],
                quantity: '1:50'
            }
        }
    },
    {
        type: 'yellow',
        criteria: [
            {
                cn: 'huáng xiǎo chá',
                pinyin: '黃小茶',
                fr: '1 bourgeon et 2 feuilles'
            }
        ],
        brew_style: {
            granpa: {
                temperature: [85, 90],
                quantity: '1:50'
            }
        }
    },
    {
        type: 'yellow',
        criteria: [
            {
                cn: 'huáng dà chá',
                pinyin: '黃大茶',
                fr: '1 bourgeon et 3 feuilles'
            }
        ],
        brew_style: {
            granpa: {
                temperature: [85, 90],
                quantity: '1:50'
            }
        }
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'mǐn běi wū lóng（yán chá)',
                pinyin: '閩北烏龍 (岩茶)',
                fr: 'sombre, brun, rouge'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [95, 100],
                quantity: '1:20',
                duration: [15, 15, 15, 20, 25],
                times: '5 fois ou plus'
            }
        }
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'guǎng dōng wū lóng (dān cōng）',
                pinyin: '廣東烏龍 (單樅)',
                fr: 'sombre, brun, rouge'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [95, 100],
                quantity: '1:20',
                duration: [15, 15, 15, 20, 25],
                times: '5 fois ou plus'
            }
        }
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'mǐnnán wū lóng (Ānxī tiě guān yīn)',
                pinyin: '閩南烏龍 (安溪鐵觀音)',
                fr: 'vert clair, vert foncé'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [90, 100],
                quantity: '1:20',
                duration: [20, 15, 20, 25, 35],
                times: '4 fois ou plus'
            },
            teapot: {
                temperature: [90, 100],
                quantity: '1:20',
                duration: [20, 15, 20, 25, 35],
                times: '4 fois ou plus'
            }
        }
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'Táiwān wū lóng',
                pinyin: '臺灣烏龍',
                fr: 'vert clair, vert foncé'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [90, 100],
                quantity: '1:20',
                duration: [20, 15, 20, 25, 35],
                times: '4 fois ou plus'
            },
            teapot: {
                temperature: [90, 100],
                quantity: '1:20',
                duration: [20, 15, 20, 25, 35],
                times: '4 fois ou plus'
            },
            zhong: {
                temperature: [90, 100],
                quantity: '1:20',
                duration: [20, 15, 20, 25, 35],
                times: '4 fois ou plus'
            }
        }
    },
    {
        type: 'blue',
        criteria: [
            {
                cn: 'dōng fāng měi rén chá',
                pinyin: '東方美人茶',
                fr: 'oriental beauty'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [85, 95],
                quantity: '1:20',
                duration: [25, 20, 25, 30, 40],
                times: '5 fois ou plus'
            }
        }
    },
    {
        type: 'red',
        criteria: [
            {
                cn: 'xiǎo zhǒng hóng chá',
                pinyin: '小種紅茶',
                fr: 'feuilles entières'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [85, 95],
                quantity: '1:20',
                duration: [25, 25, 30, 40],
                times: '3 ou 4 fois'
            }
        }
    },
    {
        type: 'red',
        criteria: [
            {
                cn: 'gōng fū hóng chá',
                pinyin: '工夫紅茶',
                fr: 'feuilles entières'
            }
        ],
        brew_style: {
            gaiwan: {
                temperature: [85, 95],
                quantity: '1:20',
                duration: [25, 25, 30, 40],
                times: '3 ou 4 fois'
            }
        }
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
        brew_style: {
            granpa: {
                temperature: [85],
                quantity: '1:50'
            }
        }
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
        brew_style: {
            kettle: {
                temperature: [100],
                quantity: '1:100',
                duration: [1200],
                times: '1 fois'
            }
        }
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
        brew_style: {
            kettle: {
                temperature: [100],
                quantity: '1:100',
                duration: [1200],
                method: 'bouilloire'
            }
        }
    }
]

const tea = {
    typeData: typeData,
    brewStyleData: brewStyleData,
    brewData: brewData
}

export default tea
