function Settings({ onReset, onClearStorage, total }) {
  return (
    <div className="page page-settings">
      <h1>Настройки</h1>
      <section className="settings-card">
        <h2>Управление данными</h2>
        <p>Всего технологий: {total}</p>
        <div className="settings-card__actions">
          <button type="button" onClick={onReset}>
            Сбросить к исходному списку
          </button>
          <button type="button" onClick={onClearStorage}>
            Очистить сохранённые данные
          </button>
        </div>
      </section>
    </div>
  )
}

export default Settings

