
"use strict"
import "../scss/style.scss"
//==========================================
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

import { 
    COUNT_SHOW_CARDS_CLICK, 
    ERROR_SERVER,
    NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

const cards = document.querySelector('.container__cards');
const btnShowCards = document.querySelector('.show-cards');
let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()

// // Обработка клика по кнопке "Показать еще"
btnShowCards.addEventListener('click', sliceArrCards);
// Обработка клика по кнопке "В корзину"
cards.addEventListener('click', handleCardClick);


// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
// console.log(productsData)
        if ((productsData.length > COUNT_SHOW_CARDS_CLICK) && 
            btnShowCards.classList.contains('none')) {
            btnShowCards.classList.remove('none');
        }
        
        renderStartPage(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

    checkingRelevanceValueBasket(data);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}


function sliceArrCards() {
    if(shownCards >= productsData.length) return;

    countClickBtnShowCards++;
    const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

    const arrCards = productsData.slice(shownCards, countShowCards);
    createCards(arrCards);
    shownCards = cards.children.length;

    if(shownCards >= productsData.length) {
        btnShowCards.classList.add('none');
    }
  
    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}


function handleCardClick(event) {
    const targetButton = event.target.closest('.card__btn');
    if (!targetButton) return;

    const card = targetButton.closest('.card');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}


function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card__btn');

    buttons.forEach(btn => {
        const card = btn.closest('.card');
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
    });
}


// Рендер карточки
function createCards(data) {
    data.forEach(card => {
        const { id, img, title, subtitle, price, volume } = card;
		const cardItem = 

            `         <div class="card" data-product-id=${id}>
            <div class="card__top">
              <a class="card__img" href="/card.html?id=${id}">
              <img src="../public/images/${img}" alt="${title}"
              /></a>
            </div>
            <div class="card__bottom">
              <div class="card__inform">
                <div class="card__title-wrapper">
                <a href="/card.html?id=${id}" class="card__titlee">${title}</a>
                  <div class="card__subtitlee">${subtitle}</div>
                </div>
                <div class="card__price-wrapper">
                  <div class="card__price">${price}</div>
                  <div class="card__volume">${volume}</div>
                </div>
              </div>
              <button class="card__btn">В корзину</button>
            </div>
          </div> `
        cards.insertAdjacentHTML('beforeend', cardItem);
	});
}

