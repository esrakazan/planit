// Task interface - veri yapısı tanımları + localStorage yardımcıları

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

// ── LocalStorage yardımcı fonksiyonları ──────────────────────────────
export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('LocalStorage yazma hatası:', e)
  }
}
