// card.js
'use strict';

(function () {
  var TYPES_TRANSLATE = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.card = {
    renderCard: function (advert) {
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
    },
    openCard: function(evt) {
      setPinUnactive();
      clickedElement = evt.currentTarget;
      setPinActive();

      window.card.renderCard(window.data.adverts[clickedElement.getAttribute('advert-id')]);

      closeIconElement = userDialogElement.querySelector('.popup__close');

      closeIconElement.addEventListener('mouseup', onClicCloseIcon);
      closeIconElement.addEventListener('keydown', onEntrPressCloseIcon);
      document.addEventListener('keydown', onEscPress);
    },
    closeCard: function () {
      var card = document.querySelector('.map__filters-container article');
      if (card) {
        card.removeEventListener('mouseup', onClicCloseIcon);
        card.removeEventListener('keydown', onEntrPressCloseIcon);
        document.removeEventListener('keydown', onEscPress);
        card.remove();
      }
      setPinUnactive();
    }
  };

  var userDialogElement = document.querySelector('.map');

  var cardTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  var clickedElement = null;
  var closeIconElement = null;

  function removeUnnessaryFeatureElements(offer, cardElement) {
    for (var i = 0; i < FEATURES.length; i++) {
      if (offer.features.indexOf(FEATURES[i]) < 0) {
        cardElement.querySelector('.feature--' + FEATURES[i]).remove();
      }
    }
  }

  function onClicCloseIcon() {
    window.card.closeCard();
  }

  function onEntrPressCloseIcon(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.card.closeCard();
    }
  }

  function onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closeCard();
    }
  }

  function setPinUnactive() {
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  }

  function setPinActive() {
    clickedElement.classList.add('map__pin--active');
  }
})();
