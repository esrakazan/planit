// Task interface - veri yapısı tanımları

export const createTask = (title, description, date, time, category) => ({
  id: Date.now().toString(),
  title,
  description,
  date,
  time,
  category,   // 'work' | 'personal' | 'health' | 'other'
  completed: false,
  createdAt: new Date().toISOString(),
})

export const CATEGORIES = {
  work:     { label: 'İş',        emoji: '💼' },
  personal: { label: 'Kişisel',   emoji: '🌸' },
  health:   { label: 'Sağlık',    emoji: '🫀' },
  other:    { label: 'Diğer',     emoji: '✨' },
}