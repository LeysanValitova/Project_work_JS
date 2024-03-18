"use strict"
import "../scss/style.scss"
//==========================================
import { ERROR_SERVER, PRODUCT_INFORMATION_NOT_FOUND } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

const wrapper = document.querySelector('.product-box');
let productsData = [];


getProducts();

wrapper.addEventListener('click', handleCardClick)

async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }

        // console.log(productsData);
        
        loadProductDetails(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}


function getParameterFromURL(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


function loadProductDetails(data) {

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);

    const productId = Number(getParameterFromURL('id'));

    if (!productId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }

    const findProduct = data.find(card => card.id === productId);

    if(!findProduct) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }
    renderInfoProduct(findProduct);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}


function handleCardClick(event) {
    const targetButton = event.target.closest('.card-product__btn');
    if (!targetButton) return;

    const card = targetButton.closest('.card-product__container');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}

function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card-product__btn');

    buttons.forEach(btn => {
        const card = btn.closest('.card-product__container');
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
    });
    
}


function renderInfoProduct(product) {
    const { id, img, title,subtitle, price, volume, descr } = product;
    const productItem = 
        `
        <div class="card-product__container" data-product-id=${id}>
                <div class="card-product__img-container">
                  <img
                    class="card-product__image"
                    src="../public/images/${img}"
                    alt="${title}"
                  />
                </div>
                <div class="card-product__description-container">
                  <div class="card-product__top">
                    <div class="card-product__name-container">
                      <div class="card-product__name">${title}</div>
                      <div class="card-product__subtitile">${subtitle}</div>
                    </div>
                    <div class="card-product__text">
                      <p>${descr}</p>
                    </div>
                  </div>
                  <div class="card-product__bottom">
                    <div class="card-product__volume">Объём: ${volume}</div>
                    <div class="card-product__footer">
                      <div class="card-product__price">${price}</div>
                      <button class="card-product__btn">В корзину</button>
                    </div>
                  </div>
                </div>
              </div>
        `
    wrapper.insertAdjacentHTML('beforeend', productItem);
}


