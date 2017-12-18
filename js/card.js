// card.js
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.card = {
    openCard: function (evt) {
      setPinUnactive();
      clickedElement = evt.currentTarget;
      setPinActive();

      window.showCard(window.data.adverts[clickedElement.getAttribute('advert-id')]);

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

  var clickedElement = null;
  var closeIconElement = null;

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
