const linkBooks = "https://striveschool-api.herokuapp.com/books"


function loadBooks (bookList) {
 const bookprice = this[0].price

  console.log(bookprice)
}

function loadImages(link) {
  fetch(link)
    .then((response) => response.json())
    .then(loadBooks)
    .catch((error) => {
      console.log(error.message);
    });
}


function toggleCart(){
  document.querySelector('.sidecart').classList.toggle('open-cart');
}

toggleCart();

loadImages(linkBooks) 