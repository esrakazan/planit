import { useState } from 'react'
import { Plus, Trash2, Star, Eye, EyeOff } from 'lucide-react'

const GENRES = ['Dram', 'Komedi', 'Aksiyon', 'Korku', 'Belgesel', 'Animasyon', 'Diğer']

export default function MoviesPage() {
  const [movies, setMovies] = useState([
    { id:'1', title:'Interstellar', genre:'Dram',    watched:true,  rating:5 },
    { id:'2', title:'Everything Everywhere All at Once', genre:'Dram', watched:false, rating:0 },
    { id:'3', title:'Inside Out 2', genre:'Animasyon', watched:false, rating:0 },
  ])
  const [input, setInput]   = useState('')
  const [genre, setGenre]   = useState('Dram')
  const [tab, setTab]       = useState('all')

  const add = () => {
    if (!input.trim()) return
    setMovies(m => [...m, { id: Date.now().toString(), title: input.trim(), genre, watched: false, rating: 0 }])
    setInput('')
  }

  const toggle = (id) => setMovies(m => m.map(x => x.id===id ? {...x, watched:!x.watched, rating: x.watched ? 0 : x.rating} : x))
  const remove = (id) => setMovies(m => m.filter(x => x.id!==id))
  const rate   = (id, r) => setMovies(m => m.map(x => x.id===id ? {...x, rating:r} : x))

  const filtered = movies.filter(m => tab==='all' ? true : tab==='watched' ? m.watched : !m.watched)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🎬 Film Listem</h2>
          <p className="text-xs text-gray-400 mt-0.5">{movies.filter(m=>m.watched).length}/{movies.length} izlendi</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {[['all','Tümü'],['unwatched','İzlenecek'],['watched','İzlenenler']].map(([key,label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${tab===key ? 'bg-[#0e327e] text-white' : 'bg-white/60 text-gray-500 hover:bg-white/80'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && add()}
          placeholder="Film adı..."
          className="flex-1 min-w-0 bg-white/70 border border-white/80 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e327e]/20 shadow-sm" />

        <select value={genre} onChange={e => setGenre(e.target.value)}
          className="bg-white/70 border border-white/80 rounded-2xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e327e]/20 shadow-sm">
          {GENRES.map(g => <option key={g}>{g}</option>)}
        </select>

        <button onClick={add}
          className="px-4 py-2.5 bg-[#0e327e] text-white rounded-2xl shadow-md hover:opacity-90">
          <Plus size={18} />
        </button>
      </div>

      {filtered.map(movie => (
        <div key={movie.id}
          className={`flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-sm border border-white/80 group transition-opacity ${movie.watched ? 'opacity-75' : ''}`}>
          
          <button onClick={() => toggle(movie.id)} className="flex-shrink-0">
            {movie.watched
              ? <Eye size={20} className="text-[#0e327e]" />
              : <EyeOff size={20} className="text-gray-300 group-hover:text-[#0e327e] transition-colors" />
            }
          </button>

          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${movie.watched ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {movie.title}
            </p>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{movie.genre}</span>
          </div>

          {movie.watched && (
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => rate(movie.id, s)}>
                  <Star size={14} className={s <= movie.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                </button>
              ))}
            </div>
          )}

          <button onClick={() => remove(movie.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 text-gray-300 hover:text-rose-400 transition-all flex-shrink-0">
            <Trash2 size={15} />
          </button>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-300">
          <div className="text-5xl mb-3">🎬</div>
          <p className="text-sm">Liste boş</p>
        </div>
      )}
    </div>
  )
}