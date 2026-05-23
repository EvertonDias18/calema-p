let checkoutProducts = JSON.parse(localStorage.getItem('checkoutProducts')) || [];
let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const summary = document.getElementById('payment-summary');
  summary.innerHTML = '';
  let total = 0;
  checkoutProducts.forEach(id => {
    const p = products.find(p => p.id === id);
    if(p && !p.vendido){
      summary.innerHTML += `
        <p>${p.name} - €${p.price}</p>
      `;
      total += p.price;
    }
  });
  summary.innerHTML += `<h3>Total: €${total}</h3>`;
});

document.getElementById('payment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Pagamento processado com sucesso!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.removeItem('checkoutProducts');
  window.location.href = 'index.html';
});
