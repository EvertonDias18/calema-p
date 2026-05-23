let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];

function listCart(){
  const list = document.getElementById('cart-list');
  if(list){
    list.innerHTML = '';
    cart.forEach(id => {
      const p = products.find(p => p.id === id);
      if(p && !p.vendido){
        list.innerHTML += `
          <div style="display: flex; align-items: center;">
            <img src="${p.imgs[0]}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <div>
              <h3>${p.name}</h3>
              <p>€${p.price} - ${p.size}</p>
              <button onclick="removeFromCart(${p.id})">Remover</button>
            </div>
          </div>
        `;
      }
    });
  } else {
    console.error('Elemento #cart-list não encontrado!');
  }
}

document.getElementById('cart-list').addEventListener('click', function(e){
  if(e.target.tagName === 'IMG'){
    const src = e.target.src;
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
      <img src="${src}" style="max-width: 90%; max-height: 90%;">
    `;
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  }
});


function removeFromCart(productId){
  cart = cart.filter(id => id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  listCart();
}

function checkout(){
  if(cart.length === 0){
    alert('Carrinho vazio!');
    return;
  }
  localStorage.setItem('checkoutProducts', JSON.stringify(cart));
  window.location.href = 'pagamento.html';
}


listCart();