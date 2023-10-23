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

const getAllDataFromLocalStorage = () => {
    try {
        let productList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const localStorageData = localStorage.key(i);
            productList.push(localStorageData);
        }
        return productList;
    } catch (e) {
        return false;
    }
}

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

const delOneReviewFromLocalStorage = (product, review) => {
    try {
        let reviewsfromLS = getDataFromLocalStorage(product);
        const indexToRemove = reviewsfromLS.indexOf(review);
        if (indexToRemove !== -1) {
            reviewsfromLS.splice(indexToRemove, 1);
        }

        if (reviewsfromLS.length === 0) {
            delDataFromLocalStorage(product);
        } else {
            localStorage.setItem(product, JSON.stringify(reviewsfromLS));
        }
        return true;
    } catch (e) {
        return false;
    }
}

function delReview(product, review, container) {
    delOneReviewFromLocalStorage(product, review);

    const productReviews = getDataFromLocalStorage(product);

    if (!productReviews || productReviews.length === 0) {
        const productBox = container.closest('.productBox');
        if (productBox) productBox.remove();
    } else {
        container.remove();
    }
}

const submitReview = document.querySelector('.submit-button');
const reviewList = document.querySelector('.products_list');

submitReview.addEventListener('click', () => {
    const product = document.getElementById('productName').value;
    const review = document.getElementById('reviewText').value;

    if (product && review) {
        setDataInLocalStorage(product, review);
        const existInProductContent = reviewList.querySelector(`#productContent-${product.replace(/\s+/g, "-")}`);
        if (existInProductContent) {
            const reviewContainer = createReviewContainer(product, review);
            existInProductContent.appendChild(reviewContainer);
        } else {
            displayProducts();
            displayReviews();
        }
    }
});

function createReviewContainer(product, review) {
    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'reviewContainer';

    const reviewItem = document.createElement('li');
    reviewItem.className = `reviewItem`;
    reviewItem.textContent = review;
    reviewContainer.appendChild(reviewItem);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Удалить';
    reviewContainer.appendChild(removeBtn);

    removeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        delReview(product, review, reviewContainer);
    });

    return reviewContainer;
}


function displayProducts() {
    reviewList.innerHTML = '';
    const localStorageData = getAllDataFromLocalStorage();
    localStorageData.forEach((item) => {
        const productBox = document.createElement('div');
        productBox.classList = 'productBox';
        reviewList.append(productBox);

        const productTitle = document.createElement('div');
        productTitle.classList = 'productTitle';
        productTitle.textContent = item;
        productBox.appendChild(productTitle);

        const productContent = document.createElement('ul');
        productContent.id = `productContent-${item.replace(/\s+/g, "-")}`;
        productContent.classList = 'productContent';
        productBox.appendChild(productContent);

        productTitle.addEventListener('click', () => {
            productBox.querySelector(`#productContent-${item.replace(/\s+/g, "-")}`).classList.toggle('active');
        })
    })
}

function displayReviews() {
    const productList = getAllDataFromLocalStorage();

    productList.forEach(product => {
        const elem = reviewList.querySelector(`#productContent-${product.replace(/\s+/g, "-")}`);
        const reviews = getDataFromLocalStorage(product);

        elem.innerHTML = '';

        reviews.forEach(review => {
            const reviewContainer = createReviewContainer(product, review);
            elem.append(reviewContainer);
        })
    })
}

displayProducts();
displayReviews();