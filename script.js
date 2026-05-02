const works = [
  {
    title: { ja: "里帰り / Satogaeri", en: "Satogaeri / 里帰り" },
    slug: "satogaeri",
    image: "images/01_里帰り.jpg",
    thumbnail: "images/optimized/01_里帰り-thumb.jpg",
    imageWidth: 1750,
    imageHeight: 1225,
    links: {
      pictSPACE: "https://pictspace.net/items/manage_detail/837195",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_741847/",
      PromptCom: "https://prompt-com.com/ja/p/3d0682b4-4e94-4ede-9943-b1a6e714af0c"
    }
  },
  {
    title: { ja: "古都美人 / Ancient Capital Beauty", en: "Ancient Capital Beauty / 古都美人" },
    slug: "ancient-capital-beauty",
    image: "images/02_古都美人.jpg",
    thumbnail: "images/optimized/02_古都美人-thumb.jpg",
    imageWidth: 4096,
    imageHeight: 2872,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8111016",
      pictSPACE: "https://pictspace.net/items/manage_detail/838029",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_743522/",
      PromptCom: "https://prompt-com.com/ja/p/004afa0a-8c68-4775-a4d6-1fe78a6c35f3"
    }
  },
  {
    title: { ja: "ひかがみ / Hikagami", en: "Hikagami / ひかがみ" },
    slug: "hikagami",
    image: "images/03_ひかがみ.png",
    thumbnail: "images/optimized/03_ひかがみ-thumb.jpg",
    imageWidth: 1000,
    imageHeight: 700,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8111107",
      pictSPACE: "https://pictspace.net/items/manage_detail/838048",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_744243/",
      PromptCom: "https://prompt-com.com/ja/p/85fa5e0c-5d9c-41db-8c11-8c738c9b8a1b"
    }
  },
  {
    title: { ja: "瀬戸内おもらし紀行 / Setouchi Omorashi Journey", en: "Setouchi Omorashi Journey / 瀬戸内おもらし紀行" },
    slug: "setouchi-omorashi-journey",
    image: "images/04_瀬戸内おもらし紀行.png",
    thumbnail: "images/optimized/04_瀬戸内おもらし紀行-thumb.jpg",
    imageWidth: 1000,
    imageHeight: 700,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8116002",
      pictSPACE: "https://pictspace.net/items/manage_detail/837289",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745411/",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591984.html",
      PromptCom: "https://prompt-com.com/ja/p/4db875a2-a967-465c-93b8-eb28521defd4"
    }
  },
  {
    title: { ja: "北海道おもらし紀行 / Hokkaido Omorashi Journey", en: "Hokkaido Omorashi Journey / 北海道おもらし紀行" },
    slug: "hokkaido-omorashi-journey",
    image: "images/05_北海道おもらし紀行.jpg",
    thumbnail: "images/optimized/05_北海道おもらし紀行-thumb.jpg",
    imageWidth: 1260,
    imageHeight: 945,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120897",
      pictSPACE: "https://pictspace.net/items/manage_detail/838061",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745765/",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591976.html",
      PromptCom: "https://prompt-com.com/ja/p/2cbff6cf-bb88-4a78-8af0-cb43c5227164"
    }
  },
  {
    title: { ja: "金髪巫女 / Blonde Shrine Maiden", en: "Blonde Shrine Maiden / 金髪巫女" },
    slug: "blonde-shrine-maiden",
    image: "images/06_金髪巫女.jpg",
    thumbnail: "images/optimized/06_金髪巫女-thumb.jpg",
    imageWidth: 1375,
    imageHeight: 963,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120906",
      pictSPACE: "https://pictspace.net/items/manage_detail/838067",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_746695/",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591986.html",
      PromptCom: "https://prompt-com.com/ja/p/4ca5f6fa-e429-4019-9d13-9738eecf2cb8"
    }
  },
  {
    title: { ja: "ごくじり / Gokujiri", en: "Gokujiri / ごくじり" },
    slug: "gokujiri",
    image: "images/07_ごくじり.jpg",
    thumbnail: "images/optimized/07_ごくじり-thumb.jpg",
    imageWidth: 2048,
    imageHeight: 1536,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120812",
      pictSPACE: "https://pictspace.net/items/manage_detail/838060",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01605513.html",
      PromptCom: "https://prompt-com.com/ja/p/03378ed3-d986-496a-88df-e1216d212266"
    }
  },
  {
    title: { ja: "沖縄ちゅらさん粗相 / Okinawa Churasan Accident", en: "Okinawa Churasan Accident / 沖縄ちゅらさん粗相" },
    slug: "okinawa-churasan-accident",
    image: "images/08_沖縄ちゅらさん粗相.jpg",
    thumbnail: "images/optimized/08_沖縄ちゅらさん粗相-thumb.jpg",
    imageWidth: 2867,
    imageHeight: 2867,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8139646",
      pictSPACE: "https://pictspace.net/items/manage_detail/838076",
      PromptCom: "https://prompt-com.com/ja/p/f2af63ce-b2f8-4c6d-ad0b-8340319531c4"
    }
  },
  {
    title: { ja: "桃色バイト / Pink Part-Time Job", en: "Pink Part-Time Job / 桃色バイト" },
    slug: "pink-part-time-job",
    image: "images/09_桃色バイト.jpg",
    thumbnail: "images/optimized/09_桃色バイト-thumb.jpg",
    imageWidth: 1750,
    imageHeight: 1225,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8139630",
      pictSPACE: "https://pictspace.net/items/manage_detail/838081",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_751890/",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01601145.html",
      PromptCom: "https://prompt-com.com/ja/p/055982d7-98e2-47ae-92c0-dbb71e117d56"
    }
  },
  {
    title: { ja: "しずくの記録 / Shizuku no Kiroku", en: "Shizuku no Kiroku / しずくの記録" },
    slug: "shizuku-no-kiroku",
    image: "images/10_しずくの記録.jpg",
    thumbnail: "images/optimized/10_しずくの記録-thumb.jpg",
    imageWidth: 1000,
    imageHeight: 700,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8168871",
      pictSPACE: "https://pictspace.net/items/manage_detail/838092",
      DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01604402.html",
      PromptCom: "https://prompt-com.com/ja/p/21cdb0c3-6cda-4e92-b9e7-bd1d521c2b66"
    }
  },
  {
    title: { ja: "ひかがみ 登校編 / Hikagami School Route", en: "Hikagami School Route / ひかがみ 登校編" },
    slug: "hikagami-school-route",
    image: "0501_改修資料/ひかがみ 登校編/1_表紙/表紙.jpg",
    thumbnail: "0501_改修資料/ひかがみ 登校編/1_表紙/表紙.jpg",
    imageWidth: 560,
    imageHeight: 800,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8203343",
      pictSPACE: "https://pictspace.net/items/manage_detail/845880",
      PromptCom: "https://prompt-com.com/ja/p/c9fd0fb2-4bca-4ea4-a30d-c2b28948c06a"
    }
  },
  {
    title: { ja: "エロボキシン4649 / Erobokishin 4649", en: "Erobokishin 4649 / エロボキシン4649" },
    slug: "erobokishin-4649",
    image: "images/11_エロボキシン4649.jpg",
    thumbnail: "images/optimized/11_エロボキシン4649-thumb.jpg",
    imageWidth: 1260,
    imageHeight: 945,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8238754",
      pictSPACE: "https://pictspace.net/items/manage_detail/851348",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_758170/",
      PromptCom: "https://prompt-com.com/ja/p/d3d69153-c51f-41f6-8297-1a0a693c2583",
      DiGiket: "https://www.digiket.com/work/show/_data/ID=ITM0337471/AFID=esunamura/"
    }
  },
  {
    title: {
      ja: "AI制服・美脚イラスト集: 足裏と通学のアートコレクション",
      en: "AI Seifuku Bikyaku Illustration Collection: Sole and School Commute Art Collection"
    },
    slug: "kindle-seifuku-bikyaku",
    image: "images/12_kindle_seifuku_bikyaku.jpg",
    thumbnail: "images/optimized/12_kindle_seifuku_bikyaku-thumb.jpg",
    imageWidth: 2048,
    imageHeight: 3512,
    note: {
      ja: "Amazon Kindle版",
      en: "Amazon Kindle edition"
    },
    links: {
      "Kindle JP": "https://www.amazon.co.jp/dp/B0GYMZZR4S",
      "Kindle US": "https://www.amazon.com/dp/B0GYMZZR4S"
    }
  },
  {
    title: { ja: "エロボキシン4649 あかね / Erobokishin 4649 Akane", en: "Erobokishin 4649 Akane / エロボキシン4649 あかね" },
    slug: "erobokishin-4649-akane",
    image: "images/13_エロボキシン4649_あかね.jpg",
    thumbnail: "images/optimized/13_エロボキシン4649_あかね-thumb.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8284888",
      pictSPACE: "https://pictspace.net/items/manage_detail/858788",
      PromptCom: "https://prompt-com.com/ja/p/cdd31e47-ba82-4793-939d-8445864efceb",
      DiGiket: "https://www.digiket.com/work/show/_data/ID=ITM0337472/AFID=esunamura/"
    }
  }
];

