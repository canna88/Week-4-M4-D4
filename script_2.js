const params = new URLSearchParams(window.location.search);
const id = params.get("id")

const linkBooks = `https://striveschool-api.herokuapp.com/books/${id}`; 

const searchResultDiv = document.querySelector(".search-results");


function loadBookDetails(data) {
  const { title, img, price, category, asin } = data;
  const formattedPrice = `€ ${price.toFixed(2)}`;

  searchResultDiv.innerHTML = 
    /*html*/
    `
    <div class="card-container col-md-6">
    <div class="card">
        <img src="${img}" alt="Book Cover" class="center-image book-image">
        <div class="card-body">
            <h2 class="book-title">${title}</h2>
            <p class="book-category">${category}</p>
            <p class="book-description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p class="book-price">${formattedPrice}</p>
        </div>
    </div>
  </div>
  `
}

function getBooksDetals(link) {
  searchResultDiv.innerHTML = 
  /*html*/
  ` 
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  `

  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      loadBookDetails(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

getBooksDetals(linkBooks)