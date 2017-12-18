// form.js
'use strict';

(function () {
  var noticeFormElement = document.querySelector('.notice__form');

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var capacityElement = document.querySelector('#capacity');
  var roomNumberElement = document.querySelector('#room_number');

  window.form = {
    showForm: function () {
      noticeFormElement.classList.remove('notice__form--disabled');
      var formElements = noticeFormElement.querySelectorAll('.form__element');
      for (var i = 0; i < formElements.length; i++) {
        formElements[i].removeAttribute('disabled');
      }
    }
  };

  // Автоматическое изменение полей заезда/выезда
  timeInElement.addEventListener('change', function (event) {
    var index = event.target.selectedIndex;
    window.synchro.synchronizeFields(event.target, timeOutElement, index, ['12:00', '13:00', '14:00'], window.synchro.syncValues);
  });
  timeOutElement.addEventListener('change', function (event) {
    var index = event.target.selectedIndex;
    window.synchro.synchronizeFields(event.target, timeInElement, index, ['12:00', '13:00', '14:00'], window.synchro.syncValues);
  });

  // Автоматическое изменение цены за ночь
  typeElement.addEventListener('change', function (event) {
    var index = event.target.selectedIndex;
    window.synchro.synchronizeFields(event.target, priceElement, index, [1000, 0, 5000, 10000], window.synchro.syncMinValues);
  });

  // Автоматическое изменение количества гостей
  roomNumberElement.addEventListener('change', function (event) {
    var index = event.target.selectedIndex;
    window.synchro.synchronizeFields(event.target, capacityElement, index, ['1', '2', '3', '0'], window.synchro.syncValues);
  });

  var inputValidateElements = noticeFormElement.querySelectorAll('input[type="text"], input[type="number"]');

  var submitElement = document.querySelector('.form__submit');
  // Проверка правильности заполнения полей перед отправкой формы
  submitElement.addEventListener('click', onSubmitClick);

  function onSubmitClick() {
    for (var i = 0; i < inputValidateElements.length; i++) {
      if (!inputValidateElements[i].validity.valid) {
        inputValidateElements[i].style.border = '3px solid red';
      } else {
        inputValidateElements[i].style.border = '';
      }
    }
  }
})();
