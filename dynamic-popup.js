"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (definition) {
  "use strict";

  if (typeof bootstrap === "function") {
    bootstrap("DynamicPopup", definition);

    // CommonJS
  } else if (typeof exports === "object" && typeof module === "object") {
      module.exports = definition();

      // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

        // SES (Secure EcmaScript)
      } else if (typeof ses !== "undefined") {
          if (!ses.ok()) {
            return;
          } else {
            ses.makeDynamicPopup = definition;
          }

          // <script>
        } else if (typeof window !== "undefined" || typeof self !== "undefined") {

            var global = typeof window !== "undefined" ? window : self;

            var previousDynamicPopup = global.DynamicPopup;
            global.DynamicPopup = definition();

            global.DynamicPopup.noConflict = function () {
              global.DynamicPopup = previousDynamicPopup;
              return this;
            };
          } else {
            throw new Error("This environment was not anticipated by DynamicPopup. Please file a bug.");
          }
})(function () {
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license

  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  })();

  var Popup = (function () {
    function Popup(options) {
      var _styles,
          _this = this;

      _classCallCheck(this, Popup);

      this.__uid = new Date().getTime();
      this.el = options.el;
      this.content = options.content;
      this.classes = typeof options.className === 'string' ? [options.className] : options.className;
      this.direction = options.direction || 'bottom';
      this.popup = null;
      this.chevron = null;
      this.defaultChevronWidth = 16;
      this.asyncElements = ['img'];
      this.prefetch = options.prefetch;
      this.initialWidth = 0;

      // Classes
      this.baseClass = 'dynamic-popup';
      this.contentBase = this.baseClass + "__content";
      this.chevronBase = this.baseClass + "__chevron";

      this.position = function () {
        _this._position();
      };
      this.onClickEl = function () {
        _this._onClickEl();
      };
      this.onClickAnyWhere = function (e) {
        _this._onClickAnyWhere(e);
      };

      this.el.addEventListener('click', this.onClickEl);

      this.styles = (_styles = {}, _defineProperty(_styles, "." + this.baseClass, ['position: absolute', 'opacity: 0', 'background: rgba(0, 0, 0, .85)', 'color: #fff', 'will-change: top, left', '-webkit-transform: translateZ(0)', 'transform: translateZ(0)']), _defineProperty(_styles, "." + this.baseClass + " img", ['vertical-align: middle']), _defineProperty(_styles, "." + this.chevronBase, ['position: absolute', 'opacity: 0', 'color: rgba(0, 0, 0, .85)', "width: " + this.defaultChevronWidth + "px", 'will-change: top, left', '-webkit-transform: translateZ(0)', 'transform: translateZ(0)']), _styles);

      this.stylize();
      if (this.prefetch) {
        this.preFetchResources();
      }

      return this;
    }

    _createClass(Popup, [{
      key: "bindEvents",
      value: function bindEvents() {
        var _this2 = this;

        window.addEventListener('resize', this.position);
        window.addEventListener('scroll', this.position);
        document.body.addEventListener('click', this.onClickAnyWhere);[].forEach.call(this.popup.querySelectorAll(this.asyncElements.join(',')), function (el) {
          if (!el.complete) {
            el.addEventListener('load', _this2.position);
          }
        });
      }
    }, {
      key: "unbindEvents",
      value: function unbindEvents() {
        var _this3 = this;

        window.removeEventListener('resize', this.position);
        window.removeEventListener('scroll', this.position);
        document.body.removeEventListener('click', this.onClickAnyWhere);[].forEach.call(this.popup.querySelectorAll(this.asyncElements.join(',')), function (el) {
          el.removeEventListener('load', _this3.position);
        });
      }
    }, {
      key: "stylize",
      value: function stylize() {
        var styleId = 'dynamic-popup-styles';
        var existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          return;
        }

        // see: http://davidwalsh.name/add-rules-stylesheets
        var sheet = (function () {
          var style = document.createElement("style");
          style.id = styleId;
          style.appendChild(document.createTextNode(""));
          document.head.insertBefore(style, document.head.firstChild);
          return style.sheet;
        })();

        function addCSSRule(sheet, selector, rules, index) {
          if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
          } else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
          }
        }

        for (var selector in this.styles) {
          if (this.styles.hasOwnProperty(selector)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.styles[selector][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var rule = _step.value;

                addCSSRule(sheet, selector, rule);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }
      }
    }, {
      key: "preFetchResources",
      value: function preFetchResources() {
        var container = document.createElement('div');
        container.innerHTML = this.content;[].forEach.call(container.querySelectorAll(this.asyncElements.join(',')), function (el) {
          var fetched = document.createElement(el.tagName);
          fetched.src = el.src;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        this.popup = document.createElement('div');
        this.popup.setAttribute('data-dynamic-popup', this.__uid);
        this.popup.classList.add(this.baseClass);

        this.popupContent = document.createElement('div');
        this.popupContent.style.position = 'relative';
        this.popupContent.innerHTML = this.content;
        this.popupContent.classList.add(this.contentBase);

        this.chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.chevron.setAttribute('viewBox', '0 0 2 2');
        this.chevron.setAttribute('preserveAspectRatio', 'xMinYMin meet');
        this.chevron.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.chevron.classList.add(this.chevronBase);

        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', "1,0.8 0,2 2,2");
        polygon.setAttribute('style', 'fill:currentColor');
        this.chevron.appendChild(polygon);

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.classes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var className = _step2.value;

            this.popup.classList.add(className);
            this.popupContent.classList.add(className + "__content");
            this.chevron.classList.add(className + "__chevron");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.popup.appendChild(this.popupContent);
        this.popup.appendChild(this.chevron);
        document.body.appendChild(this.popup);

        setTimeout(function () {
          _this4.initialWidth = _this4.initialWidth || _this4.popup.getBoundingClientRect().width;
          _this4.position();
        }, 1);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.popup) {
          this.unbindEvents();
          this.popup.parentNode.removeChild(this.popup);
          this.popup = null;
          this.chevron = null;
        }
      }
    }, {
      key: "_onClickEl",
      value: function _onClickEl() {
        if (!this.popup) {
          this.render();
          this.bindEvents();
        } else if (this.popup) {
          this.destroy();
        }
      }
    }, {
      key: "_onClickAnyWhere",
      value: function _onClickAnyWhere(event) {
        var _this5 = this;

        if (this.popup) {
          var target = event.target;
          var parents = this._dir(target, 'parentNode');
          parents.push(target);
          var clickedOnEl = parents.filter(function (p) {
            return p == _this5.el;
          }).length;
          var clickedOnContent = parents.filter(function (p) {
            return p == _this5.popup;
          }).length;

          if (!clickedOnContent && !clickedOnEl) {
            this.destroy();
          }
        }
      }

      // From jquery source. Traverse through all parent nodes.
    }, {
      key: "_dir",
      value: function _dir(elem, dir) {
        var matched = [];

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            matched.push(elem);
          }
        }
        return matched;
      }
    }, {
      key: "readDOMValues",
      value: function readDOMValues(callback) {
        var _this6 = this;

        setTimeout(function () {
          var scrollTop = (function () {
            var s1 = document.body.scrollTop;
            var s2 = document.documentElement.scrollTop;
            return Math.max(s1, s2);
          })();

          var scrollLeft = (function () {
            var s1 = document.body.scrollLeft;
            var s2 = document.documentElement.scrollLeft;
            return Math.max(s1, s2);
          })();

          var targetPosition = _this6.el.getBoundingClientRect();
          var popupPosition = _this6.popup.getBoundingClientRect();
          var gapWidth = _this6.chevron.getBoundingClientRect().width * .8;

          callback({
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            targetPosition: targetPosition,
            popupPosition: popupPosition,
            gapWidth: gapWidth
          });
        }, 1);
      }
    }, {
      key: "_position",
      value: function _position() {
        var _this7 = this;

        requestAnimationFrame(function () {
          _this7.readDOMValues(function (values) {
            var scrollTop = values.scrollTop;
            var scrollLeft = values.scrollLeft;
            var targetPosition = values.targetPosition;
            var popupPosition = values.popupPosition;
            var gapWidth = values.gapWidth;

            var direction = _this7.direction;
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var targetTop = targetPosition.top + scrollTop;
            var targetLeft = targetPosition.left + scrollLeft;
            var targetWidth = targetPosition.width;
            var targetHeight = targetPosition.height;

            var initialPopupWidth = _this7.initialWidth;
            var popupWidth = popupPosition.width;
            var popupHeight = popupPosition.height;

            var top = {
              top: targetTop - popupHeight - gapWidth,
              bottom: targetTop + targetHeight + gapWidth,
              left: targetTop + targetHeight / 2 - popupHeight / 2,
              right: targetTop + targetHeight / 2 - popupHeight / 2
            };

            var left = {
              top: targetLeft + targetWidth / 2 - popupWidth / 2,
              bottom: targetLeft + targetWidth / 2 - popupWidth / 2,
              left: targetLeft - popupWidth - gapWidth,
              right: targetLeft + targetWidth + gapWidth
            };

            var chevronStyle = {
              top: {
                'top': "auto",
                'bottom': "0",
                'left': targetLeft - left.top + targetWidth / 2 + "px",
                '-webkit-transform': 'rotate(180deg) translate(50%, -100%) translateZ(0)',
                'transform': 'rotate(180deg) translate(50%, -100%) translateZ(0)'
              },
              bottom: {
                'bottom': "auto",
                'top': "0",
                'left': targetLeft - left.top + targetWidth / 2 + "px",
                '-webkit-transform': 'rotate(0deg) translate(-50%, -100%) translateZ(0)',
                'transform': 'rotate(0deg) translate(-50%, -100%) translateZ(0)'
              },
              left: {
                'bottom': "auto",
                'top': popupHeight / 2 + "px",
                'left': popupWidth + "px",
                '-webkit-transform': 'rotate(90deg) translate(-50%, 0%) translateZ(0)',
                'transform': 'rotate(90deg) translate(-50%, 0%) translateZ(0)'
              },
              right: {
                'bottom': "auto",
                'top': popupHeight / 2 + "px",
                'left': "0",
                '-webkit-transform': 'rotate(-90deg) translate(50%, -100%) translateZ(0)',
                'transform': 'rotate(-90deg) translate(50%, -100%) translateZ(0)'
              }
            };

            var posX = left[direction];
            var posY = top[direction];
            var chevronPos = chevronStyle[direction];

            var doesOverflowToLeft = posX <= 0;
            var doesOverflowToRight = posX + popupWidth >= windowWidth;
            var doesOverflowToTop = posY - scrollTop <= 0;
            var doesOverflowToBottom = posY + popupHeight - scrollTop >= windowHeight;

            if (doesOverflowToLeft) {
              if (direction === 'top' || direction === 'bottom') {
                posX -= posX;
                chevronPos.left = targetLeft + targetWidth / 2 + "px";
              }
              if (_this7.direction === 'left') {
                posX = left.right;
                chevronPos = chevronStyle.right;
              }
            }

            if (doesOverflowToRight) {
              if (direction === 'top' || direction === 'bottom') {
                posX = windowWidth + scrollLeft - (initialPopupWidth + 2);
                if (posX <= 0 || initialPopupWidth === 0) {
                  posX = windowWidth + scrollLeft - popupWidth;
                }

                chevronPos.left = targetLeft - posX + targetWidth / 2 + "px";
              }
              if (direction === 'right') {
                if (left.left > 0) {
                  posX = left.left;
                  chevronPos = chevronStyle.left;
                }
              }
            }

            if (doesOverflowToTop) {
              if (direction === 'right' || direction === 'left') {
                var diff = scrollTop - posY;
                if (!(diff > popupHeight / 4)) {
                  posY += diff;
                  chevronPos.top = parseInt(chevronPos.top, 10) - diff + "px";
                }
              }
              if (direction === 'top') {
                posY = top.bottom;
                var _chevronLeft = chevronPos.left;
                chevronPos = chevronStyle.bottom;
                chevronPos.left = _chevronLeft;
              }
            }

            if (doesOverflowToBottom) {
              if (direction === 'right' || direction === 'left') {
                var diff = posY + popupHeight - scrollTop - windowHeight;
                if (!(diff > popupHeight / 4)) {
                  posY -= diff;
                  chevronPos.top = parseInt(chevronPos.top, 10) + diff + "px";
                }
              }
              if (direction === 'bottom') {
                posY = top.top;
                var _chevronLeft = chevronPos.left;
                chevronPos = chevronStyle.top;
                chevronPos.left = _chevronLeft;
              }
            }

            requestAnimationFrame(function () {
              var popupStyle = "; left: " + posX + "px; top: " + posY + "px";
              if (!_this7.popup.style.cssText.match(/opacity/)) {
                popupStyle += '; opacity: 1';
              }
              _this7.popup.style.cssText += popupStyle;

              var chevronStyle = '';
              for (var rule in chevronPos) {
                if (chevronPos.hasOwnProperty(rule)) {
                  chevronStyle += "; " + rule + ": " + chevronPos[rule];
                }
              }
              if (!_this7.chevron.style.cssText.match(/opacity/)) {
                chevronStyle += '; opacity: 1';
              }
              _this7.chevron.style.cssText += chevronStyle;
            });
          });
        });
      }
    }]);

    return Popup;
  })();

  return Popup;
});
