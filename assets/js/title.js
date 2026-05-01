(function () {
  const { works, siteCopy } = window.archiveData;
  const app = document.querySelector("#titleApp");
  const languageButtons = document.querySelectorAll(".lang-button");
  const staticTranslatableNodes = document.querySelectorAll("[data-ja]");
  const params = new URLSearchParams(location.search);
  const work = works.find((item) => item.id === params.get("id")) || works[0];
  const ui = {
    ja: {
      sales: "販売サイト",
      phases: "フェーズ / 空間導線",
      tags: "この作品が好きな方向け",
      gallery: "サンプル画像ギャラリー",
      related: "関連作品",
      story: "タイトル説明",
      preview: "このシリーズを試し読み",
      pixiv: "pixivで見る",
      promptcom: "PromptComで見る",
      sameSeries: "同シリーズ",
      relatedFetish: "関連フェチ",
      closeWorld: "世界観近い作品"
    },
    en: {
      sales: "Stores",
      phases: "Phases / Flow",
      tags: "Recommended for",
      gallery: "Sample Gallery",
      related: "Related Titles",
      story: "Title Description",
      preview: "Preview this series",
      pixiv: "View on pixiv",
      promptcom: "View on PromptCom",
      sameSeries: "Same series",
      relatedFetish: "Related motif",
      closeWorld: "Similar mood"
    },
    zh: {
      sales: "销售平台",
      phases: "阶段 / 空间动线",
      tags: "推荐给喜欢这些要素的用户",
      gallery: "样张图库",
      related: "相关作品",
      story: "作品说明",
      preview: "试读这个系列",
      pixiv: "在 pixiv 查看",
      promptcom: "在 PromptCom 查看",
      sameSeries: "同系列",
      relatedFetish: "相关要素",
      closeWorld: "氛围相近"
    },
    ko: {
      sales: "판매 사이트",
      phases: "페이즈 / 공간 동선",
      tags: "이런 취향에 추천",
      gallery: "샘플 이미지 갤러리",
      related: "관련 작품",
      story: "작품 설명",
      preview: "이 시리즈 미리보기",
      pixiv: "pixiv에서 보기",
      promptcom: "PromptCom에서 보기",
      sameSeries: "같은 시리즈",
      relatedFetish: "관련 취향",
      closeWorld: "비슷한 분위기"
    }
  };

  const titleTranslations = {
    "satogaeri": { en: "Satogaeri", zh: "返乡", ko: "귀향" },
    "ancient-capital-beauty": { en: "Ancient Capital Beauty", zh: "古都美人", ko: "고도미인" },
    "hikagami": { en: "Hikagami", zh: "膝后", ko: "오금" },
    "setouchi-omorashi": { en: "Setouchi Omorashi Journey", zh: "濑户内失禁纪行", ko: "세토우치 오모라시 기행" },
    "hokkaido-omorashi": { en: "Hokkaido Omorashi Journey", zh: "北海道失禁纪行", ko: "홋카이도 오모라시 기행" },
    "kinpatsu-miko": { en: "Blonde Shrine Maiden", zh: "金发巫女", ko: "금발 무녀" },
    "gokujiri": { en: "Gokujiri", zh: "极臀", ko: "고쿠지리" },
    "okinawa-soso": { en: "Okinawa Churasan Accident", zh: "冲绳美少女失误", ko: "오키나와 추라상 사고" },
    "momoiro-baito": { en: "Pink Part-Time Job", zh: "桃色打工", ko: "분홍빛 아르바이트" },
    "shizuku-record": { en: "Shizuku no Kiroku", zh: "水滴记录", ko: "물방울의 기록" },
    "hikagami-school": { en: "Hikagami School Route", zh: "膝后 登校篇", ko: "오금 등교편" },
    "eroboxin-4649": { en: "Erobokishin 4649", zh: "Erobokishin 4649", ko: "에로복신 4649" },
    "school-legs": { en: "AI Seifuku Bikyaku Illustration Collection", zh: "AI制服美腿插画集", ko: "AI 교복 미각 일러스트집" },
    "eroboxin-akane": { en: "Erobokishin 4649 Akane", zh: "Erobokishin 4649 Akane", ko: "에로복신 4649 아카네" }
  };

  const shortTranslations = {
    "eroboxin-akane": {
      summary: {
        en: "A luxury resort-hotel story where mood and distance shift through the night pool, lounge, bathhouse, and bedroom.",
        zh: "在夜间泳池、顶层酒廊、大浴场与卧室之间移动，氛围和距离逐渐变化的高级度假酒店作品。",
        ko: "나이트풀, 최상층 라운지, 대욕장, 침실로 이어지며 분위기와 거리가 변하는 고급 리조트 호텔 작품."
      },
      format: { en: "Luxury resort hotel progression", zh: "高级度假酒店动线", ko: "고급 리조트 호텔 진행" },
      focus: { en: "Night pool / Lounge / Bathhouse / Bedroom", zh: "夜间泳池 / 酒廊 / 大浴场 / 卧室", ko: "나이트풀 / 라운지 / 대욕장 / 침실" }
    },
    "eroboxin-4649": {
      summary: { en: "A domestic story where ordinary rooms gradually turn into a denser, more intimate flow.", zh: "日常房间逐渐变得浓密，空间移动本身形成段落的作品。", ko: "일상 공간이 점점 짙은 시간으로 변해가는 실내 동선 중심 작품." },
      format: { en: "Domestic phased progression", zh: "日常空间阶段推进", ko: "일상 공간 단계 진행" },
      focus: { en: "Kitchen / Living room / Bath / Bedroom", zh: "厨房 / 客厅 / 浴室 / 卧室", ko: "주방 / 거실 / 욕실 / 침실" }
    },
    "kinpatsu-miko": {
      summary: { en: "A shrine-maiden story moving through induction, hypnosis, collapse, and afterglow with a quiet Japanese mood.", zh: "从导入、催眠到理性崩坏与失神，重视和风静谧感的巫女作品。", ko: "도입, 최면, 이성 붕괴, 여운으로 이어지는 조용한 일본풍 무녀 작품." },
      format: { en: "Induction to afterglow", zh: "导入至失神的阶段推进", ko: "도입에서 여운까지" },
      focus: { en: "Kimono / Skin texture / Knee backs / Close distance", zh: "和装 / 肌肤质感 / 膝后 / 接近感", ko: "와복 / 피부 질감 / 오금 / 근접감" }
    },
    "ancient-capital-beauty": {
      summary: { en: "A calm Japanese travel work moving through shrine, inn, open-air bath, drinks, and a late-night room.", zh: "从神社、古都散策到温泉旅馆、露天风吕、晩酌与深夜和室的和风旅情作品。", ko: "신사, 고도 산책, 온천 여관, 노천탕, 반주, 심야 와실로 이어지는 일본풍 여행 작품." },
      format: { en: "Ancient-city trip / Hot-spring inn / Phased flow", zh: "古都旅行 / 温泉旅馆 / 阶段推进", ko: "고도 여행 / 온천 여관 / 단계 진행" },
      focus: { en: "Shrine / Open-air bath / Japanese room / Drinks", zh: "神社 / 露天风吕 / 和室 / 晩酌", ko: "신사 / 노천탕 / 와실 / 반주" }
    },
    "satogaeri": {
      summary: { en: "A countryside summer story where distance with a childhood friend gradually changes.", zh: "乡下夏日、青梅竹马与窥视感。归乡后距离逐渐变化的作品。", ko: "시골의 여름과 소꿉친구. 귀향지에서 거리가 조금씩 변하는 작품." }
    },
    "shizuku-record": {
      summary: { en: "A close-up mouth-detail work built around lips, breath, droplets, and humid texture.", zh: "围绕唇、吐息与滴落水珠的湿润近距离口元作品。", ko: "입술, 숨결, 물방울과 습도 있는 질감을 중심으로 한 클로즈업 작품." }
    },
    "hikagami": {
      summary: { en: "A hikagami-focused omnibus where the eye moves from thighs to knee backs and hip lines.", zh: "视线从大腿到膝后、臀线流动的膝后主题合集。", ko: "허벅지에서 오금, 힙라인으로 시선이 흐르는 오금 특화 옴니버스." }
    }
  };

  const labelTranslations = {
    "キッチン": { zh: "厨房", ko: "주방" },
    "居間": { zh: "客厅", ko: "거실" },
    "お風呂": { zh: "浴室", ko: "욕실" },
    "寝室": { zh: "卧室", ko: "침실" },
    "ナイトプール": { zh: "夜间泳池", ko: "나이트풀" },
    "最上階ラウンジ": { zh: "顶层酒廊", ko: "최상층 라운지" },
    "大浴場": { zh: "大浴场", ko: "대욕장" },
    "ベッドルーム": { zh: "卧室", ko: "침실" },
    "神社": { zh: "神社", ko: "신사" },
    "古都散策": { zh: "古都散步", ko: "고도 산책" },
    "温泉旅館": { zh: "温泉旅馆", ko: "온천 여관" },
    "露天風呂": { zh: "露天风吕", ko: "노천탕" },
    "晩酌": { zh: "晩酌", ko: "반주" },
    "和室": { zh: "和室", ko: "와실" },
    "深夜": { zh: "深夜", ko: "심야" },
    "導入": { zh: "导入", ko: "도입" },
    "催眠": { zh: "催眠", ko: "최면" },
    "理性崩壊": { zh: "理性崩坏", ko: "이성 붕괴" },
    "放心": { zh: "失神", ko: "멍한 여운" },
    "和風美人": { zh: "和风美人", ko: "일본풍 미인" },
    "旅館シチュエーション": { zh: "旅馆情境", ko: "여관 시추에이션" },
    "和装": { zh: "和装", ko: "와복" },
    "空気感重視": { zh: "重视氛围", ko: "분위기 중시" },
    "酔い進行": { zh: "醉意推进", ko: "취기 진행" },
    "段階変化": { zh: "阶段变化", ko: "단계 변화" },
    "和風フェチ": { zh: "和风要素", ko: "일본풍 취향" },
    "高級リゾート": { zh: "高级度假", ko: "고급 리조트" },
    "ナイトプール": { zh: "夜间泳池", ko: "나이트풀" },
    "夜景": { zh: "夜景", ko: "야경" },
    "ストーリー重視": { zh: "重视故事", ko: "스토리 중시" },
    "段階変化": { zh: "阶段变化", ko: "단계 변화" },
    "膝裏": { zh: "膝后", ko: "오금" },
    "ひかがみ": { zh: "膝后", ko: "오금" },
    "太もも": { zh: "大腿", ko: "허벅지" },
    "絶対領域": { zh: "绝对领域", ko: "절대영역" },
    "ローアングル": { zh: "低角度", ko: "로우앵글" },
    "オムニバス": { zh: "合集", ko: "옴니버스" },
    "口元フェチ": { zh: "口元要素", ko: "입가 취향" },
    "唇": { zh: "嘴唇", ko: "입술" },
    "しずく": { zh: "水滴", ko: "물방울" },
    "接写": { zh: "近距离特写", ko: "클로즈업" },
    "質感重視": { zh: "重视质感", ko: "질감 중시" },
    "放尿": { zh: "放尿", ko: "방뇨" },
    "おもらし": { zh: "失禁", ko: "오모라시" },
    "極尻": { zh: "极臀", ko: "극힙" },
    "観察視点": { zh: "观察视角", ko: "관찰 시점" },
    "情景重視": { zh: "重视情景", ko: "정경 중시" },
    "ストーリー系": { zh: "故事向", ko: "스토리형" },
    "理性低下": { zh: "理性降低", ko: "이성 저하" },
    "日常空間": { zh: "日常空间", ko: "일상 공간" },
    "長編シチュエーション": { zh: "长篇情境", ko: "장편 시추에이션" },
    "段階進行": { zh: "阶段推进", ko: "단계 진행" },
    "漫画風レイアウト": { zh: "漫画式排版", ko: "만화풍 레이아웃" },
    "制服": { zh: "制服", ko: "교복" },
    "学校生活": { zh: "学校生活", ko: "학교생활" },
    "生活動線": { zh: "生活动线", ko: "생활 동선" },
    "ルーティーン": { zh: "日常流程", ko: "루틴" },
    "巫女": { zh: "巫女", ko: "무녀" },
    "肌質感": { zh: "肌肤质感", ko: "피부 질감" },
    "南国リゾート": { zh: "南国度假", ko: "남국 리조트" },
    "昼夜ギャップ": { zh: "昼夜反差", ko: "낮밤 대비" },
    "田舎": { zh: "乡下", ko: "시골" },
    "夏": { zh: "夏日", ko: "여름" },
    "幼馴染": { zh: "青梅竹马", ko: "소꿉친구" },
    "距離変化": { zh: "距离变化", ko: "거리 변화" },
    "自然背景": { zh: "自然背景", ko: "자연 배경" },
    "ヒップ特化": { zh: "臀部特化", ko: "힙 특화" },
    "密着感": { zh: "贴近感", ko: "밀착감" },
    "肉感": { zh: "肉感", ko: "육감" },
    "構図重視": { zh: "重视构图", ko: "구도 중시" },
    "南国": { zh: "南国", ko: "남국" },
    "旅行": { zh: "旅行", ko: "여행" },
    "我慢": { zh: "忍耐", ko: "참음" },
    "リゾート背景": { zh: "度假背景", ko: "리조트 배경" },
    "北海道": { zh: "北海道", ko: "홋카이도" },
    "雪景色": { zh: "雪景", ko: "설경" },
    "冬背景": { zh: "冬季背景", ko: "겨울 배경" },
    "美脚": { zh: "美腿", ko: "미각" },
    "足元": { zh: "足部", ko: "발 주변" },
    "通学": { zh: "上学路", ko: "통학" },
    "日常": { zh: "日常", ko: "일상" },
    "アートコレクション": { zh: "艺术合集", ko: "아트 컬렉션" }
  };
  const previewLinks = {
    "eroboxin-akane": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%82%A8%E3%83%AD%E3%83%9C%E3%82%AD%E3%82%B7%E3%83%B34649v2",
      promptcom: "https://prompt-com.com/ja/tags/%E3%82%A8%E3%83%AD%E3%83%9C%E3%82%AD%E3%82%B7%E3%83%B3v2%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "eroboxin-4649": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%82%A8%E3%83%AD%E3%83%9C%E3%82%AD%E3%82%B7%E3%83%B34649",
      promptcom: "https://prompt-com.com/ja/tags/%E3%82%A8%E3%83%AD%E3%83%9C%E3%82%AD%E3%82%B7%E3%83%B3v1%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "hikagami-school": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E7%99%BB%E6%A0%A1%E7%B7%A8",
      promptcom: "https://prompt-com.com/ja/tags/%E3%81%B2%E3%81%8B%E3%81%8C%E3%81%BF%E7%99%BB%E6%A0%A1%E7%B7%A8%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "shizuku-record": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%81%97%E3%81%9A%E3%81%8F%E3%81%AE%E8%A8%98%E9%8C%B2",
      promptcom: "https://prompt-com.com/ja/tags/%E3%81%97%E3%81%9A%E3%81%8F%E3%81%AE%E8%A8%98%E9%8C%B2%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "momoiro-baito": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E6%A1%83%E8%89%B2%E3%83%90%E3%82%A4%E3%83%88",
      promptcom: "https://prompt-com.com/ja/tags/%E6%A1%83%E8%89%B2%E3%83%90%E3%82%A4%E3%83%88%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "okinawa-soso": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%81%A1%E3%82%85%E3%82%89%E3%81%95%E3%82%93%E7%B2%97%E7%9B%B8",
      promptcom: "https://prompt-com.com/ja/tags/%E6%B2%96%E7%B8%84%E3%81%A1%E3%82%85%E3%82%89%E3%81%95%E3%82%93%E7%B2%97%E7%9B%B8%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "kinpatsu-miko": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E5%83%95%E3%81%A3%E5%AD%90",
      promptcom: "https://prompt-com.com/ja/tags/%E9%87%91%E9%AB%AA%E5%B7%AB%E5%A5%B3v1%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "ancient-capital-beauty": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E5%8F%A4%E9%83%BD%E7%BE%8E%E4%BA%BA",
      promptcom: "https://prompt-com.com/ja/tags/%E5%8F%A4%E9%83%BD%E7%BE%8E%E4%BA%BA%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "hokkaido-omorashi": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E5%8C%97%E6%B5%B7%E9%81%93%E3%81%8A%E3%82%82%E3%82%89%E3%81%97%E7%B4%80%E8%A1%8C",
      promptcom: "https://prompt-com.com/ja/tags/%E5%8C%97%E6%B5%B7%E9%81%93%E3%81%8A%E3%82%82%E3%82%89%E3%81%97%E7%B4%80%E8%A1%8C%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "setouchi-omorashi": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E7%80%AC%E6%88%B8%E5%86%85%E3%81%8A%E3%82%82%E3%82%89%E3%81%97%E7%B4%80%E8%A1%8C",
      promptcom: "https://prompt-com.com/ja/tags/%E7%80%AC%E6%88%B8%E5%86%85%E3%81%8A%E3%82%82%E3%82%89%E3%81%97%E7%B4%80%E8%A1%8C%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "gokujiri": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%81%94%E3%81%8F%E3%81%98%E3%82%8A",
      promptcom: "https://prompt-com.com/ja/tags/%E3%81%94%E3%81%8F%E3%81%98%E3%82%8A%E5%86%8D%E7%B7%A8%E7%89%88%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "hikagami": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E3%81%B2%E3%81%8B%E3%81%8C%E3%81%BF%E5%A5%BD",
      promptcom: "https://prompt-com.com/ja/tags/%E3%81%B2%E3%81%8B%E3%81%8C%E3%81%BF%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    },
    "satogaeri": {
      pixiv: "https://www.pixiv.net/users/21257126/artworks/%E9%87%8C%E5%B8%B0%E3%82%8A",
      promptcom: "https://prompt-com.com/ja/tags/%E9%87%8C%E5%B8%B0%E3%82%8A%E7%84%A1%E6%96%99?product_typegallery&rating=all"
    }
  };

  const savedLang = localStorage.getItem("archiveLang") || "ja";
  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === savedLang);
    button.addEventListener("click", () => {
      localStorage.setItem("archiveLang", button.dataset.lang);
      languageButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });
  document.documentElement.lang = savedLang;

  function currentLang() {
    return localStorage.getItem("archiveLang") || "ja";
  }

  function uiText(key) {
    const lang = currentLang();
    return ui[lang]?.[key] || ui.ja[key];
  }

  function titleOf(item) {
    const lang = currentLang();
    return titleTranslations[item.id]?.[lang] || item.title[lang] || item.title.en || item.title.ja;
  }

  function summaryOf(item) {
    const lang = currentLang();
    return shortTranslations[item.id]?.summary?.[lang] || item.summary;
  }

  function formatOf(item) {
    const lang = currentLang();
    return shortTranslations[item.id]?.format?.[lang] || item.format;
  }

  function focusOf(item) {
    const lang = currentLang();
    return shortTranslations[item.id]?.focus?.[lang] || item.focus;
  }

  function labelOf(text) {
    const lang = currentLang();
    return labelTranslations[text]?.[lang] || text;
  }

  function localizedDescription(item) {
    const lang = currentLang();
    return item.description[lang] || item.description.ja;
  }

  function countBadgeText(item) {
    const lang = currentLang();
    const count = item.count || "";
    if (!count) return "";
    if (lang === "en") {
      return count
        .replace("枚", " images")
        .replace("ページ", " pages");
    }
    if (lang === "zh") {
      return count
        .replace("枚", "张")
        .replace("ページ", "页");
    }
    if (lang === "ko") {
      return count
        .replace("枚", "장")
        .replace("ページ", "페이지");
    }
    return count.includes("枚") ? `${count}収録` : count;
  }

  function salesFormatBadgesFor(item) {
    const separator = currentLang() === "ja" ? "：" : ": ";
    const formats = {
      FANZA: "4K ZIP",
      DLsite: "4K ZIP",
      DiGiket: "4K ZIP + PDF",
      pictSPACE: "ZIP + PDF",
      BOOTH: "ZIP + PDF",
      "Kindle JP": "Kindle",
      "Kindle US": "Kindle"
    };
    return item.salesLinks
      .filter((link) => formats[link.label])
      .map((link) => `${link.label}${separator}${formats[link.label]}`);
  }

  function renderArchiveBadges(item) {
    const contentLabels = [
      { label: countBadgeText(item), type: "primary" },
      { label: labelOf(item.series), type: "genre" },
      ...item.tags.slice(0, 2).map((tag) => ({ label: labelOf(tag), type: "genre" }))
    ].filter((badge) => badge.label).slice(0, 5);
    const formatLabels = salesFormatBadgesFor(item).map((label) => ({ label, type: "format" }));
    const labels = [...contentLabels, ...formatLabels];

    return `<div class="archive-badges detail-badges">
      ${labels.map((badge) => `<span class="archive-badge ${badge.type}">${badge.label}</span>`).join("")}
    </div>`;
  }

  function relatedWorks(item) {
    return item.related
      .map((id) => works.find((candidate) => candidate.id === id))
      .filter(Boolean);
  }

  function relationLabel(base, item) {
    if (base.series === item.series) return uiText("sameSeries");
    if (base.tags.some((tag) => item.tags.includes(tag))) return uiText("relatedFetish");
    return uiText("closeWorld");
  }

  function renderSales(item) {
    return item.salesLinks.map((link) => {
      const href = link.url || "#";
      const className = link.url ? "sales-button" : "sales-button disabled";
      const label = link.url ? link.label : `${link.label} / ${copy.unavailable}`;
      return `<a class="${className}" href="${href}" ${link.url ? 'target="_blank" rel="noopener"' : ""}>${label}</a>`;
    }).join("");
  }

  function renderPreviewLinks(item) {
    const links = previewLinks[item.id];
    if (!links) return "";
    return `
      <div class="detail-panel preview-links-panel">
        <h2>${uiText("preview")}</h2>
        <div class="preview-detail-links">
          <a class="sales-button" href="${links.pixiv}" target="_blank" rel="noopener">${uiText("pixiv")}</a>
          <a class="sales-button" href="${links.promptcom}" target="_blank" rel="noopener">${uiText("promptcom")}</a>
        </div>
      </div>
    `;
  }

  function render() {
    document.documentElement.lang = currentLang();
    staticTranslatableNodes.forEach((node) => {
      node.textContent = node.dataset[currentLang()] || node.dataset.ja;
    });
    document.title = `${titleOf(work)} | Esunamura Collection`;
    app.innerHTML = `
      <section class="detail-hero">
        <div class="cover-frame">
          <img src="${work.cover}" alt="${titleOf(work)} 表紙">
          ${renderArchiveBadges(work)}
        </div>
        <div class="detail-copy">
          <p class="eyebrow">${work.series}</p>
          <h1>${titleOf(work)}</h1>
          <p class="lead">${summaryOf(work)}</p>
          <div class="quick-facts">
            <div class="fact-primary"><span>Structure</span><strong>${formatOf(work)}</strong></div>
            <div class="fact-primary"><span>Focus</span><strong>${focusOf(work)}</strong></div>
            <div><span>Volume</span><strong>${work.count}</strong></div>
          </div>
          <h2>${uiText("sales")}</h2>
          <div class="sales-links">${renderSales(work)}</div>
        </div>
      </section>

      <section class="detail-layout">
        <article class="detail-panel">
          <p class="eyebrow">Story / Situation</p>
          <h2>${uiText("story")}</h2>
          <div class="description">${localizedDescription(work)}</div>
        </article>
        <aside class="sidebar">
          <div class="detail-panel">
            <h2>${uiText("phases")}</h2>
            <div class="phase-list">
              ${work.phases.map((phase) => `<span class="phase-chip">${labelOf(phase)}</span>`).join("")}
            </div>
          </div>
          <div class="detail-panel">
            <h2>${uiText("tags")}</h2>
            <div class="meta-row">
              ${work.tags.map((tag) => `<span class="tag">${labelOf(tag)}</span>`).join("")}
            </div>
          </div>
          ${renderPreviewLinks(work)}
        </aside>
      </section>

      <section class="gallery-section" id="samples">
        <p class="eyebrow">Samples</p>
        <h2>${uiText("gallery")}</h2>
        <div class="sample-gallery">
          ${work.samples.map((sample, index) => `
            <a href="${sample}" target="_blank" rel="noopener">
              <img src="${sample}" alt="${titleOf(work)} サンプル ${index + 1}" loading="lazy">
            </a>
          `).join("")}
        </div>
      </section>

      <section class="related-section">
        <p class="eyebrow">Series / Related</p>
        <h2>${uiText("related")}</h2>
        <div class="related-grid">
          ${relatedWorks(work).map((item) => `
            <a class="related-card" href="title.html?id=${encodeURIComponent(item.id)}">
              <div class="related-cover">
                <img src="${item.cover}" alt="${titleOf(item)} 表紙" loading="lazy">
              </div>
              <div class="related-body">
                <p class="eyebrow">${item.series}</p>
                <span class="relation-badge">${relationLabel(work, item)}</span>
                <h3>${titleOf(item)}</h3>
                <p>${summaryOf(item)}</p>
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (!work) {
    app.innerHTML = `<section class="not-found"><div><h1>Title not found</h1><p><a href="index.html">作品一覧へ戻る</a></p></div></section>`;
    return;
  }

  render();
})();
