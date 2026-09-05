(function () {
  window.researchSampleCandidates = window.researchSampleCandidates || { sections: [], items: [], contact_sheets: [] };
  const data = window.researchSampleCandidates;

  if (!data.sections.some((section) => section.id === "eyes_test34")) {
    data.sections.push({
      id: "eyes_test34",
      title_ja: "目プロンプト検証：テスト34-35候補",
      asset_dir: "assets/research/eyes/"
    });
  }

  const commonNegative = "closed eyes, eyes not visible, extra pupils, symbol eyes, horror eyes";
  const items = [
    {
      theme: "jitome_half_lidded_eyes",
      jp_label: "ジト目",
      important_tags: "half-lidded eyes, jitome",
      positive_prompt: "(half-lidded eyes:1.35), jitome, narrowed eyelids, relaxed eyelids, calm unimpressed eyes",
      verification_note: "追加生成から、まぶたの重さとジト目らしい冷めた視線が分かりやすい候補を採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/jitome_half_lidded_eyes/",
      samples: ["jitome_half_lidded_eyes_01.png", "jitome_half_lidded_eyes_02.png", "jitome_half_lidded_eyes_03.png"]
    },
    {
      theme: "small_eyes",
      jp_label: "小さい目",
      important_tags: "small eyes",
      positive_prompt: "(small eyes:1.35), visibly small anime eyes, compact eye shape, modest eye size, narrow but open eyes",
      verification_note: "追加生成から顔の破綻が少ない候補を採用。小さい目としての差分はまだ控えめ。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/small_eyes/",
      samples: ["small_eyes_01.png", "small_eyes_02.png", "small_eyes_03.png"]
    },
    {
      theme: "large_eyes",
      jp_label: "大きい目",
      important_tags: "large eyes",
      positive_prompt: "(large eyes:1.30), big anime eyes, wide open eyes, large round irises",
      verification_note: "初回生成から、目の大きさと幼さの増え方を比較しやすい候補を採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/large_eyes/",
      samples: ["large_eyes_01.png", "large_eyes_02.png", "large_eyes_03.png"]
    },
    {
      theme: "cat_eyes",
      jp_label: "猫目",
      important_tags: "cat eyes, almond eyes",
      positive_prompt: "(cat eyes:1.35), cat-like eye shape, almond eyes, slightly upturned outer corners, sharp upper eyelids",
      negative_prompt: "cat ears, animal ears, cat girl, animal girl, tail, whiskers, furry, costume ears, kemonomimi",
      verification_note: "追加生成から猫耳化を避けた候補を採用。猫目の形は今後もう少し強める余地あり。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/cat_eyes/",
      samples: ["cat_eyes_01.png", "cat_eyes_02.png", "cat_eyes_03.png"]
    },
    {
      theme: "round_eyes",
      jp_label: "丸目",
      important_tags: "round eyes",
      positive_prompt: "(round eyes:1.35), clearly round eye shape, round anime eyes, circular irises, soft open round eyes",
      verification_note: "追加生成から、丸い目元として説明しやすく破綻が少ない候補を採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/round_eyes/",
      samples: ["round_eyes_01.png", "round_eyes_02.png", "round_eyes_03.png"]
    },
    {
      theme: "slender_eyes",
      jp_label: "細長い目",
      important_tags: "slender eyes",
      positive_prompt: "(slender eyes:1.30), long narrow eye shape, horizontal almond eyes, slightly narrow eyelids",
      verification_note: "追加生成から、目幅が横に伸びた印象を比較しやすい候補を採用。構図差は少し残る。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/slender_eyes/",
      samples: ["slender_eyes_01.png", "slender_eyes_02.png", "slender_eyes_03.png"]
    },
    {
      theme: "droopy_eyes",
      jp_label: "たれ目",
      important_tags: "droopy eyes",
      positive_prompt: "(droopy eyes:1.30), downturned outer eye corners, soft droopy eyelids, gentle sad-looking eyes",
      verification_note: "追加生成から、目尻の下がり方とやわらかい印象が見える候補を採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/droopy_eyes/",
      samples: ["droopy_eyes_01.png", "droopy_eyes_02.png", "droopy_eyes_03.png"]
    },
    {
      theme: "upturned_eyes",
      jp_label: "つり目",
      important_tags: "upturned eyes",
      positive_prompt: "(upturned eyes:1.30), raised outer eye corners, confident eyes, defined upper eyelids",
      verification_note: "追加生成から、目尻が少し上がった印象を比較できる候補を採用。強さは控えめ。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/upturned_eyes/",
      samples: ["upturned_eyes_01.png", "upturned_eyes_02.png", "upturned_eyes_03.png"]
    },
    {
      theme: "sleepy_eyes",
      jp_label: "眠そうな目",
      important_tags: "sleepy eyes",
      positive_prompt: "(sleepy eyes:1.30), sleepy eyelids, tired relaxed eyes, low eyelids",
      verification_note: "まぶたの下がり方が見え、眠そうな印象を比較しやすい候補。",
      samples: ["sleepy_eyes_01.png", "sleepy_eyes_02.png", "sleepy_eyes_03.png"]
    },
    {
      theme: "sharp_eyes",
      jp_label: "鋭い目",
      important_tags: "sharp eyes",
      positive_prompt: "(sharp eyes:1.30), sharp eye shape, defined upper eyelids, serious eyes",
      verification_note: "鋭い目元がはっきりしていて、通常目との差分を見せやすい候補。",
      samples: ["sharp_eyes_01.png", "sharp_eyes_02.png", "sharp_eyes_03.png"]
    },
    {
      theme: "gentle_eyes",
      jp_label: "やさしい目",
      important_tags: "gentle eyes",
      positive_prompt: "(gentle eyes:1.25), soft eyes, warm eye expression, calm friendly eyes",
      verification_note: "やわらかい目元と穏やかな印象が出ている候補。",
      samples: ["gentle_eyes_01.png", "gentle_eyes_02.png", "gentle_eyes_03.png"]
    },
    {
      theme: "glossy_eyes",
      jp_label: "うるみ目",
      important_tags: "glossy eyes",
      positive_prompt: "(glossy eyes:1.30), moist eyes, watery eye highlights, soft reflective irises, emotional eyes",
      verification_note: "瞳の潤みと光沢が見やすく、比較素材として安定している候補。",
      samples: ["glossy_eyes_01.png", "glossy_eyes_02.png", "glossy_eyes_03.png"]
    },
    {
      theme: "sparkling_eyes",
      jp_label: "キラキラ目",
      important_tags: "sparkling eyes",
      positive_prompt: "(sparkling eyes:1.30), bright sparkling eyes, lively eye highlights, shiny irises",
      verification_note: "キラキラした瞳表現が明確で、効果を説明しやすい候補。",
      samples: ["sparkling_eyes_01.png", "sparkling_eyes_02.png", "sparkling_eyes_03.png"]
    },
    {
      theme: "detailed_iris",
      jp_label: "虹彩細かめ",
      important_tags: "detailed iris",
      positive_prompt: "(detailed iris:1.30), intricate iris pattern, visible iris texture, clear pupil, high detail anime eyes",
      verification_note: "追加生成から、瞳の情報量が比較的見やすい候補を採用。顔アップ寄りの画像で確認しやすい。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/detailed_iris/",
      samples: ["detailed_iris_01.png", "detailed_iris_02.png", "detailed_iris_03.png"]
    },
    {
      theme: "subdued_highlights",
      jp_label: "ハイライト控えめ",
      important_tags: "subdued eye highlights",
      positive_prompt: "(subdued eye highlights:1.35), small soft catchlights, low-intensity eye highlights, matte eyes, muted eye shine",
      verification_note: "追加生成から、ハイライト量が比較的控えめで落ち着いた瞳に寄った候補を採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/subdued_highlights/",
      samples: ["subdued_highlights_01.png", "subdued_highlights_02.png", "subdued_highlights_03.png"]
    },
    {
      theme: "starry_eyes_suppression",
      jp_label: "星目抑制",
      important_tags: "normal catchlights, no starry eyes",
      positive_prompt: "(normal round catchlights:1.25), natural anime eye highlights, simple clean iris, standard round eye shine, plain pupils",
      negative_prompt: "star-shaped pupils, star pupils, starry eyes, oshi no ko eyes, heart pupils, symbol eyes, cross pupils, glowing star highlights",
      verification_note: "追加生成から、星目を避けた通常ハイライト寄りの比較素材として採用。",
      source_test: "test35",
      asset_base: "assets/research/eyes/test35/starry_eyes_suppression/",
      samples: ["starry_eyes_suppression_01.png", "starry_eyes_suppression_02.png", "starry_eyes_suppression_03.png"]
    }
  ];

  const sectionItems = items.map((item, index) => ({
    section: "eyes_test34",
    order: index + 1,
    source_test: item.source_test || "test34",
    theme: item.theme,
    theme_name: item.theme,
    jp_label: item.jp_label,
    role: "main",
    important_tags: item.important_tags,
    positive_prompt: item.positive_prompt,
    negative_prompt: item.negative_prompt || commonNegative,
    verification_note: item.verification_note,
    final_status: "hp_candidate",
    asset_path: `${item.asset_base || `assets/research/eyes/test34/${item.theme}/`}${item.samples[0]}`,
    samples: item.samples.map((filename, sampleIndex) => ({
      label: sampleIndex === 0 ? "main" : "sample",
      asset_path: `${item.asset_base || `assets/research/eyes/test34/${item.theme}/`}${filename}`
    }))
  }));

  const existing = new Set(data.items.map((item) => `${item.section}:${item.theme_name || item.theme}`));
  sectionItems.forEach((item) => {
    if (!existing.has(`${item.section}:${item.theme_name}`)) data.items.push(item);
  });
})();
