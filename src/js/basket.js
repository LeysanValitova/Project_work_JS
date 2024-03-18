"use strict"
import "../scss/style.scss"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

const cart = document.querySelector('.product__list');
let productsData = [];



getProducts();






async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductBasket(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function loadProductBasket(data) {
    cart.textContent = '';

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage();

    if(!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if(!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    renderProductsBasket(findProducts);

}

function delProductBasket(event) {
    const targetButton = event.target.closest('.product__delete-btn');
    if (!targetButton) return;

    const card = targetButton.closest('.product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function changeProductQuantity(event) {
    const action = event.target.closest('.product__add-btn') ? 'add' : 'subtract';
    const quantityElement = event.target.closest('.product').querySelector('.product__quantityy');
    
    let quantity = Number(quantityElement.dataset.quantity);
    
    if (action === 'add' && quantity < 10) {
        quantity++;
    } else if (action === 'subtract' && quantity > 1) {
        quantity--;
    }
    
    quantityElement.textContent = quantity;
    quantityElement.dataset.quantity = quantity;

    calcPrice(event)
    calcTotalSum()
}

function calcPrice(event) {
    const quantityElement = event.target.closest('.product').querySelector('.product__quantityy');
    let quantity = Number(quantityElement.dataset.quantity);

    const priceElement = event.target.closest('.product').querySelector('.product__price');
    let price = Number(priceElement.dataset.price);


    price = quantity * price;

    priceElement.textContent = price;
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, img, title,subtitle, volume,  price } = card;

        const cardItem = 
        `<div class="product" data-product-id="${id}">
            <div class="product__inform">
              <a class="product__img" href="#"><img src="../public/images/${img}" alt="product"/></a>
              <div class="product__title-wrapper">
              <a href="#" class="product__title">${title}</a>
              <div class="product__subtitle">${subtitle} ${volume}</div>
              </div>
              </div>
              <div class="product__quantity-wrapper">
              <button class="product__remove-btn" data-action="subtract">
              <i class="fa-solid fa-minus fa-lg"></i>
              </button>
              <div class="product__quantityy" data-quantity="1">1</div>
              <button class="product__add-btn"  data-action="add">
              <i class="fa-solid fa-plus fa-lg"></i>
              </button>
              </div>
              <div class="product__price" data-price="${price}">${price}</div>
              <button class="product__delete-btn">
              <i class="fa-solid fa-xmark fa-xl"></i>
              </button>
              </div>`;
              
              cart.insertAdjacentHTML('beforeend', cardItem);
              
            });
        }
        
        
        function calcTotalSum() {
            setTimeout(() => {
               const prices = [...document.querySelectorAll('.product__price')];
                     
               if (prices.length > 0) {
                  const totalSum = prices.reduce((acc, price) => {
                     return acc + parseFloat(price.textContent);
                  }, 0);
                          
                  document.querySelector('.subtotal').textContent = totalSum;
               } else {
                  document.querySelector('.order-btn').style.display = 'none';
                  document.querySelector('.subtotal').style.display = 'none';
                  cart.textContent = NO_ITEMS_CART;
                  cart.style.color = '#122947';
                  cart.style.fontFamily = 'mplus1-regular';
               }
            }, 100);
         }
          
          calcTotalSum();

cart.addEventListener('click', delProductBasket);
cart.addEventListener('click', changeProductQuantity);
