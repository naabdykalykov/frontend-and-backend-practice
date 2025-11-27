import TechnologyCard from './components/TechnologyCard'
import './App.css'

const technologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов и композиции.',
    status: 'completed',
  },
  {
    id: 2,
    title: 'JSX Syntax',
    description: 'Освоение синтаксиса JSX и выражений в шаблонах.',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'State Management',
    description: 'Работа с состоянием компонентов и хуками.',
    status: 'not-started',
  },
]

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>Технологии проекта</h1>
        <p>Быстрый обзор стека, который мы используем.</p>
      </header>

      <section className="app__grid">
        {technologies.map((tech) => (
          <TechnologyCard key={tech.id} title={tech.title} description={tech.description} status={tech.status} />
        ))}
      </section>
    </main>
  )
}

export default App