let currentLanguage = "ja";
const ageGateStorageKey = "esunamuraAgeGateAccepted";
const ageGateLeaveUrl = "https://www.google.com/";

const worksGrid = document.querySelector("#worksGrid");
const pickupGrid = document.querySelector("#pickupGrid");
const languageButtons = document.querySelectorAll(".lang-button");
const translatableNodes = document.querySelectorAll("[data-ja]");
const ageGateEnter = document.querySelector(".age-gate-enter");
const ageGateLeave = document.querySelector(".age-gate-leave");
const readingTabs = document.querySelectorAll("[data-reading-tab]");
const readingPanels = document.querySelectorAll("[data-reading-panel]");
const pixivTabs = document.querySelectorAll("[data-pixiv-tab]");
const pixivPanels = document.querySelectorAll("[data-pixiv-panel]");
const promptcomTabs = document.querySelectorAll("[data-promptcom-tab]");
const promptcomPanels = document.querySelectorAll("[data-promptcom-panel]");

const workDescriptions = {
  "satogaeri": {
    ja: "田舎の夏、幼馴染、覗き見感。帰省先で距離が少しずつ変わっていく流れを描く作品。",
    en: "A countryside summer story where distance with a childhood friend gradually changes.",
    zh: "乡下夏日、青梅竹马与窥视感。描绘归乡后距离逐渐变化的作品。",
    ko: "시골의 여름, 소꿉친구, 엿보는 듯한 시선. 귀향지에서 거리가 조금씩 변해가는 작품."
  },
  "ancient-capital-beauty": {
    ja: "古都の情景と和装美人を軸にした、しっとりした空気感の作品。",
    en: "A calm, atmospheric work built around ancient-city scenery and kimono beauty.",
    zh: "以古都景色与和装美人为核心，氛围沉静柔和的作品。",
    ko: "고도 풍경과 와복 미인을 중심으로 한 차분한 분위기의 작품."
  },
  "hikagami": {
    ja: "太ももから膝裏、ヒップラインへ視線が流れる、ひかがみフェチ特化のオムニバス。",
    en: "A hikagami-focused omnibus built around thighs, knee backs, and hip-line flow.",
    zh: "视线从大腿、膝后到臀线流动的膝后主题合集。",
    ko: "허벅지에서 오금, 힙라인으로 시선이 흐르는 오금 페티시 옴니버스."
  },
  "setouchi-omorashi-journey": {
    ja: "瀬戸内の坂道と港町を歩きながら、日常、我慢、決壊、放心へ進む主力アーカイブ作品。",
    en: "A Setouchi archive work moving from daily scenes to restraint, release, and afterglow.",
    zh: "在濑户内坡道与港町中，从日常、忍耐到崩溃与余韵的主力档案作品。",
    ko: "세토우치의 언덕길과 항구 마을을 배경으로 일상, 참음, 무너짐, 여운으로 이어지는 대표 아카이브 작품."
  },
  "hokkaido-omorashi-journey": {
    ja: "雪景色、温泉街、駅、雪道。冬の旅先で限界へ近づいていく旅行シチュエーション。",
    en: "A winter travel scenario through snow, inns, stations, and growing tension.",
    zh: "雪景、温泉街、车站与雪路。冬季旅途中逐渐逼近极限的情境作品。",
    ko: "설경, 온천 마을, 역, 눈길. 겨울 여행지에서 한계에 가까워지는 여행 시추에이션."
  },
  "blonde-shrine-maiden": {
    ja: "導入、催眠、理性崩壊、放心へ。和装と肌質感を重視した段階進行の作品。",
    en: "A phased shrine-maiden story moving through induction, hypnosis, collapse, and afterglow.",
    zh: "从导入、催眠到理性崩坏与失神。重视和装与肌肤质感的阶段式作品。",
    ko: "도입, 최면, 이성 붕괴, 멍한 여운으로 이어지는 와복과 피부 질감 중심의 단계 진행 작품."
  },
  "gokujiri": {
    ja: "密着感、圧迫感、ローアングル。ヒップラインと肉感を中心に再構成した特化作品。",
    en: "A close-contact hip-focused work emphasizing pressure, low angles, and physical texture.",
    zh: "强调贴近感、压迫感与低角度，以臀线和肉感为中心的特化作品。",
    ko: "밀착감, 압박감, 로우앵글. 힙라인과 육감을 중심으로 재구성한 특화 작품."
  },
  "okinawa-churasan-accident": {
    ja: "南国リゾートの明るい空気と、少しずつ限界へ追い込まれるギャップを描く作品。",
    en: "A tropical resort work built around bright scenery and rising tension.",
    zh: "描绘南国度假氛围与逐渐被逼近极限之间反差的作品。",
    ko: "남국 리조트의 밝은 분위기와 조금씩 한계로 몰리는 대비를 그린 작품."
  },
  "pink-part-time-job": {
    ja: "昼は沖縄リゾートの日常、夜はホテル密室。昼夜の空気差が核になるストーリー。",
    en: "A day-and-night resort story moving from bright work scenes to a closed hotel room.",
    zh: "白天是冲绳度假日常，夜晚转入酒店密室。昼夜气氛差是核心。",
    ko: "낮에는 오키나와 리조트의 일상, 밤에는 호텔 밀실. 낮과 밤의 공기 차이가 핵심인 이야기."
  },
  "shizuku-no-kiroku": {
    ja: "唇、吐息、零れるしずく。湿度と接写構図を重視した口元フェチ作品。",
    en: "A mouth-detail work focused on lips, breath, droplets, humidity, and close framing.",
    zh: "唇、吐息与滴落的水珠。重视湿度和近距离构图的口元主题作品。",
    ko: "입술, 숨결, 떨어지는 물방울. 습도와 클로즈업 구도를 중시한 입가 페티시 작품."
  },
  "hikagami-school-route": {
    ja: "起床、着替え、登校、教室、放課後、帰宅、部屋。学校生活の1日ルーティーン作品。",
    en: "A school-life routine from waking up to changing, commuting, class, after school, and home.",
    zh: "从起床、换衣、上学、教室到放学、回家与房间。学校生活的一日动线作品。",
    ko: "기상, 갈아입기, 등교, 교실, 방과 후, 귀가, 방까지 이어지는 학교생활 하루 루틴 작품."
  },
  "erobokishin-4649": {
    ja: "キッチン、居間、お風呂、寝室へ。日常空間が徐々に濃密な時間へ変わっていく作品。",
    en: "A domestic story moving through kitchen, living room, bath, and bedroom.",
    zh: "从厨房、客厅、浴室到卧室。日常空间逐渐变得浓密的作品。",
    ko: "주방, 거실, 욕실, 침실로 이어지며 일상 공간이 점점 짙은 시간으로 바뀌는 작품."
  },
  "kindle-seifuku-bikyaku": {
    ja: "通学路、階段、教室。制服姿と美脚・足元の表情をまとめたアートコレクション。",
    en: "A school-uniform leg and foot art collection across commutes, stairs, and classrooms.",
    zh: "通学路、楼梯、教室。收录制服、美腿与足部表情的艺术合集。",
    ko: "통학로, 계단, 교실. 교복 차림과 미각, 발 주변의 분위기를 모은 아트 컬렉션."
  },
  "erobokishin-4649-akane": {
    ja: "ナイトプール、最上階ラウンジ、大浴場、ベッドルーム。高級リゾート空間を移動する作品。",
    en: "A luxury resort-hotel story moving through night pool, lounge, bathhouse, and bedroom.",
    zh: "夜间泳池、顶层酒廊、大浴场、卧室。穿梭于高级度假酒店空间的作品。",
    ko: "나이트풀, 최상층 라운지, 대욕장, 침실. 고급 리조트 공간을 이동하는 작품."
  }
};

