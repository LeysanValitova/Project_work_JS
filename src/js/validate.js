// Валидация формы

function validation(form) {
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('p');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
        parent.classList.add('error');
        parent.append(errorLabel);
    }

    let result = true;

    const allInputs = form.querySelectorAll('input');

    for (const input of allInputs) {
        removeError(input);

        if (input.dataset.minlength) {
            if (input.value.length < input.dataset.minlength) {
                createError(input, `Минимальное кол-во символов: ${input.dataset.minlength}`);
                result = false;
            }
        }

        if (input.dataset.maxlength) {
            if (input.value.length > input.dataset.maxlength) {
                createError(input, `Максимальное кол-во символов: ${input.dataset.maxlength}`);
                result = false;
            }
        }

        if (input.required) {
            if (input.value.trim() === '') {
                createError(input, 'Поле не заполнено!');
                result = false;
            }
        }
    }

    return result;
}

document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  if (validation(this)) {
    let form = this;
    let formData = new FormData(form);

    fetch('https://example.com/api/register', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Произошла ошибка при отправке данных');
      }
    })
    .then(data => {
      console.log('Данные успешно отправлены:', data);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
  }
});