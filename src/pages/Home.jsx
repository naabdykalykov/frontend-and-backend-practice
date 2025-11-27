import { Link } from 'react-router-dom'
import ProgressHeader from '../components/ProgressHeader/ProgressHeader'

function Home({ total, completed, completion, statusCounts }) {
  return (
    <div className="page page-home">
      <section className="page-home__hero">
        <p>Личный центр управления обучением</p>
        <h1>Следите за прогрессом изучения технологий</h1>
        <p>Добавляйте технологии, фиксируйте заметки и отмечайте прогресс в реальном времени.</p>
        <div className="page-home__cta">
          <Link to="/technologies" className="btn btn-primary">
            Перейти к списку
          </Link>
          <Link to="/statistics" className="btn btn-secondary">
            Смотреть статистику
          </Link>
        </div>
      </section>

      <section className="page-home__stats">
        <ProgressHeader
          total={total}
          completed={completed}
          completion={completion}
          statusCounts={statusCounts}
        />
      </section>
    </div>
  )
}

export default Home

