// "קורס העלאת תדר": default page content + the schema the admin editor renders.
// The live page loads overrides saved from /admin (stored in the za-cpa-leads
// worker); this file is the fallback and the starting point for the editor.

export type Item = { title: string; body: string }
export type Session = { title: string; body: string }

export type FrequencyContent = {
  seoTitle: string
  hero: { badge: string; title: string; subtitle: string; cta: string; image: string }
  intro: { lead: string; highlight: string }
  benefitsTitle: string
  benefits: Item[]
  aboutTitle: string
  about: string[]
  journeyTitle: string
  journeyIntro: string
  sessions: Session[]
  formatTitle: string
  format: Item[]
  includesTitle: string
  includes: string[]
  testimonial: { quote: string; author: string }
  oritTitle: string
  orit: string[]
  detailsTitle: string
  details: Item[]
  faqTitle: string
  faq: Item[]
  note: string
  registration: {
    button: string
    modalTitle: string
    modalSubtitle: string
    dateLabel: string
    dates: string[]
    priceLabel: string
    priceRegular: string
    priceNote: string
    paymentUrl: string
    thanks: string
    whatsappNumber: string
    whatsappMessage: string
  }
}

// Saved overrides older than this are treated as stale (the course was rebuilt
// as 9 sessions on 2026-11-02); the page then shows DEFAULT_FREQUENCY instead.
export const FREQUENCY_CONTENT_SINCE = '2026-11-02T00:00:00.000Z'

