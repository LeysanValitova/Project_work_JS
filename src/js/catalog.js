




document.addEventListener("DOMContentLoaded", function() {
  // Находим все кнопки "В корзину" на странице
  let addToCartButtons = document.querySelectorAll(".card__btn");

  // Добавляем обработчик клика на каждую из них
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Получаем информацию о товаре из карточки
      let card = this.parentNode.parentNode;
      let title = card.querySelector(".card__titlee").textContent;
      let subtitle = card.querySelector(".card__subtitlee").textContent;
      let image = card.querySelector(".card__img img").getAttribute("src");
      let price = card.querySelector(".card__price").textContent;

      // Получаем текущее содержимое корзины из локального хранилища
      let basket = JSON.parse(localStorage.getItem("basket")) || [];

      // Создаем объект для товара
      let product = {
        id: card.id, // Свойство id может быть использовано для идентификации товара
        title: title,
        subtitle: subtitle,
        price: price,
        image: image
      };

      // Добавляем выбранный товар в корзину
      basket.push(product);
      basketСount.textContent = basket.length;

      // basketСount.textContent = productsInCart.length;

      // Сохраняем обновленное содержимое корзины в локальное хранилище
      localStorage.setItem("basket", JSON.stringify(basket));
      // basketСount.textContent = productsInCart.length;

    });
  });


  const productsInCart = JSON.parse(localStorage.getItem('basket'));
  const basketСount = document.querySelector('.basket__count');
  basketСount.textContent = productsInCart.length;
});

