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
        reviewsfromLS.splice(indexToRemove, 1);
        if (reviewsfromLS.length === 0) {
            delDataFromLocalStorage(product);
        } else {

        }
        return true;
    } catch (e) {
        return false;
    }
}

const submitReview = document.querySelector('.submit-button');
const reviewList = document.querySelector('.products_list');

submitReview.addEventListener('click', () => {
    const product = document.getElementById('productName').value;
    const review = document.getElementById('reviewText').value;
    setDataInLocalStorage(product, review);
});

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
        const reviews = JSON.parse(localStorage.getItem(product.replace(/\s+/g, "-")));

        reviews.forEach(review => {
            const reviewItem = document.createElement('li');
            reviewItem.className = `reviewItem.replace(/\s+/g, "-")`;
            reviewItem.textContent = review;
            elem.append(reviewItem);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            elem.append(removeBtn);
            removeBtn.addEventListener('click', () => {
                delOneReviewFromLocalStorage(product, review);
            })
        })
    })
}

displayProducts();
displayReviews();