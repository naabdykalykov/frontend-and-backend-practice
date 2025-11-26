const contactModal = document.getElementById('contactModal');
const feedbackForm = document.getElementById('feedbackForm');

const successMessage = 'Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.';

function submitForm() {
    if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
    }
    
    const formData = new FormData(feedbackForm);
    
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };
    
    console.log('Данные формы:', data);
    
    alert(successMessage);
    
    closeModal();
    resetForm();
}

function closeModal() {
    contactModal.close();
}

function resetForm() {
    feedbackForm.reset();
}

function handleModalBackdropClick(event) {
    if (event.target === contactModal) {
        closeModal();
    }
}

function handleFormKeypress(event) {
    if (event.key === 'Enter' && event.target.type !== 'textarea') {
        event.preventDefault();
    }
}

contactModal.addEventListener('click', handleModalBackdropClick);
feedbackForm.addEventListener('keypress', handleFormKeypress);

