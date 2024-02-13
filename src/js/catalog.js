
let addToCartButtons = document.querySelectorAll('.card__btn');


addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    
    function product(title, subtitle, img, price, volume) {

    }

    let product = {
      name: this.parentElement.previousElementSibling.querySelector('.card__titlee').textContent,
      price: this.parentElement.querySelector('.card__price').textContent,
      volume: this.parentElement.querySelector('.card__volume').textContent
    };


    let cart = JSON.parse(localStorage.getItem('basket')) || [];

    cart.push(product);

    localStorage.setItem('basket', JSON.stringify(cart));
  });
});