import { Link, useParams } from 'react-router-dom'
import TechnologyNotes from '../components/TechnologyNotes/TechnologyNotes'

function TechnologyDetail({ technologies, onStatusChange, onNotesChange }) {
  const { id } = useParams()
  const tech = technologies.find((item) => item.id === Number(id))

  if (!tech) {
    return (
      <div className="page page-technology-detail">
        <p>Технология не найдена.</p>
        <Link to="/technologies">← Вернуться к списку</Link>
      </div>
    )
  }

  const statusLabelMap = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    completed: 'Готово',
  }

  const handleStatusCycle = () => {
    const order = ['not-started', 'in-progress', 'completed']
    const currentIndex = order.indexOf(tech.status)
    const nextStatus = order[(currentIndex + 1) % order.length]
    onStatusChange(tech.id, nextStatus)
  }

  return (
    <div className="page page-technology-detail">
      <Link to="/technologies" className="link-back">
        ← Вернуться к списку
      </Link>

      <header>
        <h1>{tech.title}</h1>
        <span className={`badge badge--${tech.status}`}>{statusLabelMap[tech.status]}</span>
      </header>

      <p className="technology-detail__description">{tech.description}</p>
      <p className="technology-detail__category">Категория: {tech.category ?? 'general'}</p>

      <div className="technology-detail__actions">
        <button type="button" onClick={handleStatusCycle}>
          Переключить статус
        </button>
        <Link to="/statistics">Посмотреть статистику</Link>
      </div>

      <TechnologyNotes notes={tech.notes} techId={tech.id} onNotesChange={onNotesChange} />
    </div>
  )
}

export default TechnologyDetail

