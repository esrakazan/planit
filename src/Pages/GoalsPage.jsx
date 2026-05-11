import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    { id:'1', text:'React öğren ve proje yap', done: true },
    { id:'2', text:'Her gün 30 dk kitap oku',  done: false },
    { id:'3', text:'3 ülke gez',               done: false },
  ])
  const [input, setInput] = useState('')

  const add = () => {
    if (!input.trim()) return
    setGoals(g => [...g, { id: Date.now().toString(), text: input.trim(), done: false }])
    setInput('')
  }

  const toggle = (id) => setGoals(g => g.map(x => x.id===id ? {...x, done:!x.done} : x))
  const remove = (id) => setGoals(g => g.filter(x => x.id!==id))
  const done = goals.filter(g => g.done).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🎯 Yıllık Hedefler</h2>
          <p className="text-xs text-gray-400 mt-0.5">{done}/{goals.length} tamamlandı</p>
        </div>
      </div>

      {/* İlerleme */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-5 shadow-sm border border-white/80">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Bu yılki ilerleme</span>
          <span className="font-semibold text-[#0e327e]">
            %{goals.length ? Math.round((done/goals.length)*100) : 0}
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[#0e327e] to-[#3b82f6] h-1.5 rounded-full transition-all duration-500"
            style={{ width: goals.length ? `${(done/goals.length)*100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Ekle */}
      <div className="flex gap-2 mb-5">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && add()}
          placeholder="Yeni hedef ekle..."
          className="flex-1 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e327e]/20 shadow-sm"
        />

        <button
          onClick={add}
          className="px-4 py-2.5 bg-[#0e327e] text-white rounded-2xl shadow-md hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Liste */}
      {goals.map(goal => (
        <div
          key={goal.id}
          className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-sm border border-white/80 group"
        >
          <button onClick={() => toggle(goal.id)}>
            {goal.done
              ? <CheckCircle2 size={22} className="text-[#0e327e]" />
              : <Circle size={22} className="text-gray-300 group-hover:text-[#0e327e] transition-colors" />
            }
          </button>

          <span className={`flex-1 text-sm font-medium ${goal.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {goal.text}
          </span>

          <button
            onClick={() => remove(goal.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 text-gray-300 hover:text-rose-400 transition-all"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}

      {goals.length === 0 && (
        <div className="text-center py-16 text-gray-300">
          <div className="text-5xl mb-3">🎯</div>
          <p className="text-sm">Henüz hedef eklemedin</p>
        </div>
      )}
    </div>
  )
}