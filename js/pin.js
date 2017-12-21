// pin.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var pinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  var typeFilterElement = document.querySelector('#housing-type');
  var roomsFilterElement = document.querySelector('#housing-rooms');
  var guestsFilterElement = document.querySelector('#housing-guests');
  var priceFilterElement = document.querySelector('#housing-price');
  var features = document.querySelectorAll('input[id^="filter"]');

  var featuresChecked = [];

  // 2d массив, содержит массивы отфильтрованных значений по индивидуальным параметрам
  var filteredArray = new Array(5);

  window.pin = {
    adverts: null,
    renderAllPins: function (adv) {
      window.pin.adverts = adv;
      for (var i = 0; i < filteredArray.length; i++) {
        filteredArray[i] = new Array(adv.length);
        adv.forEach(function(element,index) {
          filteredArray[i][index] = index;
        })
      }

      var fragmentElement = document.createDocumentFragment();
      for (var k = 0; k < adv.length; k++) {
        fragmentElement.appendChild(renderPin(adv[k], k));
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

  function renderPin(advert, id) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = (advert.location.x - 5) + 'px'; // поправка относительно минимального значения координаты X для pin указателя
    pinElement.style.top = (advert.location.y - 40) + 'px'; // поправка относительно минимального значения координаты Y для pin указателя
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.setAttribute('advert-id', id);
    if (id >= 5) {
      pinElement.classList.add('hidden');
    }

    return pinElement;
  }

  function updatePinElements(arrayOfIds) {
    for (var i = 0; i < pinListElement.children.length - 2; i++) {
      pinListElement.children[i + 2].classList.add('hidden');
    }
    var amountOfPins = Math.min(arrayOfIds.length, 5);
    for (var j = 0; j < amountOfPins; j++) {
      pinListElement.children[2 + arrayOfIds[j]].classList.remove('hidden');
    }
  }

  function findSame(arrayX, arrayY) {
    var arrayOfSameElements = [];
    arrayX.forEach(function (elementX) {
      arrayY.forEach(function (elementY) {
        if (elementY === elementX) {
          arrayOfSameElements.push(elementY)
        }
      })
    });
    return arrayOfSameElements;
  }

  function getIdsArray() {
    var k = 1;
    var resultArray = filteredArray[k - 1];
    while ((resultArray.length > 0) && (k < filteredArray.length)) {
      resultArray = findSame(resultArray, filteredArray[k]);
      k++;
    }
    // Этот массив индексов/id используется для отображения pin-объявлений
    return resultArray;
  }

  function filterAdverts (evt, arrayNumber, paramName) {
    filteredArray[arrayNumber] = [];
    if (evt.currentTarget.value === 'any') {
      window.pin.adverts.forEach(function (item, index) {
        filteredArray[arrayNumber].push(index);
      });
    } else if (paramName === 'price') {
      window.pin.adverts.forEach(function (item, index) {
        if (((evt.currentTarget.value === 'low') && (item.offer[paramName] < 10000)) ||
          ((evt.currentTarget.value === 'middle') && (item.offer[paramName] >= 10000) && (item.offer[paramName] < 50000)) ||
          ((evt.currentTarget.value === 'high') && (item.offer[paramName] >= 50000))) {
          filteredArray[arrayNumber].push(index);
        }
      });
    } else {
      window.pin.adverts.forEach(function (item, index) {
        if ((item.offer[paramName] === parseInt(evt.currentTarget.value)) || (item.offer[paramName] === evt.currentTarget.value)) {
          filteredArray[arrayNumber].push(index);
        }
      });
    }
    window.debounce(updatePinElements(getIdsArray()));
  }

  // Фильтруем по типу жилья
  typeFilterElement.addEventListener('change', function (evt) {
    filterAdverts(evt, 0, "type");
  });

  // Фильтруем по количеству комнат
  roomsFilterElement.addEventListener('change', function (evt) {
    filterAdverts(evt, 1, "rooms");
  });

  // Фильтруем по количеству гостей
  guestsFilterElement.addEventListener('change', function (evt) {
    filterAdverts(evt, 2, "guests");
  });

  // Фильтруем по цене
  priceFilterElement.addEventListener('change', function (evt) {
    filterAdverts(evt, 3, "price");
  });

  // Фильтруем по features
  features.forEach(function(item) {
    item.addEventListener('change', function(){
      if (item.checked) {
        featuresChecked.push(item.id.slice(7));
      } else {
        featuresChecked = featuresChecked.filter(function(element) {
          if (element !== item.id.slice(7)) {
            return element;
          }
        });
      }
      filteredArray[4] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var tempArray = [];
      featuresChecked.forEach(function (elem) {
        window.pin.adverts.forEach(function (item, index) {
          if (item.offer.features.indexOf(elem) >= 0) {
            tempArray.push(index);
          }
        });
        filteredArray[4] = findSame(filteredArray[4], tempArray);
        tempArray = [];
      });
      window.debounce(updatePinElements(getIdsArray()))
    });
  })
})();
