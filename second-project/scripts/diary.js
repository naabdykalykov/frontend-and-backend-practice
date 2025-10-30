document.addEventListener('DOMContentLoaded', function() {
    updateStats();
});

function updateStats() {
    const pendingCards = document.querySelectorAll('#pending-column .kanban-card').length;
    const inProgressCards = document.querySelectorAll('#in-progress-column .kanban-card').length;
    const completedCards = document.querySelectorAll('#completed-column .kanban-card').length;
    const totalCards = pendingCards + inProgressCards + completedCards;

    document.getElementById('pending-count').textContent = pendingCards;
    document.getElementById('in-progress-count').textContent = inProgressCards;
    document.getElementById('completed-count').textContent = completedCards;

    document.getElementById('stat-total').textContent = totalCards;
    document.getElementById('stat-completed').textContent = completedCards;
    document.getElementById('stat-in-progress').textContent = inProgressCards;

    const percent = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;
    document.getElementById('stat-percent').textContent = percent + '%';
}

