import { useState } from 'react'
import { CATEGORIES } from '../Interfaces/index.js'
import { LayoutDashboard, CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Sidebar({ filter, setFilter, tasks }) {
  const [open, setOpen] = useState(true)
  const total = tasks.length
  const done  = tasks.filter(t => t.completed).length

  return (
    <>
      {/* Açma/kapama butonu */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl shadow-md transition-all"
        style={{
          background:'rgba(186, 214, 236, 0.75)',
          border:'1px solid rgba(200,180,230,0.4)',
          backdropFilter:'blur(8px)',
          color:'#0e327e'
        }}
      >
        {open ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
      </button>

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-40 flex flex-col gap-2 py-6 px-3 transition-all duration-300 overflow-hidden"
        style={{
          width: open ? '220px' : '0px',
          paddingLeft: open ? '12px' : '0px',
          paddingRight: open ? '12px' : '0px',
          background:'rgba(176, 209, 240, 0.52)',
          backdropFilter:'blur(12px)',
          borderRight:'1px solid rgba(9, 8, 48, 0.3)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >

        {/* Başlık */}
        <div className="mb-4 px-2 mt-8 whitespace-nowrap">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0e327e] to-[#60a5fa] bg-clip-text text-transparent">
            PlanIt 🗓️
          </h1>
        </div>

        {/* İlerleme kutusu */}
        <div
          className="rounded-2xl p-3 mb-2 whitespace-nowrap"
          style={{
            background:'rgba(186, 214, 236, 0.75)',
            border:'1px solid rgba(180, 203, 230, 0.4)'
          }}
        >
          <div className="flex justify-between text-xs mb-1.5" style={{color:'#0e327e'}}>
            <span>Tamamlandı</span>
            <span className="font-semibold">{done}/{total}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#0e327e] to-[#3b82f6] h-1.5 rounded-full transition-all duration-500"
              style={{ width: total ? `${(done/total)*100}%` : '0%' }}
            />
          </div>
        </div> 

        {/* Menü */}
        <NavBtn
          icon={<LayoutDashboard size={15}/>}
          label="Tümü"
          active={filter==='all'}
          onClick={() => setFilter('all')}
        />

        <NavBtn
          icon={<CheckCheck size={15}/>}
          label="Tamamlananlar"
          active={filter==='done'}
          onClick={() => setFilter('done')}
        />

        <p
          className="text-xs px-2 mt-3 mb-1 font-medium uppercase tracking-wide whitespace-nowrap"
          style={{color:'#020107'}}
        >
          Kategoriler
        </p>

        {Object.entries(CATEGORIES).map(([key, val]) => (
          <NavBtn
            key={key}
            icon={<span className="text-sm">{val.emoji}</span>}
            label={val.label}
            active={filter===key}
            onClick={() => setFilter(key)}
          />
        ))}

      </aside>

      {/* Sidebar boşluk */}
      <div
        style={{
          width: open ? '220px' : '0px',
          flexShrink:0,
          transition:'width 0.3s'
        }}
      />
    </>
  )
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all whitespace-nowrap w-full"
      style={
        active
          ? {
              background:'rgba(186, 214, 236, 0.75)',
              border:'1px solid rgba(14,50,126,0.3)',
              color:'#0e327e',
              fontWeight:600
            }
          : {
              color:'#5a657e',
              border:'1px solid transparent'
            }
      }
    >
      {icon}{label}
    </button>
  )
}