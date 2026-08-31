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

const zh: Dictionary = {
  meta: {
    title: "联合车厂 Combined Smash Repairs — Five Dock",
    description:
      "位于 Five Dock Parramatta Road 的钣金喷漆及机械维修车厂。保险理赔从头到尾代办。电话 (02) 9799 9433。",
    ogDescription:
      "钣金、原厂色喷漆和机械维修，一站式完成。3A/61-73 Parramatta Rd, Five Dock NSW。",
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
    hero: "喷漆房内贴好遮蔽的汽车",
    detail: "车间地面上修复完成的豪华车与经典车",
    sanding: "钣金区打磨至底漆的车身壳体",
    workshop: "车间全景",
    mechanical: "机修区内的 Skyline GT-R",
  },

  hero: {
    eyebrow: "钣金 · 喷漆 · 机修 — Parramatta Rd",
    titleLine1: "撞坏的车",
    titleLine2: "我们修好",
    titleMark: "。",
    lede: "钣金、原厂色喷漆和机械维修，在 Five Dock 一家车厂全部搞定。保险理赔从头到尾由我们处理——已经做了 25 年多。",
    call: "致电",
    quote: "免费报价",
    onGoogle: "Google 评分",
    years: "25 年以上行业经验",
    work: "保险理赔 & 自费维修",
    photoEyebrow: "喷漆房内",
    photoCaption: "颜色完全一致，不是差不多",
    paintStages: ["打磨", "底漆", "色漆", "清漆"],
  },

  assurances: ["接受所有保险公司", "免费书面报价", "原厂色调色喷漆", "大部分车一周内完工"],

  services: {
    eyebrow: "我们的服务",
    title: "一家车厂，整车修好",
    items: [
      {
        title: "事故车身修复",
        body: "钣金和结构修复，从停车场刮蹭到严重碰撞都能处理。提前报价，走保险或自费均可。",
      },
      {
        title: "机械维修与保养",
        body: "事故相关的机械维修和常规保养——刹车、冷却、悬挂——同一家车厂、同一次完成。",
      },
    ],
    claim: {
      eyebrow: "保险理赔",
      title: "不知道理赔从哪里开始？",
      body: "把车开过来。我们拍照记录损伤、写好报价，并负责跟保险公司和评估员沟通——您只需和我们联系。",
      quote: "获取报价",
      talk: "联系我们",
    },
  },

  process: {
    eyebrow: "从头到尾",
    title: "维修流程",
    aside: "无论走保险还是自费，都是同样的五个步骤。动工之前，您就会知道价格。",
    steps: [
      { title: "报价", body: "开车过来看一下，当场出书面报价——通常等一会儿就好。" },
      { title: "审批", body: "走保险？我们提交报价，并负责与评估员沟通。" },
      { title: "钣金喷漆", body: "修复或更换车身板，然后调色喷涂。" },
      { title: "安全检查", body: "碰撞波及的部分——转向、灯光、冷却——全部检查并修好。" },
      { title: "取车", body: "洗干净交车。大部分车一周内就能上路。" },
    ],
  },

  faq: {
    eyebrow: "来之前了解一下",
    title: "常见问题",
    aside: "还有其他问题？直接打电话到车厂——比打字快。",
    items: [
      {
        q: "我可以自己选修车厂吗？",
        a: "在新州，大多数保单允许您指定自己的修车厂，而不必用保险公司指定的。查看您的保单条款（PDS），或者把保单带过来，我们帮您看。",
      },
      {
        q: "需要三份报价吗？",
        a: "少数保险公司仍要求多份报价，大多数不需要。无论如何，我们的报价免费且有书面文件。",
      },
      {
        q: "要修多久？",
        a: "大部分车一周内就能上路。结构性维修取决于配件到货的速度。",
      },
      {
        q: "颜色能对得上吗？",
        a: "按车辆的原厂色号调色，并向两侧车身板过渡喷涂，修补处不会出现色差。",
      },
      {
        q: "机械部分也能修吗？",
        a: "可以——钣金、喷漆和机修都在同一家车厂，车不会中途被送到别的地方。",
      },
      {
        q: "需要带什么？",
        a: "车、驾照，如果已经报案，还有保险公司名称和理赔编号。",
      },
    ],
  },

  reviews: {
    eyebrow: "街坊口碑",
    title: "客户怎么说",
    count: "14 条 Google 评价",
    readOnGoogle: "在 Google 上查看",
    source: "Google 评价",
    items: [
      "Super friendly staff.",
      "Our car got fixed in a week, very impressed with the quality of the work!",
      "A good place to service your car.",
    ],
  },

  quote: {
    eyebrow: "获取报价",
    title: "告诉我们发生了什么",
    body: "把详细情况发过来，我们会回电安排送车时间——或者跳过表单，直接打电话到车厂。",
    workshopEyebrow: "车厂",
    workshopTitle: "直接开过来，无需预约",
    workshopBody: "营业时间内当场出报价。",
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
    header: "维修申请",
    noObligation: "无需承诺",
    received: "已收到",
    name: "姓名",
    phone: "电话",
    email: "电子邮箱",
    optional: "选填",
    vehicle: "车辆",
    vehiclePlaceholder: "例如：Toyota Corolla 2019",
    insurer: "保险公司",
    insurerHint: "自费维修请留空",
    message: "发生了什么？",
    messagePlaceholder: "损伤在哪里、怎么发生的，或者车需要做什么维修。",
    footer: "我们会回电安排送车时间。",
    send: "发送申请",
    sending: "发送中…",
    successTitle: "申请已发送",
    successBefore: "谢谢——我们已收到详细信息，会在营业时间内回电。如果车无法行驶，请立即致电 ",
    successAfter: "。",
  },

  errors: {
    name: "请输入您的姓名。",
    phone: "请输入一个我们能联系到您的电话号码。",
    message: "请告诉我们发生了什么，或者车需要什么维修。",
    form: "有几项需要补充后才能发送。",
    send: "暂时无法发送您的申请——请重试，或致电 (02) 9799 9433。",
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
    call: "致电车厂",
    quote: "报价",
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, zh };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
