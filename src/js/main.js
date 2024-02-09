

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
				let form = document.getElementById('registrationForm');
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
})


// // Показать модальное окно только 1 раз при входе на сайт
// function showModal() {
//     let popup = document.getElementById('popup');
// popup.classList.add('open_popup');
// }



// document.addEventListener('DOMContentLoaded', function() {

// let isModalShown = localStorage.getItem('isModalShown');

// if (!isModalShown) {
//     setTimeout(function() {
        
//         showModal()
//         localStorage.setItem('isModalShown', true);
//     }, 15000)
// }
// });

// Закрывать модальное окно при клике на крестик
document.getElementById('popupClose').addEventListener('click', function() {
    let popup = document.getElementById('popup');
popup.classList.remove('open_popup');
})
// Закрывать модальное окно при клике на клавишу esc

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        let popup = document.getElementById('popup');
        popup.classList.remove('open_popup');
    }
})
// Закрывать модальное окно при клике вне него

// document.querySelector('#popup','.popup__box').addEventListener('click', event => {
//     event._isClickWidthInModal = true;
// });
// document.querySelector('#popup').addEventListener('click', event => {
// if (event._isClickWidthInModal) return;
// event.currentTarget.classList.remove('open_popup');
// })

// Закрывать модальное окно при клике на кноаку добавить адрес
document.getElementById('addAddress').addEventListener('click', function() {
    let popup = document.getElementById('popup');
popup.classList.remove('open_popup');
})


// карусель
document.getElementById('next').addEventListener('click', function() {
    document.querySelector('#slider').style.transform += 'translateX(-100%)';
  });

  document.getElementById('prev').addEventListener('click', function() {
    document.querySelector('#slider').style.transform += 'translateX(100%)';
  });





