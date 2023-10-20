// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах.
// Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

const setDataInLocalStorage = (product, review) => {
    try {
        let currentValue = localStorage.getItem(product);
        if (!currentValue) {
            currentValue = [];
        } else {
            currentValue = JSON.parse(currentValue);
        }
        currentValue.push(review);
        localStorage.setItem(product, JSON.stringify(currentValue));
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
};

const getDataFromLocalStorage = (product) => {
    try {
        return JSON.parse(localStorage.getItem(product));
    } catch (e) {
        return false;
    }
};

const delDataFromLocalStorage = (product) => {
    try {
        localStorage.removeItem(product);
        return true;
    } catch (e) {
        return false;
    }
};

const submitReview = document.querySelector('.submit-button');

submitReview.addEventListener('click', () => {
    const product = document.getElementById('productName').value;
    const review = document.getElementById('reviewText').value;
    setDataInLocalStorage(product, review);
});

function displayProducts(product) {
    const reviewList = document.querySelector('.products_list');
    const reviewItem = document.createElement('li');
    reviewItem.id = `reviewItem-${product}`;
    reviewItem.textContent = product;
    reviewList.appendChild(reviewItem);
}

for (let index = 0; index < localStorage.length; index++) {
    displayProducts(localStorage.key(index));
}

// function displayReviews(product) {
//     const reviews =
// }
