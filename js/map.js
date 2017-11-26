// map.js
'use strict';

(function () {
  function createLocationObj() {
    var location = {};

    location.x = Math.random() * (900 - 300) + 30;
    location.y = Math.random() * (900 - 300) + 30;

    return location;
  }

  function createAuthorObj(i) {
    var author = {};

    author.avatar = 'img/avatars/user' + '0' + (i + 1) + '.png';

    return author;
  }

  function createOfferObj(i, location) {
    var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var FLAT_TYPES = ['Картира', 'Бунгало', 'Дом'];
    var TIMES = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var offer = {};

    offer.title = TITLES[i];
    offer.address = location.x + ' ' + location.y;
    offer.price = Math.round(Math.random() * (1000000 - 1000) + 1000);
    offer.type = FLAT_TYPES[Math.floor(Math.random() * FLAT_TYPES.length)];
    offer.rooms = Math.round(Math.random() * (5 - 1) + 1);
    offer.guests = Math.round(Math.random() * (3 - 1) + 1);
    offer.checkin = TIMES[Math.floor(Math.random() * TIMES.length)];
    offer.checkout = TIMES[Math.floor(Math.random() * TIMES.length)];
    offer.features = FEATURES[Math.floor(Math.random() * FEATURES.length)];
    offer.description = '';
    offer.photos = [];

    return offer;
  }

  function createAdvert(i) {
    var advert = {};
    var location = createLocationObj();

    advert.author = createAuthorObj(i);
    advert.offer = createOfferObj(i, location);
    advert.location = location;
    return advert;
  }

  var createAdverts = function () {
    var adverts = [];

    for (var i = 0; i < 8; i++) {
      var advert = createAdvert(i);
      adverts[adverts.length] = advert;
    }

    return adverts;
  };

  var renderDefaultAdvert = function (advert) {
    var advertElement = advertTemplate.cloneNode(true);
    advertElement.querySelector('h3').textContent = advert.offer.title;
    advertElement.querySelector('small').textContent = advert.offer.address;
    advertElement.querySelector('.popup__price').textContent = advert.offer.price + ' &#x20bd;/ночь';
    advertElement.querySelector('h4').textContent = advert.offer.type;
    advertElement.querySelector('h4').nextElementSibling.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    advertElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    advertElement.querySelector('.popup__pictures').previousElementSibling.textContent = advert.offer.description;
    advertElement.querySelector('.popup__features').textContent = advert.offer.features;
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;

    filtersElement.appendChild(advertElement);
  };

  var adverts = createAdverts();
  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
  var advertTemplate = document.querySelector('template').content;
  var filtersElement = userDialog.querySelector('.map__filters-container');
  renderDefaultAdvert(adverts[0]);
})();

