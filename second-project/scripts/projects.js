document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeBtn = document.querySelector('.close');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3')?.textContent || 'Проект';
            const projectTech = this.querySelector('p')?.textContent || '';
            
            document.getElementById('modalTitle').textContent = projectTitle;
            document.getElementById('modalDescription').textContent = 
                `Подробное описание проекта "${projectTitle}". ${projectTech}`;
            
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.textContent.toLowerCase();
            const cards = document.querySelectorAll('.project-card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'все' || category === filter || 
                    (filter === 'html' && category === 'html') ||
                    (filter === 'js' && category === 'js') ||
                    (filter === 'react' && category === 'react')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});


