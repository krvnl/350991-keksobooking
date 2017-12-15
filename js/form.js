// form.js
'use strict';

(function () {
  window.form = {
    showForm: function () {
      noticeFormElement.classList.remove('notice__form--disabled');
      var formElements = noticeFormElement.querySelectorAll('.form__element');
      for (var i = 0; i < formElements.length; i++) {
        formElements[i].removeAttribute('disabled');
      }
    }
  };

  var noticeFormElement = document.querySelector('.notice__form');

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');
  var capacityElement = document.querySelector('#capacity');
  var roomNumberElement = document.querySelector('#room_number');

  // Автоматическое изменение полей заезда/выезда
  function onTimeChange(evt) {
    if (evt.target.name === 'timein') {
      timeOutElement.selectedIndex = evt.target.selectedIndex;
    } else {
      timeInElement.selectedIndex = evt.target.selectedIndex;
    }
  }
  timeInElement.addEventListener('change', onTimeChange);
  timeOutElement.addEventListener('change', onTimeChange);

  // Автоматическое изменение цены за ночь
  function onTypeChange(evt) {
    switch (evt.target.value) {
      case 'bungalo':
        priceElement.min = 0;
        break;
      case 'flat':
        priceElement.min = 1000;
        break;
      case 'house':
        priceElement.min = 5000;
        break;
      case 'palace':
        priceElement.min = 10000;
        break;
    }
  }
  typeElement.addEventListener('change', onTypeChange);

  // Автоматическое изменение количества гостей
  function onRoomNumberChange(evt) {
    capacityElement.selectedIndex = evt.target.selectedIndex;
  }
  roomNumberElement.addEventListener('change', onRoomNumberChange);

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
