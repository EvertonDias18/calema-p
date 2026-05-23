function listFavorites(){
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  
  favorites.forEach(id => {
    const p = products.find(p => p.id === id);
    if(p && !p.vendido){
      list.innerHTML += `
        <div class="product">
          <h3>${p.name}</h3>
          <p>€${p.price} - ${p.size}</p>
          ${p.imgs.map(img => `<img src="${img}" onclick="showImage('${img}')">`).join('')}
          <p>${p.cat}</p>
          <button onclick="removeFromFavorites(${p.id})">Remover</button>
        </div>
      `;
    }
  });
}

function removeFromFavorites(productId){
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(id => id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  listFavorites();
}

listFavorites();
