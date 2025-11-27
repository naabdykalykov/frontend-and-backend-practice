function Dashboard({ username }) {
  return (
    <div className="page page-dashboard">
      <h1>Панель управления</h1>
      <p>Привет, {username || 'пользователь'}!</p>
      <p>Здесь появятся ваши персональные метрики.</p>
    </div>
  )
}

export default Dashboard