const workTitleTranslations = {
  "satogaeri": { zh: "返乡 / Satogaeri", ko: "귀향 / Satogaeri" },
  "ancient-capital-beauty": { zh: "古都美人 / Ancient Capital Beauty", ko: "고도미인 / Ancient Capital Beauty" },
  "hikagami": { zh: "膝后 / Hikagami", ko: "오금 / Hikagami" },
  "setouchi-omorashi-journey": { zh: "濑户内失禁纪行 / Setouchi Omorashi Journey", ko: "세토우치 오모라시 기행 / Setouchi Omorashi Journey" },
  "hokkaido-omorashi-journey": { zh: "北海道失禁纪行 / Hokkaido Omorashi Journey", ko: "홋카이도 오모라시 기행 / Hokkaido Omorashi Journey" },
  "blonde-shrine-maiden": { zh: "金发巫女 / Blonde Shrine Maiden", ko: "금발 무녀 / Blonde Shrine Maiden" },
  "gokujiri": { zh: "极臀 / Gokujiri", ko: "고쿠지리 / Gokujiri" },
  "okinawa-churasan-accident": { zh: "冲绳美少女失误 / Okinawa Churasan Accident", ko: "오키나와 추라상 사고 / Okinawa Churasan Accident" },
  "pink-part-time-job": { zh: "桃色打工 / Pink Part-Time Job", ko: "분홍빛 아르바이트 / Pink Part-Time Job" },
  "shizuku-no-kiroku": { zh: "水滴记录 / Shizuku no Kiroku", ko: "물방울의 기록 / Shizuku no Kiroku" },
  "hikagami-school-route": { zh: "膝后 登校篇 / Hikagami School Route", ko: "오금 등교편 / Hikagami School Route" },
  "erobokishin-4649": { zh: "Erobokishin 4649", ko: "에로복신 4649" },
  "kindle-seifuku-bikyaku": { zh: "AI制服美腿插画集", ko: "AI 교복 미각 일러스트집" },
  "erobokishin-4649-akane": { zh: "Erobokishin 4649 Akane", ko: "에로복신 4649 아카네" }
};

