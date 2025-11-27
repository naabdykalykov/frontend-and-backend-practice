import './TechnologyCard.css'

const STATUS_PRESETS = {
  completed: {
    label: 'Изучено',
    icon: '✅',
    modifier: 'completed',
  },
  'in-progress': {
    label: 'В процессе',
    icon: '🚧',
    modifier: 'in-progress',
  },
  'not-started': {
    label: 'К изучению',
    icon: '📝',
    modifier: 'not-started',
  },
}

function TechnologyCard({ title, description, status = 'not-started' }) {
  const config = STATUS_PRESETS[status] ?? STATUS_PRESETS['not-started']

  return (
    <article className={`technology-card technology-card--${config.modifier}`}>
      <header className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className="technology-card__status">
          <span className="technology-card__status-icon" aria-hidden="true">
            {config.icon}
          </span>
          <span>{config.label}</span>
        </span>
      </header>
      {description && <p className="technology-card__description">{description}</p>}
    </article>
  )
}

export default TechnologyCard

