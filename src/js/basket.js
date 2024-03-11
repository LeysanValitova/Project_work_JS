"use strict"
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
cart.addEventListener('click', delProductBasket);
cart.addEventListener('click', changeProductQuantity);
// cart.addEventListener('click', subtractOneProduct);




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
    // addProductBasket();
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
}

function calcPrice(event) {
    const quantityElement = event.target.closest('.product').querySelector('.product__quantityy');
    let quantity = Number(quantityElement.dataset.quantity);

    const priceElement = event.target.closest('.product').querySelector('.product__price');
    let price = Number(priceElement.dataset.price);


    price = quantity * price;

    priceElement.textContent = price;
}

function calcTotalSum() {
    const prices = [...document.querySelectorAll('.product__price')];
    
    // const totalSum = prices.reduce((acc, price) => {
        //     return acc + parseFloat(price.textContent);
        // }, 0);
        
        // document.querySelector('.subtotal').textContent = totalSum
        console.log(prices)
        
    }
    
    calcTotalSum();






function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, img, title,subtitle, volume,  price } = card;
        // const priceDiscount = price - ((price * discount) / 100);

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




// const productsInCart = JSON.parse(localStorage.getItem('basket'));

// const renderItem = (card) =>{
//   const { id, image, title, subtitle, price } = card;

//   return (
//     `<div class="product" id="${id}">
//     <div class="product__inform">
//       <a class="product__img" href="#"><img src="${image}" alt="product"/></a>
//       <div class="product__title-wrapper">
//         <a href="#" class="product__title">${title}</a>
//         <div class="product__subtitle">${subtitle}</div>
//       </div>
//     </div>
//     <div class="product__quantity-wrapper">
//       <button class="product__remove-btn">
//         <i class="fa-solid fa-minus fa-lg"></i>
//       </button>
//       <div class="product__quantity">1</div>
//       <button class="product__add-btn">
//         <i class="fa-solid fa-plus fa-lg"></i>
//       </button>
//     </div>
//     <div class="product__price">${price}</div>
//     <button class="product__delete-btn">
//       <i class="fa-solid fa-xmark fa-xl"></i>
//     </button>
//   </div>`
//   )
// }

// const getProductCount = (card) => +card.price

// const renderProductsBasket = (arr) => {
//   const cart = document.querySelector('.product__list');
//   let totalSum = 0
    
//   arr.forEach(card => {
//         cart.insertAdjacentHTML('beforeend', renderItem(card)); 
//         totalSum += getProductCount(card)
//   })

//   const totalPrice = document.querySelector('.subtotal');
//   totalPrice.textContent = totalSum;
// }

// if (productsInCart) {
//   renderProductsBasket(productsInCart);
// }

// const deleteButtons = document.getElementsByClassName('product__delete-btn')
// const arrayDeleteBtns = [...deleteButtons]

// arrayDeleteBtns.forEach(deleteBtn => {
//   deleteBtn.addEventListener('click', function() {
//     deleteProduct(this);
//   });
// });

// function deleteProduct(btn) {
//   const cart = document.querySelector('.product__list');
//   const parentNode = btn.parentNode;
//   const deletedId = parentNode.getAttribute('id');

//   const filteredList = [...productsInCart].filter(item => item.id !== deletedId);
//   localStorage.setItem('basket', JSON.stringify(filteredList));
//   cart.textContent = null;

//   renderProductsBasket(filteredList);
// }


// ______
// function renderProductsBasket(arr) {

//     const productElement = document.getElementById(id);
//     const quantityElement = productElement.querySelector('.product__quantity');
//     const priceElement = productElement.querySelector('.product__price');

//     const addButton = productElement.querySelector('.product__add-btn');
//     addButton.addEventListener('click', () => {
//       let quantity = parseInt(quantityElement.textContent);
//       quantity++;
//       quantityElement.textContent = quantity;
//       priceElement.textContent = parseInt(quantity) * parseInt(price);

//       // Пересчитываем общую сумму
//       totalSum += parseInt(price);
//       totalPrice.textContent = totalSum;
//     });

//     const removeButton = productElement.querySelector('.product__remove-btn');
//     removeButton.addEventListener('click', () => {
//       let quantity = parseInt(quantityElement.textContent);
//       if (quantity > 0) {
//         quantity--;
//         quantityElement.textContent = parseInt(quantity);
//         priceElement.textContent = parseInt(quantity) * parseInt(price);

//         // Пересчитываем общую сумму
//         totalSum -= price;
//         totalPrice.textContent = totalSum > 0 ? totalSum : 0;
//       }
//     });

//     const deleteButton = productElement.querySelector('.product__delete-btn');
//     deleteButton.addEventListener('click', () => {
//       cart.removeChild(productElement); // Удаляем товар из корзины

//       // Удаляем товар из локального хранилища
//       const updatedProducts = arr.filter(product => product.id !== id);
//       localStorage.setItem('basket', JSON.stringify(updatedProducts));

//       // Обновляем количество товаров в корзине
//       basketСount.textContent = updatedProducts.length;
//     });

//     const totalPrice = document.querySelector('.subtotal');
//     totalPrice.textContent = totalSum;
//     const basketСount = document.querySelector('.basket__count');
//     basketСount.textContent = arr.length;
//   });
// }