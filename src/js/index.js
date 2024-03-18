"use strict"

import "../scss/style.scss"



// =======================
setProductsInCart()

function showModal() {
  const modal = document.getElementById('popup');
  modal.classList.add('open_popup');
  localStorage.setItem('modalShown', 'true');
}

function checkLocalStorage() {
  if (localStorage.getItem('modalShown')) {
      const modal = document.getElementById('popup');
      modal.classList.remove('open_popup')
  } else {
      setTimeout(showModal, 5000);
  }
}

checkLocalStorage();

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

document.getElementById('addAddress').addEventListener('click', function() {
    let popup = document.getElementById('popup');
popup.classList.remove('open_popup');
})

// Закрывать модальное окно при клике на кноаку добавить адрес
const popup = document.getElementsByClassName('popup')[0]
const popup__box = document.getElementsByClassName('popup__box')[0]
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.classList.remove('open_popup')
    }
});




// карусель
document.getElementById('next').addEventListener('click', function() {
    document.querySelector('#slider').scrollLeft += 300;
  });

  document.getElementById('prev').addEventListener('click', function() {
    document.querySelector('#slider').scrollLeft -= 300;
  });


 function setProductsInCart () {
    const productsInCart = JSON.parse(localStorage.getItem('basket'));
  const basketСount = document.querySelector('.basket__count');
  basketСount.textContent = productsInCart.length;
  }







