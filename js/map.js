// map.js
'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var FLAT_TYPES = ['flat', 'house', 'bungalo'];
  var TYPES_TRANSLATE = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

  function createAdvert(i) {
    var advert = {};
    var location = createLocationObj();

    advert.author = createAuthorObj(i);
    advert.offer = createOfferObj(i, location);
    advert.location = location;

    return advert;
  }

  function createAdverts() {
    var adverts = [];

    for (var i = 0; i < 8; i++) {
      adverts[i] = createAdvert(i);
    }

    return adverts;
  }

  function removeUnnessaryFeatureElements(offer, cardElement) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (offer.features.indexOf(FEATURES[i]) < 0) {
        cardElement.querySelector('.feature--' + FEATURES[i]).remove();
      }
    }
  }

  function renderDefaultAdvert(advert) {
    var offer = advert.offer;

    cardElement.querySelector('h3').textContent = offer.title;
    cardElement.querySelector('small').textContent = offer.address;
    cardElement.querySelector('.popup__price').innerHTML = offer.price + ' &#x20bd;/ночь';
    cardElement.querySelector('h4').textContent = TYPES_TRANSLATE[offer.type];
    cardElement.querySelector('h4').nextElementSibling.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    cardElement.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    cardElement.querySelector('.popup__pictures').previousElementSibling.textContent = offer.description;
    removeUnnessaryFeatureElements(offer, cardElement);
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    filtersContainerElement.appendChild(cardElement);
  }

  function renderPin(advert) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x + IMG_WIDTH / 2) + 'px';
    pinElement.style.top = (advert.location.y + IMG_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;

    return pinElement;
  }

  function renderAllPins(adverts) {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragmentElement.appendChild(renderPin(adverts[i]));
    }
    pinListElement.appendChild(fragmentElement);
  }

  var adverts = createAdverts();
  var userDialogElement = document.querySelector('.map');
  userDialogElement.classList.remove('map--faded');

  var pinListElement = userDialogElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');
  renderAllPins(adverts);

  var filtersContainerElement = userDialogElement.querySelector('.map__filters-container');
  var cardElement = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
  renderDefaultAdvert(adverts[0]);
})();

