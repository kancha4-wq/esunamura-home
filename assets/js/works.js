const ASSET_ROOT = "0501_改修資料";

const siteCopy = {
  ja: {
    unavailable: "URL未設定",
    relatedTitle: "関連作品",
    galleryTitle: "サンプル画像ギャラリー",
    salesTitle: "販売サイト",
    tagsTitle: "この作品が好きな方向け",
    phasesTitle: "フェーズ / 空間導線",
    fallbackLanguage: "この言語の本文は準備中です。日本語本文を表示しています。"
  },
  en: {},
  ko: {},
  zhHant: {}
};

const saleLinkTemplate = [
  { label: "FANZA", url: "" },
  { label: "DLsite", url: "" },
  { label: "DiGiket", url: "" },
  { label: "pictSPACE", url: "" },
  { label: "BOOTH", url: "" },
  { label: "PromptCom", url: "" }
];

function pathFor(folder, type, filename) {
  const subdir = type === "cover" ? "1_表紙" : "2_サンプル";
  return `${ASSET_ROOT}/${folder}/${subdir}/${filename}`;
}

function makeSamples(folder, names) {
  return names.map((name) => pathFor(folder, "sample", name));
}

const works = [
  {
    id: "setouchi-omorashi",
    folder: "瀬戸内おもらし紀行",
    title: { ja: "瀬戸内おもらし紀行" },
    series: "旅情フェチ紀行",
    cover: pathFor("瀬戸内おもらし紀行", "cover", "瀬戸内560.jpg"),
    samples: makeSamples("瀬戸内おもらし紀行", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
    count: "500枚",
    format: "4フェーズ構成",
    focus: "瀬戸内情景 / 放尿 / ひかがみ / 極尻",
    summary: "瀬戸内の港町を歩く日常から、我慢、決壊、放心までを観察視点で追う主力アーカイブ作品。",
    description: {
      ja: `石段、入り組んだ坂道、海風が吹き抜ける瀬戸内の港町。

本作は、ノスタルジックな情景の中で尿意と戦い続ける少女の限界と決壊を描いた、情景重視のAI生成CG集作品です。

瀬戸内の街並みを歩く無防備な姿から、徐々に口数が減り、内股になり、限界へ追い込まれていく表情へ。耐えきれず決壊してしまう瞬間、そして全てを出し切った後の放心状態までを、全500枚で収録しています。

最大の特徴は、放尿、ひかがみ、極尻を組み合わせたフェチ描写。我慢によって張り詰める膝裏、震える脚、食い込む下着、決壊後に無防備に晒されるヒップラインなど、全編を通して下半身フェチ表現を重視しています。

男性キャラクターは登場せず、最後まで観察・覗き見視点に特化。瀬戸内の情景と少女の限界状態を組み合わせた、作品アーカイブの中心となる一作です。`,
      en: `A coastal town in Setouchi, with stone steps, narrow slopes, and sea air moving through the streets. This is one of the central archive titles, built around a quiet travel atmosphere and a gradual loss of composure.

The sequence follows four phases: ordinary walking, growing restraint, the breaking point, and the blank stillness afterward. The appeal is in the observational point of view, where the scenery and the character's changing body language slowly tighten the mood.

Knee-back lines, tense legs, close hip framing, and the feeling of being caught in a private moment are all part of the work's visual route.`
    },
    phases: ["S01 日常", "S02 我慢", "S03 決壊", "S04 放心"],
    tags: ["放尿", "おもらし", "ひかがみ", "極尻", "観察視点", "情景重視"],
    salesLinks: saleLinkTemplate,
    related: ["hokkaido-omorashi", "okinawa-soso", "hikagami", "gokujiri"]
  },
  {
    id: "eroboxin-4649",
    folder: "エロボキシン4649",
    title: { ja: "エロボキシン4649" },
    series: "エロボキシン4649",
    cover: pathFor("エロボキシン4649", "cover", "表紙.jpg"),
    samples: makeSamples("エロボキシン4649", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "300枚",
    format: "日常空間の段階進行",
    focus: "キッチン → 居間 → お風呂 → 寝室",
    summary: "日常の部屋を移動しながら、理性の揺らぎと欲求への傾きが濃くなっていくシリーズ第1作。",
    description: {
      ja: `ちょっと怪しい薬「エロボキシン4649」をきっかけに、日常空間が少しずつ別の空気へ変わっていくストーリー重視のCG集です。

舞台はキッチン、居間、お風呂、寝室へと移動します。最初は普段の生活感が残る場所から始まり、場面が進むほど照明、距離、表情、肌の熱が変化していきます。

戸惑いを残していた表情が少しずつ欲求に飲まれ、生活空間そのものが濃密な時間へ変わっていく流れが見どころです。販売ページでは短くなりがちな、場所移動とフェーズ進行をホームページ側でしっかり読めるようにしたいタイトルです。`,
      en: `A story-driven CG collection where an ordinary home slowly changes its atmosphere after the strange drug Erobokishin 4649 enters the scene.

The route moves from kitchen to living room, bath, and bedroom. Each space keeps a trace of daily life at first, then gradually shifts through lighting, distance, expression, and body heat.

The focus is not only the situation itself, but the way familiar rooms become charged with a heavier, more intimate mood.`
    },
    phases: ["キッチン", "居間", "お風呂", "寝室"],
    tags: ["ストーリー系", "理性低下", "日常空間", "長編シチュエーション", "段階進行"],
    salesLinks: saleLinkTemplate,
    related: ["eroboxin-akane", "momoiro-baito", "kinpatsu-miko"]
  },
  {
    id: "eroboxin-akane",
    folder: "エロボキシン4649 あかね",
    title: { ja: "エロボキシン4649 あかね" },
    series: "エロボキシン4649",
    cover: pathFor("エロボキシン4649 あかね", "cover", "表紙.jpg"),
    samples: makeSamples("エロボキシン4649 あかね", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
    count: "300枚",
    format: "高級リゾートホテル進行",
    focus: "ナイトプール / ラウンジ / 大浴場 / ベッドルーム",
    summary: "高級リゾート空間を移動しながら、開放感と密室感の両方で欲求に飲まれていくシリーズ第2作。",
    description: {
      ja: `高級リゾートホテルを舞台に、夜のプール、最上階ラウンジ、大浴場、ベッドルームへと場所を移しながら進行するストーリー重視の作品です。

ライトアップされたナイトプール、夜景を見下ろすラウンジ、湯気に包まれた浴場、二人きりのベッドルーム。開放感のある高級空間から密室へ近づいていくにつれ、表情と空気が少しずつ変化していきます。

水面反射、汗ばんだ肌、照明に照らされた身体の質感など、リゾート空間ならではの艶と接近感を重視。場所そのものがフェーズを作っていくタイトルです。`,
      en: `Set in a luxury resort hotel, this second Erobokishin title moves through a night pool, top-floor lounge, large bath, and private bedroom.

The spacious resort setting gradually narrows into more private rooms. Reflections on the water, night views, steam, warm lighting, and skin texture all help the atmosphere shift from open and elegant to close and enclosed.

This title is built around the feeling that each location becomes its own phase of the story.`
    },
    phases: ["ナイトプール", "最上階ラウンジ", "大浴場", "ベッドルーム"],
    tags: ["高級リゾート", "ナイトプール", "夜景", "ストーリー重視", "段階変化"],
    salesLinks: saleLinkTemplate,
    related: ["eroboxin-4649", "momoiro-baito", "okinawa-soso"]
  },
  {
    id: "shizuku-record",
    folder: "しずくの記録",
    title: { ja: "しずくの記録" },
    series: "質感フェチ",
    cover: pathFor("しずくの記録", "cover", "表紙.jpg"),
    samples: makeSamples("しずくの記録", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]),
    count: "420枚",
    format: "全6パターン × 各70枚",
    focus: "唇 / 口元 / しずく / 接写",
    summary: "唇、吐息、零れるしずくの質感を中心に、フレームあり・なし両方で楽しむ口元フェチ特化作品。",
    description: {
      ja: `唇、吐息、そして零れるしずく。唇・口元・しずくの質感に焦点を当てた、口元フェチ特化のAI生成CG集です。

濡れた唇、糸を引くしずく、近すぎる距離だからこそ見える表情。やわらかさ、温度感、湿度を意識した接写構図を中心に、全420枚で構成しています。

収録は全6パターン。彼女と零れるしずく、指先と濡れた唇、理性を溶かす濃厚キス、しずくまみれの濃密ご奉仕、背徳のディープキス、秘めやかな濃密ご奉仕。各シチュエーションにはフレームありの漫画風レイアウト版と、フレームなしの一枚絵版を収録しています。`,
      en: `A texture-focused collection centered on lips, breath, and dripping moisture. The images lean into close framing, soft expressions, and the small details that only appear at very short distance.

The work is arranged into six situation patterns, with both framed comic-style layouts and clean full-image versions. Rather than a single story route, it functions as a study of mouth, lips, wetness, and atmosphere.

The tone is intimate and tactile, with the gallery designed to be read through texture as much as subject.`
    },
    phases: ["ソロ", "指先", "対男性", "対女性", "フレームあり", "フレームなし"],
    tags: ["口元フェチ", "唇", "しずく", "接写", "漫画風レイアウト", "質感重視"],
    salesLinks: saleLinkTemplate,
    related: ["hikagami", "gokujiri", "kinpatsu-miko"]
  },
  {
    id: "hikagami",
    folder: "ひかがみ",
    title: { ja: "ひかがみ" },
    series: "ひかがみ",
    cover: pathFor("ひかがみ", "cover", "表紙.jpg"),
    samples: makeSamples("ひかがみ", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
    count: "322枚",
    format: "オムニバス",
    focus: "太もも → 膝裏 → ヒップライン",
    summary: "膝裏の窪み、太もも、ヒップラインへ視線が流れる接近感重視のフェチ特化オムニバス。",
    description: {
      ja: `「ひかがみ」とは、膝の裏側にある柔らかな窪みのこと。

本作は、これまで主役になりにくかった膝裏のライン、肌の質感、太ももからふくらはぎへ続く曲線に焦点を当てた、膝裏フェチ特化のAI生成CG集です。

夕暮れの学校、夜のお祭り、プライベートな室内など、さまざまなシチュエーションの中で日常に潜むひかがみの魅力を収録。引きの構図から接近、至近距離の肉感表現まで、太もも、膝裏、ヒップラインへ視線が流れる構成を重視しています。`,
      en: `Hikagami refers to the soft hollow behind the knee. This omnibus collection gives that small, often overlooked curve the role of the main subject.

Across school scenes, evening festival moods, and private rooms, the camera moves from wider views into low angles and close-up framing. The visual path is designed to guide the eye from thigh to knee-back line and toward the hip.

It is a fetish-focused archive title built around proximity, angle, and the quiet appeal hidden inside everyday movement.`
    },
    phases: ["引きの構図", "ローアングル", "接近", "至近距離"],
    tags: ["膝裏", "ひかがみ", "太もも", "絶対領域", "ローアングル", "オムニバス"],
    salesLinks: saleLinkTemplate,
    related: ["hikagami-school", "setouchi-omorashi", "gokujiri"]
  },
  {
    id: "hikagami-school",
    folder: "ひかがみ 登校編",
    title: { ja: "ひかがみ 登校編" },
    series: "ひかがみ",
    cover: pathFor("ひかがみ 登校編", "cover", "表紙.jpg"),
    samples: makeSamples("ひかがみ 登校編", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
    count: "300枚",
    format: "1日ルーティーン",
    focus: "起床 → 着替え → 登校 → 教室 → 放課後 → 帰宅 → 部屋",
    summary: "学校生活の動線に沿って、制服、ローアングル、膝裏フェチを一日分の流れで見せる作品。",
    description: {
      ja: `朝、制服へ着替え、学校へ向かい、授業を受け、帰宅して部屋で過ごすまで。

「ひかがみ」シリーズの世界観をベースにした、登校・学校生活・帰宅後の日常をテーマにしたAI生成CG集作品です。

制服姿の後ろ姿、階段を上る瞬間、教室での何気ない仕草、帰宅後にくつろぐ時間。少女の日常動作の中にある膝裏、太もも、ヒップライン、絶対領域などのフェチ要素を、ローアングル中心の構図で収録しています。

学校生活の導線に沿って朝から夜までシチュエーションが変化する、ルーティーン型のひかがみ作品です。`,
      en: `A routine-based Hikagami title that follows one school day from waking up and changing clothes to commuting, classroom time, after school, returning home, and resting in her room.

The appeal comes from everyday movement: a uniform seen from behind, stairs, small classroom gestures, and relaxed private moments after school. Low angles and close framing keep the focus on knee-backs, thighs, hip lines, and the rhythm of school life.

It keeps the series' fetish focus while giving it a clear daily route from morning to night.`
    },
    phases: ["起床", "着替え", "登校", "教室", "放課後", "帰宅", "部屋"],
    tags: ["制服", "学校生活", "膝裏", "生活動線", "ローアングル", "ルーティーン"],
    salesLinks: saleLinkTemplate,
    related: ["hikagami", "school-legs", "setouchi-omorashi"]
  },
  {
    id: "kinpatsu-miko",
    folder: "金髪巫女",
    title: { ja: "金髪巫女" },
    series: "催眠ストーリー",
    cover: pathFor("金髪巫女", "cover", "表紙.jpg"),
    samples: makeSamples("金髪巫女", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "300枚",
    format: "導入から放心まで",
    focus: "和装 / 肌質感 / 膝裏 / 接近感",
    summary: "清楚な巫女が催眠、理性崩壊、放心へ進む段階変化と、和装ならではの肌質感を見せる作品。",
    description: {
      ja: `揺れる五円玉に、神職のプライドは少しずつ溶かされていく。

清楚な金髪巫女が、怪しげな術によって理性を塗り替えられていく過程を描いた、ストーリー重視のAI生成CG集作品です。

導入、催眠、理性崩壊、放心へと段階的に空気が変化。薄暗い奥の院への連行、巫女服の乱れ、表情の変化までを通して、一人の少女が少しずつ崩れていく流れを収録しています。

肌の質感、膝裏の陰影、汗ばんだ肌、接近感など、和装作品ならではのフェチ感を重視しています。`,
      en: `A blonde shrine maiden is drawn into a staged progression from introduction to hypnosis, collapse of composure, and blank surrender.

The setting carries the quiet tension of shrine garments, dim inner rooms, and a ceremonial atmosphere gradually turning unstable. The focus is on the change in expression and posture as her pride and clarity slip away.

Japanese clothing, skin texture, knee-back shadows, and close distance give the title a calm but heavy visual tone.`
    },
    phases: ["導入", "催眠", "理性崩壊", "放心"],
    tags: ["催眠", "巫女", "和装", "膝裏", "肌質感", "段階変化"],
    salesLinks: saleLinkTemplate,
    related: ["momoiro-baito", "eroboxin-4649", "shizuku-record"]
  },
  {
    id: "ancient-capital-beauty",
    folder: "古都美人",
    title: { ja: "古都美人" },
    series: "和装情景",
    cover: pathFor("古都美人", "cover", "000.jpg"),
    samples: makeSamples("古都美人", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "303枚",
    format: "古都旅行 / 温泉旅館滞在 / 段階進行",
    focus: "神社 / 露天風呂 / 和室 / 晩酌",
    summary: "神社、旅館、露天風呂、夜の和室へと場面が移り、距離感や表情が少しずつ変化していく和風情景作品。",
    description: {
      ja: `古都の情景と和装美人を軸にした、しっとりした空気感の作品。

神社、旅館、露天風呂、夜の和室へと場面が移りながら、距離感や表情が少しずつ変化していく流れを描いています。

和の静けさ、酔いによる空気の変化、そして落ち着いた雰囲気の中で進むシチュエーションを重視したシリーズです。`,
      en: `A quiet Japanese-style title built around an ancient capital, traditional clothing, and the mood of a stay at an inn.

The scenes move from shrine and old-town streets to a ryokan, open-air bath, evening drinks, and a late-night room. As the locations change, the distance, expression, and air between the characters slowly shift as well.

Rather than pushing a single dramatic beat, this work leans into stillness, travel atmosphere, and the soft change brought by night and sake.`
    },
    phases: ["神社", "古都散策", "温泉旅館", "露天風呂", "晩酌", "和室", "深夜"],
    tags: ["和風美人", "旅館シチュエーション", "露天風呂", "和装", "空気感重視", "酔い進行", "段階変化", "和風フェチ"],
    salesLinks: saleLinkTemplate,
    related: ["kinpatsu-miko", "satogaeri", "hikagami"]
  },
  {
    id: "momoiro-baito",
    folder: "桃色バイト",
    title: { ja: "桃色バイト" },
    series: "催眠ストーリー",
    cover: pathFor("桃色バイト", "cover", "表紙.jpg"),
    samples: makeSamples("桃色バイト", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "300枚",
    format: "昼夜ギャップ",
    focus: "沖縄リゾートの日常 / ホテル密室",
    summary: "昼の健康的なリゾート日常と、夜のホテル密室で変化していく空気の落差を見せる作品。",
    description: {
      ja: `太陽の下で弾ける笑顔は、夜の密室で少しずつ別の表情へ変わっていく。

沖縄のリゾート地を舞台に、明るく働くピンク髪の少女が少しずつ理性を奪われていく過程を描いたストーリー重視のAI生成CG集作品です。

昼は海辺のカフェで元気に働く看板娘。夜になると舞台は静かなリゾートホテルの密室へ変わり、表情と視線が段階的に変化していきます。

健康的な日常、開放感のある南国空間、密室で崩れていく理性。昼夜ギャップを作品の核として構成しています。`,
      en: `A resort story built around contrast. By day, the setting is bright Okinawa: sun, seaside air, and a cheerful girl working in a relaxed vacation space.

At night, the scene moves into a quiet hotel room, and the mood changes step by step. Expressions, gaze, and distance become heavier as the open daytime atmosphere gives way to a closed private space.

The title is shaped around that day-to-night gap: healthy resort life on the surface, and a very different air after dark.`
    },
    phases: ["昼の沖縄", "海辺のカフェ", "夜のホテル", "密室"],
    tags: ["催眠", "南国リゾート", "昼夜ギャップ", "ストーリー重視", "段階変化"],
    salesLinks: saleLinkTemplate,
    related: ["okinawa-soso", "eroboxin-akane", "kinpatsu-miko"]
  },
  {
    id: "satogaeri",
    folder: "里帰り",
    title: { ja: "里帰り" },
    series: "夏の帰省",
    cover: pathFor("里帰り", "cover", "幼馴染_560.jpg"),
    samples: makeSamples("里帰り", ["04.jpg", "05.jpg", "06.jpg", "07.jpg"]),
    count: "227枚",
    format: "田舎の夏ストーリー",
    focus: "幼馴染 / 覗き見感 / 距離の変化",
    summary: "帰省先の田舎で、幼馴染との距離が少しずつ変わっていく夏のストーリー作品。",
    description: {
      ja: `都会を離れて帰省した、懐かしい夏の故郷。

青空、田園風景、竹林、静かな温泉、誰もいない神社。田舎の夏を舞台に、幼馴染との距離が少しずつ変わっていく姿を描いたストーリー重視のAI生成CG集作品です。

野外での無防備な姿、誰にも見られていないと思い込んだ仕草、夜の静かな温泉、実家で過ごすふたりきりの時間。爽やかな日常の空気感から、徐々に距離と視線が変わっていく流れを収録しています。

夏のノスタルジー、大自然の開放感、覗き見感を作品の導線として見せたいタイトルです。`,
      en: `A summer homecoming story set in the countryside, where familiar places and an old childhood friend slowly begin to feel different.

Blue skies, fields, bamboo groves, quiet hot springs, and empty shrines form the route of the work. The atmosphere starts with nostalgia and open rural air, then gradually shifts as distance and gaze become more personal.

The appeal is in the sense of watching a private summer memory from close by.`
    },
    phases: ["帰省", "田園", "温泉", "神社", "実家"],
    tags: ["田舎", "夏", "幼馴染", "観察視点", "距離変化", "自然背景"],
    salesLinks: saleLinkTemplate,
    related: ["setouchi-omorashi", "hokkaido-omorashi", "okinawa-soso"]
  },
  {
    id: "gokujiri",
    folder: "ごくじり",
    title: { ja: "ごくじり" },
    series: "質感フェチ",
    cover: pathFor("ごくじり", "cover", "表紙.jpg"),
    samples: makeSamples("ごくじり", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "400枚",
    format: "再編版メイン",
    focus: "密着感 / 圧迫感 / ローアングル / 肉感",
    summary: "ヒップラインと近すぎる距離に特化し、再編版として構図の流れを整理したフェチ作品。",
    description: {
      ja: `極端なまでに近い距離感。

ヒップラインと密着感に特化した、フェチ重視のAI生成CG集作品です。画面いっぱいに映るヒップ、押しつけられる肉感、近すぎる距離だからこそ生まれる圧迫感。

アングル、構図、密着感を重視し、視線を誘導するように構成しています。再編版ではシチュエーションや構図の流れを整理し、より見やすく没入感のある形で再構成しています。`,
      en: `A fetish-focused title built around close distance, pressure, and hip framing.

The images emphasize low angles, dense composition, and the sense of being almost too close to the subject. The re-edited version organizes the situations and visual flow so the collection reads more smoothly as an archive.

Its strength is direct and simple: texture, mass, proximity, and a camera route that keeps the viewer close.`
    },
    phases: ["接近", "密着", "ローアングル", "圧迫感"],
    tags: ["ヒップ特化", "密着感", "ローアングル", "肉感", "構図重視"],
    salesLinks: saleLinkTemplate,
    related: ["setouchi-omorashi", "hikagami", "shizuku-record"]
  },
  {
    id: "okinawa-soso",
    folder: "沖縄ちゅらさん粗相",
    title: { ja: "沖縄ちゅらさん粗相" },
    series: "旅情フェチ紀行",
    cover: pathFor("沖縄ちゅらさん粗相", "cover", "表紙.jpg"),
    samples: makeSamples("沖縄ちゅらさん粗相", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "100枚",
    format: "南国旅行",
    focus: "観光地 / ホテル / プールサイド / 海辺",
    summary: "沖縄の明るいリゾート空間と、少しずつ限界へ追い込まれていくフェチシチュエーションのギャップ。",
    description: {
      ja: `青い海、南国の空、リゾートホテル。

沖縄を舞台にした、南国旅行シチュエーション系AI生成CG集です。観光地、ホテル、プールサイド、海辺。開放感のあるリゾート空間の中で、少しずつ限界へ追い込まれていくシチュエーションを収録しています。

明るい景色とフェチシチュエーションのギャップを重視し、旅行中ならではの空気感で構成しています。`,
      en: `A tropical travel title set around Okinawa's blue sea, bright sky, resort hotels, and open sightseeing spaces.

The mood begins with a sunny vacation atmosphere, then gradually brings in the tension of a private accident while traveling. The contrast between the bright resort scenery and the increasingly urgent situation is the core of the work.

It is a compact travel-situation archive with a clear sense of place.`
    },
    phases: ["観光地", "ホテル", "プールサイド", "海辺"],
    tags: ["おもらし", "南国", "旅行", "我慢", "リゾート背景"],
    salesLinks: saleLinkTemplate,
    related: ["setouchi-omorashi", "hokkaido-omorashi", "momoiro-baito"]
  },
  {
    id: "hokkaido-omorashi",
    folder: "北海道おもらし紀行",
    title: { ja: "北海道おもらし紀行" },
    series: "旅情フェチ紀行",
    cover: pathFor("北海道おもらし紀行", "cover", "北海道_表紙_560.jpg"),
    samples: makeSamples("北海道おもらし紀行", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "100枚",
    format: "冬の旅行",
    focus: "雪景色 / 温泉街 / 駅 / 雪道",
    summary: "北海道の寒さと移動の緊張感を背景に、旅先の我慢シチュエーションを描く作品。",
    description: {
      ja: `雪景色、温泉街、静かな街並み。

北海道を舞台にした、おもらしシチュエーション特化のAI生成CG集です。観光地、旅館、駅、雪道。旅先ならではの空気感の中で、限界まで我慢しながら過ごすシチュエーションを収録しています。

寒さ、移動、緊張感、少しずつ追い込まれていく空気感を重視し、旅行作品らしい流れで構成しています。`,
      en: `A winter travel title set in Hokkaido, with snow, hot-spring towns, stations, inns, and cold roads shaping the mood.

The work uses the pressure of travel, weather, and movement to build a gradual sense of restraint. The scenery stays quiet, but the situation grows tighter as the route continues.

It is designed as a location-based collection where cold air and travel tension carry the atmosphere.`
    },
    phases: ["観光地", "旅館", "駅", "雪道"],
    tags: ["おもらし", "北海道", "雪景色", "旅行", "我慢", "冬背景"],
    salesLinks: saleLinkTemplate,
    related: ["setouchi-omorashi", "okinawa-soso", "satogaeri"]
  },
  {
    id: "school-legs",
    folder: "AI制服美脚_足裏と通学",
    title: { ja: "AI制服美脚_足裏と通学" },
    series: "制服美脚",
    cover: pathFor("AI制服美脚_足裏と通学", "cover", "000_cover.jpg"),
    samples: makeSamples("AI制服美脚_足裏と通学", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
    count: "110ページ",
    format: "通学アートコレクション",
    focus: "通学路 / 階段 / 教室 / 足元",
    summary: "制服姿の通学風景と、美脚・足元の表情をまとめた日常アートコレクション。",
    description: {
      ja: `制服姿の少女たちの通学風景や、やわらかな光の中で見せる美脚・足元の表情をまとめたAIイラスト集です。

朝の通学路、階段、教室、日常の一場面などを中心に、足裏や脚線美をテーマにしたアートコレクションとして構成しています。`,
      en: `An art collection centered on school-uniform silhouettes, commuting scenes, legs, feet, and soft everyday light.

The images move through morning streets, stairs, classrooms, and small daily moments. Rather than a single narrative, it works as a visual collection of school-life atmosphere and leg-focused composition.`
    },
    phases: ["朝", "通学路", "階段", "教室"],
    tags: ["制服", "美脚", "足元", "通学", "日常", "アートコレクション"],
    salesLinks: saleLinkTemplate,
    related: ["hikagami-school", "hikagami"]
  }
];

const salesByWorkId = {
  "setouchi-omorashi": {
    BOOTH: "https://esunamura.booth.pm/items/8116002",
    pictSPACE: "https://pictspace.net/items/manage_detail/837289",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745411/",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591984.html",
    PromptCom: "https://prompt-com.com/ja/p/4db875a2-a967-465c-93b8-eb28521defd4"
  },
  "eroboxin-4649": {
    BOOTH: "https://esunamura.booth.pm/items/8238754",
    pictSPACE: "https://pictspace.net/items/manage_detail/851348",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_758170/",
    PromptCom: "https://prompt-com.com/ja/p/d3d69153-c51f-41f6-8297-1a0a693c2583",
    DiGiket: "https://www.digiket.com/work/show/_data/ID=ITM0337471/AFID=esunamura/"
  },
  "eroboxin-akane": {
    BOOTH: "https://esunamura.booth.pm/items/8284888",
    pictSPACE: "https://pictspace.net/items/manage_detail/858788",
    PromptCom: "https://prompt-com.com/ja/p/cdd31e47-ba82-4793-939d-8445864efceb",
    DiGiket: "https://www.digiket.com/work/show/_data/ID=ITM0337472/AFID=esunamura/"
  },
  "shizuku-record": {
    BOOTH: "https://esunamura.booth.pm/items/8168871",
    pictSPACE: "https://pictspace.net/items/manage_detail/838092",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01604402.html",
    PromptCom: "https://prompt-com.com/ja/p/21cdb0c3-6cda-4e92-b9e7-bd1d521c2b66"
  },
  hikagami: {
    BOOTH: "https://esunamura.booth.pm/items/8111107",
    pictSPACE: "https://pictspace.net/items/manage_detail/838048",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_744243/",
    PromptCom: "https://prompt-com.com/ja/p/85fa5e0c-5d9c-41db-8c11-8c738c9b8a1b"
  },
  "hikagami-school": {
    BOOTH: "https://esunamura.booth.pm/items/8203343",
    pictSPACE: "https://pictspace.net/items/manage_detail/845880",
    PromptCom: "https://prompt-com.com/ja/p/c9fd0fb2-4bca-4ea4-a30d-c2b28948c06a"
  },
  "kinpatsu-miko": {
    BOOTH: "https://esunamura.booth.pm/items/8120906",
    pictSPACE: "https://pictspace.net/items/manage_detail/838067",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_746695/",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591986.html",
    PromptCom: "https://prompt-com.com/ja/p/4ca5f6fa-e429-4019-9d13-9738eecf2cb8"
  },
  "ancient-capital-beauty": {
    BOOTH: "https://esunamura.booth.pm/items/8111016",
    pictSPACE: "https://pictspace.net/items/manage_detail/838029",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_743522/",
    PromptCom: "https://prompt-com.com/ja/p/004afa0a-8c68-4775-a4d6-1fe78a6c35f3"
  },
  "momoiro-baito": {
    BOOTH: "https://esunamura.booth.pm/items/8139630",
    pictSPACE: "https://pictspace.net/items/manage_detail/838081",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_751890/",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01601145.html",
    PromptCom: "https://prompt-com.com/ja/p/055982d7-98e2-47ae-92c0-dbb71e117d56"
  },
  satogaeri: {
    pictSPACE: "https://pictspace.net/items/manage_detail/837195",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_741847/",
    PromptCom: "https://prompt-com.com/ja/p/3d0682b4-4e94-4ede-9943-b1a6e714af0c"
  },
  gokujiri: {
    BOOTH: "https://esunamura.booth.pm/items/8120812",
    pictSPACE: "https://pictspace.net/items/manage_detail/838060",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01605513.html",
    PromptCom: "https://prompt-com.com/ja/p/03378ed3-d986-496a-88df-e1216d212266"
  },
  "okinawa-soso": {
    BOOTH: "https://esunamura.booth.pm/items/8139646",
    pictSPACE: "https://pictspace.net/items/manage_detail/838076",
    PromptCom: "https://prompt-com.com/ja/p/f2af63ce-b2f8-4c6d-ad0b-8340319531c4"
  },
  "hokkaido-omorashi": {
    BOOTH: "https://esunamura.booth.pm/items/8120897",
    pictSPACE: "https://pictspace.net/items/manage_detail/838061",
    FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745765/",
    DLsite: "https://dlaf.jp/aix/dlaf/=/t/n/link/work/aid/esunamura/id/RJ01591976.html",
    PromptCom: "https://prompt-com.com/ja/p/2cbff6cf-bb88-4a78-8af0-cb43c5227164"
  },
  "school-legs": {
    "Kindle JP": "https://www.amazon.co.jp/dp/B0GYMZZR4S",
    "Kindle US": "https://www.amazon.com/dp/B0GYMZZR4S"
  }
};

works.forEach((work) => {
  const sales = salesByWorkId[work.id];
  if (!sales) return;
  const priority = ["FANZA", "DLsite", "DiGiket", "pictSPACE", "BOOTH", "PromptCom", "Kindle JP", "Kindle US"];
  work.salesLinks = priority
    .filter((label) => sales[label])
    .map((label) => ({ label, url: sales[label] }));
});

window.archiveData = { works, siteCopy };
