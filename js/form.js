// form.js
'use strict';

(function () {
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  var noticeFormElement = document.querySelector('.notice__form');

  window.form = {
    showForm: function () {
      noticeFormElement.classList.remove('notice__form--disabled');
      var formElements = noticeFormElement.querySelectorAll('.form__element');
      for (var i = 0; i < formElements.length; i++) {
        formElements[i].removeAttribute('disabled');
      }
    }
  };

  function syncValue(element, value) {
    element.value = value;
  }

  function syncMinValue(element, value) {
    element.min = value;
  }

  // Автоматическое изменение полей заезда/выезда
  window.synchronizeFields(timeInElement, timeOutElement, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValue);
  window.synchronizeFields(timeOutElement, timeInElement, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValue);

  // // Автоматическое изменение количества гостей
  window.synchronizeFields(roomNumberElement, capacityElement, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValue);
  window.synchronizeFields(capacityElement, roomNumberElement, ['1', '2', '3', '0'], ['1', '2', '3', '100'], syncValue);

  // Автоматическое изменение цены за ночь
  window.synchronizeFields(typeElement, priceElement, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncMinValue);

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
