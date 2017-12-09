// map.js
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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

  function showMap() {
    userDialogElement.classList.remove('map--faded');
    renderAllPins(adverts);
    var pinElements = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pinElements.length; j++) {
      pinElements[j].addEventListener('mouseup', function (evt) {
        closeCard();
        openCard(evt);
      });

      pinElements[j].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          closeCard();
          openCard(evt);
        }
      });
    }
  }

  function renderAllPins(adverts) {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragmentElement.appendChild(renderPin(adverts[i]));
    }
    pinListElement.appendChild(fragmentElement);
  }

  function renderPin(advert) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x + IMG_WIDTH / 2) + 'px';
    pinElement.style.top = (advert.location.y + IMG_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.setAttribute('advert-id', advert.id);

    return pinElement;
  }

  function closeCard() {
    var card = document.querySelector('.map__filters-container article');
    if (card) {
      card.removeEventListener('mouseup', onClicCloseIcon);
      card.removeEventListener('keydown', onEntrPressCloseIcon);
      document.removeEventListener('keydown', onEscPress);
      card.remove();
    }
    setPinUnactive();
  }

  function onClicCloseIcon() {
    closeCard();
  }

  function onEntrPressCloseIcon(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
    }
  }

  function onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  }

  function openCard(evt) {
    setPinUnactive();
    clickedElement = evt.currentTarget;
    setPinActive();

    renderCard(adverts[clickedElement.getAttribute('advert-id')]);
    closeIconElement = userDialogElement.querySelector('.popup__close');

    closeIconElement.addEventListener('mouseup', onClicCloseIcon);
    closeIconElement.addEventListener('keydown', onEntrPressCloseIcon);
    document.addEventListener('keydown', onEscPress);
  }

  function setPinUnactive() {
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  }

  function setPinActive() {
    clickedElement.classList.add('map__pin--active');
  }

  function renderCard(advert) {
    var offer = advert.offer;
    var cardElement = cardTemplateElement.cloneNode(true);

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

  function removeUnnessaryFeatureElements(offer, cardElement) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (offer.features.indexOf(FEATURES[i]) < 0) {
        cardElement.querySelector('.feature--' + FEATURES[i]).remove();
      }
    }
  }

  var noticeFormElement = document.querySelector('.notice__form');

  function showForm() {
    noticeFormElement.classList.remove('notice__form--disabled');
    var formElements = noticeFormElement.querySelectorAll('.form__element');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  }

  var adverts = createAdverts();

  var userDialogElement = document.querySelector('.map');

  var pinListElement = userDialogElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');

  var cardTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var filtersContainerElement = userDialogElement.querySelector('.map__filters-container');

  var clickedElement = null;
  var closeIconElement = null;

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var capacityElement = document.querySelector('#capacity');
  var roomNumberElement = document.querySelector('#room_number');

  // Автоматическое изменение полей заезда/выезда
  function onTimeChange(evt) {
    if (evt.target.name === 'timein') {
      timeOutElement.selectedIndex = evt.target.selectedIndex;
    } else {
      timeInElement.selectedIndex = evt.target.selectedIndex;
    }
  }
  timeInElement.addEventListener('change', onTimeChange);
  timeOutElement.addEventListener('change', onTimeChange);

  // Автоматическое изменение цены за ночь
  function onTypeChange(evt) {
    switch (evt.target.value) {
      case 'bungalo':
        priceElement.min = priceElement.value = 0;
        break;
      case 'flat':
        priceElement.min = priceElement.value = 1000;
        break;
      case 'house':
        priceElement.min = priceElement.value = 5000;
        break;
      case 'palace':
        priceElement.min = priceElement.value = 10000;
        break;
    }
  }
  typeElement.addEventListener('change', onTypeChange);

  // Автоматическое изменение количества гостей
  function onRoomNumberChange(evt) {
    capacityElement.selectedIndex = evt.target.selectedIndex;
  }
  roomNumberElement.addEventListener('change', onRoomNumberChange);

  var mainPinElement = document.querySelector('.map__pin--main');
  var inputValidateElements = noticeFormElement.querySelectorAll('input[type="text"], input[type="number"]');

  var submitElement = document.querySelector('.form__submit');
  // Проверка правильности заполнения полей перед отправкой формы
  submitElement.addEventListener('click', onSubmitClick);

  function onSubmitClick() {
    for (var i = 0; i < inputValidateElements.length; i++) {
      if (!inputValidateElements[i].validity.valid) {
        inputValidateElements[i].setAttribute('style', 'border: 2px solid red');
      } else {
        inputValidateElements[i].removeAttribute('style');
      }
    }
  }

  mainPinElement.addEventListener('mouseup', function () {
    showMap();
    showForm();
  });
})();
