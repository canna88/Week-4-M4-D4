// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");
const linkBooks = "https://striveschool-api.herokuapp.com/books";
const searchInput = document.getElementById("search-input");
const reloadButton = document.getElementById("reload-button");
const cartHeader = document.querySelector(".cart-header");
const cartTitle = document.querySelector(".cart-title");

// Pulisco gli elemnti che mi interessano nel DOM
searchResultDiv.innerHTML = "";
sidecartDiv.innerHTML = "";

// VARIABILI E ARRAYS
let totalBooks = [];
let visibleBooks = [];
let deleteBooks = [];
let cartBooks = [];

//  FUNZIONI: DICHIARAZIONE

// Funzione per filtrare e visualizzare i libri in base alla ricerca dell'utente
function filterBooks() {
  const searchText = searchInput.value.toLowerCase(); // Testo inserito nell'input in minuscolo
  visibleBooks = totalBooks.filter((book) =>
    book.title.toLowerCase().includes(searchText)
  );
  searchResultDiv.innerHTML = ""; // Svuota la visualizzazione attuale dei libri
  loadBooks(visibleBooks); // Carica i libri filtrat
}

// Funzione per aprire/chiudere il carrello
function toggleCart() {
  document.querySelector(".sidecart").classList.toggle("open-cart");
  document
    .querySelector(".toggle-cart-button")
    .classList.toggle("toggle-cart-button-open");
  // Aggiungi e rimuovi la classe di rotazione al pulsante del carrello
  const cartButton = document.querySelector(".toggle-cart-button");
  cartButton.classList.add("rotate-center");
  setTimeout(() => {
    cartButton.classList.remove("rotate-center");
  }, 1000);
}

// Funzione per calcolare il prezzo totale dei prodotti nel carrello
function sumPrices(products) {
  const totalPrice = products.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.price;
  }, 0);
  const formattedTotalPrice = totalPrice.toFixed(2);
  const totalPriceWithEuroSymbol = `€ ${formattedTotalPrice}`;

  return totalPriceWithEuroSymbol; // Arrotonda a due decimali e restituisce una stringa
}

// Funzione chiamata quando l'utente clicca sul pulsante "Acquista" su un libro
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

    if (cartBooks.length === 0) {
      cartTitle.innerText = "Cart";
      cartHeader.innerHTML =
        /*html*/
        `
        <button class="btn btn-warning my-3 del-all-button" onclick="rimuoviTutto()" data-action="remove">Rimuovi
          tutto</button>

        <div class="cart-results my-3">
        <div class="text-light h6 text-left mx-3">Final value:
        <span id="products-total"></span>
      </div>
          <div class="text-light h6 text-left mx-3">Number of products:
            <span id="products-value"></span>
            
          </div>

        </div>
      `;
    }

    cartBooks.push(nuovoLibroCart);

    // Aggiungi e rimuovi la classe di rotazione al pulsante del carrello
    const cartButton = document.querySelector(".toggle-cart-button");
    cartButton.classList.add("rotate-center");
    setTimeout(() => {
      cartButton.classList.remove("rotate-center");
    }, 600);

    console.log("aggiungi", cartBooks);
    card.classList.toggle("buy-card");
    sidecartDiv.innerHTML +=
      /*html*/
      `
      <li class="card-cart nav-link d-flex flex-wrap flex-row my-3">
      <div class="col-4 p-0">
        <img class="cart-img img-fluid" src=${nuovoLibroCart.img}
          alt="">
      </div>
      <div class="col-8 text-light d-flex align-items-start flex-column m-0">

        <div class="product-title m-0 p-0">Title:</div>
        <span class="products-title-val mb-3">${nuovoLibroCart.title}</span>

        <div class="product-quantity m-0 p-0">Quantity:</div>
        <span class="products-quantity-val mb-3">1</span>

        <div class="product-price m-0 p-0">Price:</div>
        <span class="products-price-val mb-3">€ ${nuovoLibroCart.price}</span>
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

// Funzione chiamata quando l'utente clicca sul pulsante "Salta" su un libro
function salta(button) {
  const card = button.closest(".card-container"); // Trova la card genitore
  card.remove();
}

// Funzione chiamata quando l'utente rimuove un libro dal carrello
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

  if (cartBooks.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }
}

// Funzione chiamata quando l'utente rimuove tutti i libri dal carrello
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

  console.log(cartBooks.length);

  if (cartBooks.length === 0) {
    cartHeader.innerHTML = "";
    cartTitle.innerText = "Your cart is empty";
  }
}

// Funzione per ripristinare lo stato "acquistato" dei libri nel carrello
function ripristinaComprati() {
  const allCard = document.querySelectorAll(".card");

  for (const productInCart of cartBooks) {
    const asinCode = productInCart.asin;
    for (const card of allCard) {
      const cardAsin = card.querySelector(".book-asin").textContent; // Ottieni il testo del .book-asin
      if (cardAsin === asinCode) {
        card.classList.add("buy-card");
      }
    }
  }
}

// Funzione per caricare i libri iniziali dalla API e visualizzarli
function loadBooks(bookList) {
  searchResultDiv.innerHTML = "";

  bookList.forEach((element) => {
    const { title, img, price, category, asin } = element;
    const formattedPrice = `€ ${price.toFixed(2)}`;

    searchResultDiv.innerHTML +=
      /*html*/
      `
    <div class = "card-container">
      <div class="card mb-5">
          <img src=${img} class="card-img-top"
            alt="Immagine del Libro">
          <div class="card-body">
          <h5 class="card-title book-title">${title}</h5>
          <p class="card-text book-author">${category}</p>
            <div class="m-0 card-info">

              <p class="card-text book-price">${formattedPrice}</p>
              <p class="book-asin d-none">${asin}</p>

              <button class="btn btn-primary mt-2 buy-button" onclick="acquista(this)" data-action="buy">Acquista</button>
              <button class="btn btn-danger mt-2 jump-button" onclick="salta(this)" data-action="remove">salta</button>
            </div>
          </div>
        </div>
    </div>
   `;
  });
  // Dopo aver caricato il contenuto

  ripristinaComprati();
}

// Funzione per ottenere i libri dalla API iniziale
function getBooks(link) {
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      totalBooks = data;
      visibleBooks = data;
      loadBooks(data);
    })
    .then(() => {
      const sectionList = document.querySelectorAll("section");
      let time = 0; // Inizializza il tempo a 0
    
      sectionList.forEach((element) => {
        // Rimuovi la classe .document-load con un ritardo crescente
        setTimeout(() => {
          element.classList.remove("document-load");
        }, time);
    
        time += 500; // Incrementa il tempo per il prossimo elemento
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// FUNZIONI: ESECUZIONE

getBooks(linkBooks); // Chiamiamo la funzione getBooks() per ottenere e visualizzare i libri iniziali dalla API
searchInput.addEventListener("input", filterBooks); // Aggiungiamo un ascoltatore di eventi all'input di ricerca per filtrare i libri in tempo reale
reloadButton.addEventListener("click", function () { // Aggiungiamo un ascoltatore di eventi al pulsante "Reload" per ricaricare i libri dalla API
  getBooks(linkBooks);   // Chiamiamo nuovamente la funzione getBooks() per ricaricare i libri
  searchInput.value = ""; // Ripristiniamo il valore dell'input di ricerca a una stringa vuota
});
