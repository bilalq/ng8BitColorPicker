ng8BitColorPicker
=================

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

> Angular directive for an eight-bit color picker

This package wraps around the [eight-bit color picker][color-picker-url] library
and exposes it as an easy to use Angular directive.

Install
-------

    bower install --save ng8BitColorPicker

Usage Examples
--------------

Bare minimum:
```html
<!-- In template -->
<eight-bit-color-picker></eight-bit-color-picker>
```

Initializing with a default color:
```html
<!-- In template -->
<eight-bit-color-picker color="someColor"></eight-bit-color-picker>
```
```javascript
// In controller
$scope.someColor = 119
```

Initializing with a custom palette:
```html
<!-- In template -->
<eight-bit-color-picker palette="customPalette"></eight-bit-color-picker>
```
```javascript
// In controller
$scope.customPalette = [
  '#af34f3',
  '#b34c3a',
  // ...
  // Continue on until 256 hex colors are there
]
```

Setting a model property to get a reference to the EightBitColorPicker instance:
```html
<!-- In template -->
<form ng-submit="submit()">
  <eight-bit-color-picker ng-model="myPicker"></eight-bit-color-picker>
  <input type="submit" value="Submit">
</form>
```
```javascript
// In controller
$scope.submit = function() {
  console.log($scope.myPicker.get8BitColor())
  console.log($scope.myPicker.getHexColor())
}
```

License
-------
[MIT][License]

  [travis-badge]: https://travis-ci.org/bilalq/ng8BitColorPicker.svg?branch=master
  [travis-url]: https://travis-ci.org/bilalq/ng8BitColorPicker/builds
  [coveralls-badge]: http://img.shields.io/coveralls/bilalq/ng8BitColorPicker.svg
  [coveralls-url]: https://coveralls.io/r/bilalq/ng8BitColorPicker?branch=master
  [color-picker-url]: https://github.com/bilalq/eight-bit-color-picker
  [License]: https://github.com/bilalq/eight-bit-color-picker/blob/master/LICENSE
