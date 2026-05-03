(function () {
  const { works, siteCopy } = window.archiveData;
  const app = document.querySelector("#titleApp");
  const languageButtons = document.querySelectorAll(".lang-button");
  const staticTranslatableNodes = document.querySelectorAll("[data-ja]");
  const params = new URLSearchParams(location.search);
  const requestedWorkId = window.DETAIL_WORK_ID || params.get("id");
  const work = works.find((item) => item.id === requestedWorkId) || works[0];
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
      shareX: "Xで共有",
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
      shareX: "Share on X",
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
      shareX: "分享到 X",
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
      shareX: "X에 공유",
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

  const longDescriptionTranslations = {
    "eroboxin-akane": {
      en: `Akane is a girl whose composure has been shaken by the strange drug Erobokishin 4649.

Set in a luxury resort hotel, this story-focused AI CG collection moves from the night pool to the top-floor lounge, the large bath, and finally the bedroom, following her as she is gradually drawn into desire.

The illuminated night pool, the lounge overlooking the city lights, the quiet steam of the bath, and the bedroom where only the two of them remain. As the scenes progress, the hesitation in her expression slowly turns warmer, and desire begins to take priority over reason.

Reflections on the water, lightly sweating skin, and body texture under the lighting give the title its resort atmosphere and sense of closeness. This is the second title in the Erobokishin 4649 series, built around a luxury-resort situation.`,
      zh: `受到可疑药物“Erobokishin 4649”影响，理性逐渐动摇的少女“Akane”。

本作以高级度假酒店为舞台，从夜间泳池、顶层酒廊、大浴场，最后移动到卧室，描绘她一点点被欲望吞没的过程，是一部重视故事流动的 AI 生成 CG 集。

灯光映照的夜间泳池、俯瞰夜景的酒廊、被静静蒸汽包围的浴场，以及只剩两人的卧室。随着场景推进，最初仍带着困惑的表情逐渐染上热度，欲望开始比理性更优先。

水面的反光、汗湿的肌肤、灯光照出的身体质感等，作品重视高级度假空间特有的氛围与接近感。这是“Erobokishin 4649”系列第二作的高级度假情境作品。`,
      ko: `수상한 약 “에로복신 4649”로 인해 이성이 흔들리기 시작한 소녀 “아카네”.

이 작품은 고급 리조트 호텔을 무대로, 밤의 수영장, 최상층 라운지, 대욕장, 그리고 침실로 장소를 옮겨 가며 조금씩 욕망에 삼켜져 가는 모습을 그린 스토리 중심 AI 생성 CG집입니다.

라이트업된 나이트풀, 야경이 내려다보이는 라운지, 조용한 증기에 감싸인 욕장, 둘만 남은 침실. 개방감 있는 고급 공간 속에서 처음에는 망설임이 남아 있던 표정도 장면이 진행될수록 조금씩 열기를 띠고, 이성보다 욕망이 앞서게 됩니다.

수면 반사, 땀기 어린 피부, 조명에 비친 몸의 질감처럼 리조트 공간 특유의 분위기와 가까운 거리감을 중시했습니다. “에로복신 4649” 시리즈 제2작에 해당하는 고급 리조트 시추에이션 작품입니다.`
    },
    "eroboxin-4649": {
      en: `A slightly suspicious drug has come into the hands of a sensual older woman. Its name is Erobokishin 4649.

Recommended by a friend, she tries it together with her boyfriend, but before long the situation begins to move in a direction she did not expect.

Her reason wavers, leaving only desire that can no longer be held back. With the boyfriend she called over, an unstoppable time begins.

Set inside everyday rooms, this title moves through the kitchen, living room, bath, and bedroom, following a situation that continues forward according to desire.

At first her expression still carries hesitation, but as the scenes progress it gradually takes on heat, and the living space itself changes into a dense, intimate time.

This is the first title in the Erobokishin 4649 series, built around story flow and a clear progression of situations.`,
      zh: `一位成熟妩媚的姐姐拿到了一种有些可疑的药物。它的名字是“Erobokishin 4649”。

在朋友的推荐下，她和男朋友一起尝试了这种药物，但不久之后，事情开始朝着她没有预料到的方向发展。

理性渐渐动摇，最后只剩下无法压抑的欲望。她叫来的男朋友，也一同被卷入这段无法停止的时间。

本作以日常房间为舞台，从厨房、客厅、浴室到卧室，随着地点移动，情境也按照欲望继续推进。

最初仍带着些许困惑的表情，也会随着场景推进逐渐染上热度，生活空间本身也变成更浓密、更私密的时间。

这是“Erobokishin 4649”系列第一作，重视故事性与情境推进的作品。`,
      ko: `어딘가 수상한 약을 손에 넣은 매력적인 누나. 그 이름은 “에로복신 4649”.

친구의 추천으로 남자친구와 함께 시험해 보지만, 어느새 상황은 그녀가 예상하지 못한 방향으로 움직이기 시작합니다.

이성은 흔들리고, 억누를 수 없는 욕망만이 남습니다. 그녀가 부른 남자친구와 함께 멈출 수 없는 시간이 시작됩니다.

이 작품은 일상적인 방을 무대로, 주방, 거실, 욕실, 침실로 장소를 옮기며 욕망에 따라 계속 진행되는 상황을 담았습니다.

처음에는 당황스러움이 남아 있던 표정도 장면이 진행될수록 조금씩 열기를 띠고, 생활 공간 자체가 더욱 짙고 사적인 시간으로 변해 갑니다.

스토리성과 시추에이션의 흐름을 중시해 구성한 “에로복신 4649” 시리즈 제1작입니다.`
    },
    "shizuku-record": {
      en: `Lips, breath, and dripping moisture.

This AI CG collection focuses on the texture of lips, mouth details, and droplets, specializing in close-up mouth-focused imagery.

Wet lips, stretching drops, and expressions that only become visible at a very close distance. The collection is built around close framing with an emphasis on softness, warmth, and humidity, for a total of 420 images.

Each situation includes both framed comic-style layouts and clean single-image versions.

In addition to solo situations, the collection also includes different atmospheres created through male-female and female-female pairings.`,
      zh: `嘴唇、吐息，以及滴落的水珠。

本作是聚焦于唇部、口元与水滴质感的口元要素特化 AI 生成 CG 集。

濡湿的唇、拉丝的水滴、只有在极近距离才能看到的表情。作品以柔软、温度感与湿度为重点，主要采用近距离特写构图，共收录 420 张。

每个情境都收录了带分镜框的漫画式版面，以及不带分镜框的单张插画版本。

除了单人情境之外，也可以欣赏男女之间、女性之间不同关系性带来的空气感。`,
      ko: `입술, 숨결, 그리고 흘러내리는 물방울.

이 작품은 입술, 입가, 물방울의 질감에 초점을 맞춘 입가 페티시 특화 AI 생성 CG집입니다.

젖은 입술, 실처럼 이어지는 물방울, 너무 가까운 거리에서만 보이는 표정. 부드러움, 온도감, 습도를 의식한 클로즈업 구도를 중심으로 총 420장으로 구성했습니다.

각 시추에이션에는 프레임이 있는 만화풍 레이아웃 버전과, 프레임이 없는 한 장 그림 버전을 함께 수록했습니다.

솔로 시추에이션뿐 아니라 남녀, 여성끼리의 관계성에서 생기는 서로 다른 분위기도 즐길 수 있는 구성입니다.`
    },
    "hikagami": {
      en: `Hikagami refers to the soft hollow behind the knee.

This AI CG collection focuses on the knee-back line, skin texture, and the curve that continues from the thigh to the calf, giving attention to an area that rarely becomes the main subject.

Across evening school scenes, night festival moods, and private rooms, the work collects the appeal of hikagami hidden inside everyday situations.

From wider compositions to close framing and very near texture-focused shots, the title is arranged so the knee-back area can be enjoyed in stages.

It is an omnibus-style collection not bound to a single story, built around hikagami, thighs, hips, absolute territory, and other lower-body motifs across 322 images.`,
      zh: `“ひかがみ”指的是膝盖后侧柔软的凹陷。

本作聚焦于平时不太容易成为主角的膝后线条、肌肤质感，以及从大腿延伸到小腿的曲线，是膝后主题的 AI 生成 CG 集。

从黄昏的学校、夜晚的祭典到私人室内空间，作品收录了隐藏在日常情境中的“ひかがみ”魅力。

从较宽的构图，到近距离构图，再到强调肌肤质感的超近距离画面，本作以阶段式方式呈现膝后部位的看点。

这不是单一故事，而是围绕膝后、大腿、臀部、绝对领域等下半身主题构成的合集式作品，共收录 322 张。`,
      ko: `“히카가미”는 무릎 뒤쪽의 부드러운 오목한 부분을 뜻합니다.

이 작품은 평소 주역이 되기 어려운 오금 라인, 피부 질감, 허벅지에서 종아리로 이어지는 곡선에 초점을 맞춘 AI 생성 CG집입니다.

저녁 무렵의 학교, 밤의 축제, 사적인 실내 공간 등 다양한 시추에이션 속에서 일상에 숨어 있는 “히카가미”의 매력을 담았습니다.

넓은 구도부터 근접 구도, 피부 질감을 강조한 초근접 컷까지 단계적으로 오금 부위를 즐길 수 있도록 구성했습니다.

하나의 스토리에 묶이지 않고 오금, 허벅지, 힙, 절대영역 등 하반신 모티프를 중심으로 구성한 옴니버스형 컬렉션으로, 총 322장을 수록했습니다.`
    },
    "hikagami-school": {
      en: `From waking up in the morning and changing into a uniform, to commuting to school, attending class, returning home, and spending time in her room.

Based on the world of the Hikagami series, this AI CG collection follows the everyday route of commuting, school life, and after-school time at home.

A uniform seen from behind, the moment of climbing stairs, casual classroom gestures, and relaxed time after returning home.

The collection focuses on fetish elements found in ordinary movement, including knee-backs, thighs, hip lines, and absolute territory, with many low-angle compositions.

The situations change gradually from morning to night, moving through commuting, classrooms, hallways, the library, the way home, and her own room.

It is a routine-style Hikagami title built around lower-body fetish appeal, closeness, and everyday spaces.`,
      zh: `从早晨起床、换上制服、前往学校、上课、放学回家，到在房间里度过夜晚。

这是以“ひかがみ”系列世界观为基础，围绕登校、学校生活和回家后日常展开的 AI 生成 CG 集。

制服背影、上楼梯的瞬间、教室里的小动作、回家后的放松时间。

作品以低角度构图为中心，集中呈现膝后、大腿、臀线和绝对领域等日常动作中隐藏的要素。

情境从早晨到夜晚逐步变化，经过登校路、教室、走廊、图书馆、回家路和自己的房间。

这是一部围绕下半身要素、接近感与日常空间构成的 routine 型“ひかがみ”作品。`,
      ko: `아침에 일어나 교복으로 갈아입고, 학교에 가고, 수업을 듣고, 집으로 돌아와 방에서 쉬는 시간까지.

“히카가미” 시리즈의 세계관을 바탕으로 등교, 학교생활, 귀가 후 일상을 따라가는 AI 생성 CG집입니다.

교복을 입은 뒷모습, 계단을 오르는 순간, 교실에서의 작은 몸짓, 귀가 후의 편안한 시간.

로우앵글 중심의 구도로 오금, 허벅지, 힙라인, 절대영역처럼 평범한 움직임 안에 숨어 있는 요소를 담았습니다.

시추에이션은 아침부터 밤까지 점차 변화하며, 통학로, 교실, 복도, 도서관, 귀가길, 자기 방으로 이어집니다.

하반신 페티시, 가까운 거리감, 일상 공간을 중심으로 구성한 루틴형 히카가미 타이틀입니다.`
    },
    "kinpatsu-miko": {
      en: `As the five-yen coin sways, the pride of a shrine maiden slowly begins to melt away.

This story-focused AI CG collection depicts a pure blonde shrine maiden whose reason is gradually overwritten by a suspicious technique.

From the opening induction, to being taken into the dim inner shrine, the stripping away of her shrine-maiden outfit, and the loss of reason, the full 300-image sequence follows one girl as she changes little by little.

The main appeal is the focus on skin texture and close distance.

Knee-back shadows, sweat on the skin, and expressions gradually falling apart give the work a fetish tone unique to Japanese clothing.

From beginning to ending, the atmosphere changes step by step in this hypnosis-and-Japanese-clothing story title.`,
      zh: `摇晃的五日元硬币，让巫女的自尊一点点被溶解。

本作是一部故事型 AI 生成 CG 集，描绘清纯的金发巫女在可疑术法之下，理性逐渐被改写的过程。

从开场的导入，到被带入昏暗奥院、巫女服被逐渐剥离、理性崩坏，300 张完整流程追踪一名少女一点点改变的过程。

本作的主要看点是肌肤质感与近距离感。

膝后阴影、汗湿的肌肤，以及逐渐崩坏的表情，形成和装作品特有的要素感。

从开始到结束，空气一步步变化，是一部催眠与和装主题的故事型作品。`,
      ko: `흔들리는 오엔 동전 앞에서, 신직으로서의 자존심이 조금씩 녹아내립니다.

순수한 금발 무녀가 수상한 술법에 의해 이성이 점차 덧씌워져 가는 과정을 그린 스토리 중심 AI 생성 CG집입니다.

도입에서 어두운 내전으로 끌려가는 장면, 무녀복이 흐트러져 가는 과정, 이성 붕괴까지 총 300장의 흐름으로 한 소녀가 조금씩 변해 가는 모습을 따라갑니다.

가장 큰 포인트는 피부 질감과 가까운 거리감입니다.

오금의 그림자, 땀 맺힌 피부, 점차 무너지는 표정이 와복 특유의 페티시한 분위기를 만듭니다.

처음부터 끝까지 단계적으로 공기가 변해 가는 최면과 와복의 스토리형 타이틀입니다.`
    },
    "ancient-capital-beauty": {
      en: `A quiet, moistly atmospheric title built around ancient-capital scenery and a beauty in Japanese clothing.

The scenes move from shrine to inn, open-air bath, and a Japanese room at night, while the distance, expressions, and mood gradually change.

The series emphasizes Japanese stillness, the subtle shift brought by alcohol, and situations that progress inside a calm atmosphere.`,
      zh: `以古都风景与和装美人为轴心，带有安静湿润空气感的作品。

场景从神社、古都散策移动到温泉旅馆、露天风吕、夜晚和室。随着地点变化，距离感、表情和空气也一点点发生改变。

本作重视和风的静谧、夜晚与酒意带来的变化，以及在沉稳氛围中缓慢推进的情境。`,
      ko: `고도의 풍경과 와복 미인을 중심으로 한, 차분하고 촉촉한 분위기의 작품입니다.

신사, 고도 산책, 온천 여관, 노천탕, 밤의 와실로 장면이 이동하며 거리감과 표정, 공기가 조금씩 변해 갑니다.

일본풍의 고요함, 밤과 술기운이 만드는 변화, 그리고 차분한 분위기 속에서 진행되는 상황을 중시한 타이틀입니다.`
    },
    "momoiro-baito": {
      en: `The bright smile under the sun gradually turns into the expression of a doll obeying hypnosis inside a night-time closed room.

Set in an Okinawa resort area, this story-focused AI CG collection follows a cheerful pink-haired girl as her reason is slowly taken away.

By day, she is the energetic poster girl working at a seaside cafe.

At night, however, the stage shifts to a quiet resort-hotel room, where irresistible hypnosis gradually changes her expression and gaze.

Healthy daily life, the open air of a tropical resort, and reason collapsing inside a closed room.

Across 300 images, the collection is built around the contrast between day and night.

Skin texture, a lightly sweating body, and eyes slowly becoming vacant create a staged atmosphere in this hypnosis-themed story title.`,
      zh: `阳光下绽放的明亮笑容，在夜晚密室中逐渐变成服从催眠的人偶表情。

本作以冲绳度假地为舞台，描绘开朗的粉发少女一点点失去理性的故事型 AI 生成 CG 集。

白天，她是在海边咖啡店工作的活力看板娘。

到了夜晚，舞台则转移到安静的度假酒店房间，无法抗拒的催眠逐渐改变她的表情和视线。

健康的日常、南国度假的开放感，以及密室中崩坏的理性。

全 300 张围绕昼夜反差构成。

肌肤质感、微微出汗的身体，以及逐渐变得空洞的眼神，让这部催眠主题故事作品呈现出阶段式变化。`,
      ko: `태양 아래에서 환하게 웃던 표정이, 밤의 밀실에서 조금씩 다른 얼굴로 바뀌어 갑니다.

오키나와 리조트를 무대로 밝게 일하는 분홍 머리 소녀가 조금씩 이성을 잃어 가는 과정을 그린 스토리 중심 AI 생성 CG집입니다.

낮에는 바닷가 카페에서 일하는 활기찬 간판 소녀입니다.

하지만 밤이 되면 무대는 조용한 리조트 호텔 방으로 옮겨지고, 거부할 수 없는 최면이 그녀의 표정과 시선을 조금씩 바꿔 갑니다.

건강한 일상, 남국 리조트의 개방감, 그리고 밀실 안에서 무너지는 이성.

총 300장에 걸쳐 낮과 밤의 대비를 중심으로 구성했습니다.

피부 질감, 살짝 땀이 밴 몸, 점차 멍해지는 눈빛이 단계적으로 변화하는 분위기를 만듭니다.`
    },
    "satogaeri": {
      en: `A nostalgic summer hometown, visited after leaving the city behind.

Blue skies, rural fields, bamboo groves, a quiet hot spring, and an empty shrine.

Set in the countryside during summer, this story-focused AI CG collection depicts the distance with a childhood friend gradually beginning to change.

An unguarded figure outdoors, gestures made under the assumption that nobody is watching, a quiet hot spring at night, and time spent alone together at the family home.

Across 227 images, the work moves from a refreshing everyday atmosphere toward a gradually more desirous flow.

It is a countryside homecoming story built around summer nostalgia, the openness of nature, and texture details such as sweat and saliva.`,
      zh: `离开城市，回到令人怀念的夏日故乡。

蓝天、田园、竹林、安静温泉、无人神社。

本作以乡下夏天为舞台，描绘与青梅竹马之间的距离逐渐开始变化的故事型 AI 生成 CG 集。

野外的无防备姿态、以为没人看见的小动作、夜晚安静的温泉，以及在老家两人独处的时间。

全 227 张的流程，从清爽的日常空气感逐渐走向更带有欲望的展开。

这是一部围绕夏日怀旧、自然开放感，以及汗水和唾液等质感细节构成的乡下归乡故事。`,
      ko: `도시를 떠나 돌아온, 그리운 여름의 고향.

푸른 하늘, 논밭, 대나무 숲, 조용한 온천, 아무도 없는 신사.

시골의 여름을 무대로 소꿉친구와의 거리가 조금씩 변하기 시작하는 모습을 그린 스토리 중심 AI 생성 CG집입니다.

야외에서의 무방비한 모습, 아무도 보지 않는다고 생각한 몸짓, 밤의 조용한 온천, 본가에서 보내는 둘만의 시간.

총 227장의 흐름 속에서 상쾌한 일상 분위기에서 점차 욕망이 짙어지는 방향으로 이어집니다.

여름의 향수, 자연의 개방감, 땀과 침 같은 질감 디테일을 중심으로 한 시골 귀향 이야기입니다.`
    },
    "gokujiri": {
      en: `An extremely close sense of distance.

This fetish-focused AI CG collection specializes in hip lines and physical closeness.

Hips filling the frame, pressed body texture, and the pressure that only comes from being too close.

The images are arranged with an emphasis on angle, composition, and closeness, guiding the viewer's gaze through the collection.

In the re-edited version, the situations and composition flow have been reorganized into a clearer, more immersive form.

It is a hip-focused CG collection that prioritizes the atmosphere of a fetish work.`,
      zh: `极端到近乎过分的距离感。

本作是一部重视要素表现的 AI 生成 CG 集，专注于臀部线条与贴近感。

画面几乎被臀部填满、被压近的肉感，以及只有过近距离才会产生的压迫感。

作品重视角度、构图与贴近感，以引导视线的方式整理收录。

再编版重新整理了情境和构图的流动，让整体更容易观看，也更具沉浸感。

这是一部重视要素作品空气感的臀部特化 CG 集。`,
      ko: `극단적일 정도로 가까운 거리감.

이 작품은 힙라인과 밀착감에 특화한 페티시 중심 AI 생성 CG집입니다.

화면 가득 들어오는 힙, 눌리는 듯한 육감, 너무 가까운 거리에서만 생기는 압박감.

앵글, 구도, 밀착감을 중시하고 시선을 유도하는 흐름으로 구성했습니다.

재편판에서는 시추에이션과 구도의 흐름을 정리해 더 보기 쉽고 몰입감 있는 형태로 재구성했습니다.

페티시 작품으로서의 공기감을 중시한 힙 특화 CG집입니다.`
    },
    "okinawa-soso": {
      en: `Blue sea, tropical sky, and a resort hotel.

This is a tropical travel-situation AI CG collection set in Okinawa.

Sightseeing areas, hotels, poolside spaces, and the beach. Inside an open resort atmosphere, the work collects situations where the character is gradually pushed toward her limit.

The title emphasizes the contrast between bright scenery and fetish situations, building its atmosphere around the feeling of being on a trip.

It is a travel-mood series title where tropical backgrounds and resort ambience can be enjoyed together with situation-focused content.`,
      zh: `蓝色大海、南国天空与度假酒店。

本作是以冲绳为舞台的南国旅行情境型 AI 生成 CG 集。

观光地、酒店、泳池边、海边。在开放的度假氛围中，作品收录了角色逐渐被逼近极限的情境。

本作重视明亮风景与要素情境之间的反差，并以旅行感来构筑整体空气。

这是一部可以同时欣赏南国背景、度假氛围与情境内容的旅行氛围系列作品。`,
      ko: `푸른 바다, 남국의 하늘, 리조트 호텔.

오키나와를 무대로 한 남국 여행 시추에이션 AI 생성 CG집입니다.

관광지, 호텔, 풀사이드, 해변. 개방감 있는 리조트 분위기 속에서 캐릭터가 점차 한계에 몰리는 상황을 담았습니다.

밝은 풍경과 페티시한 상황의 대비를 중시하며, 여행지의 감각을 중심으로 분위기를 만들었습니다.

남국 배경과 리조트 분위기를 시추에이션 중심 콘텐츠와 함께 즐길 수 있는 여행형 시리즈 타이틀입니다.`
    },
    "hokkaido-omorashi": {
      en: `Snow scenery, hot-spring towns, and quiet streets.

Set in Hokkaido, this AI CG collection specializes in omorashi situations.

Sightseeing areas, inns, stations, and snowy roads. The situations unfold through the distinct atmosphere of travel, with the character enduring until the limit.

Cold, movement, tension, and the feeling of being gradually cornered are emphasized in a travel-like flow.

It is a travel-mood series title where the scenery and atmosphere of Hokkaido form the background for fetish situations.`,
      zh: `雪景、温泉街与安静的街道。

本作是以北海道为舞台，围绕失禁情境展开的 AI 生成 CG 集。

观光地、旅馆、车站、雪路。在旅行特有的空气中，角色一直忍耐到极限，情境逐步展开。

寒冷、移动、紧张感，以及逐渐被逼到角落的感觉，构成了本作的旅行式流程。

这是一部以北海道景色和空气感作为背景，呈现要素情境的旅行氛围系列作品。`,
      ko: `눈 덮인 풍경, 온천 마을, 조용한 거리.

홋카이도를 무대로 한 오모라시 시추에이션 특화 AI 생성 CG집입니다.

관광지, 여관, 역, 눈길. 여행지 특유의 공기 속에서 한계까지 참아 가는 상황이 전개됩니다.

추위, 이동, 긴장감, 점점 몰려 가는 감각을 여행 같은 흐름 안에서 강조했습니다.

홋카이도의 풍경과 분위기를 배경으로 페티시한 상황을 담은 여행형 시리즈 타이틀입니다.`
    },
    "school-legs": {
      en: `An AI illustration collection gathering school-uniform commuting scenes and the expressions of beautiful legs and feet shown in soft light.

Centered on morning school routes, stairs, classrooms, and small everyday moments, it is arranged as an art collection themed around soles, leg lines, and school-life atmosphere.

Includes 110 pages.`,
      zh: `收录制服少女的通学风景，以及柔和光线中呈现的美腿与足元表情的 AI 插画集。

作品以早晨通学路、楼梯、教室和日常片段为中心，作为围绕足底、腿部线条与校园空气感的艺术收藏来构成。

共收录 110 页。`,
      ko: `교복을 입은 소녀들의 통학 풍경과 부드러운 빛 속에서 보이는 다리와 발 주변의 표정을 모은 AI 일러스트집입니다.

아침 통학로, 계단, 교실, 일상의 한 장면을 중심으로 발바닥과 다리 라인, 학교생활의 분위기를 담은 아트 컬렉션입니다.

총 110페이지를 수록했습니다.`
    },
    "setouchi-omorashi": {
      en: `Stone steps, winding slopes, and a Setouchi harbor town where the sea breeze passes through.

This story-focused AI CG collection depicts a girl fighting against the urge to urinate amid nostalgic scenery, following her limit and eventual breaking point.

An unguarded figure walking through the streets of Setouchi, gradually speaking less, turning inward at the knees, and showing expressions as she is pushed toward the limit.

The collection includes the moment she can no longer endure and breaks, as well as the blank stillness after everything has been released, across 500 images.

The work's main feature is its combination of urination, hikagami, and extreme hip-focused fetish imagery.

Tense knee-backs from restraint, trembling legs, underwear cutting into the body, and the exposed hip line after the breaking point are emphasized throughout as lower-body fetish expressions.

No male characters appear, and the work stays focused on an observational, voyeur-like point of view until the end.

It is an omnibus-style fetish CG collection combining Setouchi scenery with a girl's limit state.`,
      zh: `石阶、错综复杂的坡道，以及海风穿过的濑户内港町。

本作是一部重视故事流动的 AI 生成 CG 集，描绘少女在怀旧风景中与尿意抗争，直到极限与崩溃的过程。

在濑户内街道中无防备地行走的身影，逐渐减少的话语，向内收紧的膝盖，以及被逼近极限时的表情。

全 500 张中收录了无法再忍耐、最终崩溃的瞬间，以及一切释放之后的空白静止。

本作的主要特征，是将放尿、膝后与极端臀部要素结合在一起。

忍耐时紧绷的膝后、颤抖的双腿、勒进身体的内衣，以及崩溃后暴露的臀线，作为下半身要素贯穿全篇。

男性角色不会登场，作品从头到尾都以观察、窥视般的视点推进。

这是一部将濑户内风景与少女极限状态结合起来的合集式要素 CG 集。`,
      ko: `돌계단, 얽힌 언덕길, 바닷바람이 지나가는 세토우치의 항구 마을.

이 작품은 향수 어린 풍경 속에서 소변 욕구와 싸우는 소녀의 한계와 붕괴를 그린 스토리 중심 AI 생성 CG집입니다.

세토우치 거리를 무방비하게 걷는 모습, 점점 말수가 줄어드는 흐름, 안쪽으로 모이는 무릎, 한계에 가까워질 때의 표정.

총 500장 안에는 더 이상 참지 못하고 무너지는 순간과, 모두 흘러나간 뒤의 멍한 정적까지 포함되어 있습니다.

이 작품의 주요 특징은 방뇨, 히카가미, 극단적인 힙 중심 페티시 이미지를 결합한 점입니다.

참는 동안 긴장한 오금, 떨리는 다리, 몸을 파고드는 속옷, 무너진 뒤 드러나는 힙라인을 하반신 페티시 표현으로 강조했습니다.

남성 캐릭터는 등장하지 않으며, 마지막까지 관찰자적이고 훔쳐보는 듯한 시점에 집중합니다.

세토우치 풍경과 소녀의 한계 상태를 결합한 옴니버스형 페티시 CG 컬렉션입니다.`
    }
  };

  const officialJapaneseDescriptions = {
    "school-legs": `制服姿の少女たちの通学風景や、やわらかな光の中で見せる美脚・足元の表情をまとめたAIイラスト集です。

朝の通学路、階段、教室、日常の一場面などを中心に、足裏や脚線美をテーマにしたアートコレクションとして構成しました。

全110ページ収録。`,
    "gokujiri": `極端なまでに近い距離感。

本作は、ヒップラインと密着感に特化したフェチ重視のAI生成CG集作品です。

画面いっぱいに映るヒップ、押しつけられる肉感、近すぎる距離だからこそ生まれる圧迫感。

アングル、構図、密着感を重視し、視線を誘導するような構成で収録しています。

再編版では、シチュエーションや構図の流れを整理し、より見やすく没入感のある形で再構成。

フェチ作品としての空気感を重視した、ヒップ特化系CG集作品です。`,
    "shizuku-record": `唇、吐息、そして零れるしずく。

本作は、唇・口元・しずくの質感に焦点を当てた、口元フェチ特化のAI生成CG集です。

濡れた唇、糸を引くしずく、近すぎる距離だからこそ見える表情。やわらかさ、温度感、湿度を意識した接写構図を中心に、全420枚で構成しています。

各シチュエーションには、「フレームあり」の漫画風レイアウト版と、「フレームなし」の一枚絵版を収録。

ソロシチュエーションだけでなく、男女・女性同士それぞれの関係性による異なる空気感も楽しめる構成になっています。`,
    "hikagami": `「ひかがみ」とは、膝の裏側にある柔らかな窪みのこと。

本作は、これまで主役になりにくかった膝裏のライン、肌の質感、太ももからふくらはぎへ続く曲線に焦点を当てた、膝裏フェチ特化のAI生成CG集です。

夕暮れの学校、夜のお祭り、プライベートな室内など、さまざまなシチュエーションの中で、日常に潜む「ひかがみ」の魅力を収録。

引きの構図から、接近、至近距離の肉感表現まで、膝裏を中心に段階的に楽しめる構成になっています。

ストーリーに縛られないオムニバス形式で、ひかがみ・太もも・お尻・絶対領域などのフェチ要素を楽しめる、全322枚の特化型CG集です。`,
    "hikagami-school": `朝、制服へ着替え、学校へ向かい、授業を受け、帰宅して部屋で過ごすまで。

本作は、「ひかがみ」シリーズの世界観をベースにした、登校・学校生活・帰宅後の日常をテーマにしたAI生成CG集作品です。

制服姿の後ろ姿、階段を上る瞬間、教室での何気ない仕草、帰宅後にくつろぐ時間。

少女の日常動作の中にある、膝裏、太もも、ヒップライン、絶対領域などのフェチ要素を、ローアングル中心の構図で収録しています。

登校、教室、廊下、図書室、帰宅路、自室など、朝から夜までの流れに沿って、少しずつシチュエーションが変化していく構成になっています。

「ひかがみ」シリーズらしい下半身フェチ・接近感・日常空間を楽しめる、ルーティーン型CG集作品です。`,
    "eroboxin-4649": `えちえちなおねーさんが手に入れた、ちょっと怪しいお薬。その名も「エロボキシン4649」。

友達にすすめられ、彼氏と一緒に試してみたものの、気がつけば思っていたのとは違う展開に。

理性は揺らぎ、抑えきれない欲求だけが残る中、呼び寄せた彼氏と、止まらない時間が始まります。

本作は、日常の部屋を舞台に、キッチン、居間、お風呂、寝室へと場所を移しながら、欲求のままに進み続けるシチュエーションを収録。

最初は戸惑いを残していた表情も、場面が進むにつれて少しずつ熱を帯び、生活空間そのものが濃密な時間へと変わっていきます。

ストーリー性とシチュエーションの流れを重視して構成された、「エロボキシン4649」シリーズ第1作目です。`,
    "eroboxin-akane": `怪しい薬「エロボキシン4649」によって、理性を揺さぶられた少女「あかね」。

本作は、高級リゾートホテルを舞台に、夜のプール、最上階ラウンジ、大浴場、そしてベッドルームへと場所を移しながら、少しずつ欲求に飲み込まれていく姿を描いたストーリー重視のAI生成CG集作品です。

ライトアップされたナイトプール、夜景を見下ろすラウンジ、静かな湯気に包まれた浴場、二人きりのベッドルーム。

開放感のある高級空間の中で、最初は戸惑いを残していた表情も、場面が進むにつれて少しずつ熱を帯び、理性よりも欲求が優先されていきます。

水面反射、汗ばんだ肌、照明に照らされた身体の質感など、リゾート空間ならではの雰囲気と接近感を重視して構成しています。

「エロボキシン4649」シリーズ第2作となる、高級リゾートシチュエーション作品です。`,
    "hokkaido-omorashi": `雪景色、温泉街、静かな街並み。

北海道を舞台にした、おもらしシチュエーション特化のAI生成CG集です。

観光地、旅館、駅、雪道。旅先ならではの空気感の中で、限界まで我慢しながら過ごすシチュエーションを収録。

寒さ、移動、緊張感、そして少しずつ追い込まれていく空気感を重視し、旅行作品らしい流れで構成しています。

北海道の景色や雰囲気を背景として楽しみながら、フェチシチュエーションを味わえる、旅情系シリーズ作品です。`,
    "ancient-capital-beauty": `古都の情景と和装美人を軸にした、しっとりした空気感の作品。

神社、旅館、露天風呂、夜の和室へと場面が移りながら、距離感や表情が少しずつ変化していく流れを描いています。

和の静けさ、酔いによる空気の変化、そして落ち着いた雰囲気の中で進むシチュエーションを重視したシリーズです。`,
    "momoiro-baito": `太陽の下で弾ける笑顔は、夜の密室で「催〇」の言いなり人形へと変わっていく。

本作は、沖縄のリゾート地を舞台に、明るく働くピンク髪の少女が、少しずつ理性を奪われていく過程を描いたストーリー重視のAI生成CG集作品です。

昼は、海辺のカフェで元気に働く看板娘。

しかし夜になると、舞台は静かなリゾートホテルの密室へと変わり、抗えない催〇によって、少しずつ表情と視線が変化していきます。

健康的な日常、開放感のある南国空間、そして密室で崩れていく理性。

全300枚を通して、昼と夜のギャップを重視した構成になっています。

肌の質感、汗ばんだ身体、虚ろになっていく瞳など、段階的に変化していく空気感を楽しめる、催〇系ストーリー作品です。`,
    "okinawa-soso": `青い海、南国の空、リゾートホテル。

本作は、沖縄を舞台にした南国旅行シチュエーション系AI生成CG集です。

観光地、ホテル、プールサイド、海辺。開放感のあるリゾート空間の中で、少しずつ限界へ追い込まれていくシチュエーションを収録。

明るい景色とフェチシチュエーションのギャップを重視し、旅行中ならではの空気感で構成しています。

南国らしい背景やリゾートの雰囲気を楽しみながら、シチュエーション重視で味わえる、旅情系シリーズ作品です。`,
    "setouchi-omorashi": `石段、入り組んだ坂道、そして海風が吹き抜ける瀬戸内の港町。

本作は、ノスタルジックな情景の中で、「尿意」と戦い続ける少女の限界と決壊を描いた、情景重視のAI生成CG集作品です。

瀬戸内の街並みを歩く無防備な姿、徐々に口数が減り、内股になり、限界へ追い込まれていく表情。

そして、耐えきれず決壊してしまう瞬間と、全てを出し切った後の放心状態までを、全500枚で収録しています。

本作最大の特徴は、「放尿 × ひかがみ × 極尻」を組み合わせたフェチ描写。

我慢によって張り詰める膝裏、震える脚、食い込む下着、そして決壊後に無防備に晒されるヒップラインなど、全編を通して下半身フェチ表現を重視して構成しています。

男性キャラクターは登場せず、最後まで「観察・覗き見視点」に特化。

瀬戸内の情景と、少女の限界状態を組み合わせた、オムニバス型フェチCG集作品です。`,
    "satogaeri": `都会を離れて帰省した、懐かしい夏の故郷。

青空、田園風景、竹林、静かな温泉、そして誰もいない神社。

本作は、田舎の夏を舞台に、幼馴染との距離が少しずつ変わっていく姿を描いた、ストーリー重視のAI生成CG集作品です。

野外での無防備な姿、誰にも見られていないと思い込んだ仕草、夜の静かな温泉、そして実家で過ごすふたりきりの時間。

爽やかな日常の空気感から、徐々に欲情へ変わっていく流れを、全227枚で収録しています。

夏のノスタルジー、大自然の開放感、汗や唾液などの質感表現を重視した、田舎・帰省系ストーリー作品です。`,
    "kinpatsu-miko": `揺れる五円玉に、神職のプライドは少しずつ溶かされていく。

本作は、清楚な金髪巫女が、怪しげな術によって理性を塗り替えられていく過程を描いた、ストーリー重視のAI生成CG集作品です。

導入の催〇、薄暗い奥の院への連行、巫女服の剥奪、そして理性を失っていく姿まで。

全300枚を通して、一人の少女が少しずつ変化していく流れを収録しています。

最大の特徴は、肌の質感と接近感を重視した描写。

汗ばんだ肌、乱れていく表情など、和装作品ならではのフェチ感を意識して構成しています。

導入から結末まで、段階的に空気が変化していく、催〇・和装系ストーリー作品です。`
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

  function siteRootUrl() {
    if (location.protocol !== "http:" && location.protocol !== "https:") {
      return "https://kancha4-wq.github.io/esunamura-home/";
    }
    return (location.pathname || "").includes("/titles/")
      ? new URL("../", location.href).href
      : new URL("./", location.href).href;
  }

  function detailPageUrl(item) {
    const id = encodeURIComponent(item.id);
    return new URL(`titles/${id}.html`, siteRootUrl()).href;
  }

  function shareTextFor(item) {
    const title = titleOf(item);
    const summary = summaryOf(item);
    const pageUrl = detailPageUrl(item);
    const lang = currentLang();
    if (lang === "en") {
      return `"${title}" is now available.\n${summary}\nDetails, samples, and store links:\n${pageUrl}`;
    }
    if (lang === "zh") {
      return `「${title}」公开中。\n${summary}\n详情、样张和销售页面：\n${pageUrl}`;
    }
    if (lang === "ko") {
      return `"${title}" 공개 중.\n${summary}\n상세 정보, 샘플, 판매처:\n${pageUrl}`;
    }
    return `「${title}」公開中。\n${summary}\n詳細・サンプル・販売先はこちら：\n${pageUrl}`;
  }

  function shareUrlFor(item) {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTextFor(item))}`;
  }

  function analyticsPlatformFromUrl(url, fallback = "") {
    if (!url) return fallback.toLowerCase();
    const hostname = new URL(url, location.href).hostname;
    if (hostname.includes("dlsite.com") || hostname === "dlaf.jp") return "dlsite";
    if (hostname.includes("dmm.co.jp")) return "fanza";
    if (hostname.includes("digiket.com")) return "digiket";
    if (hostname.includes("booth.pm")) return "booth";
    if (hostname.includes("pictspace.net")) return "pictspace";
    if (hostname.includes("prompt-com.com")) return "promptcom";
    if (hostname.includes("pixiv.net")) return "pixiv";
    return fallback.toLowerCase();
  }

  function analyticsEventName(platform) {
    return {
      fanza: "click_fanza",
      dlsite: "click_dlsite",
      digiket: "click_digiket",
      booth: "click_booth",
      pictspace: "click_pictspace",
      promptcom: "click_promptcom",
      pixiv: "click_pixiv"
    }[platform] || "";
  }

  function analyticsParamsFor(item, platform) {
    return {
      work_slug: item.id,
      work_title: titleOf(item),
      platform,
      page_url: location.href,
      transport_type: "beacon"
    };
  }

  function trackPlatformClick(item, platform) {
    if (typeof window.gtag !== "function") {
      return;
    }

    const eventName = analyticsEventName(platform);
    if (eventName) {
      window.gtag("event", eventName, analyticsParamsFor(item, platform));
    }
  }

  function trackShareX(item) {
    if (typeof window.gtag !== "function") {
      return;
    }
    window.gtag("event", "click_share_x", analyticsParamsFor(item, "x"));
  }

  function labelOf(text) {
    const lang = currentLang();
    return labelTranslations[text]?.[lang] || text;
  }

  function localizedDescription(item) {
    const lang = currentLang();
    if (lang === "ja" && officialJapaneseDescriptions[item.id]) {
      return officialJapaneseDescriptions[item.id];
    }
    const translated = longDescriptionTranslations[item.id]?.[lang];
    if (translated) return translated;
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
      const platform = analyticsPlatformFromUrl(link.url, link.label);
      const analyticsAttrs = link.url
        ? `data-analytics-platform="${platform}" data-analytics-work="${item.id}"`
        : "";
      return `<a class="${className}" href="${href}" ${link.url ? 'target="_blank" rel="noopener noreferrer"' : ""} ${analyticsAttrs}>${label}</a>`;
    }).join("");
  }

  function renderShareButton(item) {
    return `<a class="share-x-button" href="${shareUrlFor(item)}" target="_blank" rel="noopener" data-share-x><span class="share-x-icon" aria-hidden="true">X</span>${uiText("shareX")}</a>`;
  }

  function bindShareButtons(item) {
    app.querySelectorAll("[data-share-x]").forEach((button) => {
      button.addEventListener("click", () => {
        trackShareX(item);
      });
    });
  }

  function renderPreviewLinks(item) {
    const links = previewLinks[item.id];
    if (!links) return "";
    return `
      <div class="detail-panel preview-links-panel">
        <h2>${uiText("preview")}</h2>
        <div class="preview-detail-links">
          <a class="sales-button" href="${links.pixiv}" target="_blank" rel="noopener" data-analytics-platform="pixiv" data-analytics-work="${item.id}">${uiText("pixiv")}</a>
          <a class="sales-button" href="${links.promptcom}" target="_blank" rel="noopener" data-analytics-platform="promptcom" data-analytics-work="${item.id}">${uiText("promptcom")}</a>
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
          <div class="share-links">${renderShareButton(work)}</div>
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
            <a class="related-card" href="${detailPageUrl(item)}">
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
    bindShareButtons(work);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-analytics-platform], a[data-analytics-link]");
    if (!link || link.matches("[data-share-x]")) {
      return;
    }

    const platform = link.dataset.analyticsPlatform || analyticsPlatformFromUrl(
      link.href,
      link.dataset.analyticsLink || link.textContent
    );
    trackPlatformClick(work, platform);
  });

  if (!work) {
    app.innerHTML = `<section class="not-found"><div><h1>Title not found</h1><p><a href="index.html">作品一覧へ戻る</a></p></div></section>`;
    return;
  }

  render();
})();
