"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. На странице должны отображаться все товары и отзывы 
под каждым товаром. Под каждым блоком отзывов, должна быть возможность добавить 
отзыв для конкретного продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];


function displayReviews(reviews, container) {
  const reviewsList = container.querySelector("ul");
  if (!reviewsList) {
    const reviewsList = document.createElement("ul");
    reviews.forEach(review => {
      const reviewItem = document.createElement("li");
      reviewItem.textContent = review.text;
      reviewsList.appendChild(reviewItem);
    });
    container.appendChild(reviewsList);
  } else {
    const reviewItem = document.createElement("li");
    reviewItem.textContent = reviews[reviews.length - 1].text;
    reviewsList.appendChild(reviewItem);
  }
}

function createProductElement(product) {
  const productItem = document.createElement("div");
  productItem.classList.add('product-item', `product-item-${product.product.replace(/\s+/g, "-")}`);
  productItem.innerHTML = `
      <h2>${product.product}</h2>
      <div class="reviews reviews-${product.product}"></div>
      <textarea rows="4" cols="50" id="review-text-${product.product}"></textarea>
      <button onclick="addReview('${product.product}')">Отправить</button>
      <p class="error-message" id="error-message-${product.product}"></p>
  `;
  return productItem;
}

function addReview(productName) {
  const reviewText = document.getElementById(`review-text-${productName}`).value;
  const errorMessage = document.getElementById(`error-message-${productName}`);

  if (reviewText.length < 50 || reviewText.length > 500) {
    errorMessage.textContent = "Отзыв должен содержать от 50 до 500 символов.";
    return;
  }

  errorMessage.textContent = "";

  const product = initialData.find(item => item.product === productName);
  product.reviews.push({ id: Date.now(), text: reviewText });

  const productElement = document.querySelector(`.product-item-${productName.replace(/\s+/g, "-")}`);
  const reviewsContainer = productElement.querySelector(`.reviews`);
  displayReviews(product.reviews, reviewsContainer);
  document.getElementById(`review-text-${productName}`).value = "";
}

function displayProducts(data) {
  const productsList = document.getElementById("products-list");
  data.forEach(item => {
    const productElement = createProductElement(item);
    productsList.appendChild(productElement);
    displayReviews(item.reviews, productElement.querySelector(".reviews"));
  });
}

displayProducts(initialData);