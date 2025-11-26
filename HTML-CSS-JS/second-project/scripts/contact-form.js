document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) {
        return;
    }

    const statusEl = document.getElementById('form-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fields = [
        {
            input: form.querySelector('#name'),
            error: document.getElementById('name-error'),
            validate(value) {
                if (!value) {
                    return 'Укажите ваше имя.';
                }
                return '';
            },
        },
        {
            input: form.querySelector('#email'),
            error: document.getElementById('email-error'),
            validate(value) {
                if (!value) {
                    return 'Введите адрес электронной почты.';
                }
                if (!emailRegex.test(value)) {
                    return 'Пожалуйста, введите корректный email.';
                }
                return '';
            },
        },
        {
            input: form.querySelector('#message'),
            error: document.getElementById('message-error'),
            validate(value) {
                if (!value) {
                    return 'Напишите сообщение.';
                }
                if (value.length < 10) {
                    return 'Сообщение должно содержать не менее 10 символов.';
                }
                return '';
            },
        },
    ];

    const hideStatus = () => {
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.hidden = true;
        }
    };

    const showStatus = (message) => {
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.hidden = false;
        }
    };

    const setError = (field, message) => {
        if (!field.input || !field.error) {
            return;
        }

        field.error.textContent = message;
        field.error.hidden = false;
        field.input.setAttribute('aria-invalid', 'true');
    };

    const clearError = (field) => {
        if (!field.input || !field.error) {
            return;
        }

        field.error.textContent = '';
        field.error.hidden = true;
        field.input.removeAttribute('aria-invalid');
    };

    const validateField = (field) => {
        if (!field.input) {
            return true;
        }

        const value = field.input.value.trim();
        const message = field.validate(value);

        if (message) {
            setError(field, message);
            return false;
        }

        clearError(field);
        return true;
    };

    fields.forEach((field) => {
        if (!field.input) {
            return;
        }

        field.input.addEventListener('input', () => {
            if (field.input.hasAttribute('aria-invalid')) {
                validateField(field);
            }
        });

        field.input.addEventListener('blur', () => {
            validateField(field);
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        hideStatus();

        let firstInvalid = null;

        fields.forEach((field) => {
            const isValid = validateField(field);
            if (!isValid && !firstInvalid && field.input) {
                firstInvalid = field.input;
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        const nameValue = fields[0].input ? fields[0].input.value.trim() : '';
        const emailValue = fields[1].input ? fields[1].input.value.trim() : '';

        showStatus(`Спасибо, ${nameValue || 'друг'}! Ваше сообщение отправлено. Мы свяжемся с вами по адресу ${emailValue}.`);

        form.reset();
        fields.forEach(clearError);
    });
});

