// pin.js
'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 40;
  var ENTER_KEYCODE = 13;

  window.pin = {
    renderAllPins: function (adv) {
      var fragmentElement = document.createDocumentFragment();

      for (var i = 0; i < adv.length; i++) {
        fragmentElement.appendChild(renderPin(adv[i]));
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

  function renderPin(advert) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x + IMG_WIDTH / 2) + 'px';
    pinElement.style.top = (advert.location.y + IMG_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.setAttribute('advert-id', advert.id);

    return pinElement;
  }
})();
