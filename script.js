const linkBooks = "https://striveschool-api.herokuapp.com/books";

const searchResultDiv = document.querySelector(".search-results");
const sidecartDiv = document.querySelector(".nav");

searchResultDiv.innerHTML = "";
sidecartDiv.innerHTML = "";



function acquista(button) {
  const card = button.closest(".card"); // Trova la card genitore
  const title = card.querySelector(".book-title").textContent;
  const price = card.querySelector(".book-price").textContent;

  console.log(`Hai acquistato: ${title} al prezzo di ${price}`);

  sidecartDiv.innerHTML +=
  /*html*/
  `
<div>
Alessio
</div>
`;
}




function loadBooks(bookList) {
  const bookprice = bookList;

  bookprice.forEach((element) => {
    const { title, img, price, category } = element;
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
          </div>
          <div class="m-0">
          <button class="btn btn-primary mt-2 buy-button" onclick="acquista(this)" data-action="buy">Acquista</button>
          <button class="btn btn-danger mt-2 del-button" onclick="rimuovi(this)" data-action="remove">Rimuovi</button>
          </div>
        </div>
      </div>
    </div>
   `;
  });
}

function loadImages(link) {
  fetch(link)
    .then((response) => response.json())
    .then(loadBooks)
    .catch((error) => {
      console.log(error.message);
    });
}

function toggleCart() {
  document.querySelector(".sidecart").classList.toggle("open-cart");
}

toggleCart();

loadImages(linkBooks);
