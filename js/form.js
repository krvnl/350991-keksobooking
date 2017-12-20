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
  var formElements = noticeFormElement.querySelectorAll('.form__element');
  var defaultElements = document.querySelectorAll('.form__element select, .form__element textarea, .form__element input[type="text"], .form__element input[type="number"]');

  window.form = {
    showForm: function () {
      noticeFormElement.classList.remove('notice__form--disabled');
      for (var i = 0; i < formElements.length; i++) {
        formElements[i].removeAttribute('disabled');
      }
      for (var j = 0; j < defaultElements.length; j++) {
        defaultElements[j].defaultValue = defaultElements[j].value;
      }
    }
  };

  function syncValue(element, value) {
    element.value = value;
  }

  function syncMinValue(element, value) {
    element.min = value;
  }

  function setDefaultValues() {
    for (var i = 0; i < defaultElements.length; i++) {
      defaultElements[i].value = defaultElements[i].defaultValue;
    }
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('DIV');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  // Автоматическое изменение полей заезда/выезда
  window.synchronizeFields(timeInElement, timeOutElement, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValue);
  window.synchronizeFields(timeOutElement, timeInElement, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValue);

  // // Автоматическое изменение количества гостей
  window.synchronizeFields(roomNumberElement, capacityElement, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValue);

  // Автоматическое изменение цены за ночь
  window.synchronizeFields(typeElement, priceElement, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncMinValue);

  var inputValidateElements = noticeFormElement.querySelectorAll('input[type="text"], input[type="number"]');

  var submitElement = document.querySelector('.form__submit');
  // Проверка правильности заполнения полей перед отправкой формы
  submitElement.addEventListener('click', function (event) {
    event.preventDefault();
    for (var i = 0; i < inputValidateElements.length; i++) {
      if (!inputValidateElements[i].validity.valid) {
        inputValidateElements[i].style.border = '3px solid red';
      } else {
        inputValidateElements[i].style.border = '';
        window.backend.save(new FormData(noticeFormElement), setDefaultValues, errorHandler);
      }
    }
  });
})();
