function listProducts(products = null){
  const list = document.getElementById('products');
  list.innerHTML = '';
  if(!products){
    products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  }

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  products.forEach(p => {
    if(!p.vendido){
      list.innerHTML += `
        <div class="product">
          <h3>${p.name}</h3>
          <p>€${p.price} - ${p.size}</p>
          ${p.imgs.map(img => `<img src="${img}" onclick="showImage('${img}')">`).join('')}
          <p>${p.cat}</p>
          <button style="background-color: #f8c4b4; padding: 10px 20px; border: none; cursor: pointer;"
            onclick="addToCart(${p.id})">
            Adicionar ao Carrinho
          </button>
          <button style="background: none; border: none; cursor: pointer; font-size: 20px; color: ${favorites.includes(p.id) ? 'red' : ''};" 
  onclick="addToFavorites(${p.id}, this)">
  ❤️
</button>
        </div>
      `;
    }
  });
}

function addToCart(productId){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produto adicionado ao carrinho!');
}

function addToFavorites(productId, button){
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if(!favorites.includes(productId)){
    favorites.push(productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    button.style.color = 'red'; // Torna o coração vermelho
    alert('Produto adicionado aos favoritos!');
  } else {
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    button.style.color = ''; // Volta ao branco
    alert('Produto removido dos favoritos!');
  }
}

function showImage(src){
  document.getElementById('modal-image').src = src;
  document.getElementById('image-modal').style.display = 'flex';
}

document.getElementById('apply-filters').addEventListener('click', () => {
  const cat = document.getElementById('cat-filter').value;
  const size = document.getElementById('size-filter').value;
  let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];

  if(cat){
    products = products.filter(p => p.cat === cat);
  }
  if(size){
    products = products.filter(p => p.size === size);
  }

  listProducts(products);
});

const imgs = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  // Adiciona mais imagens aqui
];
let currentImg = 0;

document.querySelector('.next').addEventListener('click', () => {
  currentImg = (currentImg + 1) % imgs.length;
  document.getElementById('carousel-img').src = imgs[currentImg];
});

document.querySelector('.prev').addEventListener('click', () => {
  currentImg = (currentImg - 1 + imgs.length) % imgs.length;
  document.getElementById('carousel-img').src = imgs[currentImg];
});

// Init
listProducts();