const workArchiveMeta = {
  "satogaeri": {
    count: { ja: "227枚収録", en: "227 images", zh: "收录227张", ko: "227장 수록" },
    quality: "4K",
    series: { ja: "夏の帰省", en: "Summer Homecoming", zh: "夏日返乡", ko: "여름 귀향" },
    tags: { ja: ["幼馴染", "覗き見感"], en: ["Childhood friend", "Observed mood"], zh: ["青梅竹马", "窥视感"], ko: ["소꿉친구", "엿보는 시선"] }
  },
  "ancient-capital-beauty": {
    count: { ja: "303枚収録", en: "303 images", zh: "收录303张", ko: "303장 수록" },
    quality: "4K",
    series: { ja: "和装情景", en: "Kimono Scenery", zh: "和装情景", ko: "와복 정경" },
    tags: { ja: ["古都", "旅館"], en: ["Old capital", "Ryokan"], zh: ["古都", "旅馆"], ko: ["고도", "료칸"] }
  },
  "hikagami": {
    count: { ja: "322枚収録", en: "322 images", zh: "收录322张", ko: "322장 수록" },
    quality: "4K",
    series: { ja: "ひかがみ", en: "Hikagami", zh: "膝后", ko: "오금" },
    tags: { ja: ["膝裏", "ローアングル"], en: ["Knee backs", "Low angle"], zh: ["膝后", "低角度"], ko: ["오금", "로우앵글"] }
  },
  "setouchi-omorashi-journey": {
    count: { ja: "500枚収録", en: "500 images", zh: "收录500张", ko: "500장 수록" },
    quality: "4K",
    series: { ja: "旅情フェチ紀行", en: "Travel Fetish Archive", zh: "旅情主题纪行", ko: "여행 정취 페티시" },
    tags: { ja: ["瀬戸内", "観察視点"], en: ["Setouchi", "Observer view"], zh: ["濑户内", "观察视点"], ko: ["세토우치", "관찰 시점"] }
  },
  "hokkaido-omorashi-journey": {
    count: { ja: "100枚収録", en: "100 images", zh: "收录100张", ko: "100장 수록" },
    quality: "4K",
    series: { ja: "旅情フェチ紀行", en: "Travel Fetish Archive", zh: "旅情主题纪行", ko: "여행 정취 페티시" },
    tags: { ja: ["北海道", "冬背景"], en: ["Hokkaido", "Winter"], zh: ["北海道", "冬季背景"], ko: ["홋카이도", "겨울 배경"] }
  },
  "blonde-shrine-maiden": {
    count: { ja: "300枚収録", en: "300 images", zh: "收录300张", ko: "300장 수록" },
    quality: "4K",
    series: { ja: "催眠ストーリー", en: "Hypnosis Story", zh: "催眠故事", ko: "최면 스토리" },
    tags: { ja: ["和装", "段階進行"], en: ["Shrine attire", "Phased flow"], zh: ["和装", "阶段推进"], ko: ["와복", "단계 진행"] }
  },
  "gokujiri": {
    count: { ja: "400枚収録", en: "400 images", zh: "收录400张", ko: "400장 수록" },
    quality: "4K",
    series: { ja: "質感フェチ", en: "Texture Fetish", zh: "质感主题", ko: "질감 페티시" },
    tags: { ja: ["ヒップ特化", "密着感"], en: ["Hip focus", "Close contact"], zh: ["臀部特化", "贴近感"], ko: ["힙 특화", "밀착감"] }
  },
  "okinawa-churasan-accident": {
    count: { ja: "100枚収録", en: "100 images", zh: "收录100张", ko: "100장 수록" },
    quality: "4K",
    series: { ja: "旅情フェチ紀行", en: "Travel Fetish Archive", zh: "旅情主题纪行", ko: "여행 정취 페티시" },
    tags: { ja: ["南国", "リゾート"], en: ["Tropical", "Resort"], zh: ["南国", "度假"], ko: ["남국", "리조트"] }
  },
  "pink-part-time-job": {
    count: { ja: "300枚収録", en: "300 images", zh: "收录300张", ko: "300장 수록" },
    quality: "4K",
    series: { ja: "催眠ストーリー", en: "Hypnosis Story", zh: "催眠故事", ko: "최면 스토리" },
    tags: { ja: ["昼夜ギャップ", "南国"], en: ["Day / night gap", "Tropical"], zh: ["昼夜反差", "南国"], ko: ["낮밤 대비", "남국"] }
  },
  "shizuku-no-kiroku": {
    count: { ja: "420枚収録", en: "420 images", zh: "收录420张", ko: "420장 수록" },
    quality: "4K",
    series: { ja: "質感フェチ", en: "Texture Fetish", zh: "质感主题", ko: "질감 페티시" },
    tags: { ja: ["口元", "しずく"], en: ["Mouth detail", "Droplets"], zh: ["口元", "水滴"], ko: ["입가", "물방울"] }
  },
  "hikagami-school-route": {
    count: { ja: "300枚収録", en: "300 images", zh: "收录300张", ko: "300장 수록" },
    quality: "4K",
    series: { ja: "ひかがみ", en: "Hikagami", zh: "膝后", ko: "오금" },
    tags: { ja: ["制服", "生活動線"], en: ["School uniform", "Daily route"], zh: ["制服", "生活动线"], ko: ["교복", "생활 동선"] }
  },
  "erobokishin-4649": {
    count: { ja: "300枚収録", en: "300 images", zh: "收录300张", ko: "300장 수록" },
    quality: "4K",
    series: { ja: "エロボキシン4649", en: "Erobokishin Series", zh: "Erobokishin系列", ko: "에로복신 시리즈" },
    tags: { ja: ["日常空間", "段階進行"], en: ["Domestic rooms", "Phased flow"], zh: ["日常空间", "阶段推进"], ko: ["일상 공간", "단계 진행"] }
  },
  "kindle-seifuku-bikyaku": {
    count: { ja: "110ページ", en: "110 pages", zh: "110页", ko: "110페이지" },
    quality: "ART",
    series: { ja: "制服美脚", en: "Uniform Leg Art", zh: "制服美腿", ko: "교복 미각" },
    tags: { ja: ["通学", "足元"], en: ["Commute", "Feet"], zh: ["通学", "足部"], ko: ["통학", "발 주변"] }
  },
  "erobokishin-4649-akane": {
    count: { ja: "300枚収録", en: "300 images", zh: "收录300张", ko: "300장 수록" },
    quality: "4K",
    series: { ja: "エロボキシン4649", en: "Erobokishin Series", zh: "Erobokishin系列", ko: "에로복신 시리즈" },
    tags: { ja: ["高級リゾート", "夜景"], en: ["Luxury resort", "Night view"], zh: ["高级度假", "夜景"], ko: ["고급 리조트", "야경"] }
  }
};

