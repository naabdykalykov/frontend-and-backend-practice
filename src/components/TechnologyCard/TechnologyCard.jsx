import { useEffect, useState } from 'react'
import './TechnologyCard.css'

const STATUS_PRESETS = {
  completed: {
    label: 'Изучено',
    modifier: 'completed',
  },
  'in-progress': {
    label: 'В процессе',
    modifier: 'in-progress',
  },
  'not-started': {
    label: 'К изучению',
    modifier: 'not-started',
  },
}

const STATUS_ORDER = ['not-started', 'in-progress', 'completed']

function TechnologyCard({ title, description, status = 'not-started' }) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const config = STATUS_PRESETS[currentStatus] ?? STATUS_PRESETS['not-started']

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  const handleClick = () => {
    const index = STATUS_ORDER.indexOf(currentStatus)
    const nextIndex = (index + 1) % STATUS_ORDER.length
    setCurrentStatus(STATUS_ORDER[nextIndex])
  }

  return (
    <article className={`technology-card technology-card--${config.modifier}`} onClick={handleClick}>
      <header className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className="technology-card__status">{config.label}</span>
      </header>
      {description && <p className="technology-card__description">{description}</p>}
    </article>
  )
}

export default TechnologyCard

