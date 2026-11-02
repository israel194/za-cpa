const HEBREW_MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']

/** The next `count` Mondays after today, as ISO value + Hebrew label ("יום שני, 9 בנובמבר 2026"). */
export function nextMondays(count = 4): { value: string; label: string }[] {
  const d = new Date()
  d.setDate(d.getDate() + ((1 - d.getDay() + 7) % 7 || 7))
  const out: { value: string; label: string }[] = []
  for (let i = 0; i < count; i++) {
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    out.push({ value, label: `יום שני, ${d.getDate()} ב${HEBREW_MONTHS[d.getMonth()]} ${d.getFullYear()}` })
    d.setDate(d.getDate() + 7)
  }
  return out
}