const pickupSlugs = ["erobokishin-4649", "blonde-shrine-maiden", "setouchi-omorashi-journey"];

const detailPageBySlug = {
  "satogaeri": "satogaeri",
  "hikagami": "hikagami",
  "setouchi-omorashi-journey": "setouchi-omorashi",
  "hokkaido-omorashi-journey": "hokkaido-omorashi",
  "blonde-shrine-maiden": "kinpatsu-miko",
  "gokujiri": "gokujiri",
  "okinawa-churasan-accident": "okinawa-soso",
  "pink-part-time-job": "momoiro-baito",
  "shizuku-no-kiroku": "shizuku-record",
  "hikagami-school-route": "hikagami-school",
  "erobokishin-4649": "eroboxin-4649",
  "kindle-seifuku-bikyaku": "school-legs",
  "erobokishin-4649-akane": "eroboxin-akane"
};

function detailHref(work) {
  const id = detailPageBySlug[work.slug] || work.slug;
  return `titles/${encodeURIComponent(id)}.html`;
}

function workDescription(work) {
  return workDescriptions[work.slug]?.[currentLanguage] || workDescriptions[work.slug]?.ja || "";
}

function workTitle(work) {
  return workTitleTranslations[work.slug]?.[currentLanguage] || work.title[currentLanguage] || work.title.en || work.title.ja;
}

