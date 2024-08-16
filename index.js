const books = [
  {
    id: 1,
      title: "Broken Glass",
      author: "Alain Mabanckou (2005)",
      category: "History",
      price: 10.99,
      description: "The Congolese writer says he was “trying to break the French language” with Broken Glass",
      trending: true,
      deal: true,
      image: "https://i.guim.co.uk/img/media/666fee23255740629f8e8d54de97d9a9a0069456/10_149_2970_1782/master/2970.jpg?width=620&dpr=1&s=none"
},
{
  id: 2,
  title: "Chronicles: Volume One",
  author: "by Bob Dylan (2004)",
  category: "Fiction",
  price: 12.99,
  description: "The result is both sharp and dreamy, sliding in and out of different phases of Dylan’s career but rooted in his earliest days as a Woody Guthrie wannabe in New York City.",
  trending: false,
  deal: true,
  image: "https://i.guim.co.uk/img/media/eec342b926fd7028814f86dc3080e63b3c9a75fb/0_0_1500_900/master/1500.jpg?width=880&dpr=1&s=none"
},
{
  id: 3,
  title: "The Siege",
  author: "by Helen Dunmore (2001)",
  category: "Mystery",
  "price": 8.99,
  "description": "The Levin family battle against starvation in this novel set during the German siege of Leningrad.",
  "trending": true,
  "deal": false,
  "image": "https://i.guim.co.uk/img/media/19e81774d363b8047502e64d172ee357973c83bc/0_0_326_499/master/326.jpg?width=140&dpr=1&s=none"
},
{
  "id": 4,
  "title": "Light",
  "author": "by M John Harrison (2002)",
  "category": "Non-Fiction",
  "price": 10.99,
  "description": "One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best.",
  "trending": false,
  "deal": true,
  "image": "https://i.guim.co.uk/img/media/94560f671d3027e1ee4449f6cb4c4cf33d63a723/0_0_323_499/master/323.jpg?width=140&dpr=1&s=none"
},
{
  "id": 5,
  "title": "Priestdaddy",
  "author": "by Patricia Lockwood (2017)",
  "category": "Non-Fiction",
  "price": 10.99,
  "description": "The author started out as the “poet laureate of Twitter”; her language is brilliant, and she has a completely original mind.",
  "trending": false,
  "deal": true,
  "image": "https://i.guim.co.uk/img/media/1608c49d9a69b33ad21e15b6fa451c59fef35a28/0_218_3500_2100/master/3500.jpg?width=620&dpr=1&s=none"
},
{
  "id": 6,
  "title": "The Cost of Living",
  "author": "by Deborah Levy (2018)",
  "category": "Fiction",
  "price": 10.99,
  "description": "“Chaos is supposed to be what we most fear but I have come to believe it might be what we most want ..",
  "trending": false,
  "deal": true,
  "image": "https://i.guim.co.uk/img/media/39b129e925635c73b10f6a2e4c82a52f0522016a/0_187_2700_1620/master/2700.jpg?width=380&dpr=1&s=none"
},
{
  "id": 7,
  "title": "Harvest",
  "author": "by Jim Crace (2013)",
  "category": "History",
  "price": 10.99,
  "description": "Crace is fascinated by the moment when one era gives way to another. Here, it is the enclosure of the commons, a fulcrum of English history, that drives his story of dispossession and displacement.",
  "trending": false,
  "deal": true,
  "image": "https://i.guim.co.uk/img/media/12e935191cd506657f5d7472541dc46de90c42fd/0_168_3508_2104/master/3508.jpg?width=880&dpr=1&s=none"
},
{
  "id": 8,
  "title": "The Fifth Season",
  "author": "by NK Jemisin (2015)",
  "category": "Mystery",
  "price": 10.99,
  "description": "Jemisin became the first African American author to win the best novel category at the Hugo awards for her first book in the Broken Earth trilogy.",
  "trending": false,
  "deal": true,
  "image": "https://i.guim.co.uk/img/media/2937bc10c4b9cf226e0a7ecba828a8dcb3f95ae2/0_16_1024_614/master/1024.jpg?width=380&dpr=1&s=none"
}

  // Add more books here

];

// Initialize bookstore

function initializeBookstore() {

  displayBooks(books);

  displayTrendingBooks(books);

  displayDailyDeals(books);

  updateWishlistDisplay();

  updateCartDisplay();

}

// Display books by category

function filterBooks(category) {

  const filteredBooks = books.filter(book => book.category === category);

  displayBooks(filteredBooks);

}

// Display all books

function displayBooks(bookList) {

  const bookListElement = document.getElementById('book-list');

  bookListElement.innerHTML = '';

  bookList.forEach(book => {

    const bookElement = createBookElement(book);

    bookListElement.appendChild(bookElement);

  });

}

// Create a book element

