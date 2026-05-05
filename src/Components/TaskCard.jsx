import { Trash2, Pencil, Clock, CheckCircle2, Circle } from 'lucide-react'
import { CATEGORIES } from '../Interfaces/index.js'

export default function TaskCard({ task, onDelete, onEdit, onToggle }) {
  const category = CATEGORIES[task.category]

  return (
   <div className={`rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 ${task.completed ? 'opacity-60' : ''}`}
      style={{background:'rgba(211, 224, 243, 0.75)', border:'1px solid rgba(200,180,230,0.4)', backdropFilter:'blur(8px)'}}>
      <div className="flex items-start justify-between gap-3">
        
        {/* Sol: tamamlandı toggle */}
        <button onClick={() => onToggle(task.id)} className="mt-1 flex-shrink-0">
          {task.completed
           ? <CheckCircle2 size={22} style={{color:'#0e327e'}} />
: <Circle size={22} className="text-gray-300 transition-colors" style={{}} />}
        </button>

        {/* Orta: içerik */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm">{category.emoji}</span>
            <span className="text-xs text-gray-400">{category.label}</span>
            
          </div>

          <h3 className={`font-semibold text-gray-800 text-sm leading-snug ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.description}</p>
          )}

          {(task.date || task.time) && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Clock size={12} />
              <span>{task.date} {task.time}</span>
            </div>
          )}
        </div>

        {/* Sağ: aksiyonlar */}
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 transition-colors" style={{}} onMouseEnter={e=>e.currentTarget.style.color='#0e327e'} onMouseLeave={e=>e.currentTarget.style.color=''}>
            <Pencil size={15} />
          </button>
          <button onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-400" style={{color:'#801313'}}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}