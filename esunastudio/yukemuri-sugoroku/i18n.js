(() => {
  'use strict';

  const languages = ['ja', 'en', 'zh', 'ko'];
  const languageIndex = { en: 0, zh: 1, ko: 2 };
  const copy = {
    "表示言語": [
        "Display language",
        "显示语言",
        "표시 언어"
    ],
    "遊び方": [
        "How to Play",
        "玩法",
        "게임 방법"
    ],
    "女将たち": [
        "Proprietresses",
        "女将们",
        "여주인들"
    ],
    "ほかの作品": [
        "Other Work",
        "其他作品",
        "다른 작품"
    ],
    "新作開発中 · Android": [
        "In Development · Android",
        "新作开发中 · Android",
        "신작 개발 중 · Android"
    ],
    "ひとマス先に、": [
        "One square ahead,",
        "前进一格，",
        "한 칸 앞에서,"
    ],
    "新しい温泉と出会い。": [
        "a new hot spring awaits.",
        "邂逅新的温泉。",
        "새로운 온천을 만나다."
    ],
    "湯けむり宿繁盛記": [
        "湯けむり宿繁盛記",
        "湯けむり宿繁盛記",
        "湯けむり宿繁盛記"
    ],
    "温泉をめぐる。女将を集める。街を育てる。": [
        "Tour hot springs. Meet proprietresses. Build up the town.",
        "巡游温泉。收集女将。发展小镇。",
        "온천을 여행하고, 여주인을 모으고, 마을을 키우세요."
    ],
    "旅と経営を楽しむ、温泉スゴロク。": [
        "A hot-spring board game of travel and management.",
        "一款融合旅行与经营的温泉大富翁游戏。",
        "여행과 경영을 함께 즐기는 온천 보드게임."
    ],
    "どんなゲーム？": [
        "What kind of game?",
        "这是什么游戏？",
        "어떤 게임인가요?"
    ],
    "旅の仲間は、温泉地の女将たち。": [
        "Your traveling companions are proprietresses from hot-spring towns.",
        "旅途伙伴，是各地温泉乡的女将们。",
        "여행의 동료는 온천 마을의 여주인들."
    ],
    "スゴロク盤 ― 上部の情報パネルを開いた画面": [
        "Board screen with the information panel open",
        "打开顶部信息面板的棋盘画面",
        "상단 정보 패널을 연 보드 화면"
    ],
    "画像を拡大 ＋": [
        "Enlarge image ＋",
        "放大图片 ＋",
        "이미지 확대 ＋"
    ],
    "めぐる": [
        "Travel",
        "巡游",
        "여행"
    ],
    "当たる": [
        "Win",
        "中奖",
        "당첨"
    ],
    "集める・任せる": [
        "Collect & Assign",
        "收集・委任",
        "수집・맡기기"
    ],
    "育てる": [
        "Develop",
        "发展",
        "육성"
    ],
    "北海道から、": [
        "Starting in Hokkaido,",
        "从北海道出发，",
        "홋카이도에서,"
    ],
    "湯めぐりの旅へ。": [
        "begin your hot-spring journey.",
        "开启温泉巡游之旅。",
        "온천 순례 여행을 떠나세요."
    ],
    "地図で現在地を確かめたら、温泉地ごとのスゴロク盤へ。宿泊や当たりなどの条件を達成して、次の温泉地を目指します。": [
        "Check your location on the map, then enter each hot spring’s board. Stay overnight, score wins, and meet the conditions to reach your next destination.",
        "在地图上确认当前位置后，进入各温泉乡的棋盘。达成住宿、中奖等条件，前往下一个温泉乡。",
        "지도에서 현재 위치를 확인한 뒤 각 온천지의 보드로 이동합니다. 숙박과 당첨 등의 조건을 달성해 다음 온천지로 향하세요."
    ],
    "次の目的が、ひと目でわかる。": [
        "See your next objective at a glance.",
        "下一个目标，一目了然。",
        "다음 목표를 한눈에 확인."
    ],
    "「湯めぐり手帳」で、進むための条件と達成状況を確認。": [
        "Use the Hot Spring Journal to check requirements and progress.",
        "通过“温泉巡游手册”确认前进条件和完成情况。",
        "「온천 순례 수첩」에서 진행 조건과 달성 현황을 확인하세요."
    ],
    "メイン画面 ／ 北海道北部　＋ 拡大": [
        "Main screen / Northern Hokkaido ＋ Enlarge",
        "主画面／北海道北部 ＋ 放大",
        "메인 화면 / 홋카이도 북부 ＋ 확대"
    ],
    "ルーレットを回す。": [
        "Spin the roulette.",
        "转动轮盘。",
        "룰렛을 돌리고."
    ],
    "止まるマスに、ひと喜び。": [
        "Every square brings a surprise.",
        "每个落脚格，都有一份惊喜。",
        "멈춘 칸마다 새로운 즐거움."
    ],
    "収入や出費、旅先の出来事、そして当たり。": [
        "Income, expenses, travel events—and wins.",
        "收入、支出、旅途事件，还有中奖。",
        "수입과 지출, 여행지의 사건, 그리고 당첨."
    ],
    "マスを進めるたびに、旅の展開が変わります。": [
        "The journey changes with every move.",
        "每前进一步，旅程都会发生变化。",
        "칸을 나아갈 때마다 여행의 전개가 달라집니다."
    ],
    "一歩ずつ進む": [
        "Move one step at a time",
        "一步步前进",
        "한 걸음씩 전진"
    ],
    "ルーレットで旅を進める": [
        "Advance by roulette",
        "用轮盘推进旅程",
        "룰렛으로 여행 진행"
    ],
    "出た数だけマスを進み、温泉地での宿泊を重ねていきます。": [
        "Move the number shown and stay at hot-spring destinations along the way.",
        "按轮盘数字前进，在各个温泉乡不断住宿。",
        "나온 숫자만큼 이동하며 온천지에서 숙박을 이어갑니다."
    ],
    "当たりを楽しむ": [
        "Enjoy winning streaks",
        "享受中奖乐趣",
        "당첨을 즐기기"
    ],
    "連チャンで湯銭を獲得": [
        "Earn bath coins with consecutive wins",
        "连中奖取浴资",
        "연속 당첨으로 온천 코인 획득"
    ],
    "初当たりから、その先の連チャンへ。獲得した湯銭で旅や経営を続けます。": [
        "Turn your first win into a streak, then use your bath coins to continue traveling and managing.",
        "从首次中奖迈向连续中奖，用获得的浴资继续旅行和经营。",
        "첫 당첨을 연속 당첨으로 이어가고, 얻은 온천 코인으로 여행과 경영을 계속하세요."
    ],
    "状況を見渡す": [
        "Review the situation",
        "掌握全局",
        "상황 확인"
    ],
    "確率も、履歴も確認": [
        "Check odds and history",
        "确认概率与记录",
        "확률과 기록 확인"
    ],
    "上部の情報パネルを開けば、現在の状態や当たり履歴がわかります。": [
        "Open the top information panel to see the current state and win history.",
        "打开顶部信息面板，即可查看当前状态和中奖记录。",
        "상단 정보 패널을 열면 현재 상태와 당첨 기록을 확인할 수 있습니다."
    ],
    "お気に入りの女将と、": [
        "With your favorite proprietress,",
        "与心仪的女将一起，",
        "마음에 드는 여주인과,"
    ],
    "旅の先へ。": [
        "continue the journey.",
        "踏上下一段旅程。",
        "여행의 다음 길로."
    ],
    "温泉地にゆかりのある女将たちをガチャで迎え、": [
        "Recruit proprietresses tied to each hot-spring town through the gacha,",
        "通过抽卡迎接与各温泉乡有渊源的女将，",
        "각 온천지와 인연이 있는 여주인을 뽑기로 맞이하고,"
    ],
    "仲間にした女将に温泉地の経営を任せましょう。": [
        "then entrust them with managing your destinations.",
        "把温泉乡的经营交给成为伙伴的女将。",
        "동료가 된 여주인에게 온천지 경영을 맡기세요."
    ],
    "カードを集める楽しさも、経営を見守る楽しさも。": [
        "Enjoy collecting cards and watching each business grow.",
        "既有收集卡牌的乐趣，也有关注经营成长的乐趣。",
        "카드를 모으는 재미와 경영을 지켜보는 재미를 모두."
    ],
    "下呂温泉": [
        "Gero Onsen",
        "下吕温泉",
        "게로 온천"
    ],
    "熱海温泉": [
        "Atami Onsen",
        "热海温泉",
        "아타미 온천"
    ],
    "有馬温泉": [
        "Arima Onsen",
        "有马温泉",
        "아리마 온천"
    ],
    "8人そろえば、経営の景色も変わる。": [
        "With eight proprietresses, management takes on a whole new look.",
        "八位女将齐聚，经营景象也随之改变。",
        "여덟 명이 모이면 경영의 모습도 달라집니다."
    ],
    "誰が当たり中？ 収支はどうなった？": [
        "Who is on a winning streak? How are the finances?",
        "谁正在中奖？收支情况如何？",
        "누가 당첨 중일까? 수지는 어떻게 됐을까?"
    ],
    "8人それぞれの稼働状況・当たり履歴・収支の推移を、一画面に。": [
        "See activity, win history, and financial trends for all eight on one screen.",
        "在一个画面中查看八人的运行情况、中奖记录与收支变化。",
        "여덟 명의 가동 현황, 당첨 기록, 수지 추이를 한 화면에서 확인하세요."
    ],
    "女将経営 ／ 8人編成・開発用セーブ": [
        "Proprietress Management / Eight-member development save",
        "女将经营／八人编队・开发用存档",
        "여주인 경영 / 8인 편성・개발용 저장"
    ],
    "稼働状況": [
        "Activity",
        "运行情况",
        "가동 현황"
    ],
    "女将ごとの動きを確認": [
        "Track each proprietress",
        "查看每位女将的动态",
        "여주인별 움직임 확인"
    ],
    "当たり履歴": [
        "Win history",
        "中奖记录",
        "당첨 기록"
    ],
    "それぞれの結果を見比べる": [
        "Compare individual results",
        "比较各自的结果",
        "각 결과 비교"
    ],
    "収支の推移": [
        "Financial trends",
        "收支变化",
        "수지 추이"
    ],
    "経営の成果をグラフで見る": [
        "View results in a chart",
        "用图表查看经营成果",
        "경영 성과를 그래프로 확인"
    ],
    "旅の成果で、": [
        "Use the rewards of your journey",
        "用旅途的成果，",
        "여행의 성과로,"
    ],
    "街をにぎやかに。": [
        "to bring the town to life.",
        "让小镇热闹起来。",
        "마을을 활기차게."
    ],
    "湯銭と温街Pを使って、温泉街を開拓・増築。": [
        "Use bath coins and Onmachi Points to develop and expand your hot-spring town.",
        "使用浴资与温街点数，开拓并扩建温泉街。",
        "온천 코인과 온마치 포인트로 온천 마을을 개척하고 확장하세요."
    ],
    "施設が増えると、街の景色も変わっていきます。": [
        "As facilities grow, the town’s scenery changes too.",
        "随着设施增加，小镇的景色也会变化。",
        "시설이 늘어나면 마을의 풍경도 달라집니다."
    ],
    "育てた温泉街から、次の収益。": [
        "Your developed town generates the next return.",
        "从发展起来的温泉街获得下一笔收益。",
        "키운 온천 마을에서 다음 수익을 얻습니다."
    ],
    "受け取った湯銭を、また旅や街づくりへ。": [
        "Put the bath coins you earn back into travel and town building.",
        "把获得的浴资再次投入旅行与城镇建设。",
        "받은 온천 코인을 다시 여행과 마을 만들기에 사용하세요."
    ],
    "右の風景は、開拓・増築済みの温泉街を": [
        "The scene at right shows a developed and expanded hot-spring town",
        "右侧展示的是已经开拓、扩建的温泉街，",
        "오른쪽 풍경은 개척과 확장을 마친 온천 마을을"
    ],
    "ゲーム内の描画機能で表示したものです。": [
        "rendered with the game’s own display system.",
        "由游戏内绘制功能呈现。",
        "게임 내 묘화 기능으로 표시한 모습입니다."
    ],
    "街の風景を拡大 ＋": [
        "Enlarge town view ＋",
        "放大小镇景色 ＋",
        "마을 풍경 확대 ＋"
    ],
    "次の湯めぐりを、準備中。": [
        "Preparing the next hot-spring journey.",
        "下一段温泉巡游，正在准备中。",
        "다음 온천 여행을 준비 중입니다."
    ],
    "Android向けに開発中。現在、クローズドテストの準備を進めています。": [
        "In development for Android. We are currently preparing for closed testing.",
        "正在面向Android开发，目前正准备封闭测试。",
        "Android용으로 개발 중이며 현재 비공개 테스트를 준비하고 있습니다."
    ],
    "配信日などの情報は、準備が整い次第お知らせします。": [
        "Release information will be announced when ready.",
        "发行日期等信息将在准备就绪后公布。",
        "출시일 등의 정보는 준비가 되는 대로 안내하겠습니다."
    ],
    "掲載している画面・数値は開発中のものです。正式版では変更になる場合があります。": [
        "Screens and values shown are from development and may change in the final release.",
        "页面中展示的画面与数值均为开发中内容，正式版可能有所变更。",
        "게재된 화면과 수치는 개발 중인 내용이며 정식 버전에서 변경될 수 있습니다."
    ],
    "こんなのも、つくっています。": [
        "We also make this.",
        "我们也在制作这些。",
        "이런 것도 만들고 있습니다."
    ],
    "同人書籍ビューア": [
        "Doujin Book Viewer",
        "同人书籍阅读器",
        "동인지 뷰어"
    ],
    "漫画・EPUB・PDFを、ひとつの本棚に。": [
        "Manga, EPUB, and PDF—all on one bookshelf.",
        "将漫画、EPUB与PDF集中到一个书架。",
        "만화, EPUB, PDF를 하나의 책장에."
    ],
    "アプリの紹介を見る →": [
        "View the app →",
        "查看应用介绍 →",
        "앱 소개 보기 →"
    ],
    "プライバシーポリシー": [
        "Privacy Policy",
        "隐私政策",
        "개인정보처리방침"
    ],
    "ページ上部へ ↑": [
        "Back to top ↑",
        "返回顶部 ↑",
        "맨 위로 ↑"
    ],
    "閉じる ×": [
        "Close ×",
        "关闭 ×",
        "닫기 ×"
    ],
    "ゲームに登場する女将カード": [
        "Proprietress cards appearing in the game",
        "游戏中登场的女将卡牌",
        "게임에 등장하는 여주인 카드"
    ],
    "ゲーム画面の拡大表示": [
        "Enlarged game screenshot",
        "游戏画面放大显示",
        "게임 화면 확대 표시"
    ],
    "拡大表示を閉じる": [
        "Close enlarged view",
        "关闭放大显示",
        "확대 화면 닫기"
    ],
    "下呂温泉の女将カード": [
        "Gero Onsen proprietress card",
        "下吕温泉女将卡牌",
        "게로 온천 여주인 카드"
    ],
    "熱海温泉のSSR女将カード": [
        "Atami Onsen SSR proprietress card",
        "热海温泉SSR女将卡牌",
        "아타미 온천 SSR 여주인 카드"
    ],
    "熱海温泉の女将カード": [
        "Atami Onsen proprietress card",
        "热海温泉女将卡牌",
        "아타미 온천 여주인 카드"
    ],
    "有馬温泉の女将カード": [
        "Arima Onsen proprietress card",
        "有马温泉女将卡牌",
        "아리마 온천 여주인 카드"
    ],
    "上部詳細を開いたスゴロク盤。確率・履歴と通常時のマスを一覧表示": [
        "Board with details open, showing odds, history, and regular squares",
        "打开顶部详情的棋盘，同时显示概率、记录与普通格",
        "상단 상세를 연 보드. 확률, 기록, 일반 칸을 한눈에 표시"
    ],
    "北海道北部の地図と、豊富温泉の湯めぐり手帳": [
        "Map of northern Hokkaido and the Toyotomi Onsen journal",
        "北海道北部地图与丰富温泉巡游手册",
        "홋카이도 북부 지도와 도요토미 온천 순례 수첩"
    ],
    "実際の経営シミュレーションで進行させた8人の女将経営画面。収支と履歴は女将ごとに異なる": [
        "Eight-proprietress management screen from an actual simulation; finances and history differ for each",
        "实际经营模拟中的八位女将管理画面，每位女将的收支与记录各不相同",
        "실제 경영 시뮬레이션을 진행한 8인 여주인 경영 화면. 수지와 기록은 여주인마다 다름"
    ],
    "開拓・増築を進めた湖畔の温泉街の風景": [
        "A lakeside hot-spring town after development and expansion",
        "经过开拓与扩建的湖畔温泉街景色",
        "개척과 확장을 진행한 호숫가 온천 마을 풍경"
    ],
    "開発中の画面を、記録しています。": [
        "Recording screens during development.",
        "记录开发中的画面。",
        "개발 중 화면을 기록하고 있습니다."
    ],
    "完成・配信時期は未定です。": [
        "Completion and release dates are undecided.",
        "完成与发行时间尚未确定。",
        "완성 및 배포 시기는 미정입니다."
    ],
    "湯けむり宿繁盛記の開発中タイトル画面": [
        "Development title screen of 湯けむり宿繁盛記",
        "《湯けむり宿繁盛記》开发中的标题画面",
        "「湯けむり宿繁盛記」의 개발 중 타이틀 화면"
    ],
    "タイトル画面 ／ 開発候補": [
        "Title screen / Development candidate",
        "标题画面／开发候选版",
        "타이틀 화면 / 개발 후보"
    ],
    "旅の準備は、": [
        "Prepare for your journey",
        "准备旅程，",
        "여행 준비는,"
    ],
    "ホームから。": [
        "from the home screen.",
        "从主页开始。",
        "홈에서."
    ],
    "ホームでは、所持湯銭や女将の派遣状況を確認できます。画面下のメニューから、各画面へ進みます。": [
        "The home screen shows your bath coins and proprietress assignments. Use the menu at the bottom to open other screens.",
        "主页可查看持有浴资和女将派遣状态，通过底部菜单进入各个画面。",
        "홈에서 보유 온천 코인과 여주인 파견 상태를 확인하고, 아래 메뉴로 각 화면에 이동합니다."
    ],
    "開発候補の実画面を掲載しています。": [
        "These are actual screens from a development candidate.",
        "这里展示的是开发候选版的实际画面。",
        "개발 후보의 실제 화면입니다."
    ],
    "このホーム画像は、女将をまだ派遣していないQA状態です。": [
        "This home screenshot is a QA state with no proprietress assigned.",
        "这张主页截图为尚未派遣女将的QA状态。",
        "홈 이미지는 여주인을 아직 파견하지 않은 QA 상태입니다."
    ],
    "開発中のホーム画面。女将の派遣は未配置のQA状態": [
        "Development home screen, QA state with no proprietress assigned",
        "开发中的主页，尚未派遣女将的QA状态",
        "개발 중 홈 화면. 여주인 파견 미배치 QA 상태"
    ],
    "ホーム ／ 派遣未配置のQA状態": [
        "Home / QA state, no assignments",
        "主页／派遣未配置的QA状态",
        "홈 / 파견 미배치 QA 상태"
    ],
    "温泉地の盤面で、": [
        "On the hot-spring board,",
        "在温泉乡的棋盘上，",
        "온천지의 보드에서,"
    ],
    "旅のひとこまを。": [
        "a moment in your journey.",
        "体验旅途的一幕。",
        "여행의 한 장면을."
    ],
    "画面の数値は、製品版のバランスを示すものではありません。": [
        "The displayed values do not represent final game balance.",
        "画面数值不代表正式版的平衡设定。",
        "화면 수치는 정식 버전의 밸런스를 나타내지 않습니다."
    ],
    "同日C候補の通常画面。所持通貨と収支を区別した開発中の表示": [
        "Regular screen from the same-day C candidate, with separate balance and income/expense displays",
        "同日C候选版普通画面，区分持有货币与收支的开发中显示",
        "같은 날 C 후보의 일반 화면. 보유 통화와 수지를 구분한 개발 중 표시"
    ],
    "通常画面 ／ 同日C候補": [
        "Regular screen / Same-day C candidate",
        "普通画面／同日C候选版",
        "일반 화면 / 같은 날 C 후보"
    ],
    "掲載画像は開発用データによる実画面です。所持数・収支・確率・報酬などの数値は、製品版の仕様やバランスを保証するものではありません。": [
        "Screenshots use development data. Currency, finances, probabilities and rewards do not guarantee the final specifications or balance.",
        "截图为使用开发数据的实际画面。持有数、收支、概率和奖励等数值不保证正式版的规格或平衡设定。",
        "이미지는 개발 데이터를 사용한 실제 화면입니다. 보유량·수지·확률·보상 등의 수치는 정식 버전의 사양이나 밸런스를 보장하지 않습니다."
    ],
    "温泉地にゆかりのある女将たち。": [
        "Proprietresses with ties to hot-spring towns.",
        "与温泉乡有渊源的女将们。",
        "온천지와 인연이 있는 여주인들."
    ],
    "こちらは既存の女将カードアートです。": [
        "These are existing proprietress card illustrations.",
        "这里展示的是既有女将卡牌插画。",
        "기존 여주인 카드 아트입니다."
    ],
    "女将カードの世界観も、引き続きお届けします。": [
        "The world of the proprietress card art remains part of the introduction.",
        "继续呈现女将卡牌的世界观。",
        "여주인 카드의 세계관도 계속 소개합니다."
    ],
    "確変・女将一覧の新しい代表画像は準備中です。旧仕様の画面を、現行画面として掲載していません。": [
        "New representative images for probability-change mode and the proprietress list are not ready. Screens from old specifications are not presented as current.",
        "概率变化模式与女将列表的新代表图片尚在准备中，不将旧规格画面作为现行画面展示。",
        "확률 변동 모드와 여주인 목록의 새 대표 이미지는 준비 중입니다. 이전 사양 화면을 현재 화면으로 소개하지 않습니다."
    ],
    "温泉街の画面から、": [
        "From the town screen,",
        "从温泉街画面，",
        "온천 마을 화면에서,"
    ],
    "開拓・増築へ。": [
        "view development and expansion.",
        "查看开拓与扩建。",
        "개척과 확장 항목을."
    ],
    "温泉街の現在の状態と、開拓・増築の項目を表示します。": [
        "The screen shows the town state and development and expansion options.",
        "画面展示温泉街当前状态与开拓、扩建选项。",
        "온천 마을의 현재 상태와 개척·확장 항목을 표시합니다."
    ],
    "この画像は、未開拓のQA状態です。": [
        "This screenshot is an undeveloped QA state.",
        "这张截图为尚未开拓的QA状态。",
        "이미지는 미개척 QA 상태입니다."
    ],
    "開拓済みの完成例として掲載していません。": [
        "It is not an example of a completed, developed town.",
        "并非开拓完成后的示例。",
        "개척을 마친 완성 예시가 아닙니다."
    ],
    "開発中の温泉街画面。未開拓のQA状態": [
        "Development town screen, undeveloped QA state",
        "开发中的温泉街画面，尚未开拓的QA状态",
        "개발 중 온천 마을 화면. 미개척 QA 상태"
    ],
    "温泉街 ／ 未開拓のQA状態": [
        "Town / Undeveloped QA state",
        "温泉街／尚未开拓的QA状态",
        "온천 마을 / 미개척 QA 상태"
    ],
    "Android向けに開発中。掲載画像は開発候補の実画面です。": [
        "In development for Android. Images show actual development-candidate screens.",
        "Android版本开发中，所示图片为开发候选版的实际画面。",
        "Android용으로 개발 중입니다. 이미지는 개발 후보의 실제 화면입니다."
    ],
    "湯けむり宿繁盛記｜esunaStudio": [
        "湯けむり宿繁盛記 | esunaStudio",
        "湯けむり宿繁盛記｜esunaStudio",
        "湯けむり宿繁盛記 | esunaStudio"
    ],
    "Android向けに開発中のゲーム「湯けむり宿繁盛記」。温泉地と女将たちを描くesunaStudioの新作です。": [
        "An Android game in development from esunaStudio, featuring hot-spring destinations and their proprietresses: 湯けむり宿繁盛記.",
        "esunaStudio正在开发的Android游戏《湯けむり宿繁盛記》，以温泉乡与女将们为主题。",
        "온천지와 여주인들을 담은 esunaStudio의 Android 개발 중 게임, 「湯けむり宿繁盛記」입니다."
    ],
    "温泉のひとときを、": [
        "Enjoy a hot-spring moment",
        "温泉时光，",
        "온천에서의 한때를,"
    ],
    "女将たちと。": [
        "with the proprietresses.",
        "与女将们一起。",
        "여주인들과 함께."
    ],
    "Android向けゲームを開発中です。": [
        "An Android game in development.",
        "Android游戏开发中。",
        "Android 게임을 개발 중입니다."
    ],
    "ビュッ": [
        "ビュッ",
        "ビュッ",
        "ビュッ"
    ],
    "漫画・電子書籍ビューア。EPUBを読む・聴く。": [
        "Manga and ebook reader. Read and listen to EPUB.",
        "漫画与电子书阅读器。阅读与聆听EPUB。",
        "만화·전자책 뷰어. EPUB 읽기와 듣기."
    ],
    "温泉を舞台にした開発中のゲームです。": [
        "A game in development, set around hot springs.",
        "以温泉为背景、正在开发中的游戏。",
        "온천을 배경으로 개발 중인 게임입니다."
    ],
    "温泉地を彩る、": [
        "Art inspired by hot-spring towns:",
        "为温泉乡增添色彩的，",
        "온천지를 물들이는,"
    ],
    "女将のカードアート。": [
        "proprietress cards.",
        "女将卡牌插画。",
        "여주인 카드 아트."
    ],
    "女将カードアート": [
        "Proprietress card art",
        "女将卡牌插画",
        "여주인 카드 아트"
    ],
    "画面紹介": [
        "Screen overview",
        "画面介绍",
        "화면 소개"
    ],
    "画面を見る": [
        "View screens",
        "查看画面",
        "화면 보기"
    ],
    "ホーム": [
        "Home",
        "主页",
        "홈"
    ],
    "画面記録": [
        "Screen captures",
        "画面记录",
        "화면 기록"
    ],
    "女将アート": [
        "Proprietress art",
        "女将插画",
        "여주인 아트"
    ],
    "温泉街": [
        "Hot-spring town",
        "温泉街",
        "온천 마을"
    ],
    "開発途中の通常画面と、盤面が回転している最中の記録です。": [
        "Development captures of the regular screen and the board while it is spinning.",
        "开发中的普通画面与棋盘旋转过程的记录。",
        "개발 중 일반 화면과 보드가 회전하는 도중의 기록입니다."
    ],
    "通常モードで盤面が回転している途中の開発中画面": [
        "Development screen captured while the board is spinning in normal mode",
        "普通模式下棋盘旋转过程中的开发画面",
        "일반 모드에서 보드가 회전 중인 개발 화면"
    ],
    "通常モード ／ 盤面回転中の実画面": [
        "Normal mode / Actual screen while the board is spinning",
        "普通模式／棋盘旋转中的实际画面",
        "일반 모드 / 보드 회전 중 실제 화면"
    ],
    "Android向けに開発中のゲーム「湯けむり宿繁盛記」。掲載画像は開発候補の実画面です。完成・配信時期は未定です。": [
        "湯けむり宿繁盛記 is in development for Android. These are actual development captures. Completion and release dates are undecided.",
        "《湯けむり宿繁盛記》是面向Android开发中的游戏。所示为开发候选版实机画面，完成与发行时间尚未确定。",
        "「湯けむり宿繁盛記」는 Android용으로 개발 중입니다. 개발 후보의 실제 화면이며 완성 및 배포 시기는 미정입니다."
    ]
};

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  function translate(source, language) {
    if (language === 'ja') return source;
    const values = copy[source];
    return values ? values[languageIndex[language]] : source;
  }

  function rememberTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, [data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => originalText.set(node, node.nodeValue));
    return nodes;
  }

  const textNodes = rememberTextNodes();
  const attributeElements = Array.from(document.querySelectorAll('[alt], [aria-label]'));
  attributeElements.forEach(element => {
    originalAttributes.set(element, {
      alt: element.hasAttribute('alt') ? element.getAttribute('alt') : null,
      ariaLabel: element.hasAttribute('aria-label') ? element.getAttribute('aria-label') : null
    });
  });
  const originalTitle = document.title;
  const description = document.querySelector('meta[name="description"]');
  const originalDescription = description ? description.content : '';

  function applyLanguage(language, updateAddress = true) {
    if (!languages.includes(language)) language = 'ja';
    textNodes.forEach(node => {
      const original = originalText.get(node);
      const trimmed = original.trim();
      node.nodeValue = original.replace(trimmed, translate(trimmed, language));
    });
    attributeElements.forEach(element => {
      const originals = originalAttributes.get(element);
      if (originals.alt !== null) element.setAttribute('alt', translate(originals.alt, language));
      if (originals.ariaLabel !== null) element.setAttribute('aria-label', translate(originals.ariaLabel, language));
    });
    document.title = translate(originalTitle, language);
    if (description) description.content = translate(originalDescription, language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });
    try { localStorage.setItem('yukemuri-language', language); } catch (_) {}
    if (updateAddress) {
      const url = new URL(location.href);
      if (language === 'ja') url.searchParams.delete('lang');
      else url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    }
  }

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  const requested = new URL(location.href).searchParams.get('lang');
  let saved = '';
  try { saved = localStorage.getItem('yukemuri-language') || ''; } catch (_) {}
  const browserLanguage = (navigator.language || 'ja').toLowerCase();
  const detected = browserLanguage.startsWith('zh') ? 'zh' : browserLanguage.startsWith('ko') ? 'ko' : browserLanguage.startsWith('en') ? 'en' : 'ja';
  applyLanguage(languages.includes(requested) ? requested : languages.includes(saved) ? saved : detected, false);
})();
