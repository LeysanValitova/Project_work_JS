
// Получение массива товаров из локального хранилища
const productsInCart = JSON.parse(localStorage.getItem('basket'));

// Проверяем, есть ли товары в корзине
if (productsInCart) {
  // Вызов функции для отображения товаров в корзине
  renderProductsBasket(productsInCart);
}

function renderProductsBasket(arr) {
  const cart = document.querySelector('.product__list');
  let totalSum = 0; // Переменная для хранения общей суммы цен

  arr.forEach(card => {
    const { id, image, title, subtitle, price } = card;

    const cardItem = 
    `<div class="product" id="${id}">
      <div class="product__inform">
        <a class="product__img" href="#"><img src="${image}" alt="product"/></a>
        <div class="product__title-wrapper">
          <a href="#" class="product__title">${title}</a>
          <div class="product__subtitle">${subtitle}</div>
        </div>
      </div>
      <div class="product__quantity-wrapper">
        <button class="product__remove-btn">
          <i class="fa-solid fa-minus fa-lg"></i>
        </button>
        <div class="product__quantity">1</div>
        <button class="product__add-btn">
          <i class="fa-solid fa-plus fa-lg"></i>
        </button>
      </div>
      <div class="product__price">${price}</div>
      <button class="product__delete-btn">
        <i class="fa-solid fa-xmark fa-xl"></i>
      </button>
    </div>`;

    cart.insertAdjacentHTML('beforeend', cardItem); 

    // ... (ваш текущий код)

    const productElement = document.getElementById(id);
    const quantityElement = productElement.querySelector('.product__quantity');
    const priceElement = productElement.querySelector('.product__price');

    const addButton = productElement.querySelector('.product__add-btn');
    addButton.addEventListener('click', () => {
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      priceElement.textContent = parseInt(quantity) * parseInt(price);

      // Пересчитываем общую сумму
      totalSum += parseInt(price);
      totalPrice.textContent = totalSum;
    });

    const removeButton = productElement.querySelector('.product__remove-btn');
    removeButton.addEventListener('click', () => {
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = parseInt(quantity);
        priceElement.textContent = parseInt(quantity) * parseInt(price);

        // Пересчитываем общую сумму
        totalSum -= price;
        totalPrice.textContent = totalSum > 0 ? totalSum : 0;
      }
    });

    const deleteButton = productElement.querySelector('.product__delete-btn');
    deleteButton.addEventListener('click', () => {
      cart.removeChild(productElement); // Удаляем товар из корзины

      // Удаляем товар из локального хранилища
      const updatedProducts = arr.filter(product => product.id !== id);
      localStorage.setItem('basket', JSON.stringify(updatedProducts));

      // Обновляем количество товаров в корзине
      basketСount.textContent = updatedProducts.length;
    });

    const totalPrice = document.querySelector('.subtotal');
    totalPrice.textContent = totalSum;
    const basketСount = document.querySelector('.basket__count');
    basketСount.textContent = arr.length;
  });
}