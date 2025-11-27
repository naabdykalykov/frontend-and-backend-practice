import './ProgressHeader.css'

function ProgressHeader({ total = 0, completed = 0, completion = 0 }) {
  const clampedCompletion = Math.min(Math.max(completion, 0), 100)

  return (
    <section className="progress-header">
      <div className="progress-header__stats">
        <div className="progress-header__stat">
          <span className="progress-header__label">Всего</span>
          <strong className="progress-header__value">{total}</strong>
        </div>
        <div className="progress-header__stat">
          <span className="progress-header__label">Изучено</span>
          <strong className="progress-header__value">{completed}</strong>
        </div>
        <div className="progress-header__stat">
          <span className="progress-header__label">Прогресс</span>
          <strong className="progress-header__value">{clampedCompletion}%</strong>
        </div>
      </div>

      <div className="progress-header__bar">
        <div className="progress-header__bar-fill" style={{ width: `${clampedCompletion}%` }} />
      </div>
    </section>
  )
}

export default ProgressHeader

