// data.js
'use strict';

(function () {
  var TIMES = ['12:00', '13:00', '14:00'];
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var FLAT_TYPES = ['flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.data = {
    adverts: createAdverts()
  };

  function createAdverts() {
    var adverts = [];
    for (var i = 0; i < 8; i++) {
      adverts[i] = createAdvert(i);
    }

    return adverts;
  }

  function createAdvert(i) {
    var advert = {};
    var location = createLocationObj();

    advert.author = createAuthorObj(i);
    advert.offer = createOfferObj(i, location);
    advert.location = location;
    advert.id = i;

    return advert;
  }

  function generateRandomDouble(min, max) {
    return Math.random() * (max - min) + min;
  }

  function generateRandomInt(min, max) {
    return Math.round(generateRandomDouble(min, max));
  }

  function getRandomArrElement(array) {
    return array[Math.floor(generateRandomDouble(0, array.length))];
  }

  function getRandomArrElemets(array) {
    return array.slice(generateRandomInt(0, array.length - 1));
  }

  function createLocationObj() {
    var location = {};

    location.x = generateRandomDouble(300, 900);
    location.y = generateRandomDouble(100, 500);

    return location;
  }

  function createAuthorObj(i) {
    var author = {};

    author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    return author;
  }

  function createOfferObj(i, location) {
    var offer = {};

    offer.title = TITLES[i];
    offer.address = location.x + ', ' + location.y;
    offer.price = generateRandomInt(1000, 1000000);
    offer.type = getRandomArrElement(FLAT_TYPES);
    offer.rooms = generateRandomInt(1, 5);
    offer.guests = generateRandomInt(1, 3);
    offer.checkin = getRandomArrElement(TIMES);
    offer.checkout = getRandomArrElement(TIMES);
    offer.features = getRandomArrElemets(FEATURES);
    offer.description = '';
    offer.photos = [];

    return offer;
  }
})();
