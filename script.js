// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");
const linkBooks = "https://striveschool-api.herokuapp.com/books";
const searchInput = document.getElementById("search-input");
const reloadButton = document.getElementById("reload-button");

// Pulisco gli elemnti che mi interessano nel DOM
searchResultDiv.innerHTML = "";
sidecartDiv.innerHTML = "";

// VARIABILI E ARRAYS
let totalBooks = [];
let visibleBooks = [];
let deleteBooks = [];
let cartBooks = [];

//  FUNZIONI: DICHIARAZIONE

function filterBooks() {
  const searchText = searchInput.value.toLowerCase(); // Testo inserito nell'input in minuscolo
  visibleBooks = totalBooks.filter((book) =>
    book.title.toLowerCase().includes(searchText)
  );
  searchResultDiv.innerHTML = ""; // Svuota la visualizzazione attuale dei libri
  loadBooks(visibleBooks); // Carica i libri filtrati
}

function toggleCart() {
  document.querySelector(".sidecart").classList.toggle("open-cart");
}

function sumPrices(products) {
  const totalPrice = products.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.price;
  }, 0);

  return totalPrice;
}

// Funzione Pulsante "acquista"
function acquista(button) {
  const card = button.closest(".card"); // Trova la card genitore
  const asinCode = card.querySelector(".book-asin").textContent;
  const libroTrovato = cartBooks.find((libro) => libro.asin === asinCode);

  if (libroTrovato) {
    alert(`Il libro è già presente nel carrello.`);
  } else {
    const nuovoLibroCart = visibleBooks.find(
      (libro) => libro.asin === asinCode
    );

    cartBooks.push(nuovoLibroCart);

    console.log("aggiungi", cartBooks);
    card.classList.toggle("buy-card");
    sidecartDiv.innerHTML +=
      /*html*/
      `
        <li class="card-cart nav-link d-flex flex-wrap flex-row my-3">
          <div class="col-4 p-0">
            <img class="img-fluid" src=${nuovoLibroCart.img} alt="">
          </div>
          <div class="col-8 text-light justify-content-around align-items-start d-flex flex-column">
            <div class="product-title m-0 p-0">Title:
              <span class="products-title-val">${nuovoLibroCart.title}</span>
            </div>
            <div class="product-quantity m-0 p-0">Quantity:
              <span class="products-quantity-val">1</span>
            </div>
            <div class="product-price m-0 p-0">Price:
              <span class="products-price-val">${nuovoLibroCart.price}</span>
            </div>
          </div>
          <p class="book-asin d-none">${nuovoLibroCart.asin}</p>
          <button class="btn btn-danger mt-2 del-button" onclick="rimuovi(this)" data-action="remove">Rimuovi</button>
        </li>
    `;
  }

  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartBooks.length;
  valoreCarrello.innerText = sumPrices(cartBooks);
}

function salta(button) {
  const card = button.closest(".card-container"); // Trova la card genitore
  card.remove()

}

function rimuovi(button) {
  const liElement = button.closest("li"); // Trova l'elemento <li> genitore
  const asinCode = liElement.querySelector(".book-asin").textContent;
  cartBooks = cartBooks.filter((item) => item.asin !== asinCode);
  liElement.remove();

  console.log("rimuovi", cartBooks);

  const allCard = document.querySelectorAll(".card");

  for (const card of allCard) {
    const cardAsin = card.querySelector(".book-asin").textContent; // Ottieni il testo del .book-asin
    if (cardAsin === asinCode) {
      card.classList.remove("buy-card");
    }
  }
  console.log("Il totale del carrello è: ", sumPrices(cartBooks));
  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartBooks.length;
  valoreCarrello.innerText = sumPrices(cartBooks);
}

function rimuoviTutto() {
  sidecartDiv.innerHTML = "";
  console.log("Prima elimina tutti: ", cartBooks);
  cartBooks = [];
  console.log("Dopo elimina tutti: ", cartBooks);
  const allCard = document.querySelectorAll(".card");
  for (const card of allCard) {
    card.classList.remove("buy-card");
  }
  console.log("Il totale del carrello è: ", sumPrices(cartBooks));
  const numeroProdotti = document.getElementById("products-value");
  const valoreCarrello = document.getElementById("products-total");
  numeroProdotti.innerText = cartBooks.length;
  valoreCarrello.innerText = sumPrices(cartBooks);
}

// Funzioni per caricare i libri e assegnare l'array totale dei libri
function loadBooks(bookList) {
  searchResultDiv.innerHTML = "";

  bookList.forEach((element) => {
    const { title, img, price, category, asin } = element;
    searchResultDiv.innerHTML +=
      /*html*/
      `
    <div class = "card-container">
      <div class="card mb-5">
          <img src=${img} class="card-img-top"
            alt="Immagine del Libro">
          <div class="card-body">
            <div class="m-0">
              <h5 class="card-title book-title">${title}</h5>
              <p class="card-text book-author">${category}</p>
              <p class="card-text book-price">${price}</p>
              <p class="book-asin d-none">${asin}</p>
            </div>

            <div class="m-0">
              <button class="btn btn-primary mt-2 buy-button" onclick="acquista(this)" data-action="buy">Acquista</button>
              <button class="btn btn-danger mt-2 jump-button" onclick="salta(this)" data-action="remove">salta</button>
            </div>
          </div>
        </div>
    </div>
   `;
  });
}

function getBooks(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      totalBooks = data;
      visibleBooks = data;
      loadBooks(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// FUNZIONI: ESECUZIONE

toggleCart();
getBooks(linkBooks);
searchInput.addEventListener("input", filterBooks);
reloadButton.addEventListener("click", function () {
  getBooks(linkBooks);
});