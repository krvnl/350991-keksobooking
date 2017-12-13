// map.js
'use strict';

(function () {

  window.map = {
    userDialogElement: document.querySelector('.map')
  };

  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var adverts = window.data.createAdverts();

  function renderPin(advert) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x + IMG_WIDTH / 2) + 'px';
    pinElement.style.top = (advert.location.y + IMG_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.setAttribute('advert-id', advert.id);

    return pinElement;
  }

  function renderAllPins(adverts) {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < adverts.length; i++) {
      fragmentElement.appendChild(renderPin(adverts[i]));
    }
    pinListElement.appendChild(fragmentElement);
  }

  function showMap() {
    window.map.userDialogElement.classList.remove('map--faded');
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

    window.card.renderCard(adverts[clickedElement.getAttribute('advert-id')]);

    closeIconElement = window.map.userDialogElement.querySelector('.popup__close');

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

  var pinListElement = window.map.userDialogElement.querySelector('.map__pins');
  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');

  var clickedElement = null;
  var closeIconElement = null;

  window.pin.mainPinElement.addEventListener('mouseup', function () {
    showMap();
    window.form.showForm();
  });
})();
