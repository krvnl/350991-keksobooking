// map.js
'use strict';

(function () {
  function showMap() {
    document.querySelector('.map').classList.remove('map--faded');
    window.pin.renderAllPins(window.data.adverts);
  }

  var mainPinElement = document.querySelector('.map__pin--main');

  mainPinElement.addEventListener('mouseup', function () {
    showMap();
    window.form.showForm();
  });
})();
