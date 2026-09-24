(() => {
  'use strict';

  const languages = ['ja', 'en', 'zh', 'ko'];
  const languageIndex = { en: 0, zh: 1, ko: 2 };
  const copy = {
    '湯けむり宿繁盛記 ～全国温泉すごろく～｜esunaStudio': ['Yukemuri Inn Chronicle — Japan Hot Spring Board Game | esunaStudio', '温泉旅馆繁盛记 ～日本全国温泉大富翁～｜esunaStudio', '온천 여관 번성기 ～일본 전국 온천 보드게임～｜esunaStudio'],
    '温泉をめぐるスゴロクと、女将たちとの経営。esunaStudioの新作ゲーム、湯けむり宿繁盛記 ～全国温泉すごろく～。': ['Travel through hot springs and manage inns with their proprietresses in esunaStudio’s new game, Yukemuri Inn Chronicle.', '巡游日本温泉，与女将们共同经营旅馆。esunaStudio新作《温泉旅馆繁盛记 ～日本全国温泉大富翁～》。', '온천을 여행하고 여주인들과 여관을 경영하는 esunaStudio의 신작 게임, 온천 여관 번성기입니다.'],
    '表示言語': ['Display language', '显示语言', '표시 언어'],
    '遊び方': ['How to Play', '玩法', '게임 방법'],
    '女将たち': ['Proprietresses', '女将们', '여주인들'],
    'ほかの作品': ['Other Work', '其他作品', '다른 작품'],
    '新作開発中 · Android': ['In Development · Android', '新作开发中 · Android', '신작 개발 중 · Android'],
    'ひとマス先に、': ['One square ahead,', '前进一格，', '한 칸 앞에서,'],
    '新しい温泉と出会い。': ['a new hot spring awaits.', '邂逅新的温泉。', '새로운 온천을 만나다.'],
    '湯けむり宿繁盛記': ['Yukemuri Inn Chronicle', '温泉旅馆繁盛记', '온천 여관 번성기'],
    '～全国温泉すごろく～': ['— Japan Hot Spring Board Game —', '～日本全国温泉大富翁～', '～일본 전국 온천 보드게임～'],
    '温泉をめぐる。女将を集める。街を育てる。': ['Tour hot springs. Meet proprietresses. Build up the town.', '巡游温泉。收集女将。发展小镇。', '온천을 여행하고, 여주인을 모으고, 마을을 키우세요.'],
    '旅と経営を楽しむ、温泉スゴロク。': ['A hot-spring board game of travel and management.', '一款融合旅行与经营的温泉大富翁游戏。', '여행과 경영을 함께 즐기는 온천 보드게임.'],
    'どんなゲーム？': ['What kind of game?', '这是什么游戏？', '어떤 게임인가요?'],
    '旅の仲間は、温泉地の女将たち。': ['Your traveling companions are proprietresses from hot-spring towns.', '旅途伙伴，是各地温泉乡的女将们。', '여행의 동료는 온천 마을의 여주인들.'],
    'スゴロク盤 ― 上部の情報パネルを開いた画面': ['Board screen with the information panel open', '打开顶部信息面板的棋盘画面', '상단 정보 패널을 연 보드 화면'],
    '画像を拡大 ＋': ['Enlarge image ＋', '放大图片 ＋', '이미지 확대 ＋'],
    'めぐる': ['Travel', '巡游', '여행'],
    '当たる': ['Win', '中奖', '당첨'],
    '集める・任せる': ['Collect & Assign', '收集・委任', '수집・맡기기'],
    '育てる': ['Develop', '发展', '육성'],
    '北海道から、': ['Starting in Hokkaido,', '从北海道出发，', '홋카이도에서,'],
    '湯めぐりの旅へ。': ['begin your hot-spring journey.', '开启温泉巡游之旅。', '온천 순례 여행을 떠나세요.'],
    '地図で現在地を確かめたら、温泉地ごとのスゴロク盤へ。宿泊や当たりなどの条件を達成して、次の温泉地を目指します。': ['Check your location on the map, then enter each hot spring’s board. Stay overnight, score wins, and meet the conditions to reach your next destination.', '在地图上确认当前位置后，进入各温泉乡的棋盘。达成住宿、中奖等条件，前往下一个温泉乡。', '지도에서 현재 위치를 확인한 뒤 각 온천지의 보드로 이동합니다. 숙박과 당첨 등의 조건을 달성해 다음 온천지로 향하세요.'],
    '次の目的が、ひと目でわかる。': ['See your next objective at a glance.', '下一个目标，一目了然。', '다음 목표를 한눈에 확인.'],
    '「湯めぐり手帳」で、進むための条件と達成状況を確認。': ['Use the Hot Spring Journal to check requirements and progress.', '通过“温泉巡游手册”确认前进条件和完成情况。', '「온천 순례 수첩」에서 진행 조건과 달성 현황을 확인하세요.'],
    'メイン画面 ／ 北海道北部　＋ 拡大': ['Main screen / Northern Hokkaido ＋ Enlarge', '主画面／北海道北部 ＋ 放大', '메인 화면 / 홋카이도 북부 ＋ 확대'],
    'ルーレットを回す。': ['Spin the roulette.', '转动轮盘。', '룰렛을 돌리고.'],
    '止まるマスに、ひと喜び。': ['Every square brings a surprise.', '每个落脚格，都有一份惊喜。', '멈춘 칸마다 새로운 즐거움.'],
    '収入や出費、旅先の出来事、そして当たり。': ['Income, expenses, travel events—and wins.', '收入、支出、旅途事件，还有中奖。', '수입과 지출, 여행지의 사건, 그리고 당첨.'],
    'マスを進めるたびに、旅の展開が変わります。': ['The journey changes with every move.', '每前进一步，旅程都会发生变化。', '칸을 나아갈 때마다 여행의 전개가 달라집니다.'],
    '一歩ずつ進む': ['Move one step at a time', '一步步前进', '한 걸음씩 전진'],
    'ルーレットで旅を進める': ['Advance by roulette', '用轮盘推进旅程', '룰렛으로 여행 진행'],
    '出た数だけマスを進み、温泉地での宿泊を重ねていきます。': ['Move the number shown and stay at hot-spring destinations along the way.', '按轮盘数字前进，在各个温泉乡不断住宿。', '나온 숫자만큼 이동하며 온천지에서 숙박을 이어갑니다.'],
    '当たりを楽しむ': ['Enjoy winning streaks', '享受中奖乐趣', '당첨을 즐기기'],
    '連チャンで湯銭を獲得': ['Earn bath coins with consecutive wins', '连中奖取浴资', '연속 당첨으로 온천 코인 획득'],
    '初当たりから、その先の連チャンへ。獲得した湯銭で旅や経営を続けます。': ['Turn your first win into a streak, then use your bath coins to continue traveling and managing.', '从首次中奖迈向连续中奖，用获得的浴资继续旅行和经营。', '첫 당첨을 연속 당첨으로 이어가고, 얻은 온천 코인으로 여행과 경영을 계속하세요.'],
    '状況を見渡す': ['Review the situation', '掌握全局', '상황 확인'],
    '確率も、履歴も確認': ['Check odds and history', '确认概率与记录', '확률과 기록 확인'],
    '上部の情報パネルを開けば、現在の状態や当たり履歴がわかります。': ['Open the top information panel to see the current state and win history.', '打开顶部信息面板，即可查看当前状态和中奖记录。', '상단 정보 패널을 열면 현재 상태와 당첨 기록을 확인할 수 있습니다.'],
    'お気に入りの女将と、': ['With your favorite proprietress,', '与心仪的女将一起，', '마음에 드는 여주인과,'],
    '旅の先へ。': ['continue the journey.', '踏上下一段旅程。', '여행의 다음 길로.'],
    '温泉地にゆかりのある女将たちをガチャで迎え、': ['Recruit proprietresses tied to each hot-spring town through the gacha,', '通过抽卡迎接与各温泉乡有渊源的女将，', '각 온천지와 인연이 있는 여주인을 뽑기로 맞이하고,'],
    '仲間にした女将に温泉地の経営を任せましょう。': ['then entrust them with managing your destinations.', '把温泉乡的经营交给成为伙伴的女将。', '동료가 된 여주인에게 온천지 경영을 맡기세요.'],
    'カードを集める楽しさも、経営を見守る楽しさも。': ['Enjoy collecting cards and watching each business grow.', '既有收集卡牌的乐趣，也有关注经营成长的乐趣。', '카드를 모으는 재미와 경영을 지켜보는 재미를 모두.'],
    '下呂温泉': ['Gero Onsen', '下吕温泉', '게로 온천'],
    '熱海温泉': ['Atami Onsen', '热海温泉', '아타미 온천'],
    '有馬温泉': ['Arima Onsen', '有马温泉', '아리마 온천'],
    '8人そろえば、経営の景色も変わる。': ['With eight proprietresses, management takes on a whole new look.', '八位女将齐聚，经营景象也随之改变。', '여덟 명이 모이면 경영의 모습도 달라집니다.'],
    '誰が当たり中？ 収支はどうなった？': ['Who is on a winning streak? How are the finances?', '谁正在中奖？收支情况如何？', '누가 당첨 중일까? 수지는 어떻게 됐을까?'],
    '8人それぞれの稼働状況・当たり履歴・収支の推移を、一画面に。': ['See activity, win history, and financial trends for all eight on one screen.', '在一个画面中查看八人的运行情况、中奖记录与收支变化。', '여덟 명의 가동 현황, 당첨 기록, 수지 추이를 한 화면에서 확인하세요.'],
    '女将経営 ／ 8人編成・開発用セーブ': ['Proprietress Management / Eight-member development save', '女将经营／八人编队・开发用存档', '여주인 경영 / 8인 편성・개발용 저장'],
    '稼働状況': ['Activity', '运行情况', '가동 현황'],
    '女将ごとの動きを確認': ['Track each proprietress', '查看每位女将的动态', '여주인별 움직임 확인'],
    '当たり履歴': ['Win history', '中奖记录', '당첨 기록'],
    'それぞれの結果を見比べる': ['Compare individual results', '比较各自的结果', '각 결과 비교'],
    '収支の推移': ['Financial trends', '收支变化', '수지 추이'],
    '経営の成果をグラフで見る': ['View results in a chart', '用图表查看经营成果', '경영 성과를 그래프로 확인'],
    '旅の成果で、': ['Use the rewards of your journey', '用旅途的成果，', '여행의 성과로,'],
    '街をにぎやかに。': ['to bring the town to life.', '让小镇热闹起来。', '마을을 활기차게.'],
    '湯銭と温街Pを使って、温泉街を開拓・増築。': ['Use bath coins and Onmachi Points to develop and expand your hot-spring town.', '使用浴资与温街点数，开拓并扩建温泉街。', '온천 코인과 온마치 포인트로 온천 마을을 개척하고 확장하세요.'],
    '施設が増えると、街の景色も変わっていきます。': ['As facilities grow, the town’s scenery changes too.', '随着设施增加，小镇的景色也会变化。', '시설이 늘어나면 마을의 풍경도 달라집니다.'],
    '育てた温泉街から、次の収益。': ['Your developed town generates the next return.', '从发展起来的温泉街获得下一笔收益。', '키운 온천 마을에서 다음 수익을 얻습니다.'],
    '受け取った湯銭を、また旅や街づくりへ。': ['Put the bath coins you earn back into travel and town building.', '把获得的浴资再次投入旅行与城镇建设。', '받은 온천 코인을 다시 여행과 마을 만들기에 사용하세요.'],
    '右の風景は、開拓・増築済みの温泉街を': ['The scene at right shows a developed and expanded hot-spring town', '右侧展示的是已经开拓、扩建的温泉街，', '오른쪽 풍경은 개척과 확장을 마친 온천 마을을'],
    'ゲーム内の描画機能で表示したものです。': ['rendered with the game’s own display system.', '由游戏内绘制功能呈现。', '게임 내 묘화 기능으로 표시한 모습입니다.'],
    '街の風景を拡大 ＋': ['Enlarge town view ＋', '放大小镇景色 ＋', '마을 풍경 확대 ＋'],
    '次の湯めぐりを、準備中。': ['Preparing the next hot-spring journey.', '下一段温泉巡游，正在准备中。', '다음 온천 여행을 준비 중입니다.'],
    'Android向けに開発中。現在、クローズドテストの準備を進めています。': ['In development for Android. We are currently preparing for closed testing.', '正在面向Android开发，目前正准备封闭测试。', 'Android용으로 개발 중이며 현재 비공개 테스트를 준비하고 있습니다.'],
    '配信日などの情報は、準備が整い次第お知らせします。': ['Release information will be announced when ready.', '发行日期等信息将在准备就绪后公布。', '출시일 등의 정보는 준비가 되는 대로 안내하겠습니다.'],
    '掲載している画面・数値は開発中のものです。正式版では変更になる場合があります。': ['Screens and values shown are from development and may change in the final release.', '页面中展示的画面与数值均为开发中内容，正式版可能有所变更。', '게재된 화면과 수치는 개발 중인 내용이며 정식 버전에서 변경될 수 있습니다.'],
    'こんなのも、つくっています。': ['We also make this.', '我们也在制作这些。', '이런 것도 만들고 있습니다.'],
    '同人書籍ビューア': ['Doujin Book Viewer', '同人书籍阅读器', '동인지 뷰어'],
    '漫画・EPUB・PDFを、ひとつの本棚に。': ['Manga, EPUB, and PDF—all on one bookshelf.', '将漫画、EPUB与PDF集中到一个书架。', '만화, EPUB, PDF를 하나의 책장에.'],
    'アプリの紹介を見る →': ['View the app →', '查看应用介绍 →', '앱 소개 보기 →'],
    'プライバシーポリシー': ['Privacy Policy', '隐私政策', '개인정보처리방침'],
    'ページ上部へ ↑': ['Back to top ↑', '返回顶部 ↑', '맨 위로 ↑'],
    '閉じる ×': ['Close ×', '关闭 ×', '닫기 ×'],
    'ゲームに登場する女将カード': ['Proprietress cards appearing in the game', '游戏中登场的女将卡牌', '게임에 등장하는 여주인 카드'],
    'ゲーム画面の拡大表示': ['Enlarged game screenshot', '游戏画面放大显示', '게임 화면 확대 표시'],
    '拡大表示を閉じる': ['Close enlarged view', '关闭放大显示', '확대 화면 닫기'],
    '下呂温泉の女将カード': ['Gero Onsen proprietress card', '下吕温泉女将卡牌', '게로 온천 여주인 카드'],
    '熱海温泉のSSR女将カード': ['Atami Onsen SSR proprietress card', '热海温泉SSR女将卡牌', '아타미 온천 SSR 여주인 카드'],
    '熱海温泉の女将カード': ['Atami Onsen proprietress card', '热海温泉女将卡牌', '아타미 온천 여주인 카드'],
    '有馬温泉の女将カード': ['Arima Onsen proprietress card', '有马温泉女将卡牌', '아리마 온천 여주인 카드'],
    '上部詳細を開いたスゴロク盤。確率・履歴と通常時のマスを一覧表示': ['Board with details open, showing odds, history, and regular squares', '打开顶部详情的棋盘，同时显示概率、记录与普通格', '상단 상세를 연 보드. 확률, 기록, 일반 칸을 한눈에 표시'],
    '北海道北部の地図と、豊富温泉の湯めぐり手帳': ['Map of northern Hokkaido and the Toyotomi Onsen journal', '北海道北部地图与丰富温泉巡游手册', '홋카이도 북부 지도와 도요토미 온천 순례 수첩'],
    '実際の経営シミュレーションで進行させた8人の女将経営画面。収支と履歴は女将ごとに異なる': ['Eight-proprietress management screen from an actual simulation; finances and history differ for each', '实际经营模拟中的八位女将管理画面，每位女将的收支与记录各不相同', '실제 경영 시뮬레이션을 진행한 8인 여주인 경영 화면. 수지와 기록은 여주인마다 다름'],
    '開拓・増築を進めた湖畔の温泉街の風景': ['A lakeside hot-spring town after development and expansion', '经过开拓与扩建的湖畔温泉街景色', '개척과 확장을 진행한 호숫가 온천 마을 풍경']
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
