let products = [
  {
    id: '1',
    name: "iPhone 14",
    stock: 25,
    origin: "USA",
    price: 999,
    category: "Smartphone",
    emoji: "📱"
},
{
    id: '2',
    name: "Samsung Galaxy S22",
    stock: 30,
    origin: "South Korea",
    price: 899,
    category: "Smartphone",
    emoji: "📱"
},
{
    id: '3',
    name: "MacBook Pro",
    stock: 15,
    origin: "USA",
    price: 1999,
    category: "Laptop",
    emoji: "💻"
},
{
    id: '4',
    name: "Dell XPS 13",
    stock: 20,
    origin: "USA",
    price: 1299,
    category: "Laptop",
    emoji: "💻"
},
{
    id: '5',
    name: "Sony WH-1000XM4",
    stock: 40,
    origin: "Japan",
    price: 349,
    category: "Headphones",
    emoji: "🎧"
},
{
    id: '6',
    name: "Apple Watch Series 7",
    stock: 35,
    origin: "USA",
    price: 399,
    category: "Smartwatch",
    emoji: "⌚"
},
{
    id: '7',
    name: "iPad Pro",
    stock: 25,
    origin: "USA",
    price: 1099,
    category: "Tablet",
    emoji: "📱"
},
{
    id: '8',
    name: "Amazon Echo Dot",
    stock: 50,
    origin: "USA",
    price: 49,
    category: "Smart Speaker",
    emoji: "🔊"
},
{
    id: '9',
    name: "Google Nest Hub",
    stock: 40,
    origin: "USA",
    price: 89,
    category: "Smart Display",
    emoji: "🖥️"
},
{
    id: '10',
    name: "PlayStation 5",
    stock: 10,
    origin: "Japan",
    price: 499,
    category: "Gaming Console",
    emoji: "🎮"
},
{
    id: '11',
    name: "Xbox Series X",
    stock: 12,
    origin: "USA",
    price: 499,
    category: "Gaming Console",
    emoji: "🎮"
},
{
    id: '12',
    name: "Nikon D850",
    stock: 8,
    origin: "Japan",
    price: 2999,
    category: "Camera",
    emoji: "📷"
},
{
    id: '13',
    name: "Canon EOS R5",
    stock: 7,
    origin: "Japan",
    price: 3899,
    category: "Camera",
    emoji: "📷"
},
{
    id: '14',
    name: "LG OLED TV",
    stock: 18,
    origin: "South Korea",
    price: 1299,
    category: "Television",
    emoji: "📺"
},
{
    id: '15',
    name: "Samsung QLED TV",
    stock: 20,
    origin: "South Korea",
    price: 1499,
    category: "Television",
    emoji: "📺"
},
{
    id: '16',
    name: "Apple AirPods Pro",
    stock: 50,
    origin: "USA",
    price: 249,
    category: "Earbuds",
    emoji: "🎧"
},
{
    id: '17',
    name: "Bose QuietComfort Earbuds",
    stock: 45,
    origin: "USA",
    price: 279,
    category: "Earbuds",
    emoji: "🎧"
},
{
    id: '18',
    name: "Fitbit Charge 5",
    stock: 30,
    origin: "USA",
    price: 149,
    category: "Fitness Tracker",
    emoji: "📟"
},
{
    id: '19',
    name: "GoPro Hero 9",
    stock: 15,
    origin: "USA",
    price: 399,
    category: "Action Camera",
    emoji: "📹"
},
{
    id: '20',
    name: "DJI Mavic Air 2",
    stock: 10,
    origin: "China",
    price: 799,
    category: "Drone",
    emoji: "🚁"
}

];

let sales = [];

function createProductHtml(product) {
  return `<li>
    <label>
      <input ${product.stock < 1 ? 'disabled' : ''} required type="radio" name="selectedProduct" value="${product.id}"> (${product.stock}) ${product.emoji} ${product.name} - ${product.price} TL
    </label>
  </li>`;
}

function renderProducts() {
  productList.innerHTML = products.map(x => createProductHtml(x)).join('');
}

function calculateSalesTotal() {
  salesTotal.innerText = sales.reduce((total, current) => total + current.price, 0);
}

function handleSalesForm(e) {
  e.preventDefault();
  let formData = new FormData(salesForm);
  let formObj = Object.fromEntries(formData);

  if(!formObj.selectedProduct) {
    alert('Ürün kalmadı ne satıcan??');
    return;
  }

  let product = products.find(x => x.id === formObj.selectedProduct);
  if(product.stock - 1 < 0) {
    alert('Bu üründe yeterli stok yok!');
    return;
  }
  product.stock--;
  
  sales.push(
    {
      name: product.name,
      price: product.price
    }
  );

  calculateSalesTotal();

  salesForm.reset();
  renderProducts();
}

function handlePaymentTypeClick() {
  switch (this.value) {
    case '1':
        paidTotalInput.disabled = true;
        paidTotalInput.required = false;
        paidTotalInput.value = '';
      break;
    case '2':
        paidTotalInput.disabled = false;
        paidTotalInput.required = true;
        paidTotalInput.focus();
      break;
  }
}

function bindSalesFormEvents() {
  salesForm.addEventListener('submit', handleSalesForm);
  let paymentTypeSelectors = document.querySelectorAll('input[name="paymentType"]');
  paymentTypeSelectors.forEach(x => x.addEventListener('click', handlePaymentTypeClick));
}

function handleNewProduct(e) {
  e.preventDefault();
  let formData = new FormData(newProductForm);
  let formObj = Object.fromEntries(formData);
  formObj.id = crypto.randomUUID();
  formObj.price = Number(formObj.price);
  formObj.stock = Number(formObj.stock);
  products.push(formObj);
  newProductForm.reset();
  renderProducts();
}

function bindEditorEvents() {
  newProductForm.addEventListener('submit', handleNewProduct);
}

function init() {
  renderProducts();
  bindSalesFormEvents();
  bindEditorEvents();
}

init();