export const DEFAULT_FREQUENCY: FrequencyContent = {
  seoTitle: "קורס העלאת תדר · 9 מפגשים לנשים | אורית עשור",
  hero: {
    badge: "קורס חדש · 9 מפגשים · קבוצה קטנה",
    title: "קורס העלאת תדר",
    subtitle: "תשעה מפגשים שבהם נעלה יחד מתודעה הישרדותית, לחץ ועומס אל חיים של בחירה, שקט פנימי וחיבור: בבית, מול הילדים, בזוגיות, ובעיקר מול עצמך.",
    cta: "אני רוצה להצטרף",
    image: "/orit/orit.jpeg",
  },
  intro: {
    lead: "יש ימים שהכול מרגיש כבד. אותו ויכוח, אותה עייפות, אותה תחושה של \"לא מספיק\", גם כשאת עושה כל כך הרבה.",
    highlight: "כי כשאת בתדר גבוה, הכול מסביבך משתפר. וכל ירידה בתדר היא הזמנה לדיוק, לניקוי ולעלייה לשלב הבא שלך.",
  },
  benefitsTitle: "מה תקבלי בקורס?",
  benefits: [
    {
      title: "להבין מה מוריד אותך",
      body: "תלמדי לזהות באיזו מדרגת תודעה את נמצאת, להבחין בין מה שקרה באמת לבין הסיפור שסיפרת לעצמך, ולתפוס את הרגע שבו התדר מתחיל לרדת.",
    },
    {
      title: "כלים לעלות בחזרה",
      body: "בכל מפגש כלים פשוטים ומעשיים, תודעתיים וגם פיזיולוגיים, שאפשר להפעיל כבר באותו ערב: במטבח, מול הילדים, באמצע ויכוח.",
    },
    {
      title: "שקט, חיבור ונוכחות",
      body: "פחות מלחמה עם האנשים הקרובים, גבולות בלי כעס ובלי אשמה, ותחושה שאת לא לבד: חיבור לעצמך, לסביבה ולבורא.",
    },
  ],
  aboutTitle: "על הקורס",
  about: [
    "קורס העלאת תדר הוא מסע של תשעה מפגשים לנשים, שמחבר בין שני עולמות: ההבנה שכל אחת מאיתנו חיה ופועלת מתוך תדר, רמת תודעה ואנרגיה שעולה ויורדת לאורך היום, והכלים המעשיים של עבודת המידות, שמאפשרים לשנות אותו מבפנים.",
    "זו לא הרצאה ולא עוד רשימת טיפים. בכל מפגש נלמד כלי, נתרגל אותו על סיטואציות אמיתיות מהשבוע, ונצא עם תרגול קטן, בגודל שלנו, לימים הקרובים.",
    "אין צורך בידע קודם. רק ברצון לפגוש את עצמך ביושר ובעין טובה.",
  ],
  journeyTitle: "המסע: תשעה מפגשים, מדרגה אחר מדרגה",
  journeyIntro: "המפגשים בנויים כמהלך אחד. כל מפגש נשען על הקודם ומעלה אותנו שלב נוסף, ולכן מומלץ להשתתף בכולם ברצף.",
  sessions: [
    {
      title: "מדרגות התודעה",
      body: "לזהות איפה את ממוקמת במפת 7 דרגות התודעה, ואיך לעבור מתודעה הישרדותית ולחץ לתודעה של אהבה ואחדות. כי רק בתדר גבוה ניתן לזמן שפע לחיים שלנו.",
    },
    {
      title: "תורת השיקופים: האחר כראי",
      body: "לנתב כל קונפליקט ומפגש מאתגר לדיוק ההתפתחות האישית שלך, ולהביא ריפוי עמוק לכל מערכות היחסים בחייך.",
    },
    {
      title: "מאישה שורדת לאישה בוחרת",
      body: "סוף לג'אגלינג ולעומס המתיש. לנהל את עצמך מתוך נוכחות, שקט ומיקוד, להציב גבולות בריאים בלי כעס ובלי אשמה, ולהפסיק לפזר אנרגיה על מה שמחוץ לתחומך.",
    },
    {
      title: "אין מציאות אחת",
      body: "לעבור מגרסת מציאות אחת לגרסה מיטיבה: לקחת בעלות מלאה על התסריט של חייך, ולבחור מחשבות מעצימות שמתחברות לתדר גבוה ולמציאות שופעת.",
    },
    {
      title: "לשחרר את ארבעת החסמים",
      body: "להכיר ולמוסס את החסמים לרוגע ושלווה: דאגה, קורבנות, קושי בקבלת החלטות ורגשות אשם, ולרכוש כלים פיזיולוגיים ותודעתיים להורדה מיידית של סטרס.",
    },
    {
      title: "אסטרטגיית חיים",
      body: "לשחרר את מנגנוני ההגנה שאימצת בילדותך, אלה שפעם שמרו עלייך ועכשיו מובילים אותך שוב ושוב לאותן סיטואציות, אל עבר חירות אמיתית.",
    },
    {
      title: "ערפדי אנרגיה ומתקפות אנרגטיות",
      body: "לזהות אנשים וסיטואציות שגוזלים ממך אנרגיה, ולשמור על מרכז יציב, קור רוח ושקט פנימי גם בשיא הסערה: בבית, מול הילדים ובעבודה.",
    },
    {
      title: "זהות חדשה וחיבור עמוק לבורא",
      body: "לגבש זהות חדשה, יציבה ומלאת ביטחון פנימי, עם ארגז כלים שלם ונגיש, ולחוות סיפוק, הודיה, נוכחות מלאה וחיבור עמוק לעצמך ולבורא.",
    },
    {
      title: "מפת דרכים אישית",
      body: "מפגש סיכום: נחבר את כל הכלים וננסח עבורך מפת דרכים אישית ומעשית, כדי לשמור על תדר גבוה, יציבות פנימית וחירות רגשית לאורך זמן.",
    },
  ],
  formatTitle: "איך נראה כל מפגש?",
  format: [
    {
      title: "פתיחה ושיתוף",
      body: "סבב קצר על התרגול מהשבוע ועל השאלון שנשלח לפני המפגש. בלי עצות ובלי פרשנות, רק הקשבה.",
    },
    {
      title: "לימוד הכלי",
      body: "הכלי המרכזי של המפגש, דרך סיפורים אמיתיים מהבית ומהחיים, בשני חלקים.",
    },
    {
      title: "הפסקה",
      body: "כיבוד קל ורגע לנשום.",
    },
    {
      title: "תרגול",
      body: "עבודה על סיטואציה אמיתית מהשבוע, אישית ובזוגות, ושיתוף קצר בקבוצה.",
    },
    {
      title: "סיכום ותרגול לשבוע",
      body: "מה לקחנו, ותרגיל יומיומי קטן לימים הקרובים.",
    },
  ],
  includesTitle: "מה מקבלות?",
  includes: [
    "עם ההרשמה: סילבוס מסודר של הקורס.",
    "לפני כל מפגש: המצגת ושאלון או תרגיל בקובץ PDF למייל, עם מקום לכתוב את התשובות.",
    "בכל מפגש: לימוד, תרגול מעשי ועבודה קטנה לשבוע הקרוב.",
    "השתתפות במשרד בירושלים, או מרחוק בגוגל מיט, כולל הצגת המצגת של השיעור.",
  ],
  testimonial: {
    quote: "",
    author: "",
  },
  oritTitle: "מי אני?",
  orit: [
    "אורית עשור, אמא ל־9 קטנטנים, בעלת משרד רואי חשבון. את הדרך שאני מלמדת, אני גם חיה.",
    "לאורך השנים אני מנהלת קריירה תובענית, בית גדול ומלא חיים, ויודעת בדיוק איך זה מרגיש כשהכול קורה בבת אחת.",
    "אחרי שנים של ליווי נשים, פיתחתי שיטה מעשית שעוזרת לנשים להוריד הילוך ולעלות בתדר, בלי לוותר על עצמן.",
  ],
  detailsTitle: "פרטי הקורס",
  details: [
    {
      title: "מקום",
      body: "רח' נחום חפצדי 17, גבעת שאול, ירושלים (מגדל רם, קומה 11), וגם בגוגל מיט",
    },
    {
      title: "מבנה",
      body: "9 מפגשים, אחת לשבוע, בימי רביעי 20:00 עד 21:45",
    },
    {
      title: "מועד פתיחה",
      body: "יום רביעי, 11.11.2026, בשעה 20:00",
    },
    {
      title: "עלות",
      body: "מחיר השקה 880 ש״ח במקום 1,500 ש״ח",
    },
  ],
  faqTitle: "שאלות נפוצות",
  faq: [
    {
      title: "צריך ידע או רקע קודם?",
      body: "לא. הקורס מתאים לכל אישה, בכל גיל ובכל שלב בחיים.",
    },
    {
      title: "אפשר להשתתף מרחוק?",
      body: "כן. המפגשים מתקיימים במשרד בירושלים ומשודרים גם בגוגל מיט.",
    },
    {
      title: "מה אם פספסתי מפגש?",
      body: "אפשר להצטרף מרחוק בגוגל מיט מכל מקום. אם בכל זאת פספסת, פני לאורית ונמצא יחד דרך להשלים.",
    },
    {
      title: "האם זה טיפול?",
      body: "לא. הקורס הוא לימוד ותרגול בקבוצה, ואינו תחליף לטיפול או לייעוץ מקצועי.",
    },
  ],
  note: "הקורס אינו תחליף לטיפול, לייעוץ זוגי או להכוונה רבנית. במצבי מצוקה יש לפנות לגורם המתאים.",
  registration: {
    button: "שומרת מקום בקורס",
    modalTitle: "הרשמה לקורס העלאת תדר",
    modalSubtitle: "השאירי פרטים ונחזור אלייך עם כל הפרטים על הקבוצה הקרובה",
    dateLabel: "מועד מועדף",
    dates: [],
    priceLabel: "880 ש״ח",
    priceRegular: "1,500 ש״ח",
    priceNote: "מחיר השקה",
    paymentUrl: "",
    thanks: "קיבלנו את הפרטים, ונחזור אלייך בהקדם.",
    whatsappNumber: "972523975659",
    whatsappMessage: "שלום אורית, אשמח לשמוע על קורס העלאת תדר",
  },
}

