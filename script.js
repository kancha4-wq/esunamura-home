const works = [
  {
    title: { ja: "里帰り / Satogaeri", en: "Satogaeri / 里帰り" },
    slug: "satogaeri",
    image: "images/01_里帰り.jpg",
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
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8111107",
      pictSPACE: "https://pictspace.net/items/manage_detail/838048",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_744243/"
    }
  },
  {
    title: { ja: "瀬戸内おもらし紀行 / Setouchi Omorashi Journey", en: "Setouchi Omorashi Journey / 瀬戸内おもらし紀行" },
    slug: "setouchi-omorashi-journey",
    image: "images/04_瀬戸内おもらし紀行.png",
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8116002",
      pictSPACE: "https://pictspace.net/items/manage_detail/837289",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745411/",
      DLsite: "https://www.dlsite.com/aix/work/=/product_id/RJ01591984.html",
      PromptCom: "https://prompt-com.com/ja/p/4db875a2-a967-465c-93b8-eb28521defd4"
    }
  },
  {
    title: { ja: "北海道おもらし紀行 / Hokkaido Omorashi Journey", en: "Hokkaido Omorashi Journey / 北海道おもらし紀行" },
    slug: "hokkaido-omorashi-journey",
    image: "images/05_北海道おもらし紀行.jpg",
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120897",
      pictSPACE: "https://pictspace.net/items/manage_detail/838061",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_745765/",
      DLsite: "https://www.dlsite.com/aix/work/=/product_id/RJ01591976.html",
      PromptCom: "https://prompt-com.com/ja/p/2cbff6cf-bb88-4a78-8af0-cb43c5227164"
    }
  },
  {
    title: { ja: "金髪巫女 / Blonde Shrine Maiden", en: "Blonde Shrine Maiden / 金髪巫女" },
    slug: "blonde-shrine-maiden",
    image: "images/06_金髪巫女.jpg",
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120906",
      pictSPACE: "https://pictspace.net/items/manage_detail/838067",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_746695/",
      DLsite: "https://www.dlsite.com/aix/work/=/product_id/RJ01591986.html",
      PromptCom: "https://prompt-com.com/ja/p/4ca5f6fa-e429-4019-9d13-9738eecf2cb8"
    }
  },
  {
    title: { ja: "ごくじり / Gokujiri", en: "Gokujiri / ごくじり" },
    slug: "gokujiri",
    image: "images/07_ごくじり.jpg",
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8120812",
      pictSPACE: "https://pictspace.net/items/manage_detail/838060",
      PromptCom: "https://prompt-com.com/ja/p/03378ed3-d986-496a-88df-e1216d212266"
    }
  },
  {
    title: { ja: "沖縄ちゅらさん粗相 / Okinawa Churasan Accident", en: "Okinawa Churasan Accident / 沖縄ちゅらさん粗相" },
    slug: "okinawa-churasan-accident",
    image: "images/08_沖縄ちゅらさん粗相.jpg",
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
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8139630",
      pictSPACE: "https://pictspace.net/items/manage_detail/838081",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_751890/",
      DLsite: "https://www.dlsite.com/aix/work/=/product_id/RJ01601145.html",
      PromptCom: "https://prompt-com.com/ja/p/055982d7-98e2-47ae-92c0-dbb71e117d56"
    }
  },
  {
    title: { ja: "しずくの記録 / Shizuku no Kiroku", en: "Shizuku no Kiroku / しずくの記録" },
    slug: "shizuku-no-kiroku",
    image: "images/10_しずくの記録.jpg",
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8168871",
      pictSPACE: "https://pictspace.net/items/manage_detail/838092",
      DLsite: "https://www.dlsite.com/aix/work/=/product_id/RJ01604402.html",
      PromptCom: "https://prompt-com.com/ja/p/21cdb0c3-6cda-4e92-b9e7-bd1d521c2b66"
    }
  },
  {
    title: { ja: "ひかがみ 登校編 / Hikagami School Route", en: "Hikagami School Route / ひかがみ 登校編" },
    slug: "hikagami-school-route",
    image: "images/11_ひかがみ 登校編.jpg",
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
    links: {
      BOOTH: "https://esunamura.booth.pm/items/8238754",
      pictSPACE: "https://pictspace.net/items/manage_detail/851348",
      FANZA: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_758170/",
      PromptCom: "https://prompt-com.com/ja/p/d3d69153-c51f-41f6-8297-1a0a693c2583",
      "Free 64P": "https://pictspace.net/items/manage_detail/851351"
    }
  }
];

let currentLanguage = "ja";

const worksGrid = document.querySelector("#worksGrid");
const languageButtons = document.querySelectorAll(".lang-button");
const translatableNodes = document.querySelectorAll("[data-ja][data-en]");

function analyticsKey(label) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function createLink(label, url, workSlug) {
  const link = document.createElement("a");
  link.className = label === "Free 64P" ? "link-button accent" : "link-button";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.dataset.analyticsLink = analyticsKey(label);
  link.dataset.analyticsArea = "works";
  link.dataset.analyticsWork = workSlug;
  link.textContent = label;
  return link;
}

function renderWorks() {
  worksGrid.textContent = "";

  works.slice().reverse().forEach((work) => {
    const card = document.createElement("article");
    card.className = "work-card";

    const image = document.createElement("img");
    image.src = work.image;
    image.alt = work.title.ja;
    image.loading = "lazy";

    const copy = document.createElement("div");
    copy.className = "work-copy";

    const title = document.createElement("h3");
    title.textContent = work.title[currentLanguage];

    const links = document.createElement("div");
    links.className = "work-links";

    Object.entries(work.links).forEach(([label, url]) => {
      links.append(createLink(label, url, work.slug));
    });

    copy.append(title, links);
    card.append(image, copy);
    worksGrid.append(card);
  });
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  translatableNodes.forEach((node) => {
    node.textContent = node.dataset[language];
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });

  renderWorks();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage("ja");