function localizedMetaValue(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null) {
    return value[currentLanguage] || value.ja || value.en || "";
  }
  return value || "";
}

function archiveBadgesFor(work) {
  const meta = workArchiveMeta[work.slug];
  if (!meta) return [];
  const contentBadges = [
    { label: localizedMetaValue(meta.count), type: "primary" },
    { label: localizedMetaValue(meta.series), type: "genre" },
    ...localizedMetaValue(meta.tags).map((label) => ({ label, type: "genre" }))
  ].filter((badge) => badge.label);
  const formatBadges = salesFormatBadgesFor(work).map((label) => ({ label, type: "format" }));
  return [...contentBadges, ...formatBadges].slice(0, 7);
}

function salesFormatBadgesFor(work) {
  const labelJoin = currentLanguage === "ja" ? "：" : ": ";
  const formats = {
    FANZA: "4K ZIP",
    DLsite: "4K ZIP",
    BOOTH: "ZIP + PDF",
    pictSPACE: "ZIP + PDF",
    DiGiket: "4K ZIP + PDF",
    "Kindle JP": "Kindle",
    "Kindle US": "Kindle"
  };
  return Object.keys(formats)
    .filter((store) => work.links?.[store])
    .map((store) => `${store}${labelJoin}${formats[store]}`);
}

