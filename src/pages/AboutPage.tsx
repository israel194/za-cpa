import { ShieldCheck, Eye, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhyUs from '../components/WhyUs'
import CallToAction from '../components/CallToAction'

const values = [
  {
    icon: ShieldCheck,
    title: 'אמינות',
    text: 'מחויבות מלאה ללקוח ולסטנדרטים הגבוהים ביותר. כל החלטה נבחנת דרך הפריזמה של טובת הלקוח.',
  },
  {
    icon: Eye,
    title: 'שקיפות',
    text: 'תקשורת ברורה, פתוחה ויזומה — בכל שלב בליווי הפיננסי, ובלי שום הפתעות.',
  },
  {
    icon: Award,
    title: 'מצוינות',
    text: 'חתירה מתמדת לפתרונות מדויקים, יצירתיים ומותאמים אישית. בלי פשרות.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="אודות"
        title="אודות המשרד"
        subtitle="משרד עשור — רואי חשבון, הוקם מתוך אמונה שליווי פיננסי איכותי הוא הרבה יותר מסיכום מספרים בסוף השנה."
        crumbs={[{ to: '/about', label: 'אודות' }]}
      />

      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="prose prose-lg max-w-none text-ink-800">
            <p className="text-lg leading-loose md:text-xl">
              משרדנו מעניק שירות אישי, מקצועי ומקיף, תוך התאמה מדויקת לצרכים
              הפיננסיים של כל לקוח. אנו דוגלים באמינות, שקיפות וחתירה למצוינות
              — ומלווים את לקוחותינו בכל שלב בחיי העסק.
            </p>
            <p className="mt-6 text-lg leading-loose md:text-xl">
              הצוות שלנו משלב ידע מקצועי עמוק עם יחס אישי ואכפתי. אנחנו
              מאמינים שכל לקוח ראוי לקבל גישה ישירה לאיש מקצוע שמכיר את העסק
              שלו לעומק, ושיכול לסייע בקבלת החלטות אסטרטגיות, לא רק טכניות.
            </p>
            <p className="mt-6 text-lg leading-loose md:text-xl">
              לצד שירותי הליבה של רואי חשבון — ביקורת, חשבות ומיסוי — פיתחנו
              התמחות ייחודית בליווי פרויקטי מקרקעין, פינוי-בינוי ותמ"א 38,
              תחום שדורש ידע משולב בחשבונאות, מיסוי, ומורכבויות העולם של
              הנדל"ן הישראלי.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-blush-100 bg-cream-50/60 p-7 transition-all duration-300 hover:border-rose-gold-300/60 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(183,110,121,0.35)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <CallToAction />
    </>
  )
}
