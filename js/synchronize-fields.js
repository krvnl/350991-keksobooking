// synchronize-fields.js
'use strict';

(function () {
  window.synchronizeFields = function (elem1, elem2, range1, range2, method) {
    elem1.addEventListener('change', function (evt) {
      var index = range1.indexOf(evt.target.value);
      method(elem2, range2[index]);
    });
  };
})();