// ── Editor schema ──────────────────────────────────────────────────────────
// Drives the admin form: every field of the page, in page order, with Hebrew labels.

export type Field =
  | { kind: 'text'; path: string; label: string; hint?: string; dir?: 'ltr' }
  | { kind: 'textarea'; path: string; label: string; hint?: string }
  | { kind: 'strings'; path: string; label: string; itemLabel: string; hint?: string }
  | { kind: 'items'; path: string; label: string; itemLabel: string; titleLabel: string; bodyLabel: string; hint?: string }

export type Section = { id: string; title: string; fields: Field[] }

export const FREQUENCY_SCHEMA: Section[] = [
  {
    id: 'hero',
    title: 'ראש העמוד',
    fields: [
      { kind: 'text', path: 'hero.badge', label: 'תגית מעל הכותרת' },
      { kind: 'text', path: 'hero.title', label: 'כותרת ראשית' },
      { kind: 'textarea', path: 'hero.subtitle', label: 'משפט פתיחה' },
      { kind: 'text', path: 'hero.cta', label: 'טקסט הכפתור' },
      { kind: 'text', path: 'hero.image', label: 'קישור לתמונה', dir: 'ltr', hint: 'כתובת תמונה, למשל ‎/orit/orit.jpeg‎ או קישור מלא' },
    ],
  },
  {
    id: 'intro',
    title: 'פתיחה רגשית',
    fields: [
      { kind: 'textarea', path: 'intro.lead', label: 'פסקת פתיחה' },
      { kind: 'text', path: 'intro.highlight', label: 'משפט מודגש' },
    ],
  },
  {
    id: 'benefits',
    title: 'מה תקבלי',
    fields: [
      { kind: 'text', path: 'benefitsTitle', label: 'כותרת האזור' },
      { kind: 'items', path: 'benefits', label: 'כרטיסים', itemLabel: 'כרטיס', titleLabel: 'כותרת', bodyLabel: 'תיאור' },
    ],
  },
  {
    id: 'about',
    title: 'על הקורס',
    fields: [
      { kind: 'text', path: 'aboutTitle', label: 'כותרת האזור' },
      { kind: 'strings', path: 'about', label: 'פסקאות', itemLabel: 'פסקה' },
    ],
  },
  {
    id: 'journey',
    title: 'המפגשים (סילבוס)',
    fields: [
      { kind: 'text', path: 'journeyTitle', label: 'כותרת האזור' },
      { kind: 'textarea', path: 'journeyIntro', label: 'הסבר קצר' },
      { kind: 'items', path: 'sessions', label: 'מפגשים', itemLabel: 'מפגש', titleLabel: 'נושא המפגש', bodyLabel: 'מה לומדים' },
    ],
  },
  {
    id: 'format',
    title: 'מבנה כל מפגש',
    fields: [
      { kind: 'text', path: 'formatTitle', label: 'כותרת האזור' },
      { kind: 'items', path: 'format', label: 'שלבים', itemLabel: 'שלב', titleLabel: 'שם השלב', bodyLabel: 'תיאור' },
    ],
  },
  {
    id: 'includes',
    title: 'מה מקבלות',
    fields: [
      { kind: 'text', path: 'includesTitle', label: 'כותרת האזור' },
      { kind: 'strings', path: 'includes', label: 'רשימה', itemLabel: 'שורה' },
    ],
  },
  {
    id: 'testimonial',
    title: 'המלצה',
    fields: [
      { kind: 'textarea', path: 'testimonial.quote', label: 'ציטוט', hint: 'להשאיר ריק כדי להסתיר את האזור' },
      { kind: 'text', path: 'testimonial.author', label: 'שם הממליצה', hint: 'למשל: מ.ר., ירושלים' },
    ],
  },
  {
    id: 'orit',
    title: 'מי אני',
    fields: [
      { kind: 'text', path: 'oritTitle', label: 'כותרת האזור' },
      { kind: 'strings', path: 'orit', label: 'פסקאות', itemLabel: 'פסקה' },
    ],
  },
  {
    id: 'details',
    title: 'פרטי הקורס',
    fields: [
      { kind: 'text', path: 'detailsTitle', label: 'כותרת האזור' },
      { kind: 'items', path: 'details', label: 'פרטים', itemLabel: 'פרט', titleLabel: 'שם (למשל: מקום, מועד, עלות)', bodyLabel: 'ערך' },
    ],
  },
  {
    id: 'faq',
    title: 'שאלות נפוצות',
    fields: [
      { kind: 'text', path: 'faqTitle', label: 'כותרת האזור' },
      { kind: 'items', path: 'faq', label: 'שאלות', itemLabel: 'שאלה', titleLabel: 'שאלה', bodyLabel: 'תשובה' },
      { kind: 'textarea', path: 'note', label: 'הערה בתחתית העמוד' },
    ],
  },
  {
    id: 'registration',
    title: 'הרשמה ותשלום',
    fields: [
      { kind: 'text', path: 'registration.button', label: 'טקסט כפתור ההרשמה' },
      { kind: 'text', path: 'registration.modalTitle', label: 'כותרת חלון ההרשמה' },
      { kind: 'text', path: 'registration.modalSubtitle', label: 'משפט בחלון ההרשמה' },
      { kind: 'text', path: 'registration.dateLabel', label: 'כותרת בחירת המועד' },
      { kind: 'strings', path: 'registration.dates', label: 'מועדים לבחירה', itemLabel: 'מועד', hint: 'למשל: יום שני, 16 בנובמבר, 20:30. רשימה ריקה מסתירה את הבחירה' },
      { kind: 'text', path: 'registration.priceLabel', label: 'המחיר לתשלום', hint: 'למשל: 880 ש״ח. ריק מסתיר את המחיר' },
      { kind: 'text', path: 'registration.priceRegular', label: 'המחיר המלא (יוצג עם קו חוצה)', hint: 'למשל: 1,500 ש״ח. ריק מסתיר' },
      { kind: 'text', path: 'registration.priceNote', label: 'תווית המחיר', hint: 'למשל: מחיר השקה' },
      { kind: 'text', path: 'registration.paymentUrl', label: 'קישור לתשלום (SUMIT)', dir: 'ltr', hint: 'אם ממולא, אחרי ההרשמה עוברים לתשלום' },
      { kind: 'text', path: 'registration.thanks', label: 'הודעת תודה (כשאין קישור לתשלום)' },
      { kind: 'text', path: 'registration.whatsappNumber', label: 'מספר וואטסאפ', dir: 'ltr', hint: 'בפורמט בינלאומי: 9725XXXXXXXX' },
      { kind: 'text', path: 'registration.whatsappMessage', label: 'הודעת פתיחה בוואטסאפ' },
    ],
  },
  {
    id: 'seo',
    title: 'הגדרות',
    fields: [{ kind: 'text', path: 'seoTitle', label: 'כותרת הלשונית בדפדפן' }],
  },
]

/** Fills any field missing from saved content with its default, so older saves keep working. */
export function withDefaults(saved: unknown): FrequencyContent {
  const merge = (def: unknown, val: unknown): unknown => {
    if (Array.isArray(def)) return Array.isArray(val) ? val : def
    if (def && typeof def === 'object') {
      const out: Record<string, unknown> = {}
      const v = (val && typeof val === 'object' ? val : {}) as Record<string, unknown>
      for (const k of Object.keys(def)) out[k] = merge((def as Record<string, unknown>)[k], v[k])
      return out
    }
    return typeof val === typeof def ? val : def
  }
  return merge(DEFAULT_FREQUENCY, saved) as FrequencyContent
}