function createBookElement(book) {

  const bookDiv = document.createElement('div');

  bookDiv.className = 'book';

  const wishlistButton = isBookInWishlist(book.id)

    ? `<button class="wishlist-button" onclick="removeFromWishlist(${book.id}, this)">Remove from Wishlist</button>`

    : `<button class="wishlist-button" onclick="addToWishlist(${book.id}, this)">Add to Wishlist</button>`;

  bookDiv.innerHTML = `

    <img src="${book.image}" alt="${book.title}">

    <h3>${book.title}</h3>

    <p>by ${book.author}</p>

    <p>${book.description}</p>

    <p>Price: $${book.price}</p>

    ${wishlistButton}

    <button onclick="addToCart(${book.id})">Add to Cart</button>

  `;

  return bookDiv;

}

// Check if book is in the wishlist

function isBookInWishlist(bookId) {

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  return wishlist.includes(bookId);

}

// Add to wishlist

function addToWishlist(bookId, buttonElement) {

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (!wishlist.includes(bookId)) {

    wishlist.push(bookId);

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    buttonElement.textContent = 'Remove from Wishlist';

    buttonElement.onclick = () => removeFromWishlist(bookId, buttonElement);

    updateWishlistDisplay();

  }

}

// Remove from wishlist

function removeFromWishlist(bookId, buttonElement) {

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  wishlist = wishlist.filter(id => id !== bookId);

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  buttonElement.parentNode.removeChild(buttonElement); // Remove button

  updateWishlistDisplay();

}

// Update wishlist display

function updateWishlistDisplay() {

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const wishlistSection = document.getElementById('wishlist-items');

  wishlistSection.innerHTML = '';

  wishlist.forEach(bookId => {

    const book = books.find(book => book.id === bookId);

    const bookElement = createBookElement(book);

    bookElement.querySelector('.wishlist-button').remove(); // Remove button from wishlist display

    wishlistSection.appendChild(bookElement);

  });

}

// Add to cart

function addToCart(bookId) {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cart.find(item => item.id === bookId)) {

    cart.push({ id: bookId, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay();

  }

}

// Remove from cart

function removeFromCart(bookId) {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart = cart.filter(item => item.id !== bookId);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartDisplay();

}
// Update cart display

function updateCartDisplay() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartSection = document.getElementById('cart-items');

  cartSection.innerHTML = '';

  cart.forEach(item => {

    const book = books.find(book => book.id === item.id);

    if (book) {

      const bookElement = createBookElement(book);

      bookElement.querySelector('button').textContent = 'Remove from Cart';

      bookElement.querySelector('button').onclick = () => removeFromCart(item.id);

      cartSection.appendChild(bookElement);

    }

  });

}

// Order books

function orderBooks() {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {

    alert('Your cart is empty.');

    return;

  }

  let orderSummary = 'Order has been placed successfully:\n\n Order Summary:\n\n';

  let totalPrice = 0;

  cart.forEach(item => {

    const book = books.find(book => book.id === item.id);

    if (book) {

      const bookTotal = book.price * item.quantity;

      totalPrice += bookTotal;

      orderSummary += `${book.title} = $${bookTotal}\n`;

    }

  });

  orderSummary += `\nTotal Price: $${totalPrice}`;
  

  alert(orderSummary);

  localStorage.removeItem('cart'); // Clear cart after order

  updateCartDisplay();

}

// Display trending books in a carousel

function displayTrendingBooks(bookList) {

  const trendingList = document.getElementById('trending-list');

  trendingList.innerHTML = '';

  bookList.forEach((book, index) => {

    if (index < 5) { // Show only first 5 for trending

      const bookElement = createBookElement(book);

      trendingList.appendChild(bookElement);

    }

  });

  setupCarousel();

}

// Set up carousel functionality

function setupCarousel() {

  const prevBtn = document.getElementById('prevBtn');

  const nextBtn = document.getElementById('nextBtn');

  const carouselInner = document.querySelector('.carousel-inner');

  let index = 0;

  const books = Array.from(carouselInner.children);

  const totalBooks = books.length;

  function showBook(index) {

    carouselInner.style.transform = `translateX(-${index * 100}%)`;

  }

  prevBtn.addEventListener('click', () => {

    index = (index > 0) ? index - 1 : totalBooks - 1;

    showBook(index);

  });

  nextBtn.addEventListener('click', () => {

    index = (index < totalBooks - 1) ? index + 1 : 0;

    showBook(index);

  });

}

// Search books by title

function searchBooks() {

  const query = document.getElementById('search').value.toLowerCase();

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));

  displayBooks(filteredBooks);

}

// Display daily deals (for demo purposes, using random books)

function displayDailyDeals(bookList) {

  const dailyDealsList = document.getElementById('daily-deals-list');

  dailyDealsList.innerHTML = '';

  bookList.forEach(book => {

    if (Math.random() > 0.5) { // Randomly select some books as daily deals

      const bookElement = createBookElement(book);

      dailyDealsList.appendChild(bookElement);

    }

  });

}

// Initialize the bookstore

initializeBookstore();
