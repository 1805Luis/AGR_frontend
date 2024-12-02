// Seleccionar los elementos
const cardContainer = document.querySelector(".card-container");
const flipToRegister = document.getElementById("flip-to-register");
const flipToLogin = document.getElementById("flip-to-login");

// Agregar los eventos para girar la tarjeta
flipToRegister.addEventListener("click", (event) => {
  event.preventDefault();
  cardContainer.classList.add("flip");
});

flipToLogin.addEventListener("click", (event) => {
  event.preventDefault();
  cardContainer.classList.remove("flip");
});

