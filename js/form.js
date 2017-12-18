// form.js
'use strict';

(function () {
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