function createArchiveBadges(work, compact = false) {
  const badges = document.createElement("div");
  badges.className = compact ? "archive-badges compact" : "archive-badges";
  archiveBadgesFor(work).forEach((item) => {
    const badge = document.createElement("span");
    badge.className = `archive-badge ${item.type}`;
    badge.textContent = item.label;
    badges.append(badge);
  });
  return badges;
}

function detailButtonText(full = false) {
  const labels = {
    ja: full ? "作品詳細を見る" : "作品詳細を見る",
    en: full ? "View work details" : "View details",
    zh: "查看详情",
    ko: "상세 보기"
  };
  return labels[currentLanguage] || labels.ja;
}

function setAgeGateState(accepted) {
  document.body.classList.toggle("age-verified", accepted);
  document.body.classList.toggle("age-gate-active", !accepted);
  document.body.classList.remove("age-gate-pending");
}

function hasAcceptedAgeGate() {
  try {
    return window.localStorage.getItem(ageGateStorageKey) === "yes";
  } catch (error) {
    return false;
  }
}

function acceptAgeGate() {
  try {
    window.localStorage.setItem(ageGateStorageKey, "yes");
  } catch (error) {
    // Continue even when storage is blocked so the current visit can proceed.
  }

  setAgeGateState(true);
}

function leaveAgeGate() {
  window.location.href = ageGateLeaveUrl;
}

