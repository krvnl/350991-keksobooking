// map.js
'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  function showMap() {
    document.querySelector('.map').classList.remove('map--faded');
    window.pin.renderAllPins(window.data.adverts);
  }

  function unhidePage() {
    showMap();
    window.form.showForm();
    mainPinElement.removeEventListener('mouseup', unhidePage);

    mainPinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var pinPointerCoordinateY = mainPinElement.offsetTop + shift.y + 50;
        var pinPointerCoordinateX = mainPinElement.offsetLeft + shift.x;

        if ((pinPointerCoordinateY >= 100) && (pinPointerCoordinateY <= 500)) {
          mainPinElement.style.top = (mainPinElement.offsetTop + shift.y) + 'px';
          mainPinElement.style.left = (mainPinElement.offsetLeft + shift.x) + 'px';
        }
        addressElement.value = 'x: ' + pinPointerCoordinateX + 'px' + ', y: ' + pinPointerCoordinateY + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  mainPinElement.addEventListener('mouseup', unhidePage);
})();
