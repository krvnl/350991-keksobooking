// synchronize-fields.js
'use strict';

(function () {
  window.synchro = {
    syncValues: function (element, value) {
      element.value = value;
    },
    syncMinValues: function (element, value) {
      element.min = value;
    },
    synchronizeFields: function (elem1, elem2, index, range, method) {
      var value = range[index];
      method(elem2, value);
    }
  };

})();
