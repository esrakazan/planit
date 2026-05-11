import { useState } from 'react'
import { Plus, Trash2, MapPin, CheckCircle2, Circle } from 'lucide-react'

const CONTINENTS = ['Avrupa', 'Asya', 'Amerika', 'Afrika', 'Okyanusya']

export default function TravelPage() {
  const [cities, setCities] = useState([
    { id:'1', name:'Tokyo',    country:'Japonya',  continent:'Asya',   visited:false, dream:true  },
    { id:'2', name:'Roma',     country:'İtalya',   continent:'Avrupa', visited:true,  dream:false },
    { id:'3', name:'New York', country:'ABD',      continent:'Amerika',visited:false, dream:true  },
  ])
  const [name, setName]           = useState('')
  const [country, setCountry]     = useState('')
  const [continent, setContinent] = useState('Avrupa')

  const add = () => {
    if (!name.trim()) return
    setCities(c => [...c, { id: Date.now().toString(), name: name.trim(), country: country.trim(), continent, visited: false, dream: false }])
    setName(''); setCountry('')
  }

  const toggle = (id) => setCities(c => c.map(x => x.id===id ? {...x, visited:!x.visited} : x))
  const remove = (id) => setCities(c => c.filter(x => x.id!==id))

  const visited = cities.filter(c => c.visited).length

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">✈️ Seyahat Listem</h2>
          <p className="text-xs text-gray-400 mt-0.5">{visited} şehir gezildi • {cities.length - visited} hedefte</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label:'Toplam', value: cities.length, emoji:'🌍' },
          { label:'Gezilen', value: visited, emoji:'✅' },
          { label:'Hedef', value: cities.length - visited, emoji:'🎯' },
        ].map(s => (
          <div key={s.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 text-center shadow-sm border border-white/80">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-5 shadow-sm border border-white/80">
        <p className="text-xs font-medium text-gray-500 mb-3">Yeni Şehir Ekle</p>
        <div className="flex gap-2 flex-wrap">
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="Şehir adı *"
            className="flex-1 min-w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 bg-gray-50" />
          <input value={country} onChange={e => setCountry(e.target.value)}
            placeholder="Ülke"
            className="flex-1 min-w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 bg-gray-50" />
          <select value={continent} onChange={e => setContinent(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 bg-gray-50">
            {CONTINENTS.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={add}
            className="px-4 py-2 bg-[#0e327e] text-white rounded-xl shadow-md hover:opacity-90 flex items-center gap-1.5 text-sm font-medium">
            <Plus size={16} /> Ekle
          </button>
        </div>
      </div>

      {cities.map(city => (
        <div key={city.id}
          className={`flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-3 shadow-sm border border-white/80 group ${city.visited ? 'opacity-70' : ''}`}>
          
          <button onClick={() => toggle(city.id)} className="flex-shrink-0">
            {city.visited
              ? <CheckCircle2 size={22} className="text-[#0e327e]" />
              : <Circle size={22} className="text-gray-300 group-hover:text-[#0e327e] transition-colors" />}
          </button>

          <MapPin size={16} className={city.visited ? 'text-[#0e327e]' : 'text-[#0e327e]'} />

          <div className="flex-1">
            <p className={`text-sm font-semibold ${city.visited ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {city.name}
            </p>
            <p className="text-xs text-gray-400">{city.country} {city.continent && `• ${city.continent}`}</p>
          </div>

          {city.visited && (
            <span className="text-xs bg-[#0e327e] text-white px-2 py-0.5 rounded-full font-medium">
              Gezildi ✓
            </span>
          )}

          <button onClick={() => remove(city.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 text-gray-300 hover:text-rose-400 transition-all">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}