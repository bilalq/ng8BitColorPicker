/**
 * @ngdoc overview
 * @name eightBitColorPicker
 *
 * @description
 * The module which exposes the eightBitColorPicker directive.
 */
angular.module('eightBitColorPicker', [])
/**
 * @ngdoc directive
 * @name eightBitColorPicker
 * @requires $window
 * @restrict EA
 *
 * @description
 * Serves as a custom element directive wrapper around the EightBitColorPicker
 * library.
 *
 * @param {String|Number} [color] - Color to set picker to (from 0 to 255)
 * @param {String[]} [palette] - The list of colors to use as 256 hex colors
 *
 * @example
   <example module="myModule">
     <file name="index.html">
       <div ng-controller="colorCtrl">
         <eight-bit-color-picker color="selectedColor"></eight-bit-color-picker>
       </div>
     </file>
     <file name="script.js">
       angular.module('myModule', ['eightBitColorPicker'])
       .controller('colorCtrl', function($scope) {
         $scope.selectedColor = 119
       })
     </file>
   </example>
 */
.directive('eightBitColorPicker', ['$window', function($window) {
  'use strict';

  var ColorPicker = $window.EightBitColorPicker

  return {

    require: '?ngModel',

    restrict: 'EA',

    scope: {
      color: '=?',
      palette: '=?'
    },

    link: function(scope, element, attrs, ngModel) {
      var pickerParams = {
        el: element[0],
        color: scope.color
      }
      if (scope.palette) {
        pickerParams.palette = scope.palette;
      }

      var picker = new ColorPicker(pickerParams);

      var updateModel = function() {
        if (!ngModel) return;
        ngModel.$setViewValue(picker)
      }

      scope.color = scope.color || picker.get8BitColor()
      updateModel()

      picker.addEventListener('colorChange', function(e) {
        scope.$apply(function() {
          scope.color = e.detail.newColor;
          updateModel()
        })
      })

      scope.$watch('color', function() {
        picker.updateColor(scope.color)
        updateModel()
      })

    }

  }

}]);
