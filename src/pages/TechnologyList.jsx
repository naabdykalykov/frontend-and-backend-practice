import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import QuickActions from '../components/QuickActions/QuickActions'
import FilterTabs from '../components/FilterTabs/FilterTabs'
import TechnologyCard from '../components/TechnologyCard/TechnologyCard'

function TechnologyList({
  technologies,
  statusCounts,
  onStatusChange,
  onNotesChange,
  onCompleteAll,
  onResetAll,
  onPickRandom,
}) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTechnologies = useMemo(() => {
    const query = search.trim().toLowerCase()
    return technologies.filter((tech) => {
      const matchesFilter = filter === 'all' ? true : tech.status === filter
      const matchesSearch =
        query.length === 0 ||
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query)
      return matchesFilter && matchesSearch
    })
  }, [technologies, filter, search])

  return (
    <div className="page page-technologies">
      <QuickActions
        onCompleteAll={onCompleteAll}
        onResetAll={onResetAll}
        onPickRandom={onPickRandom}
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

      <FilterTabs value={filter} onChange={setFilter} />

      <section className="app__grid">
        {filteredTechnologies.map((tech) => (
          <div key={tech.id} className="technology-list__card">
            <TechnologyCard
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              onNotesChange={onNotesChange}
              onStatusChange={onStatusChange}
            />
            <div className="technology-list__footer">
              <Link to={`/technologies/${tech.id}`}>Подробнее →</Link>
              <span className="technology-list__category">{tech.category ?? 'general'}</span>
            </div>
          </div>
        ))}
        {filteredTechnologies.length === 0 && (
          <div className="technology-list__empty">
            <p>Ничего не найдено.</p>
            <p>Попробуйте изменить фильтры или добавить новую технологию.</p>
            <Link to="/add-technology" className="btn btn-secondary">
              Добавить технологию
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

export default TechnologyList

