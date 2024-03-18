import "../scss/style.scss"

// Бургер-меню
window.addEventListener('DOMContentLoaded', function() {
	this.document.getElementById('burger-btn').addEventListener('click', function() {
		document.querySelector('header').classList.toggle('open')
	})

    
})