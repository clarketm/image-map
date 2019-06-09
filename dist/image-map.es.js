/**
 * Copyright (c) 2018, Travis Clarke (https://www.travismclarke.com/)
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import $ from 'jquery';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var version = "1.1.6";

var RESIZE = "resize";
var LOAD = "load";
var USEMAP = "usemap";
var COORDS = "coords";
var COMPLETE = "complete";
/**
 * ImageMap main library constructor
 *
 * @param selector {string} CSS selector
 * @param wait {number} [wait=500] debounce wait interval
 * @constructor
 */

var ImageMap =
/*#__PURE__*/
function () {
  function ImageMap(selector, wait) {
    _classCallCheck(this, ImageMap);

    this.selector = selector instanceof Array ? selector : _toConsumableArray(document.querySelectorAll(selector));
    if (document.readyState !== COMPLETE) window.addEventListener(LOAD, this.update.bind(this));else this.update();
    window.addEventListener(RESIZE, this.debounce(this.update, wait).bind(this));
  }

  _createClass(ImageMap, [{
    key: "update",

    /**
     * Update
     */
    value: function update() {
      var _this = this;

      this.selector.forEach(function (img) {
        if (img.getAttribute(USEMAP) === undefined) return;
        var newImg = img.cloneNode();
        newImg.addEventListener(LOAD, _this.handleImageLoad(img.offsetWidth, img.offsetHeight));
      });
    }
    /**
     * Debounce
     *
     * @param {function} func
     * @param {number} [wait=500]
     */

  }, {
    key: "debounce",
    value: function debounce(func) {
      var _this2 = this;

      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      var timeout;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        window.clearTimeout(timeout);
        timeout = window.setTimeout(function (ctx) {
          return func.apply(ctx, args);
        }, wait, _this2);
      };
    }
    /**
     * handleImageLoad
     *
     * @param {number} [offsetWidth=0]
     * @param {number} [offsetHeight=0]
     */

  }, {
    key: "handleImageLoad",
    value: function handleImageLoad() {
      var offsetWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var offsetHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return function (e) {
        var w = e.target.width;
        var h = e.target.height;
        var wPercent = offsetWidth / 100;
        var hPercent = offsetHeight / 100;
        var mapName = e.target.getAttribute(USEMAP).replace(/^#/, "");

        _toConsumableArray(document.querySelectorAll(ImageMap.genAreaSelector(mapName))).forEach(function (area) {
          var coordsString = area.dataset[COORDS] = area.dataset[COORDS] || area.getAttribute(COORDS);
          var coordsArrayOld = coordsString.split(",");
          var coordsArrayNew = coordsArrayOld.map(function (_, i) {
            return i % 2 === 0 ? Number(coordsArrayOld[i] / w * 100 * wPercent) : Number(coordsArrayOld[i] / h * 100 * hPercent);
          });
          area.setAttribute(COORDS, coordsArrayNew.toString());
        });
      };
    }
  }], [{
    key: "genAreaSelector",
    value: function genAreaSelector(mapName) {
      return "map[name=\"".concat(mapName, "\"] area");
    }
  }]);

  return ImageMap;
}();

if ($ !== undefined && $.fn) {
  $.fn.imageMap = function (wait) {
    return new ImageMap(this.toArray(), wait);
  };
}

function _ImageMap(selector, wait) {
  return new ImageMap(selector, wait);
}

_ImageMap.VERSION = version;

export default _ImageMap;
