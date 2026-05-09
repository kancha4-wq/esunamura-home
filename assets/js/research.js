(function () {
  const data = window.researchSampleCandidates;
  const pageSection = document.body.dataset.researchSection || "";
  const rootPrefix = document.body.dataset.rootPrefix || "../";
  const sectionsRoot = document.querySelector("#researchSections");
  const contactRoot = document.querySelector("#researchContactSheets");
  const languageButtons = document.querySelectorAll(".lang-button");
  const translatableNodes = document.querySelectorAll("[data-ja]");
  let currentLanguage = "ja";

  const sectionCopy = {
    hairstyle: {
      ja: {
        title: "髪型プロンプト比較｜Hairstyle Prompt Guide for SDXL",
        lead: "候補画像とプロンプトを1件ずつ確認できます。"
      },
      en: {
        title: "Hairstyle Prompt Guide for SDXL",
        lead: "Check each candidate image together with its prompt notes."
      },
      zh: {
        title: "发型 Prompt 比较｜Hairstyle Prompt Guide for SDXL",
        lead: "可以逐一查看候选图像与对应的 prompt 记录。"
      },
      ko: {
        title: "헤어스타일 프롬프트 비교｜Hairstyle Prompt Guide for SDXL",
        lead: "후보 이미지와 프롬프트 기록을 하나씩 확인할 수 있습니다."
      }
    },
    bangs: {
      ja: {
        title: "前髪プロンプト比較｜Bangs Prompt Guide for SDXL",
        lead: "顔まわりの印象差を候補画像ごとに確認できます。"
      },
      en: {
        title: "Bangs Prompt Guide for SDXL",
        lead: "Compare how each candidate changes the impression around the face."
      },
      zh: {
        title: "刘海 Prompt 比较｜Bangs Prompt Guide for SDXL",
        lead: "可以按候选图像比较脸部周围印象的差异。"
      },
      ko: {
        title: "앞머리 프롬프트 비교｜Bangs Prompt Guide for SDXL",
        lead: "후보 이미지별로 얼굴 주변 인상이 어떻게 달라지는지 확인할 수 있습니다."
      }
    },
    hair_color: {
      ja: {
        title: "髪色プロンプト比較｜Hair Color Prompt Guide for SDXL",
        lead: "色味とキャラへの馴染みを候補画像ごとに確認できます。"
      },
      en: {
        title: "Hair Color Prompt Guide for SDXL",
        lead: "Compare each candidate for color tone stability and character fit."
      },
      zh: {
        title: "发色 Prompt 比较｜Hair Color Prompt Guide for SDXL",
        lead: "可以按候选图像比较色味稳定性和角色适配度。"
      },
      ko: {
        title: "헤어 컬러 프롬프트 비교｜Hair Color Prompt Guide for SDXL",
        lead: "후보 이미지별로 색감 안정성과 캐릭터와의 어울림을 비교할 수 있습니다."
      }
    },
    eyes: {
      ja: {
        title: "目プロンプト比較｜Eye Shape Prompt Guide for SDXL",
        lead: "目の形・大きさ・瞳・ハイライトによる印象差を候補画像ごとに確認できます。"
      },
      en: {
        title: "Eye Shape Prompt Guide for SDXL",
        lead: "Compare each candidate for eye shape, size, iris detail, and highlight expression."
      },
      zh: {
        title: "眼睛 Prompt 比较｜Eye Shape Prompt Guide for SDXL",
        lead: "可以按候选图像比较眼型、大小、瞳孔细节和高光表现。"
      },
      ko: {
        title: "눈 프롬프트 비교｜Eye Shape Prompt Guide for SDXL",
        lead: "후보 이미지별로 눈 모양, 크기, 홍채 디테일, 하이라이트 표현을 비교할 수 있습니다."
      }
    },
    expression: {
      ja: {
        title: "表情プロンプト比較｜Expression Prompt Guide for SDXL",
        lead: "無表情、笑顔、困り顔、怒り顔、照れ顔など、表情差を候補画像ごとに確認できます。"
      },
      en: {
        title: "Expression Prompt Guide for SDXL",
        lead: "Compare each candidate for neutral, smiling, troubled, angry, embarrassed, and other facial expressions."
      },
      zh: {
        title: "表情 Prompt 比较｜Expression Prompt Guide for SDXL",
        lead: "可以按候选图像比较无表情、笑容、困扰、愤怒、害羞等表情差异。"
      },
      ko: {
        title: "표정 프롬프트 비교｜Expression Prompt Guide for SDXL",
        lead: "무표정, 미소, 곤란한 표정, 화난 표정, 부끄러운 표정 등 표정 차이를 후보 이미지별로 확인할 수 있습니다."
      }
    }
  };

  const uiText = {
    importantTags: {
      ja: "重要タグ",
      en: "Key Tags",
      zh: "重要标签",
      ko: "중요 태그"
    },
    verificationResult: {
      ja: "検証結果",
      en: "Verification Result",
      zh: "验证结果",
      ko: "검증 결과"
    },
    unset: {
      ja: "未設定",
      en: "Not set",
      zh: "未设置",
      ko: "미설정"
    }
  };

  const candidateLabelTranslations = {
    ahoge_short_bob: { en: "Ahoge Short Bob", zh: "呆毛短波波头", ko: "아호게 쇼트 보브" },
    ahoge_medium_side_strands: { en: "Soft Medium Hair with Face-Framing Strands", zh: "柔软中长发＋脸周发束", ko: "부드러운 미디엄＋얼굴 주변 잔머리" },
    classic_hime_cut_long: { en: "Classic Long Hime Cut", zh: "经典长姬发", ko: "클래식 롱 히메컷" },
    light_hime_cut_medium: { en: "Light Medium Hime Cut", zh: "轻盈中长姬发", ko: "가벼운 미디엄 히메컷" },
    outward_flipped_bob: { en: "Outward-Flipped Bob", zh: "外翘波波头", ko: "바깥말림 보브" },
    inward_curled_bob: { en: "Inward-Curled Bob", zh: "内扣波波头", ko: "안쪽말림 보브" },
    clean_half_up: { en: "Clean Half-Up", zh: "清爽半扎发", ko: "단정한 하프업" },
    braided_half_up: { en: "Braided Half-Up", zh: "编发半扎发", ko: "브레이드 하프업" },
    low_twin_tails_soft: { en: "Soft Low Twin Tails", zh: "柔软低双马尾", ko: "부드러운 로우 트윈테일" },
    high_twin_tails_ribbon: { en: "High Twin Tails", zh: "高双马尾", ko: "하이 트윈테일" },
    double_buns_short_bob: { en: "Double-Bun Bob", zh: "双丸子波波头", ko: "더블 번 보브" },
    anime_straight_long: { en: "Anime-Style Straight Long Hair", zh: "动漫风直长发", ko: "애니풍 스트레이트 롱헤어" },
    loose_wavy_long: { en: "Loose Wavy Long Hair", zh: "蓬松波浪长发", ko: "루즈 웨이브 롱헤어" },
    char_short_bob_side_braid: { en: "Short Bob with One-Side Braid", zh: "短波波头＋单侧编发", ko: "쇼트 보브＋한쪽 브레이드" },
    char_side_braid_low_side_tail: { en: "One-Side Braid with Low Side Tail", zh: "单侧编发＋低侧边束发", ko: "한쪽 브레이드＋낮은 사이드 테일" },
    char_short_low_side_tail: { en: "Short Hair with Low Side Tail", zh: "短发＋低侧边束发", ko: "짧은 머리＋낮은 사이드 테일" },
    char_low_side_ponytail_soft: { en: "Soft Low Side Ponytail", zh: "柔软低侧马尾", ko: "부드러운 낮은 사이드 포니테일" },
    char_side_braid_plus_loose_hair: { en: "One-Side Braid with Loose Hair", zh: "单侧编发＋披发", ko: "한쪽 브레이드＋풀어내린 머리" },
    char_loose_braid_accent_long: { en: "Long Hair with Loose Braid Accent", zh: "长发＋松散编发点缀", ko: "롱헤어＋루즈 브레이드 포인트" },
    braided_crown_loose_hair: { en: "Braided Crown with Loose Hair", zh: "环绕编发＋披发", ko: "크라운 브레이드＋풀어내린 머리" },
    crown_braid_bun: { en: "Braided Bun", zh: "编发丸子头", ko: "브레이드 번" },
    double_buns: { en: "Double Buns", zh: "双丸子头", ko: "더블 번" },
    fluffy_short_bob: { en: "Fluffy Short Bob", zh: "蓬松短波波头", ko: "폭신한 쇼트 보브" },
    hime_bob_blunt_sidelocks: { en: "Hime Bob with Blunt Sidelocks", zh: "姬发波波头＋齐切侧发", ko: "히메 보브＋블런트 사이드록" },
    layered_short_bob: { en: "Layered Short Bob", zh: "层次短波波头", ko: "레이어드 쇼트 보브" },
    long_twin_tails: { en: "Long Twin Tails", zh: "长双马尾", ko: "롱 트윈테일" },
    low_ponytail_long: { en: "Long Low Ponytail", zh: "低马尾长发", ko: "낮은 롱 포니테일" },
    medium_side_tail: { en: "Medium Side Tail", zh: "中长侧边束发", ko: "미디엄 사이드 테일" },
    medium_wolf_cut: { en: "Medium Wolf Cut", zh: "中长狼尾发", ko: "미디엄 울프컷" },
    straight_long_hair: { en: "Straight Long Hair", zh: "直长发", ko: "스트레이트 롱헤어" },
    jitome_half_lidded_eyes: { en: "Half-Lidded Eyes", zh: "半睁眼", ko: "지토메" },
    small_eyes: { en: "Small Eyes", zh: "小眼", ko: "작은 눈" },
    cat_eyes: { en: "Cat Eyes", zh: "猫眼", ko: "고양이눈" },
    round_eyes: { en: "Round Eyes", zh: "圆眼", ko: "둥근 눈" },
    sleepy_eyes: { en: "Sleepy Eyes", zh: "困倦眼", ko: "졸린 눈" },
    sharp_eyes: { en: "Sharp Eyes", zh: "锐利眼", ko: "날카로운 눈" },
    gentle_eyes: { en: "Gentle Eyes", zh: "温柔眼", ko: "상냥한 눈" },
    glossy_eyes: { en: "Glossy Eyes", zh: "水润眼", ko: "촉촉한 눈" },
    sparkling_eyes: { en: "Sparkling Eyes", zh: "闪亮眼", ko: "반짝이는 눈" },
    subdued_highlights: { en: "Subdued Highlights", zh: "低调高光", ko: "절제된 하이라이트" },
    starry_eyes_suppression: { en: "Starry Eye Suppression", zh: "星星眼抑制", ko: "별눈 억제" },
    angry_expression: { en: "Angry Expression", zh: "生气表情", ko: "화난 표정" },
    dazed_expression: { en: "Dazed Expression", zh: "恍惚表情", ko: "멍한 표정" },
    embarrassed_expression: { en: "Embarrassed Expression", zh: "害羞表情", ko: "부끄러운 표정" },
    enchanted_expression: { en: "Enchanted Expression", zh: "陶醉表情", ko: "황홀한 표정" },
    enduring_expression: { en: "Enduring Expression", zh: "忍耐表情", ko: "참는 표정" },
    exhausted_expression: { en: "Exhausted Expression", zh: "疲惫表情", ko: "지친 표정" },
    happy_smile: { en: "Happy Smile", zh: "开心笑容", ko: "활짝 웃는 표정" },
    jitome_annoyed: { en: "Annoyed Half-Lidded Eyes", zh: "不满半睁眼", ko: "못마땅한 지토메" },
    melting_expression: { en: "Melting Expression", zh: "放松融化表情", ko: "녹아내리는 표정" },
    mischievous_smile: { en: "Mischievous Smile", zh: "调皮笑容", ko: "장난스러운 미소" },
    neutral_expression: { en: "Neutral Expression", zh: "无表情", ko: "무표정" },
    pouting_expression: { en: "Pouting Expression", zh: "鼓脸不满表情", ko: "삐친 표정" },
    sad_expression: { en: "Sad Expression", zh: "悲伤表情", ko: "슬픈 표정" },
    sleepy_expression: { en: "Sleepy Expression", zh: "困倦表情", ko: "졸린 표정" },
    smug_expression: { en: "Smug Expression", zh: "得意表情", ko: "의기양양한 표정" },
    soft_smile: { en: "Soft Smile", zh: "柔和微笑", ko: "부드러운 미소" },
    strong_blush_expression: { en: "Strong Blush Expression", zh: "强烈脸红表情", ko: "강한 홍조 표정" },
    surprised_expression: { en: "Surprised Expression", zh: "惊讶表情", ko: "놀란 표정" },
    teary_eyes_expression: { en: "Teary Eyes Expression", zh: "泪眼表情", ko: "눈물 맺힌 표정" },
    troubled_expression: { en: "Troubled Expression", zh: "困扰表情", ko: "곤란한 표정" },
    diagonal_bangs_covering_one_eye: { en: "Diagonal Bangs Covering One Eye", zh: "斜向遮单眼刘海", ko: "한쪽 눈을 가리는 사선 앞머리" },
    side_braid_one_eye_covered: { en: "One-Side Braid with One-Eye Bangs", zh: "单侧编发＋遮单眼刘海", ko: "한쪽 브레이드＋한쪽 눈 가림 앞머리" },
    side_braid_one_eye_cover: { en: "One-Side Braid with One-Eye Bangs", zh: "单侧编发＋遮单眼刘海", ko: "한쪽 브레이드＋한쪽 눈 가림 앞머리" },
    low_side_ponytail_one_eye_covered: { en: "Low Side Tail with One-Eye Bangs", zh: "低侧边束发＋遮单眼刘海", ko: "낮은 사이드 테일＋한쪽 눈 가림 앞머리" },
    low_side_tail_eye_cover: { en: "Low Side Tail with One-Eye Bangs", zh: "低侧边束发＋遮单眼刘海", ko: "낮은 사이드 테일＋한쪽 눈 가림 앞머리" },
    heavy_bangs_covering_eyes: { en: "Heavy Eye-Covering Bangs", zh: "厚重遮眼刘海", ko: "무거운 눈가림 앞머리" },
    long_bangs_over_eyes: { en: "Long Bangs Over Eyes", zh: "遮眼长刘海", ko: "눈을 덮는 긴 앞머리" },
    peekaboo_bangs: { en: "Peekaboo Bangs", zh: "若隐若现遮眼刘海", ko: "피카부 앞머리" },
    sadako_style_long_front_hair: { en: "Sadako-Style Long Front Hair", zh: "贞子风长前发", ko: "사다코풍 긴 앞머리" },
    see_through_bangs: { en: "See-Through Bangs", zh: "空气刘海", ko: "시스루 앞머리" },
    side_swept_bangs: { en: "Side-Swept Bangs", zh: "斜分刘海", ko: "사이드 스윕 앞머리" },
    full_straight_bangs: { en: "Full Straight Bangs", zh: "厚直刘海", ko: "풀 스트레이트 앞머리" },
    long_side_face_framing: { en: "Long Face-Framing Bangs", zh: "长脸周刘海", ko: "긴 얼굴 라인 앞머리" },
    curtain_bangs: { en: "Curtain Bangs", zh: "八字刘海", ko: "커튼 앞머리" },
    short_bangs: { en: "Short Bangs", zh: "短刘海", ko: "짧은 앞머리" },
    arched_bangs: { en: "Arched Bangs", zh: "弧形刘海", ko: "아치형 앞머리" },
    slightly_split_bangs: { en: "Slightly Split Bangs", zh: "微分刘海", ko: "살짝 갈라진 앞머리" },
    side_tied_bangs: { en: "Side-Tied Bangs", zh: "侧边收束刘海", ko: "한쪽으로 묶은 앞머리" },
    low_side_ponytail_long_bangs: { en: "Low Side Tail with Long Bangs", zh: "低侧边束发＋长刘海", ko: "낮은 사이드 테일＋긴 앞머리" },
    full_straight_bangs_with_side_strands: { en: "Full Straight Bangs with Side Strands", zh: "厚直刘海＋侧发", ko: "풀 스트레이트 앞머리＋옆머리" },
    short_bob_see_through_straight: { en: "Short Bob with See-Through Bangs", zh: "短波波头＋空气刘海", ko: "쇼트 보브＋시스루 앞머리" },
    side_tail_see_through_straight: { en: "Side Tail with See-Through Bangs", zh: "侧边束发＋空气刘海", ko: "사이드 테일＋시스루 앞머리" },
    short_tail_see_through_straight: { en: "Short Side Tail with See-Through Bangs", zh: "短侧边束发＋空气刘海", ko: "짧은 사이드 테일＋시스루 앞머리" },
    long_side_see_through_straight: { en: "Long One-Side Braid with See-Through Bangs", zh: "单侧编发长发＋空气刘海", ko: "한쪽 브레이드 롱헤어＋시스루 앞머리" },
    short_bob_side_swept: { en: "Short Bob with Side-Swept Bangs", zh: "短波波头＋斜分刘海", ko: "쇼트 보브＋사이드 스윕 앞머리" },
    side_tail_side_swept: { en: "Side Tail with Side-Swept Bangs", zh: "侧边束发＋斜分刘海", ko: "사이드 테일＋사이드 스윕 앞머리" },
    long_side_side_swept: { en: "Long One-Side Braid with Side-Swept Bangs", zh: "单侧编发长发＋斜分刘海", ko: "한쪽 브레이드 롱헤어＋사이드 스윕 앞머리" },
    short_bob_full_straight: { en: "Short Bob with Full Straight Bangs", zh: "短波波头＋厚直刘海", ko: "쇼트 보브＋풀 스트레이트 앞머리" },
    short_tail_full_straight: { en: "Short Side Tail with Full Straight Bangs", zh: "短侧边束发＋厚直刘海", ko: "짧은 사이드 테일＋풀 스트레이트 앞머리" },
    long_side_long_face_framing: { en: "Long One-Side Braid with Face-Framing Bangs", zh: "单侧编发长发＋脸周刘海", ko: "한쪽 브레이드 롱헤어＋얼굴 라인 앞머리" },
    long_side_curtain_center_part: { en: "Long One-Side Braid with Curtain Bangs", zh: "单侧编发长发＋八字刘海", ko: "한쪽 브레이드 롱헤어＋커튼 앞머리" }
  };

  const colorWordTranslations = {
    en: {},
    zh: {
      sakura: "樱花", peach: "蜜桃", rose: "玫瑰", coral: "珊瑚", magenta: "品红", pink: "粉色",
      blonde: "金发", honey: "蜂蜜", ash: "灰调", platinum: "铂金", beige: "米金", strawberry: "草莓",
      light: "浅", brown: "棕色", milk: "奶茶", tea: "茶", chestnut: "栗色", dark: "深", soft: "柔黑", black: "黑发",
      blue: "蓝色", silver: "银发", white: "白", pearl: "珍珠", gray: "灰色", lavender: "薰衣草", auburn: "赤褐色",
      copper: "铜色", orange: "橙色", red: "红色", wine: "酒红", sky: "天空", aqua: "水蓝", navy: "海军蓝",
      mint: "薄荷绿", emerald: "祖母绿", olive: "橄榄绿", lilac: "丁香紫", violet: "紫罗兰", smoky: "烟熏",
      cobalt: "钴蓝", ice: "冰蓝", amethyst: "紫水晶", mauve: "藕紫", deep: "深", teal: "蓝绿色",
      pale: "淡", lime: "青柠绿", turquoise: "绿松石", pastel: "粉彩", purple: "紫色", saxe: "萨克斯蓝"
    },
    ko: {
      sakura: "사쿠라", peach: "피치", rose: "로즈", coral: "코랄", magenta: "마젠타", pink: "핑크",
      blonde: "블론드", honey: "허니", ash: "애쉬", platinum: "플래티넘", beige: "베이지", strawberry: "스트로베리",
      light: "라이트", brown: "브라운", milk: "밀크", tea: "티", chestnut: "체스트넛", dark: "다크", soft: "소프트", black: "블랙",
      blue: "블루", silver: "실버", white: "화이트", pearl: "펄", gray: "그레이", lavender: "라벤더", auburn: "오번",
      copper: "코퍼", orange: "오렌지", red: "레드", wine: "와인", sky: "스카이", aqua: "아쿠아", navy: "네이비",
      mint: "민트", emerald: "에메랄드", olive: "올리브", lilac: "라일락", violet: "바이올렛", smoky: "스모키",
      cobalt: "코발트", ice: "아이스", amethyst: "아메지스트", mauve: "모브", deep: "딥", teal: "틸",
      pale: "페일", lime: "라임", turquoise: "터쿼이즈", pastel: "파스텔", purple: "퍼플", saxe: "색스 블루"
    }
  };

  const sectionContactIds = {
    hairstyle: ["hairstyle_test25_selected", "hairstyle_test28_selected"],
    hairstyle_test19: ["hairstyle_test19_selected", "test19_all_contact"],
    hairstyle_test25: ["hairstyle_test25_selected"],
    hairstyle_test28: ["hairstyle_test28_selected"],
    bangs_test26: ["bangs_test26_selected"],
    bangs_test20: ["test20_selected_contact", "test20_all_contact"],
    bangs: ["bangs_test26_selected"],
    hair_color_test27: ["hair_color_test27_selected"],
    hair_color: ["hair_color_test21", "hair_color"]
  };

  const shareText = {
    research: "SDXL / illustriousXL 系モデル向けのプロンプト検証ログをまとめました。\n髪型、前髪、髪色、背景など、AIイラスト用の指定を比較しています。",
    hairstyle: "SDXL / illustriousXL 系モデル向けの髪型プロンプト検証をまとめました。\nショートボブ、姫カット、ツインテール、お団子など、AIイラスト用の髪型表現を比較しています。",
    bangs: "SDXL / illustriousXL 系モデル向けの前髪プロンプト検証をまとめました。\nシースルー前髪、流し前髪、重め前髪、片目隠れ前髪などを比較しています。",
    hair_color: "SDXL / illustriousXL 系モデル向けの髪色プロンプト検証をまとめました。\nピンク系、ブロンド系、青系、紫系、緑系などの髪色表現を比較しています。",
    eyes: "SDXL / illustriousXL 系モデル向けの目プロンプト検証ページです。\nジト目、猫目、大きい目、小さい目、瞳、ハイライト表現などを比較していきます。",
    expression: "SDXL / illustriousXL 系モデル向けの表情プロンプト検証ページです。\n無表情、笑顔、困り顔、怒り顔、照れ顔などの表情差を比較しています。",
    background: "SDXL / illustriousXL 系モデル向けの背景プロンプト検証をまとめました。\n京都風、和風町並み、温泉旅館、海辺、リゾートなどの背景表現を比較しています。"
  };

  const pageSectionGroups = {
    hairstyle: ["hairstyle_test25", "hairstyle_test28"],
    bangs: ["bangs_test26"],
    hair_color: ["hair_color_test27", "hair_color_test21", "hair_color"],
    eyes: ["eyes_test34"],
    expression: ["expression_test37"]
  };

  function withPagePrefix(path) {
    return `${rootPrefix}${path}`;
  }

  function pageShareUrl() {
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    return canonical || window.location.href.split("#")[0];
  }

  function shareIntentUrl(topic) {
    const params = new URLSearchParams({
      text: shareText[topic] || shareText.research,
      url: pageShareUrl()
    });
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  }

  function updateShareLinks() {
    document.querySelectorAll(".research-share-button").forEach((link) => {
      const topic = link.dataset.shareTopic || document.body.dataset.shareTopic || pageSection || "research";
      link.href = shareIntentUrl(topic);
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function slugFor(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "candidate";
  }

  function itemsFor(sectionId) {
    return data.items
      .filter((item) => item.section === sectionId && !item.public_hidden)
      .sort((a, b) => a.order - b.order);
  }

  function textOrUnset(value) {
    return value && String(value).trim() ? String(value) : localizedText(uiText.unset);
  }

  function cleanPromptText(value) {
    const text = String(value ?? "").replace(/\r\n?/g, "\n").trim();
    if (!text) return "";
    return text
      .split("\n")
      .map((line) => line.replace(/^\s*(?:[a-z][a-z0-9_]*_prompt|angle_positive|angle_negative)\s*:\s*/i, "").trim())
      .filter(Boolean)
      .join("\n");
  }

  function visiblePromptParts(parts) {
    return parts
      .filter((part) => part.value && String(part.value).trim() && String(part.value).trim() !== "hidden")
      .map((part) => cleanPromptText(part.value))
      .filter(Boolean);
  }

  function stripWeight(text) {
    return String(text || "")
      .replace(/[()]/g, "")
      .replace(/:\d+(?:\.\d+)?/g, "")
      .trim();
  }

  function importantTagFor(item) {
    if (item.important_tags) return item.important_tags;
    const prompt = item.positive_hair_prompt || item.positive_prompt || "";
    if (item.section.startsWith("hair_color")) {
      const colorTag = prompt.split(",").map(stripWeight).find((part) => part.includes("hair"));
      return colorTag || item.theme.replaceAll("_", " ");
    }
    if (item.section === "bangs") {
      const bangsTags = [
        "see-through bangs",
        "side-swept bangs",
        "full straight bangs",
        "curtain bangs",
        "long face framing bangs",
        "heavy eye-covering bangs"
      ];
      return bangsTags.find((tag) => prompt.includes(tag)) || item.theme.replaceAll("_", " ");
    }
    const hairstyleTags = [
      { checks: ["short bob", "side braid"], label: "short bob + side braid" },
      { checks: ["low side ponytail", "side braid"], label: "low side ponytail + side braid" },
      { checks: ["long loose hair", "side braid"], label: "long hair + side braid" },
      { checks: ["short bob"], label: "short bob" },
      { checks: ["low side ponytail"], label: "low side ponytail" }
    ];
    const matched = hairstyleTags.find((tag) => tag.checks.every((check) => prompt.includes(check)));
    return matched?.label || item.theme.replaceAll("_", " ");
  }

  function localizedText(values) {
    return values?.[currentLanguage] || values?.ja || "";
  }

  function localizedSectionCopy(sectionId) {
    const fallbackId = sectionId.startsWith("hairstyle")
      ? "hairstyle"
      : sectionId.startsWith("bangs")
        ? "bangs"
        : sectionId.startsWith("hair_color")
          ? "hair_color"
          : sectionId.startsWith("eyes")
            ? "eyes"
            : sectionId.startsWith("expression")
              ? "expression"
              : sectionId;
    const copy = sectionCopy[sectionId] || sectionCopy[fallbackId] || {};
    return copy[currentLanguage] || copy.ja || { title: "", lead: "" };
  }

  function titleCaseFromTheme(value) {
    return String(value || "")
      .replace(/_hair$/i, "")
      .split("_")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function localizedColorLabel(item) {
    const key = item.theme_name || item.theme || "";
    if (currentLanguage === "ja") return item.jp_label || titleCaseFromTheme(key);
    if (currentLanguage === "en") return titleCaseFromTheme(key);
    const words = String(key).replace(/_hair$/i, "").split("_").filter(Boolean);
    const dictionary = colorWordTranslations[currentLanguage] || {};
    const translated = words.map((word) => dictionary[word] || word).join(currentLanguage === "ko" ? " " : "");
    if (!translated) return titleCaseFromTheme(key);
    return currentLanguage === "ko" ? translated : translated;
  }

  function localizedCandidateLabel(item) {
    if (currentLanguage === "ja") return item.jp_label || titleCaseFromTheme(item.theme_name || item.theme);
    if (sectionKind(item) === "hair_color") return localizedColorLabel(item);
    const key = item.theme_name || item.theme || "";
    const translated = candidateLabelTranslations[key]?.[currentLanguage];
    return translated || titleCaseFromTheme(key) || item.jp_label || "";
  }

  function sectionKind(item) {
    if (item.section.startsWith("hair_color")) return "hair_color";
    if (item.section.startsWith("bangs")) return "bangs";
    if (item.section.startsWith("hairstyle")) return "hairstyle";
    if (item.section.startsWith("eyes")) return "eyes";
    if (item.section.startsWith("expression")) return "expression";
    return "research";
  }

  function localizedVerificationNote(item) {
    if (currentLanguage === "ja") return item.verification_note || item.reason || "";
    const tag = importantTagFor(item);
    const kind = sectionKind(item);
    const templates = {
      hairstyle: {
        en: `Candidate using "${tag}". This entry is useful for checking whether the hairstyle silhouette and character impression stay readable.`,
        zh: `使用“${tag}”的候选。适合确认发型轮廓是否清晰，以及角色印象是否保持稳定。`,
        ko: `"${tag}"를 사용한 후보입니다. 헤어스타일 실루엣이 잘 보이는지, 캐릭터 인상이 안정적으로 유지되는지 확인하기 좋습니다.`
      },
      bangs: {
        en: `Candidate using "${tag}". This entry is useful for comparing how the bangs change the face-framing impression.`,
        zh: `使用“${tag}”的候选。适合比较刘海如何改变脸部周围的印象。`,
        ko: `"${tag}"를 사용한 후보입니다. 앞머리가 얼굴 주변 인상을 어떻게 바꾸는지 비교하기 좋습니다.`
      },
      hair_color: {
        en: `Candidate using "${tag}". This entry is useful for checking color stability and how naturally the color fits the character.`,
        zh: `使用“${tag}”的候选。适合确认色味稳定性，以及该发色与角色的自然契合度。`,
        ko: `"${tag}"를 사용한 후보입니다. 색감 안정성과 캐릭터에 자연스럽게 어울리는지를 확인하기 좋습니다.`
      },
      eyes: {
        en: `Candidate using "${tag}". This entry is useful for comparing how eye shape, iris detail, or highlights change the character impression.`,
        zh: `使用“${tag}”的候选。适合比较眼型、瞳孔细节或高光如何改变角色印象。`,
        ko: `"${tag}"를 사용한 후보입니다. 눈 모양, 홍채 디테일, 하이라이트가 캐릭터 인상을 어떻게 바꾸는지 비교하기 좋습니다.`
      },
      expression: {
        en: `Candidate using "${tag}". This entry is useful for comparing how facial expression changes while keeping the character identity readable.`,
        zh: `使用“${tag}”的候选。适合比较在保持角色辨识度的同时，表情如何变化。`,
        ko: `"${tag}"를 사용한 후보입니다. 캐릭터성을 읽을 수 있게 유지하면서 표정이 어떻게 달라지는지 비교하기 좋습니다.`
      },
      research: {
        en: `Candidate using "${tag}". This entry is useful for comparing the generated result with the prompt.`,
        zh: `使用“${tag}”的候选。适合将生成结果与 prompt 进行比较。`,
        ko: `"${tag}"를 사용한 후보입니다. 생성 결과와 프롬프트를 비교하기 좋습니다.`
      }
    };
    return templates[kind]?.[currentLanguage] || item.verification_note || item.reason || "";
  }

  function renderPromptDetails(item) {
    const includeFacePrompt = !item.section.startsWith("hairstyle");
    const positivePrompt = visiblePromptParts([
      { label: "positive_hair_prompt", value: item.positive_hair_prompt || item.positive_prompt },
      { label: "fixed_bangs_prompt", value: item.fixed_bangs_prompt },
      { label: "fixed_face_prompt", value: includeFacePrompt ? item.fixed_face_prompt : "" }
    ]).join("\n\n") || "未設定";
    const negativePrompt = cleanPromptText(item.negative_hair_prompt || item.negative_prompt) || localizedText(uiText.unset);
    const showPromptInline = ["hairstyle", "bangs", "hair_color", "eyes", "expression"].some((sectionPrefix) => item.section.startsWith(sectionPrefix));
    if (showPromptInline) {
      return `
        <div class="research-prompt-stack research-prompt-stack-static">
          <section class="research-prompt-panel">
            <h4>positive prompt</h4>
            <pre>${escapeHTML(positivePrompt)}</pre>
          </section>
          <section class="research-prompt-panel">
            <h4>negative prompt</h4>
            <pre>${escapeHTML(negativePrompt)}</pre>
          </section>
        </div>
      `;
    }
    return `
      <div class="research-prompt-stack">
        <details class="research-prompt-details">
          <summary>positive prompt</summary>
          <pre>${escapeHTML(positivePrompt)}</pre>
        </details>
        <details class="research-prompt-details">
          <summary>negative prompt</summary>
          <pre>${escapeHTML(negativePrompt)}</pre>
        </details>
      </div>
    `;
  }

  function candidateImages(item) {
    const samples = Array.isArray(item.samples)
      ? item.samples.filter((sample) => sample.asset_path)
      : [];
    if (samples.length) return samples;
    return [{
      asset_path: item.asset_path,
      label: item.role || "main",
      filename: item.filename
    }];
  }

  function renderCandidateMedia(item) {
    const images = candidateImages(item);
    const mainImage = images[0];
    const label = localizedCandidateLabel(item);
    const mainAlt = `${label}${mainImage.label ? ` ${mainImage.label}` : ""}`;
    const thumbs = images.slice(1);
    return `
      <div class="research-candidate-media${thumbs.length ? " has-samples" : ""}">
        <a class="research-image-link" href="${escapeHTML(withPagePrefix(mainImage.asset_path))}" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHTML(withPagePrefix(mainImage.asset_path))}" alt="${escapeHTML(mainAlt)}" loading="lazy" decoding="async">
        </a>
        ${thumbs.length ? `
          <div class="research-sample-thumbs" aria-label="${escapeHTML(label)}">
            ${thumbs.map((sample) => `
              <a class="research-sample-thumb" href="${escapeHTML(withPagePrefix(sample.asset_path))}" target="_blank" rel="noopener noreferrer">
                <img src="${escapeHTML(withPagePrefix(sample.asset_path))}" alt="${escapeHTML(`${label} ${sample.label || sample.angle || ""}`)}" loading="lazy" decoding="async">
                <span>${escapeHTML(sample.label || sample.angle || "sample")}</span>
              </a>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderCandidateCard(item) {
    const tag = importantTagFor(item);
    const candidateId = slugFor(item.theme_name || item.theme || item.important_tags || item.jp_label);
    const label = localizedCandidateLabel(item);
    return `
      <article class="research-candidate-card" id="${escapeHTML(candidateId)}">
        ${renderCandidateMedia(item)}
        <div class="research-candidate-copy">
          <h3>${escapeHTML(label)}</h3>
          <dl class="research-meta-list">
            <div><dt>${escapeHTML(localizedText(uiText.importantTags))}</dt><dd>${escapeHTML(tag)}</dd></div>
            <div><dt>${escapeHTML(localizedText(uiText.verificationResult))}</dt><dd>${escapeHTML(localizedVerificationNote(item))}</dd></div>
          </dl>
          ${renderPromptDetails(item)}
        </div>
      </article>
    `;
  }

  function contactSheetsFor(sectionId) {
    const ids = sectionContactIds[sectionId] || [];
    return (data.contact_sheets || []).filter((sheet) => ids.includes(sheet.id));
  }

  function renderContactSheets(sectionId) {
    if (!contactRoot) return;
    const sheets = contactSheetsFor(sectionId);
    contactRoot.innerHTML = sheets.map((sheet) => `
      <a class="research-contact-card" href="${escapeHTML(withPagePrefix(sheet.path))}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHTML(withPagePrefix(sheet.path))}" alt="${escapeHTML(sheet.label)}" loading="lazy" decoding="async">
        <span>${escapeHTML(sheet.label)}</span>
      </a>
    `).join("");
  }

  function renderSectionPage(sectionId) {
    const copy = localizedSectionCopy(sectionId);
    const items = itemsFor(sectionId);
    if (!copy) return "";
    return `
      <section class="research-section" id="${escapeHTML(sectionId)}">
        <div class="section-heading-row">
          <div>
            <h2>${escapeHTML(copy.title)}</h2>
          </div>
          <p>${escapeHTML(copy.lead).replaceAll("\n", "<br>")}</p>
        </div>
        <div class="research-candidate-grid">
          ${items.map(renderCandidateCard).join("")}
        </div>
      </section>
    `;
  }

  function renderPageSections(sectionId) {
    if (!sectionsRoot) return;
    const sectionIds = pageSectionGroups[sectionId] || [sectionId];
    if (sectionIds.length > 1) {
      const copy = localizedSectionCopy(sectionId);
      const seenTags = new Set();
      const items = sectionIds.flatMap(itemsFor).filter((item) => {
        const identity = item.theme_name || item.theme || importantTagFor(item);
        const key = `${item.section.startsWith("hairstyle") ? "hairstyle" : item.section.startsWith("bangs") ? "bangs" : item.section.startsWith("hair_color") ? "hair_color" : item.section}:${identity}`;
        if (seenTags.has(key)) return false;
        seenTags.add(key);
        return true;
      });
      sectionsRoot.innerHTML = `
        <section class="research-section" id="${escapeHTML(sectionId)}">
          <div class="section-heading-row">
            <div>
              <h2>${escapeHTML(copy.title)}</h2>
            </div>
            <p>${escapeHTML(copy.lead).replaceAll("\n", "<br>")}</p>
          </div>
          <div class="research-candidate-grid">
            ${items.map(renderCandidateCard).join("")}
          </div>
        </section>
      `;
    } else {
      sectionsRoot.innerHTML = sectionIds.map(renderSectionPage).join("");
    }
    renderContactSheets(sectionId);
  }

  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("archiveLang", language);
    } catch (error) {
      // The visible page still updates when localStorage is unavailable.
    }
    translatableNodes.forEach((node) => {
      const value = node.dataset[language] || node.dataset.ja;
      if (node.classList.contains("share-x-button")) {
        const label = node.querySelector("span:last-child");
        if (label) label.textContent = value;
        return;
      }
      if (node.classList.contains("lead")) {
        node.innerHTML = escapeHTML(value).replaceAll("&lt;br&gt;", "<br>");
        return;
      }
      node.textContent = value;
    });
    languageButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === language);
    });
    if (pageSection) {
      renderPageSections(pageSection);
    }
    updateShareLinks();
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  setLanguage(window.localStorage?.getItem("archiveLang") || "ja");

  if (!pageSection) return;
  if (!data || !Array.isArray(data.items)) {
    sectionsRoot.innerHTML = "<p>研究データを読み込めませんでした。</p>";
    return;
  }
})();
