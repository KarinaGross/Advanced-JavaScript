"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const alboms = [
  { title: "Albom1", artist: "John", year: "2000" },
  { title: "Albom1", artist: "Bob", year: "2010" },
  { title: "Albom1", artist: "Michael", year: "2003" }
]

class MusicalCollection {
  constructor(alboms) {
    this.alboms = alboms;
  }

  *[Symbol.iterator]() {
    for (const albom of alboms) {
      yield albom;
    }
  }
}

const musicalCollection = new MusicalCollection(alboms);

const iterator = musicalCollection[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
