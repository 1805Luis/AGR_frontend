function updateTotal() {
  let total = 0;
  // Selecciona todas las categorías de asientos
  const categories = document.querySelectorAll('.seat-category');

  categories.forEach(category => {
    // Obtén el precio de cada categoría desde el atributo data-price
    const price = parseFloat(category.dataset.price);
    // Obtén la cantidad seleccionada en el input, con valor predeterminado de 0
    const quantity = parseInt(category.querySelector('input').value) || 0;
    // Suma al total (precio * cantidad)
    total += price * quantity;
  });

  // Actualiza el total en el HTML
  document.getElementById('totalPrice').innerText = `Total: €${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todos los inputs dentro de las categorías
  const inputs = document.querySelectorAll('.seat-category input');
  
  // Agrega un evento de escucha para cada input
  inputs.forEach(input => {
    input.addEventListener('input', updateTotal);
  });

  // Inicializa el total cuando la página carga
  updateTotal();
});
