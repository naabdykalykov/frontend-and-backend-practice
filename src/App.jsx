import { useState } from 'react'
import TechnologyCard from './components/TechnologyCard/TechnologyCard'
import ProgressHeader from './components/ProgressHeader/ProgressHeader'
import QuickActions from './components/QuickActions/QuickActions'
import FilterTabs from './components/FilterTabs/FilterTabs'
import useTechnologies, { initialTechnologies } from './hooks/useTechnologies'
import './App.css'

function App() {
  const { technologies, setTechnologies, updateStatus, updateNotes, progress } = useTechnologies()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const total = technologies.length
  const completed = technologies.filter((tech) => tech.status === 'completed').length
  const completion = progress
  const statusCounts = {
    'not-started': technologies.filter((tech) => tech.status === 'not-started').length,
    'in-progress': technologies.filter((tech) => tech.status === 'in-progress').length,
    completed,
  }

  const handleStatusChange = (id, nextStatus) => {
    updateStatus(id, nextStatus)
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
    updateNotes(techId, newNotes)
  }

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
        <h1>To Do List</h1>
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

