let socket = io.connect();

socket.on('productos', (data) => {
  render(data);
});
function render(data) {
  let html = data.map((elem, index) => {
    return (`<tr>
    <td>${elem.title}</td>
    <td>${elem.price}</td>
    <td><img src="${elem.thumbnail}" alt="Imagen del producto"></td>
    </tr>`)
  }).join(' ');
  document.getElementById('tbproducts').innerHTML= html;
}

function addProduct(e) {
  let producto = { 
    title: document.getElementById('title').value, 
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  }; 
  socket.emit('new-product', producto)
  document.getElementById('title').value = ''
  document.getElementById('price').value = ''
  document.getElementById('thumbnail').value = ''
  return false;
}