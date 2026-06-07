(function () {
  const root = document.querySelector("#outfitCategories");
  const data = window.outfitPromptData;
  const selectedCategoryId = document.body.dataset.outfitCategory || "";
  const rootPrefix = document.body.dataset.rootPrefix || "../../";
  const languageButtons = document.querySelectorAll(".lang-button");

  if (!root || !data?.categories) return;

  const uiText = {
    importantTags: {
      ja: "重要タグ",
      en: "Key tag",
      zh: "重要标签",
      ko: "중요 태그"
    },
    verificationResult: {
      ja: "検証結果",
      en: "Result note",
      zh: "验证结果",
      ko: "검증 결과"
    },
    unset: {
      ja: "未設定",
      en: "Not set",
      zh: "未设置",
      ko: "미설정"
    },
    sampleAltPrefix: {
      ja: "SDXL 服装プロンプト検証",
      en: "SDXL outfit prompt verification",
      zh: "SDXL 服装 Prompt 验证",
      ko: "SDXL 의상 프롬프트 검증"
    },
    sampleAltSuffix: {
      ja: "の生成サンプル",
      en: " generation sample",
      zh: "生成样本",
      ko: "생성 샘플"
    },
    positivePrompt: {
      ja: "Positive Prompt",
      en: "Positive Prompt",
      zh: "正向 Prompt",
      ko: "Positive Prompt"
    },
    negativePrompt: {
      ja: "Negative Prompt",
      en: "Negative Prompt",
      zh: "负向 Prompt",
      ko: "Negative Prompt"
    },
    outfitSet: {
      ja: "服装セット",
      en: "Outfit Set",
      zh: "服装组",
      ko: "의상 세트"
    }
  };

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function currentLanguage() {
    try {
      return window.localStorage.getItem("archiveLang") || "ja";
    } catch (error) {
      return "ja";
    }
  }

  function localized(value, language = currentLanguage()) {
    if (!value || typeof value !== "object") return value || "";
    return value[language] || value.ja || "";
  }

  function clothingPromptText(prompt) {
    return String(prompt || "")
      .replace(/^adult woman character,\s*/i, "")
      .trim();
  }

  function titleCase(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b[a-z]/g, (char) => char.toUpperCase());
  }

  const displayTranslations = {
    "リネンシャツ": { en: "Linen Shirt", zh: "亚麻衬衫", ko: "리넨 셔츠" },
    "半袖リネンシャツ": { en: "Short-Sleeve Linen Shirt", zh: "短袖亚麻衬衫", ko: "반소매 리넨 셔츠" },
    "シアーシャツ羽織り": { en: "Sheer Shirt Layer", zh: "透纱衬衫外搭", ko: "시어 셔츠 아우터" },
    "UVカットカーディガン": { en: "UV-Cut Cardigan", zh: "防晒开衫", ko: "UV 차단 카디건" },
    "サマーニット": { en: "Summer Knit Top", zh: "夏季针织上衣", ko: "서머 니트" },
    "ノースリーブブラウス": { en: "Sleeveless Blouse", zh: "无袖罩衫", ko: "민소매 블라우스" },
    "フレンチスリーブトップス": { en: "French-Sleeve Top", zh: "法式袖上衣", ko: "프렌치 슬리브 톱" },
    "ボートネックカットソー": { en: "Boat-Neck Cut-and-Sew Top", zh: "船领针织上衣", ko: "보트넥 컷소" },
    "五分袖カットソー": { en: "Elbow-Sleeve Cut-and-Sew Top", zh: "五分袖针织上衣", ko: "5부 소매 컷소" },
    "七分袖ブラウス": { en: "Three-Quarter Sleeve Blouse", zh: "七分袖罩衫", ko: "7부 소매 블라우스" },
    "薄手ロングシャツ": { en: "Light Long Shirt", zh: "薄款长衬衫", ko: "얇은 롱 셔츠" },
    "ワイドパンツ": { en: "Wide-Leg Pants", zh: "阔腿裤", ko: "와이드 팬츠" },
    "リネンワイドパンツ": { en: "Linen Wide-Leg Pants", zh: "亚麻阔腿裤", ko: "리넨 와이드 팬츠" },
    "クロップドパンツ": { en: "Cropped Pants", zh: "九分裤", ko: "크롭트 팬츠" },
    "テーパードパンツ": { en: "Tapered Pants", zh: "锥形裤", ko: "테이퍼드 팬츠" },
    "チノパン": { en: "Chino Pants", zh: "卡其休闲裤", ko: "치노 팬츠" },
    "デニムスカート": { en: "Denim Skirt", zh: "牛仔裙", ko: "데님 스커트" },
    "マーメイドスカート": { en: "Mermaid Skirt", zh: "鱼尾裙", ko: "머메이드 스커트" },
    "プリーツスカート": { en: "Pleated Skirt", zh: "百褶裙", ko: "플리츠 스커트" },
    "ティアードスカート": { en: "Tiered Skirt", zh: "蛋糕裙", ko: "티어드 스커트" },
    "シャツ＋ワイドパンツ": { en: "Shirt + Wide-Leg Pants", zh: "衬衫＋阔腿裤", ko: "셔츠＋와이드 팬츠" },
    "ブラウス＋テーパードパンツ": { en: "Blouse + Tapered Pants", zh: "罩衫＋锥形裤", ko: "블라우스＋테이퍼드 팬츠" },
    "サマーニット＋ロングスカート": { en: "Summer Knit + Long Skirt", zh: "夏季针织＋长裙", ko: "서머 니트＋롱스커트" },
    "Tシャツ＋プリーツスカート": { en: "T-Shirt + Pleated Skirt", zh: "T恤＋百褶裙", ko: "티셔츠＋플리츠 스커트" },
    "ノースリーブ＋カーディガン肩掛け": { en: "Sleeveless Top + Draped Cardigan", zh: "无袖上衣＋披肩开衫", ko: "민소매＋어깨에 건친 카디건" },
    "薄手ジャケット私服": { en: "Light Casual Jacket", zh: "薄款休闲夹克", ko: "얇은 캐주얼 재킷" },
    "デニムジャケット": { en: "Denim Jacket", zh: "牛仔夹克", ko: "데님 재킷" },
    "シャツジャケット": { en: "Shirt Jacket", zh: "衬衫夹克", ko: "셔츠 재킷" },
    "薄手パーカー": { en: "Light Hoodie", zh: "薄款连帽衫", ko: "얇은 후디" },
    "レインジャケット": { en: "Rain Jacket", zh: "雨衣夹克", ko: "레인 재킷" },
    "秋色カーディガン": { en: "Autumn-Color Cardigan", zh: "秋色开衫", ko: "가을색 카디건" },
    "薄手ニットベスト": { en: "Light Knit Vest", zh: "薄款针织背心", ko: "얇은 니트 베스트" },
    "チェックシャツ羽織り": { en: "Plaid Shirt Layer", zh: "格纹衬衫外搭", ko: "체크 셔츠 아우터" },
    "ロゴなしスウェット": { en: "Plain Sweatshirt", zh: "无标志卫衣", ko: "로고 없는 스웨트셔츠" },
    "薄手タートルネック": { en: "Light Turtleneck", zh: "薄款高领上衣", ko: "얇은 터틀넥" },
    "ジャンパースカート風私服": { en: "Jumper-Skirt Style Casual Outfit", zh: "背带裙风私服", ko: "점퍼스커트풍 캐주얼" },
    "リネンワンピース": { en: "Linen Dress", zh: "亚麻连衣裙", ko: "리넨 원피스" },
    "コットンワンピース": { en: "Cotton Dress", zh: "棉质连衣裙", ko: "코튼 원피스" },
    "シアーワンピース": { en: "Sheer Dress", zh: "透纱连衣裙", ko: "시어 원피스" },
    "半袖シャツワンピース": { en: "Short-Sleeve Shirt Dress", zh: "短袖衬衫连衣裙", ko: "반소매 셔츠 원피스" },
    "七分袖シャツワンピース": { en: "Three-Quarter Sleeve Shirt Dress", zh: "七分袖衬衫连衣裙", ko: "7부 소매 셔츠 원피스" },
    "フレンチスリーブワンピース": { en: "French-Sleeve Dress", zh: "法式袖连衣裙", ko: "프렌치 슬리브 원피스" },
    "カットソーワンピース": { en: "Cut-and-Sew Dress", zh: "针织连衣裙", ko: "컷소 원피스" },
    "Tシャツワンピース": { en: "T-Shirt Dress", zh: "T恤连衣裙", ko: "티셔츠 원피스" },
    "リゾート風ワンピース": { en: "Resort-Style Dress", zh: "度假风连衣裙", ko: "리조트풍 원피스" },
    "小花柄ワンピース": { en: "Small Floral Dress", zh: "小碎花连衣裙", ko: "잔꽃무늬 원피스" },
    "ボタニカル柄ワンピース": { en: "Botanical Print Dress", zh: "植物图案连衣裙", ko: "보태니컬 무늬 원피스" },
    "ストライプワンピース": { en: "Striped Dress", zh: "条纹连衣裙", ko: "스트라이프 원피스" },
    "ドットワンピース": { en: "Polka-Dot Dress", zh: "波点连衣裙", ko: "도트 원피스" },
    "ギンガムチェックワンピース": { en: "Gingham Check Dress", zh: "格子连衣裙", ko: "깅엄 체크 원피스" },
    "ティアードワンピース": { en: "Tiered Dress", zh: "蛋糕连衣裙", ko: "티어드 원피스" },
    "プリーツワンピース": { en: "Pleated Dress", zh: "百褶连衣裙", ko: "플리츠 원피스" },
    "ラップワンピース": { en: "Wrap Dress", zh: "裹身连衣裙", ko: "랩 원피스" },
    "ウエストリボンワンピース": { en: "Waist-Ribbon Dress", zh: "腰带蝴蝶结连衣裙", ko: "웨이스트 리본 원피스" },
    "キャミワンピ＋Tシャツ": { en: "Camisole Dress + T-Shirt", zh: "吊带连衣裙＋T恤", ko: "캐미 원피스＋티셔츠" },
    "キャミワンピ＋ブラウス": { en: "Camisole Dress + Blouse", zh: "吊带连衣裙＋罩衫", ko: "캐미 원피스＋블라우스" },
    "ジャンパースカート": { en: "Jumper Dress", zh: "背带连衣裙", ko: "점퍼스커트" },
    "デニムワンピース": { en: "Denim Dress", zh: "牛仔连衣裙", ko: "데님 원피스" },
    "ライトデニムワンピース": { en: "Light Denim Dress", zh: "浅色牛仔连衣裙", ko: "라이트 데님 원피스" },
    "カーキワンピース": { en: "Khaki Dress", zh: "卡其色连衣裙", ko: "카키 원피스" },
    "ベージュワンピース": { en: "Beige Dress", zh: "米色连衣裙", ko: "베이지 원피스" },
    "秋色ワンピース": { en: "Autumn-Color Dress", zh: "秋色连衣裙", ko: "가을색 원피스" },
    "薄手ニットワンピース": { en: "Light Knit Dress", zh: "薄款针织连衣裙", ko: "얇은 니트 원피스" },
    "七分袖ワンピース": { en: "Three-Quarter Sleeve Dress", zh: "七分袖连衣裙", ko: "7부 소매 원피스" },
    "長袖薄手ワンピース": { en: "Light Long-Sleeve Dress", zh: "薄款长袖连衣裙", ko: "얇은 긴소매 원피스" },
    "カーディガン合わせワンピース": { en: "Dress with Cardigan", zh: "开衫搭配连衣裙", ko: "카디건 매치 원피스" },
    "シャツ羽織りワンピース": { en: "Dress with Shirt Layer", zh: "衬衫外搭连衣裙", ko: "셔츠 아우터 원피스" },
    "レインデイワンピース": { en: "Rainy-Day Dress", zh: "雨天连衣裙", ko: "레인 데이 원피스" },
    "晩夏ワンピース": { en: "Late-Summer Dress", zh: "晚夏连衣裙", ko: "늦여름 원피스" },
    "初秋ワンピース": { en: "Early-Autumn Dress", zh: "初秋连衣裙", ko: "초가을 원피스" }
  };

  function translatedDisplay(item, language) {
    const key = item.display || "";
    return displayTranslations[key]?.[language] || "";
  }

  const fallbackTermTranslations = {
    zh: {
      "前開きシャツパジャマ": "前开襟衬衫睡衣",
      "ロングパンツパジャマ": "长裤睡衣",
      "ショートパンツパジャマ": "短裤睡衣",
      "七分袖パジャマ": "七分袖睡衣",
      "半袖パジャマ": "短袖睡衣",
      "長袖パジャマ": "长袖睡衣",
      "襟付きパジャマ": "有领睡衣",
      "ノーカラーパジャマ": "无领睡衣",
      "ストライプパジャマ": "条纹睡衣",
      "チェックパジャマ": "格纹睡衣",
      "無地パジャマ": "纯色睡衣",
      "花柄パジャマ": "花纹睡衣",
      "ドット柄パジャマ": "波点睡衣",
      "サテン風パジャマ": "缎面风睡衣",
      "シルク風パジャマ": "丝绸风睡衣",
      "薄手夏パジャマ": "薄款夏季睡衣",
      "厚手冬パジャマ": "厚款冬季睡衣",
      "オーバーサイズTシャツ": "宽松大码T恤",
      "ロングTシャツ部屋着": "长款T恤居家服",
      "Tシャツ＋ロングパンツ": "T恤＋长裤",
      "Tシャツ＋ショートパンツ": "T恤＋短裤",
      "キャミソール＋ショートパンツ": "吊带背心＋短裤",
      "キャミソール＋ロングパンツ": "吊带背心＋长裤",
      "タンクトップ部屋着": "背心居家服",
      "タンクトップ＋ショートパンツ": "背心＋短裤",
      "ロングネグリジェ": "长款睡裙",
      "半袖ネグリジェ": "短袖睡裙",
      "ワンピース型ルームウェア": "连衣裙式居家服",
      "カットソーワンピ部屋着": "针织连衣裙居家服",
      "スウェットワンピ": "卫衣连衣裙",
      "ジョガーパンツ部屋着": "束脚裤居家服",
      "ジップパーカー部屋着": "拉链连帽衫居家服",
      "カーディガン部屋着": "开衫居家服",
      "もこもこカーディガン": "毛绒开衫",
      "ワッフルバスローブ": "华夫格浴袍",
      "ナイトキャップ付き": "带睡帽",
      "ホテルルームウェア": "酒店风居家服",
      "大人っぽいルームウェア": "成熟风居家服",
      "清楚系ルームウェア": "清爽端庄风居家服",
      "ナチュラル部屋着": "自然风居家服",
      "ワンマイル部屋着": "近邻外出居家服",
      "ホルターワンピース水着": "挂脖连体泳装",
      "スクエアネック水着": "方领泳装",
      "フリルワンピース水着": "荷叶边连体泳装",
      "ショートパンツ水着": "短裤泳装",
      "パレオ付き水着": "带沙滩巾泳装",
      "シースルーカバーアップ": "透纱罩衫外搭",
      "ビーチパーカー": "海滩连帽外套",
      "サーフパンツ水着": "冲浪短裤泳装",
      "麦わら帽子付き水着": "带草帽泳装",
      "サンダル込み水着": "含凉鞋泳装",
      "サングラス付き水着": "带太阳镜泳装",
      "ビーチバッグ付き水着": "带海滩包泳装",
      "プールサイド水着": "泳池边泳装",
      "海辺向け水着": "海边泳装",
      "川遊び水着": "溪边玩水泳装",
      "ナイトプール水着": "夜间泳池泳装",
      "室内プール水着": "室内泳池泳装",
      "定番": "经典",
      "紺地": "深蓝底",
      "白地": "白底",
      "淡色": "浅色",
      "黒地": "黑底",
      "朝顔柄": "牵牛花图案",
      "金魚柄": "金鱼图案",
      "紫陽花柄": "绣球花图案",
      "花火柄": "烟花图案",
      "縞柄": "条纹",
      "市松柄": "棋盘格",
      "古典柄": "古典图案",
      "モダン柄": "现代图案",
      "レトロ": "复古",
      "大人っぽい": "成熟风",
      "清楚系": "清爽端庄风",
      "夏祭り": "夏日祭典",
      "花火大会": "烟花大会",
      "古都散策": "古都散步",
      "室内くつろぎ": "室内休闲",
      "湯上がり": "浴后",
      "帯リボン": "蝴蝶结腰带",
      "兵児帯": "兵儿带",
      "半幅帯": "半幅带",
      "下駄込み": "含木屐",
      "巾着込み": "含束口包",
      "羽織付き": "带羽织",
      "肩掛けショール": "披肩",
      "涼しげ": "清凉感",
      "落ち着き": "沉稳",
      "華やか": "华丽",
      "生成り": "本色布",
      "藍染風": "靛染风",
      "浴衣＋うちわ": "浴衣＋团扇",
      "浴衣＋扇子": "浴衣＋折扇",
      "三角": "三角",
      "バンドゥ": "抹胸",
      "ホルターネック": "挂脖",
      "ハイウエスト": "高腰",
      "フリル": "荷叶边",
      "スポーティ": "运动风",
      "ワンピース": "连体",
      "競泳": "竞技",
      "フィットネス": "健身",
      "リゾート": "度假风",
      "白": "白色",
      "黒": "黑色",
      "花柄": "花纹",
      "ボーダー": "横条纹",
      "ドット": "波点",
      "リボン付き": "带蝴蝶结",
      "ガーゼ": "纱布棉",
      "ネル": "法兰绒",
      "ワッフル": "华夫格",
      "もこもこ": "毛绒",
      "フリース": "摇粒绒",
      "スウェット上下": "卫衣套装",
      "パーカー": "连帽衫",
      "バスローブ": "浴袍",
      "ナイトガウン": "睡袍",
      "薄手ガウン": "薄款睡袍",
      "キルト風ガウン": "绗缝风睡袍",
      "旅館": "旅馆",
      "温泉": "温泉",
      "ルームソックス付き": "带居家袜",
      "ブランケット羽織り": "披毯外搭",
      "ネグリジェ": "睡裙",
      "パジャマ": "睡衣",
      "部屋着": "居家服",
      "ルームウェア": "居家服",
      "浴衣": "浴衣",
      "ビキニ": "比基尼",
      "タンキニ": "坦基尼",
      "ラッシュガード": "防晒泳衣",
      "水着": "泳装"
    },
    ko: {
      "前開きシャツパジャマ": "앞트임 셔츠 파자마",
      "ロングパンツパジャマ": "긴바지 파자마",
      "ショートパンツパジャマ": "반바지 파자마",
      "七分袖パジャマ": "7부 소매 파자마",
      "半袖パジャマ": "반소매 파자마",
      "長袖パジャマ": "긴소매 파자마",
      "襟付きパジャマ": "칼라 파자마",
      "ノーカラーパジャマ": "노칼라 파자마",
      "ストライプパジャマ": "스트라이프 파자마",
      "チェックパジャマ": "체크 파자마",
      "無地パジャマ": "무지 파자마",
      "花柄パジャマ": "꽃무늬 파자마",
      "ドット柄パジャマ": "도트 파자마",
      "サテン風パジャマ": "새틴풍 파자마",
      "シルク風パジャマ": "실크풍 파자마",
      "薄手夏パジャマ": "얇은 여름 파자마",
      "厚手冬パジャマ": "두꺼운 겨울 파자마",
      "オーバーサイズTシャツ": "오버사이즈 티셔츠",
      "ロングTシャツ部屋着": "롱 티셔츠 룸웨어",
      "Tシャツ＋ロングパンツ": "티셔츠＋긴바지",
      "Tシャツ＋ショートパンツ": "티셔츠＋반바지",
      "キャミソール＋ショートパンツ": "캐미솔＋반바지",
      "キャミソール＋ロングパンツ": "캐미솔＋긴바지",
      "タンクトップ部屋着": "탱크톱 룸웨어",
      "タンクトップ＋ショートパンツ": "탱크톱＋반바지",
      "ロングネグリジェ": "롱 네글리제",
      "半袖ネグリジェ": "반소매 네글리제",
      "ワンピース型ルームウェア": "원피스형 룸웨어",
      "カットソーワンピ部屋着": "컷소 원피스 룸웨어",
      "スウェットワンピ": "스웨트 원피스",
      "ジョガーパンツ部屋着": "조거 팬츠 룸웨어",
      "ジップパーカー部屋着": "집업 후디 룸웨어",
      "カーディガン部屋着": "카디건 룸웨어",
      "もこもこカーディガン": "복슬복슬 카디건",
      "ワッフルバスローブ": "와플 배스로브",
      "ナイトキャップ付き": "나이트캡 포함",
      "ホテルルームウェア": "호텔 룸웨어",
      "大人っぽいルームウェア": "성숙한 룸웨어",
      "清楚系ルームウェア": "단정한 룸웨어",
      "ナチュラル部屋着": "내추럴 룸웨어",
      "ワンマイル部屋着": "원마일 룸웨어",
      "ホルターワンピース水着": "홀터 원피스 수영복",
      "スクエアネック水着": "스퀘어넥 수영복",
      "フリルワンピース水着": "프릴 원피스 수영복",
      "ショートパンツ水着": "반바지 수영복",
      "パレオ付き水着": "파레오 포함 수영복",
      "シースルーカバーアップ": "시스루 커버업",
      "ビーチパーカー": "비치 후디",
      "サーフパンツ水着": "서프 팬츠 수영복",
      "麦わら帽子付き水着": "밀짚모자 포함 수영복",
      "サンダル込み水着": "샌들 포함 수영복",
      "サングラス付き水着": "선글라스 포함 수영복",
      "ビーチバッグ付き水着": "비치백 포함 수영복",
      "プールサイド水着": "풀사이드 수영복",
      "海辺向け水着": "해변용 수영복",
      "川遊び水着": "물놀이 수영복",
      "ナイトプール水着": "나이트풀 수영복",
      "室内プール水着": "실내 풀 수영복",
      "定番": "기본",
      "紺地": "남색 바탕",
      "白地": "흰 바탕",
      "淡色": "연한 색",
      "黒地": "검은 바탕",
      "朝顔柄": "나팔꽃 무늬",
      "金魚柄": "금붕어 무늬",
      "紫陽花柄": "수국 무늬",
      "花火柄": "불꽃 무늬",
      "縞柄": "줄무늬",
      "市松柄": "체커보드 무늬",
      "古典柄": "고전 무늬",
      "モダン柄": "모던 무늬",
      "レトロ": "레트로",
      "大人っぽい": "성숙한",
      "清楚系": "단정한",
      "夏祭り": "여름 축제",
      "花火大会": "불꽃놀이",
      "古都散策": "고도 산책",
      "室内くつろぎ": "실내 휴식",
      "湯上がり": "목욕 후",
      "帯リボン": "리본 오비",
      "兵児帯": "헤코 오비",
      "半幅帯": "한하바 오비",
      "下駄込み": "게타 포함",
      "巾着込み": "킨차쿠 포함",
      "羽織付き": "하오리 포함",
      "肩掛けショール": "숄 걸침",
      "涼しげ": "시원한 느낌",
      "落ち着き": "차분한",
      "華やか": "화사한",
      "生成り": "내추럴 베이지",
      "藍染風": "쪽염색풍",
      "浴衣＋うちわ": "유카타＋부채",
      "浴衣＋扇子": "유카타＋접부채",
      "三角": "트라이앵글",
      "バンドゥ": "반도",
      "ホルターネック": "홀터넥",
      "ハイウエスト": "하이웨이스트",
      "フリル": "프릴",
      "スポーティ": "스포티",
      "ワンピース": "원피스",
      "競泳": "경영",
      "フィットネス": "피트니스",
      "リゾート": "리조트",
      "白": "화이트",
      "黒": "블랙",
      "花柄": "꽃무늬",
      "ボーダー": "가로줄",
      "ドット": "도트",
      "リボン付き": "리본 포함",
      "ガーゼ": "거즈",
      "ネル": "플란넬",
      "ワッフル": "와플",
      "もこもこ": "복슬복슬",
      "フリース": "플리스",
      "スウェット上下": "스웨트 세트",
      "パーカー": "후디",
      "バスローブ": "배스로브",
      "ナイトガウン": "나이트가운",
      "薄手ガウン": "얇은 가운",
      "キルト風ガウン": "퀼트풍 가운",
      "旅館": "료칸",
      "温泉": "온천",
      "ルームソックス付き": "룸삭스 포함",
      "ブランケット羽織り": "블랭킷 걸침",
      "ネグリジェ": "네글리제",
      "パジャマ": "파자마",
      "部屋着": "룸웨어",
      "ルームウェア": "룸웨어",
      "浴衣": "유카타",
      "ビキニ": "비키니",
      "タンキニ": "탱키니",
      "ラッシュガード": "래시가드",
      "水着": "수영복"
    }
  };

  function translatedFallbackLabel(item, language) {
    const source = item.display || item.label || "";
    const dictionary = fallbackTermTranslations[language];
    if (!source || !dictionary) return "";
    if (dictionary[source]) return dictionary[source];
    const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
    let translated = source;
    keys.forEach((key) => {
      translated = translated.split(key).join(dictionary[key]);
    });
    return translated === source ? "" : translated;
  }

  function promptLabel(item) {
    const prompt = clothingPromptText(item.prompt)
      .replace(/,\s*all-ages outfit reference.*$/i, "")
      .replace(/,\s*clean anime illustration.*$/i, "");
    const first = prompt.split(",").slice(0, 2).join(",").trim();
    return titleCase(first || item.code);
  }

  function itemLabel(item, language = currentLanguage()) {
    if (language === "ja") {
      if (item.display) return item.display;
      return item.label || item.code;
    }
    const translated = translatedDisplay(item, language);
    if (translated) return translated;
    const fallback = translatedFallbackLabel(item, language);
    if (fallback) return fallback;
    if (language === "zh" || language === "ko") return item.display || item.label || item.code;
    return item[`label_${language}`] || promptLabel(item);
  }

  function hasAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
  }

  function japaneseVerificationNote(item, category) {
    const prompt = clothingPromptText(item.prompt).toLowerCase();
    const label = item.label || item.code;
    const observations = [];

    if (category?.id === "casual") {
      observations.push("日常服としての自然さと、季節ごとの軽さ・重ね着感が出るかを確認しています。");
    } else if (category?.id === "onepiece") {
      observations.push("一枚服としての丈・ウエスト位置・裾の流れが安定して出るかを確認しています。");
    }

    if (hasAny(prompt, ["button", "collar", "piping", "zip", "drawstring", "strap", "neckline", "obi", "sash", "panel line"])) {
      if (category?.id === "wasou") {
        observations.push("衿合わせや帯まわりの情報が、和装らしい構造として残るかを確認。");
      } else if (category?.id === "swimwear") {
        observations.push("ストラップやネックラインの違いが、シルエット差として読めるかを確認。");
      } else if (category?.id === "casual") {
        observations.push("襟・前開き・重ね着など、日常服のディテールがどこまで読み取れるかを確認。");
      } else if (category?.id === "onepiece") {
        observations.push("ネックラインや前合わせ、ウエスト位置が一枚服の構造として残るかを確認。");
      } else {
        observations.push("襟・前開き・縁取りなど、部屋着のディテールがどこまで読み取れるかを確認。");
      }
    }
    if (hasAny(prompt, ["long-sleeve", "short-sleeve", "three-quarter", "full-length", "shorts", "mini", "midi", "long skirt", "wide-leg", "hakama"])) {
      observations.push("袖丈や裾丈の差が、ポーズに埋もれず残るかを見る指定です。");
    }
    if (hasAny(prompt, ["stripe", "plaid", "floral", "polka-dot", "plain", "pattern", "motif", "gradation"])) {
      observations.push("柄の方向や密度が崩れすぎず、服装差として読めるかを見ています。");
    }
    if (hasAny(prompt, ["satin", "silk", "gauze", "flannel", "fleece", "waffle", "cotton", "jersey", "rib", "linen", "lace", "chiffon", "matte", "glossy", "sheer"])) {
      observations.push("布の厚みや光沢、やわらかさの違いが出るかを比較しやすい項目です。");
    }
    if (hasAny(prompt, ["robe", "cardigan", "haori", "cover-up", "hoodie", "rash guard", "pareo", "apron", "stole"])) {
      observations.push("重ね着や羽織り要素が、単なる色替えではなく別パーツとして出るかを確認。");
    }
    if (hasAny(prompt, ["ribbon", "bow", "hat", "sandals", "sunglasses", "bag", "hair ornament", "geta"])) {
      observations.push("小物を足したときに、主役の服装より目立ちすぎないかも見ています。");
    }

    if (category?.id === "pajama") {
      observations.push("室内着らしいゆるさと、上下セットのまとまりを確認するための服装プロンプトです。");
    } else if (category?.id === "wasou") {
      observations.push("和装らしい合わせ・帯・柄の情報が、キャラクター性を崩さず残るかを確認しています。");
    } else if (category?.id === "swimwear") {
      observations.push("露出量ではなく、シルエット・ストラップ・リゾート感の違いを比較するための指定です。");
    } else {
      observations.push("固定キャラクターの印象を保ったまま、衣装差だけを読み取れるかを確認しています。");
    }

    const unique = observations.filter((text, index) => observations.indexOf(text) === index);
    const selected = unique.slice(0, 2);
    if (!selected.length) return `${label}として、衣装の輪郭や素材感が安定して出るかを確認しています。`;
    return selected.join("");
  }

  function verificationNote(item, category, language = currentLanguage()) {
    if (language === "ja") return japaneseVerificationNote(item, category);
    const label = itemLabel(item, language);
    const templates = {
      en: `${label} outfit prompt test. Useful for comparing the clothing shape, material feel, and scene fit while keeping the character identity stable.`,
      zh: `${label} 服装 prompt 验证。用于比较在保持角色辨识度的同时，服装轮廓、材质感和场景适配是否稳定。`,
      ko: `${label} 의상 프롬프트 검증입니다. 캐릭터 인상을 유지하면서 의상 형태, 소재감, 장면 적합성이 안정적인지 비교하기 좋습니다.`
    };
    return templates[language] || templates.en;
  }

  function assetSrc(src) {
    return String(src || "").replace(/^(?:\.\.\/)+assets\//, `${rootPrefix}assets/`);
  }

  function renderPromptPanel(title, prompt) {
    const text = prompt || localized(uiText.unset);
    return `
      <section class="research-prompt-panel">
        <h4>${escapeHTML(title)}</h4>
        <pre>${escapeHTML(text)}</pre>
      </section>
    `;
  }

  function renderCard(item, category) {
    const language = currentLanguage();
    const label = itemLabel(item, language);
    const tag = itemLabel(item, language);
    const alt = `${localized(uiText.sampleAltPrefix, language)}: ${localized(category.title, language)} "${label}"${localized(uiText.sampleAltSuffix, language)}`;
    const imageSrc = assetSrc(item.src);
    const positivePrompt = clothingPromptText(item.prompt) || localized(uiText.unset, language);
    const negativePrompt = item.negative || localized(uiText.unset, language);
    const verification = verificationNote(item, category, language);
    return `
      <article class="research-candidate-card outfit-log-card" id="${escapeHTML(item.code.toLowerCase())}">
        <div class="research-candidate-media">
          <a class="research-image-link" href="${escapeHTML(imageSrc)}" data-full-alt="${escapeHTML(alt)}" target="_blank" rel="noopener noreferrer">
            <img src="${escapeHTML(imageSrc)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async" width="720" height="1234">
          </a>
        </div>
        <div class="research-candidate-copy">
          <div class="research-card-heading">
            <h3>${escapeHTML(label)}</h3>
          </div>
          <dl class="research-meta-list">
            <div><dt>${escapeHTML(localized(uiText.importantTags, language))}</dt><dd>${escapeHTML(tag)}</dd></div>
            <div><dt>${escapeHTML(localized(uiText.verificationResult, language))}</dt><dd>${escapeHTML(verification)}</dd></div>
          </dl>
          <div class="research-prompt-stack research-prompt-stack-static">
            ${renderPromptPanel(localized(uiText.positivePrompt, language), positivePrompt)}
            ${renderPromptPanel(localized(uiText.negativePrompt, language), negativePrompt)}
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const language = currentLanguage();
    const categories = selectedCategoryId
      ? data.categories.filter((category) => category.id === selectedCategoryId)
      : [];
    root.innerHTML = categories.map((category) => `
      <section class="research-section outfit-category-section" id="${escapeHTML(category.id)}">
        <div class="section-heading-row">
          <div>
            <p class="eyebrow">${escapeHTML(category.code)} ${escapeHTML(localized(uiText.outfitSet, language))}</p>
            <h2>${escapeHTML(localized(category.title, language))}</h2>
          </div>
          <p>${escapeHTML(localized(category.lead, language))}</p>
        </div>
        <div class="research-candidate-grid">
          ${category.items.map((item) => renderCard(item, category)).join("")}
        </div>
      </section>
    `).join("");
    window.installPromptCopyButtons?.(root);
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.requestAnimationFrame(render);
    });
  });

  render();
})();
