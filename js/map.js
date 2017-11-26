// map.js
'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var FLAT_TYPES = ['Картира', 'Бунгало', 'Дом'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
    var filtersContainerElement = userDialogElement.querySelector('.map__filters-container');
    var cardElement = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);

    cardElement.querySelector('h3').textContent = advert.offer.title;
    cardElement.querySelector('small').textContent = advert.offer.address;
    cardElement.querySelector('.popup__price').textContent = advert.offer.price + ' &#x20bd;/ночь';
    cardElement.querySelector('h4').textContent = advert.offer.type;
    cardElement.querySelector('h4').nextElementSibling.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__pictures').previousElementSibling.textContent = advert.offer.description;
    cardElement.querySelector('.popup__features').textContent = advert.offer.features;
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    filtersContainerElement.appendChild(cardElement);
  };

  var renderPin = function (advert) {
    var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x + IMG_WIDTH / 2) + 'px';
    pinElement.style.top = (advert.location.y + IMG_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;

    return pinElement;
  };

  var renderAllPins = function (adverts) {
    var pinListElement = userDialogElement.querySelector('.map__pins');
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragmentElement.appendChild(renderPin(adverts[i]));
    }
    pinListElement.appendChild(fragmentElement);
  };

  var adverts = createAdverts();
  var userDialogElement = document.querySelector('.map');
  userDialogElement.classList.remove('map--faded');

  renderAllPins(adverts);
  renderDefaultAdvert(adverts[0]);
})();

