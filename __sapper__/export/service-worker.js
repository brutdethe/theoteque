!function(){"use strict";const s=1622131942984,a=`cache${s}`,e=["client/[slug].d3c2da35.js","client/IconTeaType.c5392bf8.js","client/client.6237652e.js","client/index.2c912c0f.js","client/index.dd9f844e.js","client/termes.98337fe9.js","client/liste-des-thes-[type].f8baa808.js","client/fiche.448a8a43.js","client/client.36016244.js"].concat(["service-worker-index.html","assets/audio/一二葉.mp3","assets/audio/一芽 一二葉.mp3","assets/audio/一芽 一葉.mp3","assets/audio/一芽 三四葉.mp3","assets/audio/一芽 三葉.mp3","assets/audio/一芽 二三葉.mp3","assets/audio/一芽 二葉.mp3","assets/audio/一芽 五六葉.mp3","assets/audio/一芽 四五葉.mp3","assets/audio/一芽一二葉.mp3","assets/audio/一芽一葉.mp3","assets/audio/一芽三四葉.mp3","assets/audio/一芽三葉.mp3","assets/audio/一芽二三葉.mp3","assets/audio/一芽二葉.mp3","assets/audio/三葉.mp3","assets/audio/中國四川.mp3","assets/audio/中國安徽.mp3","assets/audio/中國山東.mp3","assets/audio/中國廣東.mp3","assets/audio/中國廣西.mp3","assets/audio/中國江蘇.mp3","assets/audio/中國河南.mp3","assets/audio/中國浙江.mp3","assets/audio/中國湖北.mp3","assets/audio/中國湖南.mp3","assets/audio/中國福建.mp3","assets/audio/中國貴州.mp3","assets/audio/中國雲南.mp3","assets/audio/信阳毛尖.mp3","assets/audio/信陽市.mp3","assets/audio/信陽本地品種.mp3","assets/audio/公館.mp3","assets/audio/六堡茶.mp3","assets/audio/六大茶類.mp3","assets/audio/六安市大別山.mp3","assets/audio/六安瓜片.mp3","assets/audio/其他外地引進品種.mp3","assets/audio/其他拼配.mp3","assets/audio/冬季.mp3","assets/audio/凍頂烏龍.mp3","assets/audio/分類.mp3","assets/audio/勐海.mp3","assets/audio/勐腊.mp3","assets/audio/北埔.mp3","assets/audio/北港毛尖.mp3","assets/audio/南投.mp3","assets/audio/君山銀針.mp3","assets/audio/咸寧.mp3","assets/audio/品茗杯.mp3","assets/audio/單壯葉.mp3","assets/audio/單芽.mp3","assets/audio/四季春.mp3","assets/audio/國名和省.mp3","assets/audio/坦洋.mp3","assets/audio/壺承.mp3","assets/audio/壽眉.mp3","assets/audio/夏季.mp3","assets/audio/外地引進品種.mp3","assets/audio/大安.mp3","assets/audio/大紅袍.mp3","assets/audio/太平猴魁.mp3","assets/audio/奇丹.mp3","assets/audio/嫩芽.mp3","assets/audio/安化黑茶.mp3","assets/audio/安溪.mp3","assets/audio/安溪鐵觀音.mp3","assets/audio/寧鄉縣.mp3","assets/audio/小種紅茶.mp3","assets/audio/小菜茶羣體種.mp3","assets/audio/山東嶗山.mp3","assets/audio/岳西.mp3","assets/audio/岳陽.mp3","assets/audio/岳陽洞庭湖君山.mp3","assets/audio/峨眉山.mp3","assets/audio/崇陽.mp3","assets/audio/嶗山.mp3","assets/audio/工夫紅茶.mp3","assets/audio/工夫茶.mp3","assets/audio/市.mp3","assets/audio/平陽.mp3","assets/audio/平陽特皁茶.mp3","assets/audio/平陽特皂.mp3","assets/audio/平陽特色羣體品種.mp3","assets/audio/平陽黃湯.mp3","assets/audio/廣東.mp3","assets/audio/廣東大葉青.mp3","assets/audio/廣東烏龍.mp3","assets/audio/廣西.mp3","assets/audio/廣西大中葉種.mp3","assets/audio/廣西黑茶.mp3","assets/audio/建陽.mp3","assets/audio/思茅地區.mp3","assets/audio/採摘季節.mp3","assets/audio/採摘標準.mp3","assets/audio/政和.mp3","assets/audio/政和大白茶.mp3","assets/audio/文山包種.mp3","assets/audio/文山區.mp3","assets/audio/春季.mp3","assets/audio/普洱市.mp3","assets/audio/景谷大白茶.mp3","assets/audio/月光白.mp3","assets/audio/木柵.mp3","assets/audio/木柵區.mp3","assets/audio/木柵鐵觀音.mp3","assets/audio/本山.mp3","assets/audio/本山茶.mp3","assets/audio/杭州市西湖區龍井村.mp3","assets/audio/杯托.mp3","assets/audio/東方美人.mp3","assets/audio/東西山羣體種.mp3","assets/audio/松溪.mp3","assets/audio/柿大茶.mp3","assets/audio/桂青.mp3","assets/audio/桌巾.mp3","assets/audio/楮葉齊.mp3","assets/audio/歙縣.mp3","assets/audio/正山小種.mp3","assets/audio/武夷山市.mp3","assets/audio/武夷山市星村桐木關.mp3","assets/audio/武夷市.mp3","assets/audio/武夷水仙.mp3","assets/audio/武夷肉桂.mp3","assets/audio/武夷野生奇種.mp3","assets/audio/毛蟹.mp3","assets/audio/毛蟹茶.mp3","assets/audio/水方.mp3","assets/audio/泡法.mp3","assets/audio/泰順.mp3","assets/audio/浙農117.mp3","assets/audio/浙農139.mp3","assets/audio/海南.mp3","assets/audio/湄潭翠芽.mp3","assets/audio/湖北黑茶.mp3","assets/audio/湖南黑茶.mp3","assets/audio/湛江.mp3","assets/audio/溈山毛尖.mp3","assets/audio/滇紅.mp3","assets/audio/潮州市.mp3","assets/audio/炒青綠茶.mp3","assets/audio/炒青绿茶.mp3","assets/audio/烏牛早.mp3","assets/audio/烘青绿茶.mp3","assets/audio/煮水器.mp3","assets/audio/煮泡法.mp3","assets/audio/熟普洱.mp3","assets/audio/獨山小葉種.mp3","assets/audio/珠茶.mp3","assets/audio/瑞安.mp3","assets/audio/當地中小葉品種.mp3","assets/audio/當地品種.mp3","assets/audio/當地特色羣體品種.mp3","assets/audio/當地羣體種.mp3","assets/audio/白毛猴.mp3","assets/audio/白毫銀針.mp3","assets/audio/白牡丹.mp3","assets/audio/白茶.mp3","assets/audio/益陽市安化縣.mp3","assets/audio/硬枝紅心烏龍.mp3","assets/audio/碧螺春.mp3","assets/audio/祁門.mp3","assets/audio/祁門楮葉種.mp3","assets/audio/祁門種.mp3","assets/audio/祁門紅茶.mp3","assets/audio/福安.mp3","assets/audio/福安大白茶.mp3","assets/audio/福鼎.mp3","assets/audio/福鼎大毫茶.mp3","assets/audio/福鼎大白茶.mp3","assets/audio/福鼎大白茶中小葉種.mp3","assets/audio/秋季.mp3","assets/audio/竹葉青.mp3","assets/audio/紅碎茶.mp3","assets/audio/紅茶.mp3","assets/audio/綠寶石.mp3","assets/audio/綠茶.mp3","assets/audio/翠玉.mp3","assets/audio/聞香杯.mp3","assets/audio/肇慶.mp3","assets/audio/肉桂.mp3","assets/audio/臨滄.mp3","assets/audio/臨滄市.mp3","assets/audio/臨滄鳳慶.mp3","assets/audio/臺灣.mp3","assets/audio/臺灣南投.mp3","assets/audio/臺灣新竹.mp3","assets/audio/臺灣烏龍.mp3","assets/audio/臺灣臺北.mp3","assets/audio/芽茶.mp3","assets/audio/芽葉.mp3","assets/audio/苗栗.mp3","assets/audio/茶.mp3","assets/audio/茶倉茶巾.mp3","assets/audio/茶則.mp3","assets/audio/茶壺.mp3","assets/audio/茶壺泡法.mp3","assets/audio/茶夾.mp3","assets/audio/茶杯.mp3","assets/audio/茶杯泡法.mp3","assets/audio/茶樹品種.mp3","assets/audio/茶海.mp3","assets/audio/茶漏.mp3","assets/audio/茶濾.mp3","assets/audio/茶盅.mp3","assets/audio/茶盅泡法.mp3","assets/audio/茶盤.mp3","assets/audio/茶罐.mp3","assets/audio/茶船.mp3","assets/audio/茶荷.mp3","assets/audio/茶針.mp3","assets/audio/葉茶.mp3","assets/audio/蒙頂黃芽.mp3","assets/audio/蒲圻.mp3","assets/audio/蒼梧縣.mp3","assets/audio/蓋碗.mp3","assets/audio/蓋碗泡法.mp3","assets/audio/蘇州市.mp3","assets/audio/西雙版納區.mp3","assets/audio/通城.mp3","assets/audio/通山.mp3","assets/audio/遵義市.mp3","assets/audio/都勻市.mp3","assets/audio/都勻本地臺茶種.mp3","assets/audio/都勻毛尖.mp3","assets/audio/野生茶.mp3","assets/audio/金寨.mp3","assets/audio/金萱.mp3","assets/audio/金駿眉.mp3","assets/audio/鐵觀音.mp3","assets/audio/閩北烏龍.mp3","assets/audio/閩南烏龍.mp3","assets/audio/雅安蒙山.mp3","assets/audio/雲南大白茶.mp3","assets/audio/雲南大葉種.mp3","assets/audio/雲南大葉種拼配.mp3","assets/audio/雲南白茶磚.mp3","assets/audio/雲臺山大葉種.mp3","assets/audio/霍山.mp3","assets/audio/霍山金雞種.mp3","assets/audio/霍山黃大茶.mp3","assets/audio/霍山黃芽.mp3","assets/audio/青心大某.mp3","assets/audio/青心烏龍.mp3","assets/audio/青磚茶.mp3","assets/audio/青茶.mp3","assets/audio/韶關.mp3","assets/audio/頂谷大方.mp3","assets/audio/高山茶.mp3","assets/audio/鳳凰單叢.mp3","assets/audio/鳳凰水仙.mp3","assets/audio/鳳岡鋅硒茶毛茶.mp3","assets/audio/鹿谷鄉.mp3","assets/audio/黃大茶.mp3","assets/audio/黃小茶.mp3","assets/audio/黃山區.mp3","assets/audio/黃山大葉種.mp3","assets/audio/黃山市黃山區.mp3","assets/audio/黃旦.mp3","assets/audio/黃芽茶.mp3","assets/audio/黃茶.mp3","assets/audio/黃金桂.mp3","assets/audio/黄山毛峰.mp3","assets/audio/黑茶.mp3","assets/audio/齊山中葉種.mp3","assets/audio/龍井43.mp3","assets/audio/龍井茶.mp3","assets/danslajungle.png","assets/favicon.ico","assets/font/LexendDeca-Regular.ttf","assets/global.css","assets/ico-question.svg","assets/ico-top.svg","assets/icons/mountain.svg","assets/icons/temperature.svg","assets/icons/zoom-in.svg","assets/icons/冬季.svg","assets/icons/夏季.svg","assets/icons/工夫茶.svg","assets/icons/春季.svg","assets/icons/煮泡法.svg","assets/icons/秋季.svg","assets/icons/茶壺泡法.svg","assets/icons/茶杯泡法.svg","assets/icons/蓋碗泡法.svg","assets/logo.jpg","assets/media/brunissement-enzymatique-1_feuille.jpg","assets/media/brunissement-enzymatique-1_polyphenols.jpg","assets/media/chabeipaofa_chabei.jpg","assets/media/chabeipaofa_paofa.jpg","assets/media/chahupaofa.jpg","assets/media/champdethe-dancong.jpg","assets/media/cicadellidae.jpg","assets/media/debuter_cueillette.jpg","assets/media/debuter_shennong.jpg","assets/media/fenghuangshuixian.jpg","assets/media/gaiwan-paofa_jingdezhen.jpg","assets/media/infusion daancong.jpg","assets/media/infusion-dancong.jpg","assets/media/lingtoudancong.jpg","assets/media/maturation-microbienne-2_galette.jpg","assets/media/maturation-microbienne-2_microbes.jpg","assets/media/musee-guimet_livret_expo.pdf","assets/media/portrait-de-maitre.mp4","assets/media/puer-crus_bajiaoting.jpg","assets/media/puer-crus_chashan.jpg","assets/media/puer-crus_dayi.jpg","assets/media/puer-crus_fuhai.jpg","assets/media/puer-crus_lancanggucha.jpg","assets/media/puer-crus_langhe.jpg","assets/media/puer-crus_laotongzhi.jpg","assets/media/puer-crus_longsheng.jpg","assets/media/puer-crus_longyuanhao.jpg","assets/media/puer-crus_sanguantuocha.jpg","assets/media/puer-crus_zhongcha.jpg","assets/media/puer-cuits_bingcha.jpg","assets/media/puer-cuits_chahuashi.jpg","assets/media/puer-cuits_fangcha.jpg","assets/media/puer-cuits_laochatou.jpg","assets/media/puer-cuits_minitou.jpg","assets/media/puer-cuits_nidoiseau.jpg","assets/media/puer-cuits_zhuancha.jpg","assets/media/recueil-wulong_anxi-ben-shan-leaves.jpg","assets/media/recueil-wulong_anxi-ben-shan-liquor.jpg","assets/media/recueil-wulong_anxi-huang-jin-gui-leaves.jpg","assets/media/recueil-wulong_anxi-huang-jin-gui-liquor.jpg","assets/media/recueil-wulong_anxi-jin-guan-yin-leaves.jpg","assets/media/recueil-wulong_anxi-jin-guan-yin-liquor.jpg","assets/media/recueil-wulong_anxi-mao-xie-leaves.jpg","assets/media/recueil-wulong_anxi-mao-xie-liquor.jpg","assets/media/recueil-wulong_cuiyu-leaves.jpg","assets/media/recueil-wulong_cuiyu-liquor.jpg","assets/media/recueil-wulong_dark-anxi-tie-guan-yin-leaves.jpg","assets/media/recueil-wulong_dark-anxi-tie-guan-yin-liquor.jpg","assets/media/recueil-wulong_dong-fang-mei-ren-leaves.jpg","assets/media/recueil-wulong_dong-fang-mei-ren-liquor.jpg","assets/media/recueil-wulong_feng-huang-dan-cong-leaves.jpg","assets/media/recueil-wulong_feng-huang-dan-cong-liquor.jpg","assets/media/recueil-wulong_gaba-oolong-leaves.jpg","assets/media/recueil-wulong_gaba-oolong-liquor.jpg","assets/media/recueil-wulong_gaoshan-jinxuan-alishan-leaves.jpg","assets/media/recueil-wulong_gaoshan-jinxuan-alishan-liquor.jpg","assets/media/recueil-wulong_gui-fei-leaves.jpg","assets/media/recueil-wulong_gui-fei-liquor.jpg","assets/media/recueil-wulong_jin-xuan-leaves.jpg","assets/media/recueil-wulong_jin-xuan-liquor.jpg","assets/media/recueil-wulong_lan-gui-ren-leaves.jpg","assets/media/recueil-wulong_lan-gui-ren-liquor.jpg","assets/media/recueil-wulong_light-anxi-tie-guan-yin-leaves.jpg","assets/media/recueil-wulong_light-anxi-tie-guan-yin-liquor.jpg","assets/media/recueil-wulong_muzha-tie-guan-yin-leaves.jpg","assets/media/recueil-wulong_muzha-tie-guan-yin-liquor.jpg","assets/media/recueil-wulong_nantou-dong-ding-leaves.jpg","assets/media/recueil-wulong_nantou-dong-ding-liquor.jpg","assets/media/recueil-wulong_qing-xin-leaves.jpg","assets/media/recueil-wulong_qing-xin-liquor-1.jpg","assets/media/recueil-wulong_si-ji-chun-leaves.jpg","assets/media/recueil-wulong_si-ji-chun-liquor.jpg","assets/media/recueil-wulong_wenshan-baozhong-leaves.jpg","assets/media/recueil-wulong_wenshan-baozhong-liquor.jpg","assets/media/recueil-wulong_wuyi-bai-ji-guan-leaves.jpg","assets/media/recueil-wulong_wuyi-bai-ji-guan-liquor.jpg","assets/media/recueil-wulong_wuyi-da-hong-pao-leaves.jpg","assets/media/recueil-wulong_wuyi-da-hong-pao-liquor.jpg","assets/media/recueil-wulong_wuyi-rou-gui-leaves.jpg","assets/media/recueil-wulong_wuyi-rou-gui-liquor.jpg","assets/media/recueil-wulong_wuyi-shui-jin-gui-leaves.jpg","assets/media/recueil-wulong_wuyi-shui-jin-gui-liquor.jpg","assets/media/recueil-wulong_wuyi-tie-luo-han-leaves.jpg","assets/media/recueil-wulong_wuyi-tie-luo-han-liquor.jpg","assets/media/the-vert_arbuste.jpg","assets/media/the-vert_gaiwan.jpg","assets/media/the-vert_huangshanmaofeng.jpg","assets/media/the-vert_longjing.jpg","assets/media/thé-vert_滇青.jpg","assets/media/thé-vert_玉露.jpg","assets/media/thé-vert_茉莉花茶.jpg","assets/media/type-de-the.mm","assets/media/types-de-the.svg","assets/media/ustensiles_gaiwan.jpg","assets/media/宋种.jpg","assets/media/蓋碗茶法.mp4","assets/media/西施壶.jpg","assets/thes/thumbs/信阳毛尖.jpg","assets/thes/thumbs/六堡茶.jpg","assets/thes/thumbs/六堡黑茶.jpg","assets/thes/thumbs/六安瓜片.jpg","assets/thes/thumbs/凍頂烏龍.jpg","assets/thes/thumbs/北港毛尖.jpg","assets/thes/thumbs/君山銀針.jpg","assets/thes/thumbs/四季春.jpg","assets/thes/thumbs/坦洋.jpg","assets/thes/thumbs/壽眉.jpg","assets/thes/thumbs/大紅袍.jpg","assets/thes/thumbs/太平猴魁.jpg","assets/thes/thumbs/安化黑茶.jpg","assets/thes/thumbs/安溪鐵觀音.jpg","assets/thes/thumbs/山東嶗山.jpg","assets/thes/thumbs/平陽黃湯.jpg","assets/thes/thumbs/廣東大葉青.jpg","assets/thes/thumbs/文山包種.jpg","assets/thes/thumbs/月光白.jpg","assets/thes/thumbs/木柵鐵觀音.jpg","assets/thes/thumbs/本山茶.jpg","assets/thes/thumbs/東方美人.jpg","assets/thes/thumbs/正山小種.jpg","assets/thes/thumbs/武夷水仙.jpg","assets/thes/thumbs/毛蟹茶.jpg","assets/thes/thumbs/湄潭翠芽.jpg","assets/thes/thumbs/溈山毛尖.jpg","assets/thes/thumbs/滇紅.jpg","assets/thes/thumbs/熟普洱.jpg","assets/thes/thumbs/珠茶.jpg","assets/thes/thumbs/白毫銀針.jpg","assets/thes/thumbs/白牡丹.jpg","assets/thes/thumbs/碧螺春.jpg","assets/thes/thumbs/祁門紅茶.jpg","assets/thes/thumbs/竹葉青.jpg","assets/thes/thumbs/紅碎茶.jpg","assets/thes/thumbs/綠寶石.jpg","assets/thes/thumbs/肉桂.jpg","assets/thes/thumbs/蒙頂黃芽.jpg","assets/thes/thumbs/都勻毛尖.jpg","assets/thes/thumbs/金萱.jpg","assets/thes/thumbs/金駿眉.jpg","assets/thes/thumbs/雲南白茶磚.jpg","assets/thes/thumbs/霍山黃大茶.jpg","assets/thes/thumbs/霍山黃芽.jpg","assets/thes/thumbs/青磚茶.jpg","assets/thes/thumbs/頂谷大方.jpg","assets/thes/thumbs/高山茶.jpg","assets/thes/thumbs/鳳凰單叢.jpg","assets/thes/thumbs/黃金桂.jpg","assets/thes/thumbs/黄山毛峰.jpg","assets/thes/thumbs/龍井茶.jpg","assets/thes/信阳毛尖.jpg","assets/thes/六堡茶.jpg","assets/thes/六堡黑茶.jpg","assets/thes/六安瓜片.jpg","assets/thes/凍頂烏龍.jpg","assets/thes/北港毛尖.jpg","assets/thes/君山銀針.jpg","assets/thes/四季春.jpg","assets/thes/坦洋.jpg","assets/thes/壽眉.jpg","assets/thes/大紅袍.jpg","assets/thes/太平猴魁.jpg","assets/thes/安化黑茶.jpg","assets/thes/安溪鐵觀音.jpg","assets/thes/山東嶗山.jpg","assets/thes/平陽黃湯.jpg","assets/thes/廣東大葉青.jpg","assets/thes/文山包種.jpg","assets/thes/月光白.jpg","assets/thes/木柵鐵觀音.jpg","assets/thes/本山茶.jpg","assets/thes/東方美人.jpg","assets/thes/正山小種.jpg","assets/thes/武夷水仙.jpg","assets/thes/毛蟹茶.jpg","assets/thes/湄潭翠芽.jpg","assets/thes/溈山毛尖.jpg","assets/thes/滇紅.jpg","assets/thes/熟普洱.jpg","assets/thes/珠茶.jpg","assets/thes/白毫銀針.jpg","assets/thes/白牡丹.jpg","assets/thes/碧螺春.jpg","assets/thes/祁門紅茶.jpg","assets/thes/竹葉青.jpeg","assets/thes/竹葉青.jpg","assets/thes/紅碎茶.jpg","assets/thes/綠寶石.jpg","assets/thes/肉桂.jpg","assets/thes/蒙頂黃芽.jpg","assets/thes/都勻毛尖.jpg","assets/thes/金萱.jpg","assets/thes/金駿眉.jpg","assets/thes/雲南白茶磚.jpg","assets/thes/霍山黃大茶.jpg","assets/thes/霍山黃芽.jpg","assets/thes/青磚茶.jpg","assets/thes/頂谷大方.jpg","assets/thes/高山茶.jpg","assets/thes/鳳凰單叢.jpg","assets/thes/黃金桂.jpg","assets/thes/黄山毛峰.jpg","assets/thes/龍井茶.jpg","manifest.json"]),t=new Set(e);self.addEventListener("install",(s=>{s.waitUntil(caches.open(a).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)e!==a&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(a=>{if("GET"!==a.request.method||a.request.headers.has("range"))return;const e=new URL(a.request.url);e.protocol.startsWith("http")&&(e.hostname===self.location.hostname&&e.port!==self.location.port||(e.host===self.location.host&&t.has(e.pathname)?a.respondWith(caches.match(a.request)):"only-if-cached"!==a.request.cache&&a.respondWith(caches.open(`offline${s}`).then((async s=>{try{const e=await fetch(a.request);return s.put(a.request,e.clone()),e}catch(e){const t=await s.match(a.request);if(t)return t;throw e}})))))}))}();
