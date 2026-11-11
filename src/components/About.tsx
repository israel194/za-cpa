import { ShieldCheck, Eye, Award } from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'אמינות',
    text: 'מחויבות מלאה ללקוח ולסטנדרטים הגבוהים ביותר.',
  },
  {
    icon: Eye,
    title: 'שקיפות',
    text: 'תקשורת ברורה ופתוחה בכל שלב בליווי הפיננסי.',
  },
  {
    icon: Award,
    title: 'מצוינות',
    text: 'חתירה מתמדת לפתרונות מדויקים ומותאמים אישית.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">אודות</p>
          <h2 className="display display-lg">אודות המשרד</h2>
          <p className="measure mt-6 text-lg leading-loose text-ink-700">
            משרדנו מעניק שירות אישי, מקצועי ומקיף, תוך התאמה מדויקת לצרכים
            הפיננסיים של כל לקוח. אנו דוגלים באמינות, שקיפות וחתירה למצוינות.
          </p>
        </div>

        {/* שלושה ערכים כרשימה מסורגלת. קודם לכן כל ערך ישב בכרטיס משלו,
            ושלושה כרטיסים זהים זה מתחת לזה אינם היררכיה אלא מילוי שטח. */}
        <dl className="lg:pt-14">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="grid grid-cols-[auto_1fr] items-start gap-x-5 border-t border-[color:var(--color-rule)] py-6 first:border-t-0 first:pt-0"
            >
              <Icon size={20} strokeWidth={1.6} className="mt-1 text-gold-600" aria-hidden />
              <div>
                <dt className="display display-sm">{title}</dt>
                <dd className="measure mt-2 leading-relaxed text-ink-700">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
