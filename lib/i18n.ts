/* ------------------------------------------------------------------ *
 * Site copy in both languages. `zh` is typed against `en`, so a key
 * missing from the Chinese dictionary is a build error, not a blank
 * spot on the page.
 *
 * Brand name, address, phone number and suburb names stay in English
 * in both — that's how people search for and navigate to the shop.
 * ------------------------------------------------------------------ */

export const LANGS = ["en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** BCP 47 tag for `<html lang>`. CSS `:lang(zh)` matches `zh-Hans`. */
export const htmlLang: Record<Lang, string> = {
  en: "en-AU",
  zh: "zh-Hans",
};

/** How each language names itself in the toggle. */
export const langLabel: Record<Lang, string> = {
  en: "EN",
  zh: "中文",
};

const en = {
  meta: {
    title: "Combined Smash Repairs — Five Dock",
    description:
      "Smash repairs, spray painting and mechanical repairs on Parramatta Road, Five Dock. Insurance claims handled start to finish. Call (02) 9799 9433.",
    ogDescription:
      "Panel beating, colour-matched spray painting and mechanical repairs under one roof. 3A/61-73 Parramatta Rd, Five Dock NSW.",
    ogLocale: "en_AU",
  },

  header: {
    brand: "Combined Smash Repairs",
    brandSub: "联合车厂 · FIVE DOCK",
    navLabel: "Primary",
    nav: {
      services: "Services",
      process: "Process",
      reviews: "Reviews",
      findUs: "Find us",
    },
    languageLabel: "Language",
    call: "Call",
  },

  photos: {
    hero: "Car masked up inside a lit spray booth",
    detail: "Finished prestige and classic cars on the workshop floor",
    sanding: "A bare shell sanded back to primer in the panel bay",
    workshop: "The workshop floor",
    mechanical: "A Skyline GT-R in the mechanical bay",
  },

  hero: {
    eyebrow: "Smash · Paint · Mechanical — Parramatta Rd",
    titleLine1: "We put cars",
    titleLine2: "back together",
    titleMark: ".",
    lede: "Panel beating, colour-matched spray painting and mechanical repairs under one roof in Five Dock. Insurance claims handled start to finish — over 25 years of them.",
    call: "Call",
    quote: "Get a quote",
    onGoogle: "on Google",
    years: "25+ years in the trade",
    work: "Insurance & private work",
    photoEyebrow: "In the booth",
    photoCaption: "Colour matched, not close enough",
    paintStages: ["Strip", "Primer", "Colour", "Clear"],
  },

  assurances: [
    "All insurers welcome",
    "Free written quotes",
    "Colour-matched paint",
    "Most jobs back in a week",
  ],

  services: {
    eyebrow: "What we do",
    title: "One workshop, the whole repair",
    items: [
      {
        title: "Smash repairs",
        body: "Panel beating and structural repair for everything from car-park scrapes to serious hits. Quoted up front, through your insurer or privately.",
      },
      {
        title: "Mechanical repairs & servicing",
        body: "Accident-related mechanical work and regular servicing — brakes, cooling, suspension — handled in the same workshop, same visit.",
      },
    ],
    claim: {
      eyebrow: "Insurance claims",
      title: "Not sure where to start with a claim?",
      body: "Bring the car in. We photograph the damage, write the quote and deal with the insurer and their assessor — you deal with us.",
      quote: "Get a quote",
      talk: "Talk to us",
    },
  },

  process: {
    eyebrow: "Start to finish",
    title: "How a repair runs",
    aside: "Same five steps whether you’re claiming or paying privately. You’ll know the price before anything is touched.",
    steps: [
      { title: "Quote", body: "Drive in for a look and a written quote — usually while you wait." },
      { title: "Approval", body: "Going through insurance? We submit the quote and deal with the assessor." },
      { title: "Panel & paint", body: "Panels repaired or replaced, then colour-matched and sprayed." },
      { title: "Safety check", body: "Anything the impact reached — steering, lights, cooling — checked and fixed." },
      { title: "Pickup", body: "Washed and ready. Most jobs are back on the road within the week." },
    ],
  },

  /* Answers need confirming with the workshop before this ships. */
  faq: {
    eyebrow: "Before you come in",
    title: "Questions we get asked",
    aside: "Anything else, ring the workshop — it’s quicker than typing it out.",
    items: [
      {
        q: "Can I choose my own repairer?",
        a: "In NSW most policies let you nominate your own repairer rather than take the insurer's. Check your PDS, or bring it in and we'll go through it with you.",
      },
      {
        q: "Do I need three quotes?",
        a: "A few insurers still ask for more than one; most don't. Ours is free and written either way.",
      },
      {
        q: "How long will it take?",
        a: "Most jobs are back on the road within the week. Structural work depends on how fast the parts land.",
      },
      {
        q: "Will the paint match?",
        a: "Colour is mixed to the vehicle's paint code and blended into the panels either side, so the repair doesn't sit next to a slightly different shade.",
      },
      {
        q: "Can you do the mechanical work too?",
        a: "Yes — panel, paint and mechanical are all in the one workshop, so the car doesn't get sent somewhere else halfway through.",
      },
      {
        q: "What should I bring?",
        a: "The car, your licence, and the insurer and claim number if you've already lodged one.",
      },
    ],
  },

  /* Quotes are left in the reviewer's own words in both languages. */
  reviews: {
    eyebrow: "From the street",
    title: "What people say",
    count: "14 Google reviews",
    readOnGoogle: "Read them on Google",
    source: "Google review",
    items: [
      "Super friendly staff.",
      "Our car got fixed in a week, very impressed with the quality of the work!",
      "A good place to service your car.",
    ],
  },

  quote: {
    eyebrow: "Get a quote",
    title: "Tell us what happened",
    body: "Send the details through and we’ll call you back with a time to bring the car in — or skip the form and ring the workshop.",
    workshopEyebrow: "The workshop",
    workshopTitle: "Drive in, no appointment",
    workshopBody: "Quotes are done on the spot during workshop hours.",
    visit: "Visit",
    directions: "Directions",
    call: "Call",
    hours: "Hours",
    weekdays: "Mon – Fri",
    weekdayHours: "8:00 am – 5:00 pm",
    weekend: "Sat – Sun",
    closed: "Closed",
  },

  form: {
    header: "Job request",
    noObligation: "No obligation",
    received: "Received",
    name: "Name",
    phone: "Phone",
    email: "Email",
    optional: "optional",
    vehicle: "Vehicle",
    vehiclePlaceholder: "e.g. Toyota Corolla 2019",
    insurer: "Insurance company",
    insurerHint: "leave blank if paying privately",
    message: "What happened?",
    messagePlaceholder: "Where the damage is, how it happened, or the work the car needs.",
    footer: "We’ll call you back with a time to bring the car in.",
    send: "Send request",
    sending: "Sending…",
    successTitle: "Request sent",
    successBefore:
      "Thanks — we’ve got the details and we’ll call you back during workshop hours. If the car isn’t driveable, ring us now on ",
    successAfter: ".",
  },

  errors: {
    name: "Enter your name.",
    phone: "Enter a phone number we can call you on.",
    message: "Tell us what happened, or what the car needs.",
    form: "A couple of fields need attention before we can send this.",
    send: "We couldn’t send your request just now — please try again, or call us on (02) 9799 9433.",
  },

  footer: {
    brand: "Combined Smash Repairs",
    brandSub: "联合车厂 · Smash & Mechanic Repair Service",
    services: "Services",
    areas: "Areas we cover",
    tagline: "Smash repairs · Spray painting · Mechanical",
    copyright: "Combined Smash Repairs",
  },

  mobile: {
    call: "Call the workshop",
    quote: "Quote",
  },
};

export type Dictionary = typeof en;

/* Written for Mandarin readers, not translated line by line: industry
 * terms follow Chinese insurance usage (定损员 = assessor, 报案号 =
 * claim number) and the English em dashes are dropped. */
const zh: Dictionary = {
  meta: {
    title: "联合车厂 Combined Smash Repairs｜Five Dock 钣金喷漆 汽车维修",
    description:
      "联合车厂位于悉尼 Five Dock Parramatta Road，专做钣金、喷漆和汽车机修，保险理赔全程代办。电话 (02) 9799 9433。",
    ogDescription:
      "钣金、喷漆、机修一站式搞定，按原厂色号精准调色。地址：3A/61-73 Parramatta Rd, Five Dock NSW。",
    ogLocale: "zh_CN",
  },

  header: {
    brand: "联合车厂",
    brandSub: "COMBINED SMASH REPAIRS · FIVE DOCK",
    navLabel: "主导航",
    nav: {
      services: "服务项目",
      process: "维修流程",
      reviews: "客户评价",
      findUs: "联系我们",
    },
    languageLabel: "语言",
    call: "致电",
  },

  photos: {
    hero: "喷漆房内贴好遮蔽纸、准备喷漆的汽车",
    detail: "车间里修好待取的豪车和老爷车",
    sanding: "钣金区里打磨到底漆的车身",
    workshop: "车间内景",
    mechanical: "机修工位上的日产 Skyline GT-R",
  },

  hero: {
    eyebrow: "钣金 · 喷漆 · 机修 — Parramatta Rd",
    titleLine1: "车？坏了?",
    titleLine2: "我们来修",
    titleMark: "。",
    lede: "钣金、喷漆、机修，在 Five Dock 一站式搞定，颜色按原厂色号精准调配。保险理赔从报价到交车全程代办，这行我们已经做了 25\u00A0年以上。",
    call: "致电",
    quote: "免费报价",
    onGoogle: "Google 评分",
    years: "从业 25 年以上",
    work: "保险理赔、自费维修均可",
    photoEyebrow: "喷漆房",
    photoCaption: "精准调色，差不多可不行",
    paintStages: ["打磨", "底漆", "色漆", "清漆"],
  },

  assurances: ["各大保险公司均可", "免费书面报价", "按原厂色号调色", "多数车一周内交车"],

  services: {
    eyebrow: "我们的服务",
    title: "修车不用来回跑",
    items: [
      {
        title: "事故车维修",
        body: "钣金整形和车身结构修复，停车场的小剐蹭到严重碰撞都能修。先报价后动工，走保险或自费都可以。",
      },
      {
        title: "机械维修与保养",
        body: "事故造成的机械问题和日常保养，刹车、冷却系统、悬挂都能做。车不用换地方，一次修好。",
      },
    ],
    claim: {
      eyebrow: "保险理赔",
      title: "不懂理赔流程？",
      body: "直接把车开过来。拍照取证、出报价、跟保险公司和定损员沟通，都由我们来办，您只需要跟我们联系。",
      quote: "免费报价",
      talk: "电话咨询",
    },
  },

  process: {
    eyebrow: "从报价到交车",
    title: "维修流程",
    aside: "走保险还是自费，流程都一样，一共五步。先报价后动工，价格提前心里有数。",
    steps: [
      { title: "报价", body: "把车开过来看看，现场出书面报价，一般稍等一会儿就好。" },
      { title: "定损审批", body: "走保险的话，报价由我们提交，定损员也由我们对接。" },
      { title: "钣金喷漆", body: "修复或更换受损钣件，再按原厂色号调色喷涂。" },
      { title: "安全检查", body: "碰撞波及的部位，比如转向、灯光、冷却系统，都会检查并修好。" },
      { title: "取车", body: "洗好车再交给您。多数车一周内就能开走。" },
    ],
  },

  faq: {
    eyebrow: "来店前须知",
    title: "常见问题",
    aside: "还有其他问题，直接打电话到车厂问，比打字快。",
    items: [
      {
        q: "我能自己选修车厂吗？",
        a: "在新州，大多数保单允许您自己指定修车厂，不必去保险公司指定的那家。可以查看保单的产品披露声明（PDS），或者把保单带来，我们帮您看。",
      },
      {
        q: "需要拿三份报价吗？",
        a: "少数保险公司还要求多家报价，大多数不用。不管哪种情况，我们的报价都免费，并提供书面报价单。",
      },
      {
        q: "要修多久？",
        a: "多数车一周内就能修好上路。结构性维修要看配件多久到货。",
      },
      {
        q: "补漆会有色差吗？",
        a: "我们按车辆的原厂色号调色，并对相邻钣件做过渡喷涂，修补的地方和原车漆看不出差别。",
      },
      {
        q: "机修也能做吗？",
        a: "能。钣金、喷漆、机修都在同一个车厂，车不会修到一半再被送去别处。",
      },
      {
        q: "来的时候要带什么？",
        a: "车和驾照。如果已经向保险公司报案，再带上保险公司名称和报案号。",
      },
    ],
  },

  reviews: {
    eyebrow: "真实口碑",
    title: "客户怎么说",
    count: "14 条 Google 评价",
    readOnGoogle: "在 Google 查看全部评价",
    source: "Google 评价",
    items: [
      "Super friendly staff.",
      "Our car got fixed in a week, very impressed with the quality of the work!",
      "A good place to service your car.",
    ],
  },

  quote: {
    eyebrow: "免费报价",
    title: "说说您的车况",
    body: "填好信息发给我们，我们会回电约送车时间。不想填表的话，也可以直接打电话到车厂。",
    workshopEyebrow: "车厂信息",
    workshopTitle: "无需预约，直接开过来",
    workshopBody: "营业时间内到店，现场报价。",
    visit: "地址",
    directions: "导航",
    call: "电话",
    hours: "营业时间",
    weekdays: "周一至周五",
    weekdayHours: "上午 8:00 – 下午 5:00",
    weekend: "周六、周日",
    closed: "休息",
  },

  form: {
    header: "报价申请",
    noObligation: "报价免费，修不修由您",
    received: "已收到",
    name: "姓名",
    phone: "电话",
    email: "邮箱",
    optional: "选填",
    vehicle: "车型",
    vehiclePlaceholder: "例如：2019 款 Toyota Corolla",
    insurer: "保险公司",
    insurerHint: "自费维修请留空",
    message: "车况描述",
    messagePlaceholder: "例如：哪里受损、怎么撞的，或者需要做哪些维修。",
    footer: "我们会回电跟您约送车时间。",
    send: "提交申请",
    sending: "提交中…",
    successTitle: "提交成功",
    successBefore: "谢谢！信息已收到，我们会在营业时间内回电。如果车已经开不了，请直接致电 ",
    successAfter: "。",
  },

  errors: {
    name: "请填写姓名。",
    phone: "请填写能联系到您的电话号码。",
    message: "请简单描述车况或需要的维修。",
    form: "还有几项没填好，请检查后再提交。",
    send: "提交失败，请稍后重试，或直接致电 (02) 9799 9433。",
  },

  footer: {
    brand: "联合车厂",
    brandSub: "Combined Smash & Mechanic Repair Service",
    services: "服务项目",
    areas: "服务区域",
    tagline: "钣金 · 喷漆 · 机修",
    copyright: "联合车厂 Combined Smash Repairs",
  },

  mobile: {
    call: "拨打电话",
    quote: "免费报价",
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, zh };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
