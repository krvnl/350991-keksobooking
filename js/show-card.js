// show-card.js
'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES_TRANSLATE = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};


  var cardTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  window.showCard = function (advert) {
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

})();
