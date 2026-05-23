let editingIndex = null;

document.getElementById('product-form').addEventListener('submit', function(e){
  e.preventDefault();
  if(editingIndex === null){
    // Publicar novo
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const size = document.getElementById('size').value;
    const cat = document.getElementById('cat').value;
    const imgsInput = document.getElementById('imgs');
    const imgs = Array.from(imgsInput.files);

    if(!name || !price || !size || !cat || imgs.length === 0){
      alert('Preenche todos os campos!');
      return;
    }

    Promise.all(imgs.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    })).then(imgsData => {
      const product = { 
        id: Date.now(), 
        name, 
        price, 
        size, 
        cat, 
        imgs: imgsData, 
        vendido: false 
      };
      let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
      products.push(product);
      localStorage.setItem('calema_v0.0.1', JSON.stringify(products));
      alert('Publicado!');
      listProducts();
      document.getElementById('product-form').reset();
    });
  } else {
    // Atualizar
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const size = document.getElementById('size').value;
    const cat = document.getElementById('cat').value;
    const imgsInput = document.getElementById('imgs');
    const imgs = Array.from(imgsInput.files);

    let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
    if(imgs.length > 0){
      Promise.all(imgs.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })).then(imgsData => {
        products[editingIndex] = { 
          ...products[editingIndex], 
          name, 
          price, 
          size, 
          cat, 
          imgs: imgsData 
        };
        localStorage.setItem('calema_v0.0.1', JSON.stringify(products));
        alert('Atualizado!');
        editingIndex = null;
        document.getElementById('update-btn').style.display = 'none';
        document.getElementById('product-form').reset();
        listProducts();
      });
    } else {
      products[editingIndex] = { 
        ...products[editingIndex], 
        name, 
        price, 
        size, 
        cat 
      };
      localStorage.setItem('calema_v0.0.1', JSON.stringify(products));
      alert('Atualizado!');
      editingIndex = null;
      document.getElementById('update-btn').style.display = 'none';
      document.getElementById('product-form').reset();
      listProducts();
    }
  }
});

document.getElementById('update-btn').addEventListener('click', function(){
  document.getElementById('product-form').dispatchEvent(new Event('submit'));
});

// Listar produtos
function listProducts(){
  const products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  const list = document.getElementById('products-list');
  if(list){
    list.innerHTML = '';
    products.forEach((p, index) => {
      const vendido = p.vendido ? 'Vendido' : 'Disponível';
      list.innerHTML += `
        <li>
          ${p.name} (€${p.price}) - ${vendido}
          <button onclick="editProduct(${index})">Editar</button>
          <button onclick="deleteProduct(${index})">Apagar</button>
          <button onclick="toggleVendido(${index})">${p.vendido ? 'Desmarcar Vendido' : 'Marcar Vendido'}</button>
        </li>
      `;
    });
  }
}

// Editar produto
function editProduct(index){
  let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  const p = products[index];
  document.getElementById('name').value = p.name;
  document.getElementById('price').value = p.price;
  document.getElementById('size').value = p.size;
  document.getElementById('cat').value = p.cat;
  editingIndex = index;
  document.getElementById('update-btn').style.display = 'inline';
}

// Apagar produto
function deleteProduct(index){
  let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  products.splice(index, 1);
  localStorage.setItem('calema_v0.0.1', JSON.stringify(products));
  listProducts();
}

// Marcar/Desmarcar como vendido
function toggleVendido(index){
  let products = JSON.parse(localStorage.getItem('calema_v0.0.1')) || [];
  products[index].vendido = !products[index].vendido;
  localStorage.setItem('calema_v0.0.1', JSON.stringify(products));
  listProducts();
}

// Chamar listProducts quando carrega a página
listProducts();