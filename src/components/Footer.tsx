export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-blush-100 bg-ink-900 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
        <div>
          <div className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-rose-gold-300">ZA</span>
            <span className="text-white">-CPA</span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-cream-200/80">
            משרד רואי חשבון מוביל בישראל. מקצועיות, שקיפות וליווי אישי.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            ניווט
          </h4>
          <ul className="mt-4 space-y-2 text-cream-200/80">
            <li>
              <a href="#about" className="transition-colors hover:text-white">
                אודות
              </a>
            </li>
            <li>
              <a href="#services" className="transition-colors hover:text-white">
                שירותים
              </a>
            </li>
            <li>
              <a href="#team" className="transition-colors hover:text-white">
                הצוות שלנו
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                צור קשר
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            פרטי קשר
          </h4>
          <ul className="mt-4 space-y-2 text-cream-200/80">
            <li>רח' נחום חפצדי 17, ירושלים</li>
            <li>מגדל רם, קומה 11</li>
            <li>
              <a
                href="https://www.za-cpa.com"
                className="transition-colors hover:text-white"
              >
                www.za-cpa.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-cream-200/60 md:flex-row md:px-10">
          <p>© {year} ZA-CPA. כל הזכויות שמורות.</p>
          <p>נבנה בקפידה ובאהבה.</p>
        </div>
      </div>
    </footer>
  )
}
