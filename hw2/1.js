"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books.
2. Реализуйте геттер allBooks, который возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

const library = ['Война и мир', 'Преступление и наказание', 'Мертвые души'];

class Library {
    #books;

    /**
     * 
     * @param {array} books 
     */
    constructor(books) {
        this.#checkNoDuplicate(books);
        this.#books = [...books];
    }

    get allBooks() {
        return this.#books;
    }


    #checkNoDuplicate(books) {
        const uniqueBooks = [...new Set(books)];
        if (books.length !== uniqueBooks.length) {
            throw new Error('Массив содержит повторяющиеся значения');
        }
    }

    addBook(title) {
        if (this.hasBook(title)) {
            throw new Error('Массив уже содержит книгу с таким названием');
        }

        this.#books.push(title);
    }

    removeBook(title) {
        if (!this.hasBook(title)) {
            throw new Error(`Книги '${title}' нет в списке`);
        }
        this.#books.splice(this.#books.indexOf(title), 1);
    }

    hasBook(title) {
        return this.#books.includes(title);
    }
}

const books = new Library(library);

try {
    console.log(books.allBooks);

    books.addBook('Детские сказки');
    console.log(books.allBooks);

    console.log(books.hasBook('Мертвые души'));
    console.log(books.hasBook('Буратино'));

    books.removeBook('Война и мир');
    console.log(books.allBooks);

    books.removeBook('Бабушкины рецепты');
} catch (error) {
    console.log(error);
}