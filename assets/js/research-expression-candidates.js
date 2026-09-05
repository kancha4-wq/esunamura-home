(function () {
  window.researchSampleCandidates = window.researchSampleCandidates || { sections: [], items: [], contact_sheets: [] };
  const data = window.researchSampleCandidates;

  if (!data.sections.some((section) => section.id === "expression_test37")) {
    data.sections.push({
      id: "expression_test37",
      title_ja: "表情プロンプト検証：テスト37候補",
      asset_dir: "assets/research/expression/test37/"
    });
  }

  const commonNegative = "";
  const items = [
    {
      theme: "neutral_expression",
      jp_label: "無表情",
      important_tags: "neutral expression, calm face",
      positive_prompt: "neutral expression, calm face, relaxed eyebrows, closed mouth",
      negative_prompt: "big smile, crying, angry, surprised",
      verification_note: "表情差の基準にしやすい、落ち着いた無表情の候補。"
    },
    {
      theme: "soft_smile",
      jp_label: "やわらかい微笑み",
      important_tags: "soft smile, kind eyes",
      positive_prompt: "soft gentle smile, slight smile, kind eyes, relaxed eyebrows",
      negative_prompt: "wide grin, open mouth laugh, angry",
      verification_note: "控えめな笑みとして、自然な表情差を見せやすい候補。"
    },
    {
      theme: "happy_smile",
      jp_label: "笑顔",
      important_tags: "happy smile, cheerful expression",
      positive_prompt: "happy smile, bright eyes, cheerful expression, open friendly smile",
      negative_prompt: "sad, angry, crying, blank expression",
      verification_note: "明るい笑顔が出ていて、微笑みとの差分を比較しやすい候補。"
    },
    {
      theme: "troubled_expression",
      jp_label: "困り顔",
      important_tags: "troubled expression, worried eyebrows",
      positive_prompt: "troubled expression, worried eyebrows, uneasy smile, anxious eyes",
      negative_prompt: "happy grin, angry glare",
      verification_note: "眉と口元の不安感が見え、困り顔として使いやすい候補。"
    },
    {
      theme: "sad_expression",
      jp_label: "悲しい顔",
      important_tags: "sad expression, lonely eyes",
      positive_prompt: "sad expression, downturned eyebrows, lonely eyes, small frown",
      negative_prompt: "happy smile, angry, surprised",
      verification_note: "目元と口元の沈んだ印象が出ている悲しげな候補。"
    },
    {
      theme: "angry_expression",
      jp_label: "怒り顔",
      important_tags: "angry expression, furrowed eyebrows",
      positive_prompt: "angry expression, furrowed eyebrows, sharp eyes, tense mouth",
      negative_prompt: "smile, crying, sleepy",
      verification_note: "眉の険しさと目元の強さが分かりやすい怒り顔候補。"
    },
    {
      theme: "surprised_expression",
      jp_label: "驚き顔",
      important_tags: "surprised expression, wide eyes",
      positive_prompt: "surprised expression, wide eyes, raised eyebrows, slightly open mouth",
      negative_prompt: "angry, sleepy, closed eyes",
      verification_note: "目の開きと口元で驚きの印象を確認しやすい候補。"
    },
    {
      theme: "embarrassed_expression",
      jp_label: "照れ顔",
      important_tags: "embarrassed expression, blush",
      positive_prompt: "embarrassed expression, shy smile, blush, averted timid mood, nervous eyebrows",
      negative_prompt: "angry, smug, crying",
      verification_note: "赤みと目元の遠慮があり、照れた印象を比較しやすい候補。"
    },
    {
      theme: "jitome_annoyed",
      jp_label: "ジト目・むすっ",
      important_tags: "jitome, half-lidded eyes",
      positive_prompt: "jitome, half-lidded eyes, annoyed expression, unimpressed face, flat mouth",
      negative_prompt: "big smile, surprised, crying, wide open eyes",
      verification_note: "半目と不満げな口元が見え、むすっとした印象を確認できる候補。"
    },
    {
      theme: "smug_expression",
      jp_label: "どや顔",
      important_tags: "smug expression, confident smirk",
      positive_prompt: "smug expression, confident smirk, proud eyes, raised eyebrow",
      negative_prompt: "sad, crying, worried",
      verification_note: "自信のある目元と口元が出ている、どや顔の比較候補。"
    },
    {
      theme: "pouting_expression",
      jp_label: "ふくれっ面",
      important_tags: "pouting expression, puffed cheeks",
      positive_prompt: "pouting expression, puffed cheeks, sulky face, displeased eyes",
      negative_prompt: "smile, open mouth laugh",
      verification_note: "不満げな頬と目元が見え、ふくれっ面として説明しやすい候補。"
    },
    {
      theme: "mischievous_smile",
      jp_label: "いたずらっぽい笑み",
      important_tags: "mischievous smile, playful eyes",
      positive_prompt: "mischievous smile, playful eyes, sly grin, teasing expression",
      negative_prompt: "sad, crying, blank expression",
      verification_note: "目元と口元に遊びのある、いたずらっぽい笑みの候補。"
    },
    {
      theme: "sleepy_expression",
      jp_label: "眠そうな表情",
      important_tags: "sleepy expression, droopy eyelids",
      positive_prompt: "sleepy expression, droopy eyelids, tired eyes, relaxed mouth",
      negative_prompt: "wide awake, surprised, angry",
      verification_note: "まぶたの重さが見え、眠そうな表情差を比較しやすい候補。"
    },
    {
      theme: "teary_eyes_expression",
      jp_label: "涙目",
      important_tags: "teary eyes, watery eyes",
      positive_prompt: "teary eyes, watery eyes, trembling lips, emotional expression, about to cry",
      negative_prompt: "big smile, angry glare",
      verification_note: "目元の潤みと不安そうな口元が出ている涙目候補。"
    },
    {
      theme: "strong_blush_expression",
      jp_label: "赤面強め",
      important_tags: "strong blush, flushed cheeks",
      positive_prompt: "strong blush, flushed cheeks, bashful expression, shy eyes, embarrassed mouth",
      negative_prompt: "angry, sad, pale face",
      verification_note: "頬の赤みが強く、照れや動揺の表現を見せやすい候補。"
    },
    {
      theme: "dazed_expression",
      jp_label: "ぼんやり顔",
      important_tags: "dazed expression, vacant eyes",
      positive_prompt: "dazed expression, vacant eyes, unfocused gaze, slightly parted lips",
      negative_prompt: "angry, sharp focus expression",
      verification_note: "視線の抜けた印象があり、ぼんやり感を比較しやすい候補。"
    },
    {
      theme: "enchanted_expression",
      jp_label: "うっとり顔",
      important_tags: "enchanted expression, dreamy eyes",
      positive_prompt: "enchanted expression, dreamy eyes, soft smile, fascinated face",
      negative_prompt: "angry, sad, disgusted",
      verification_note: "やわらかい目元と頬の雰囲気で、うっとりした印象が出ている候補。"
    },
    {
      theme: "melting_expression",
      jp_label: "とろけ顔",
      important_tags: "melting expression, blissful smile",
      positive_prompt: "melting expression, softened eyes, blissful smile, relaxed face",
      negative_prompt: "angry, tense mouth",
      verification_note: "力の抜けた目元と笑みが見え、とろけた表情として比較しやすい候補。"
    },
    {
      theme: "enduring_expression",
      jp_label: "我慢顔",
      important_tags: "enduring expression, strained face",
      positive_prompt: "enduring expression, strained face, clenched mouth, tense eyebrows, holding back emotion",
      negative_prompt: "happy smile, relaxed face",
      verification_note: "こらえているような口元と眉が出ている我慢顔候補。"
    },
    {
      theme: "exhausted_expression",
      jp_label: "ぐったり顔",
      important_tags: "exhausted expression, weary face",
      positive_prompt: "exhausted expression, tired eyes, weary face, weak mouth, drained mood",
      negative_prompt: "cheerful smile, energetic expression",
      verification_note: "疲れた目元と弱い口元があり、ぐったり感を確認しやすい候補。"
    }
  ];

  const sectionItems = items.map((item, index) => ({
    section: "expression_test37",
    order: index + 1,
    source_test: "test37",
    theme: item.theme,
    theme_name: item.theme,
    jp_label: item.jp_label,
    role: "main",
    important_tags: item.important_tags,
    positive_prompt: item.positive_prompt,
    negative_prompt: item.negative_prompt,
    verification_note: item.verification_note,
    final_status: "hp_candidate",
    asset_path: `assets/research/expression/test37/${item.theme}/${item.theme}_01.png`,
    samples: [1, 2, 3].map((sampleIndex) => ({
      label: sampleIndex === 1 ? "main" : "sample",
      asset_path: `assets/research/expression/test37/${item.theme}/${item.theme}_${String(sampleIndex).padStart(2, "0")}.png`
    }))
  }));

  const existing = new Set(data.items.map((item) => `${item.section}:${item.theme_name || item.theme}`));
  sectionItems.forEach((item) => {
    if (!existing.has(`${item.section}:${item.theme_name}`)) data.items.push(item);
  });
})();