function setReadingTab(activeTab) {
  readingTabs.forEach((tab) => {
    const isActive = tab.dataset.readingTab === activeTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  readingPanels.forEach((panel) => {
    panel.hidden = panel.dataset.readingPanel !== activeTab;
  });
}

function setPixivTab(activeTab) {
  pixivTabs.forEach((tab) => {
    const isActive = tab.dataset.pixivTab === activeTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  pixivPanels.forEach((panel) => {
    panel.hidden = panel.dataset.pixivPanel !== activeTab;
  });
}

function setPromptcomTab(activeTab) {
  promptcomTabs.forEach((tab) => {
    const isActive = tab.dataset.promptcomTab === activeTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  promptcomPanels.forEach((panel) => {
    panel.hidden = panel.dataset.promptcomPanel !== activeTab;
  });
}

function analyticsKey(label) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function normalizeDestination(label) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function individualClickEventName(link) {
  const href = link.href;
  const hostname = new URL(href).hostname;

  if (hostname.includes("dlsite.com") || hostname === "dlaf.jp") {
    return "click_dlsite";
  }

  if (hostname.includes("dmm.co.jp")) {
    return "click_fanza";
  }

  if (hostname.includes("booth.pm")) {
    return "click_booth";
  }

  if (hostname.includes("pictspace.net")) {
    return "click_pictspace";
  }

  if (hostname.includes("digiket.com")) {
    return "click_digiket";
  }

  if (hostname.includes("prompt-com.com")) {
    return "click_promptcom";
  }

  if (hostname.includes("pixiv.net")) {
    return "click_pixiv";
  }

  if (hostname.includes("amazon.co.jp") || hostname.includes("amazon.com")) {
    return "click_kindle";
  }

  return "";
}

function sendOutboundClick(link) {
  if (typeof window.gtag !== "function") {
    return;
  }

  const destination = link.dataset.analyticsLink || normalizeDestination(link.textContent);
  const area = link.dataset.analyticsArea || "unknown";
  const work = link.dataset.analyticsWork || "";
  const readableUrl = `${destination}:${link.href}`;
  const params = {
    link_url: readableUrl,
    link_domain: new URL(link.href).hostname,
    link_text: link.textContent.trim(),
    link_destination: destination,
    link_area: area,
    work_slug: work,
    outbound: true,
    transport_type: "beacon",
  };

  window.gtag("event", "click", params);

  const eventName = individualClickEventName(link);
  if (eventName) {
    window.gtag("event", eventName, params);
  }
}

function createLink(label, url, workSlug) {
  const link = document.createElement("a");

  link.className = "link-button";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.dataset.analyticsLink = analyticsKey(label);
  link.dataset.analyticsArea = "works";
  link.dataset.analyticsWork = workSlug;
  link.textContent = label;
  return link;
}

function salesNoteText(work) {
  const zipStores = ["BOOTH", "pictSPACE"].filter((store) => work.links[store]);
  const highResStores = ["FANZA", "DLsite"].filter((store) => work.links[store]);
  const hasDigiket = Boolean(work.links.DiGiket);
  const parts = [];

  if (work.note) {
    parts.push(work.note[currentLanguage]);
  }

  if (zipStores.length > 0) {
    parts.push(
      currentLanguage === "ja"
        ? `${zipStores.join(" / ")}: ZIP + PDF`
        : `${zipStores.join(" / ")}: ZIP + PDF editions`
    );
  }

  if (highResStores.length > 0) {
    parts.push(
      currentLanguage === "ja"
        ? `${highResStores.join(" / ")}: 高解像度4K`
        : `${highResStores.join(" / ")}: 4K versions`
    );
  }

  if (hasDigiket) {
    parts.push(
      currentLanguage === "ja"
        ? "DiGiket: ZIP + PDF（4K対応）"
        : "DiGiket: ZIP + PDF (4K supported)"
    );
  }

  return parts.join("\n");
}

function renderPickups() {
  if (!pickupGrid) return;
  pickupGrid.textContent = "";

  pickupSlugs
    .map((slug) => works.find((work) => work.slug === slug))
    .filter(Boolean)
    .forEach((work) => {
      const card = document.createElement("article");
      card.className = "pickup-card";

      const imageFrame = document.createElement("a");
      imageFrame.className = "card-image-frame";
      imageFrame.href = detailHref(work);
      imageFrame.setAttribute("aria-label", `${workTitle(work)} ${detailButtonText(true)}`);

      const image = document.createElement("img");
      image.src = work.thumbnail || work.image;
      image.alt = work.title.ja;
      image.width = work.imageWidth;
      image.height = work.imageHeight;
      image.loading = "lazy";
      image.decoding = "async";
      imageFrame.append(image, createArchiveBadges(work, true));

      const copy = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = workTitle(work);

      const text = document.createElement("p");
      text.textContent = workDescription(work);

      const link = document.createElement("a");
      link.className = "link-button primary";
      link.href = detailHref(work);
      link.textContent = detailButtonText(true);

      copy.append(title, text, link);
      card.append(imageFrame, copy);
      pickupGrid.append(card);
    });
}

function renderWorks() {
  worksGrid.textContent = "";

  works.slice().reverse().forEach((work) => {
    const card = document.createElement("article");
    card.className = "work-card";

    const imageFrame = document.createElement("a");
    imageFrame.className = "card-image-frame";
    imageFrame.href = detailHref(work);
    imageFrame.setAttribute("aria-label", `${workTitle(work)} ${detailButtonText(true)}`);

    const image = document.createElement("img");
    image.src = work.thumbnail || work.image;
    image.alt = work.title.ja;
    image.width = work.imageWidth;
    image.height = work.imageHeight;
    image.loading = "lazy";
    image.decoding = "async";
    imageFrame.append(image, createArchiveBadges(work));

    const copy = document.createElement("div");
    copy.className = "work-copy";

    const title = document.createElement("h3");
    title.textContent = workTitle(work);

    const note = document.createElement("p");
    note.className = "work-note";
    note.textContent = workDescription(work) || salesNoteText(work);

    const links = document.createElement("div");
    links.className = "work-links";

    const detailLink = document.createElement("a");
    detailLink.className = "link-button primary";
    detailLink.href = detailHref(work);
    detailLink.textContent = detailButtonText();
    links.append(detailLink);

    copy.append(title, note, links);
    card.append(imageFrame, copy);
    worksGrid.append(card);
  });
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  try {
    window.localStorage.setItem("archiveLang", language);
  } catch (error) {
    // Language switching still works for the current page when storage is blocked.
  }

  translatableNodes.forEach((node) => {
    node.textContent = node.dataset[language] || node.dataset.ja;
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });

  renderWorks();
  renderPickups();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

readingTabs.forEach((tab) => {
  tab.addEventListener("click", () => setReadingTab(tab.dataset.readingTab));
});

pixivTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPixivTab(tab.dataset.pixivTab));
});

promptcomTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPromptcomTab(tab.dataset.promptcomTab));
});

setLanguage(window.localStorage?.getItem("archiveLang") || "ja");
setReadingTab("pixiv");
setPixivTab("recommended");
setPromptcomTab("free");
setAgeGateState(hasAcceptedAgeGate() || location.hostname === "127.0.0.1" || location.hostname === "localhost");

ageGateEnter?.addEventListener("click", acceptAgeGate);
ageGateLeave?.addEventListener("click", leaveAgeGate);

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-analytics-link]");
  if (!link) {
    return;
  }

  sendOutboundClick(link);
});

