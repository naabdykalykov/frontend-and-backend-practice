import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import TechnologyList from './pages/TechnologyList.jsx'
import TechnologyDetail from './pages/TechnologyDetail.jsx'
import AddTechnology from './pages/AddTechnology.jsx'
import Statistics from './pages/Statistics.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import useTechnologies, { initialTechnologies } from './hooks/useTechnologies'
import './App.css'

function App() {
  const { technologies, setTechnologies, updateStatus, updateNotes, progress } = useTechnologies()
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('isLoggedIn') === 'true'
  })
  const [username, setUsername] = useState(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem('username') || ''
  })

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

  const handleAddTechnology = (payload) => {
    const nextId = technologies.length > 0 ? Math.max(...technologies.map((tech) => tech.id)) + 1 : 1
    setTechnologies((prev) => [
      ...prev,
      {
        id: nextId,
        title: payload.title,
        description: payload.description,
        status: payload.status ?? 'not-started',
        notes: payload.notes ?? '',
        category: payload.category ?? 'frontend',
      },
    ])
  }

  const handleClearStorage = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('technologies')
    }
    setTechnologies(initialTechnologies.map((tech) => ({ ...tech })))
  }

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setUsername(user)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('isLoggedIn', 'true')
      window.localStorage.setItem('username', user)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('isLoggedIn')
      window.localStorage.removeItem('username')
    }
  }

  return (
    <div className="app-layout">
      <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <div className="app">
        <Routes>
        <Route
          path="/"
          element={
            <Home
              total={total}
              completed={completed}
              completion={completion}
              statusCounts={statusCounts}
            />
          }
        />
        <Route
          path="/technologies"
          element={
            <TechnologyList
              technologies={technologies}
              statusCounts={statusCounts}
              onStatusChange={handleStatusChange}
              onNotesChange={updateTechnologyNotes}
              onCompleteAll={handleCompleteAll}
              onResetAll={handleResetAll}
              onPickRandom={handlePickRandom}
            />
          }
        />
        <Route
          path="/technologies/:id"
          element={
            <TechnologyDetail
              technologies={technologies}
              onStatusChange={handleStatusChange}
              onNotesChange={updateTechnologyNotes}
            />
          }
        />
        <Route
          path="/add-technology"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddTechnology onAddTechnology={handleAddTechnology} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard username={username} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={<Statistics progress={completion} statusCounts={statusCounts} />}
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings
                onReset={handleResetAll}
                onClearStorage={handleClearStorage}
                total={total}
              />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </div>
  )
}

export default App

