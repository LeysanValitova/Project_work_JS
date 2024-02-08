// яндекс карты
let center = [59.93863106417265,30.323036499999905];

function init() {
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 19
	});

	let placemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
		iconImageHref: 'public/images/map_vector.svg',
        iconImageSize: [16, 22],
		iconImageOffset: [18, -35]
	});

	map.geoObjects.add(placemark);
}

ymaps.ready(init);

// карусель
const carousel = document.querySelector('.carousel');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let scrollDistance = 260; 

prev.addEventListener('click', function() {
  carousel.scrollLeft -= scrollDistance; // Двигаем карусель влево
});

next.addEventListener('click', function() {
  carousel.scrollLeft += scrollDistance; // Двигаем карусель вправо
});

// Бургер-меню
window.addEventListener('DOMContentLoaded', function() {
	this.document.getElementById('burger-btn').addEventListener('click', function() {
		document.querySelector('header').classList.toggle('open')
	})
})
// 

// Валидация формы

function validation(form) {

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove()
            parent.classList.remove('error')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('p')


        errorLabel.classList.add('error-label')
        errorLabel.textContent = text

        parent.classList.add('error')

        parent.append(errorLabel)
    }


    let result = true;

    const allInputs = form.querySelectorAll('input');

    for (const input of allInputs) {

        removeError(input)

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength) {
                removeError(input)
                createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`)
                result = false
            }
        }

        if (input.dataset.maxLength) {
            if (input.value.length > input.dataset.maxLength) {
                removeError(input)
                createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`)
                result = false
            }
        }

        if (input.required == "true") {
            if (input.value == "") {
                removeError(input)
                createError(input, 'Поле не заполнено!')
                result = false
            }
        }

    }

    return result
}


document.getElementById("registrationForm").addEventListener("submit", function(event) {

	event.preventDefault()
	if (validation(this) == true) {
		// отправка формы на сервер
				// let form = document.getElementById('registrationForm');

				fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'POST',
				body: JSON.stringify({
					title: 'foo',
					body: 'bar',
					userId: 1,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
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
})


// .then((response) => response.json())
// .then((json) => console.log(json));


