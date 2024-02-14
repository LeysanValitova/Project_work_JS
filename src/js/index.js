
setProductsInCart()
// Показать модальное окно только 1 раз при входе на сайт
function showModal() {
    let popup = document.getElementById('popup');
popup.classList.add('open_popup');
}



document.addEventListener('DOMContentLoaded', function() {


let isModalShown = localStorage.getItem('isModalShown');

if (!isModalShown) {
    setTimeout(function() {
        
        showModal()
        localStorage.setItem('isModalShown', true);
    }, 15000)
}

});

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


 function setProductsInCart () {
    const productsInCart = JSON.parse(localStorage.getItem('basket'));
  const basketСount = document.querySelector('.basket__count');
  basketСount.textContent = productsInCart.length;
  }





