// synchronize-fields.js
'use strict';

(function () {
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  window.synchronizeFields = function (method, elem1, elem2, range) {
    switch (method) {
      case syncIndex:
        elem1.addEventListener('change', function (event) {
          syncIndex(elem2, event.target.selectedIndex);
        });
        elem2.addEventListener('change', function (event) {
          syncIndex(elem1, event.target.selectedIndex);
        });
        break;
      case syncMinValue:
        elem1.addEventListener('change', function (event) {
          syncMinValue(elem2, range[event.target.selectedIndex]);
        });
        break;
    }
  };

  function syncIndex (element, index) {
    element.selectedIndex = index;
  }

  function syncMinValue (element, value) {
    element.min = value;
  }

  // Автоматическое изменение полей заезда/выезда
  synchronizeFields(syncIndex, timeInElement, timeOutElement);

  // Автоматическое изменение количества гостей
  synchronizeFields(syncIndex, roomNumberElement, capacityElement);

  // Автоматическое изменение цены за ночь
  synchronizeFields(syncMinValue, typeElement, priceElement, [1000, 0, 5000, 10000]);
})();
