import { useEffect, useState } from 'react'
import TechnologyCard from './components/TechnologyCard/TechnologyCard'
import ProgressHeader from './components/ProgressHeader/ProgressHeader'
import QuickActions from './components/QuickActions/QuickActions'
import FilterTabs from './components/FilterTabs/FilterTabs'
import './App.css'

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов и композиции.',
    status: 'completed',
    notes: '',
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX и выражений в шаблонах.',
    status: 'in-progress',
    notes: '',
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов и хуками.',
    status: 'not-started',
    notes: '',
  },
  {
    id: 4,
    title: 'React Router',
    description: 'Настройка клиентского роутинга и защищённых маршрутов.',
    status: 'not-started',
    notes: '',
  },
  {
    id: 5,
    title: 'Form Handling',
    description: 'Работа с управляемыми формами и валидацией.',
    status: 'in-progress',
    notes: '',
  },
  {
    id: 6,
    title: 'Testing Library',
    description: 'Написание модульных тестов для компонентов.',
    status: 'not-started',
    notes: '',
  },
  {
    id: 7,
    title: 'Performance Optimization',
    description: 'Мемоизация, code-splitting и оптимизация рендеров.',
    status: 'not-started',
    notes: '',
  },
]

function App() {
  const [technologies, setTechnologies] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('techTrackerData')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            console.log('Данные загружены из localStorage')
            return parsed.map((tech) => ({ ...tech, notes: tech.notes ?? '' }))
          }
        } catch {
          console.warn('Не удалось прочитать данные из localStorage')
        }
      }
    }
    return initialTechnologies.map((tech) => ({ ...tech }))
  })
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const total = technologies.length
  const completed = technologies.filter((tech) => tech.status === 'completed').length
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100)
  const statusCounts = {
    'not-started': technologies.filter((tech) => tech.status === 'not-started').length,
    'in-progress': technologies.filter((tech) => tech.status === 'in-progress').length,
    completed,
  }

  const handleStatusChange = (id, nextStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === id ? { ...tech, status: nextStatus } : tech)),
    )
  }

  const handleCompleteAll = () => {
    setTechnologies((prev) => prev.map((tech) => ({ ...tech, status: 'completed' })))
  }

  const handleResetAll = () => {
    setTechnologies(initialTechnologies.map((tech) => ({ ...tech })))
  }

  const handlePickRandom = () => {
    const pool = technologies.filter((tech) => tech.status !== 'completed')
    if (pool.length === 0) {
      return
    }
    const target = pool[Math.floor(Math.random() * pool.length)]
    handleStatusChange(target.id, 'in-progress')
  }

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === techId ? { ...tech, notes: newNotes } : tech)),
    )
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('techTrackerData', JSON.stringify(technologies))
    console.log('Данные сохранены в localStorage')
  }, [technologies])

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesFilter = filter === 'all' ? true : tech.status === filter
    const query = search.trim().toLowerCase()
    const matchesSearch =
      query.length === 0 ||
      tech.title.toLowerCase().includes(query) ||
      tech.description.toLowerCase().includes(query)
    return matchesFilter && matchesSearch
  })

  return (
    <main className="app">
      <header className="app__header">
        <h1>Технологии проекта</h1>
        <p>Быстрый обзор стека, который мы используем.</p>
      </header>

      <QuickActions
        onCompleteAll={handleCompleteAll}
        onResetAll={handleResetAll}
        onPickRandom={handlePickRandom}
      />

      <div className="app__search">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск по названию или описанию..."
        />
        <span className="app__search-count">Найдено: {filteredTechnologies.length}</span>
      </div>

      <ProgressHeader
        total={total}
        completed={completed}
        completion={completion}
        statusCounts={statusCounts}
      />

      <FilterTabs value={filter} onChange={setFilter} />

      <section className="app__grid">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            notes={tech.notes}
            onNotesChange={updateTechnologyNotes}
            onStatusChange={handleStatusChange}
          />
        ))}
      </section>
    </main>
  )
}

export default App

