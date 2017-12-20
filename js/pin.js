// pin.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  window.pin = {
    renderAllPins: function (adv) {
      window.backend.adverts = adv;
      var fragmentElement = document.createDocumentFragment();

      for (var i = 0; i < adv.length; i++) {
        fragmentElement.appendChild(renderPin(adv[i], i));
      }

      pinListElement.appendChild(fragmentElement);

      var pinElements = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < pinElements.length; j++) {
        pinElements[j].addEventListener('mouseup', function (evt) {
          window.card.closeCard();
          window.card.openCard(evt);
        });

        pinElements[j].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.card.closeCard();
            window.card.openCard(evt);
          }
        });
      }
    }
  };

  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  function renderPin(advert, id) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x - 5) + 'px'; // поправка относительно минимального значения координаты X для pin указателя
    pinElement.style.top = (advert.location.y - 40) + 'px'; // поправка относительно минимального значения координаты Y для pin указателя
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.setAttribute('advert-id', id);

    return pinElement;
  }
})();
