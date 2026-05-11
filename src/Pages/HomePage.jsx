import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import TaskCard from '../Components/TaskCard.jsx'
import TaskModal from '../Components/TaskModal.jsx'
import Sidebar from '../Components/Sidebar.jsx'
import GoalsPage from './GoalsPage.jsx'
import MoviesPage from './MoviesPage.jsx'
import TravelPage from './TravelPage.jsx'

const SAMPLE = [
  { id:'1', title:'Proje raporunu tamamla', description:'Son bölümü bitir ve formatla', date:'2025-06-10', time:'14:00', category:'work', completed:false, createdAt:'' },
  { id:'2', title:'Spor yap', description:'30 dk yürüyüş', date:'2025-06-09', time:'08:00', category:'health', completed:true, createdAt:'' },
  { id:'3', title:'Kitap oku', description:'En az 20 sayfa', date:'2025-06-09', time:'21:00', category:'personal', completed:false, createdAt:'' },
]

const TABS = [
  { id: 'tasks',  label: '📋 Görevler' },
  { id: 'goals',  label: '🎯 Yıllık Hedefler' },
  { id: 'movies', label: '🎬 İzlenecek Filmler' },
  { id: 'travel', label: '✈️ Seyahat Listesi' },
]

export default function HomePage() {
  const [tasks, setTasks]             = useState(SAMPLE)
  const [modalOpen, setModalOpen]     = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter]           = useState('all')
  const [search, setSearch]           = useState('')
  const [activeTab, setActiveTab]     = useState('tasks')

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
      if (filter === 'all')  return matchSearch
      if (filter === 'done') return t.completed && matchSearch
      return t.category === filter && matchSearch
    })
  }, [tasks, filter, search])

  const handleSave   = (task) => {
    setTasks(prev => editingTask ? prev.map(t => t.id === task.id ? task : t) : [task, ...prev])
    setEditingTask(null)
  }
  const handleEdit   = (task) => { setEditingTask(task); setModalOpen(true) }
  const handleDelete = (id)   => setTasks(prev => prev.filter(t => t.id !== id))
  const handleToggle = (id)   => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const openAdd      = ()     => { setEditingTask(null); setModalOpen(true) }

  return (
    <div className="min-h-screen flex relative overflow-hidden">

     {/* ── Arkaplan ── */}
      <div className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />


      {/* ── Sidebar ── */}
      <Sidebar filter={filter} setFilter={setFilter} tasks={tasks} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── Ana İçerik ── */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-2xl w-full mx-auto md:mx-0">

        {/* Üst Sekme Çubuğu */}
        <div className="flex gap-2 mb-6 p-1.5 rounded-2xl overflow-x-auto"
          style={{background:'rgba(255,255,255,0.55)', backdropFilter:'blur(10px)', border:'1px solid rgba(200,180,230,0.4)', boxShadow:'0 2px 12px rgba(150,120,180,0.1)'}}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-[#0e327e] text-white shadow-md'
                  : 'hover:bg-white/60'}`}
              style={activeTab !== tab.id ? {color:'#090212'} : {}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sekme İçerikleri */}
        {activeTab === 'tasks' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {filter === 'all' ? '🌟 Tüm Görevler' : filter === 'done' ? '✅ Tamamlananlar' : 'Kategoriye Göre'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{filtered.length} görev</p>
              </div>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0e327e] text-white text-sm font-medium rounded-2xl shadow-lg hover:opacity-90 transition-opacity active:scale-95">
                <Plus size={17} /> Ekle
              </button>
            </div>

            <div className="relative mb-5">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Görev ara..."
                className="w-full bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 shadow-sm" />
            </div>

            {filtered.length === 0
              ? <div className="text-center py-16 text-gray-300">
                  <div className="text-5xl mb-3">🌸</div>
                  <p className="text-sm">Henüz görev yok</p>
                </div>
              : filtered.map(task => (
                  <TaskCard key={task.id} task={task}
                    onDelete={handleDelete} onEdit={handleEdit} onToggle={handleToggle} />
                ))
            }
          </>
        )}

        {activeTab === 'goals'  && <GoalsPage />}
        {activeTab === 'movies' && <MoviesPage />}
        {activeTab === 'travel' && <TravelPage />}
      </main>

      <TaskModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingTask(null) }}
        onSave={handleSave} editingTask={editingTask} />
    </div>
  )
}