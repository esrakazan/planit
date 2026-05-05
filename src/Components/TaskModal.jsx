import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import {CATEGORIES, createTask } from '../Interfaces/index.js'

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  const empty = { title: '', description: '', date: '', time: '', category: 'personal' }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    setForm(editingTask ? { ...editingTask } : empty)
  }, [editingTask, isOpen])

  if (!isOpen) return null

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = () => {
    if (!form.title.trim()) return alert('Başlık gerekli!')
    if (editingTask) {
      onSave({ ...editingTask, ...form })
    } else {
      onSave(createTask(form.title, form.description, form.date, form.time, form.category))
    }
    onClose()
  }

  const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 bg-gray-50"
  const labelCls = "block text-xs font-medium text-gray-500 mb-1"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:'rgba(0,0,0,0.3)', backdropFilter:'blur(4px)'}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            {editingTask ? '✏️ Görevi Düzenle' : 'Yeni Görev Ekle'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Başlık *</label>
            <input name="title" value={form.title} onChange={handle} placeholder="Ne yapacaksın?" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Açıklama</label>
            <textarea name="description" value={form.description} onChange={handle} placeholder="Detaylar..." rows={2} className={inputCls + ' resize-none'} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tarih</label>
              <input type="date" name="date" value={form.date} onChange={handle} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Saat</label>
              <input type="time" name="time" value={form.time} onChange={handle} className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Kategori</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(CATEGORIES).map(([key, val]) => (
                <button key={key} type="button"
                  onClick={() => setForm(f => ({ ...f, category: key }))}
                  className={`py-2 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${form.category === key ? 'bg-violet-50 border-violet-300 text-violet-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                  <span className="text-lg">{val.emoji}</span>
                  <span>{val.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            İptal
          </button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-[#0e327e] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
            {editingTask ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </div>
    </div>
  )
}