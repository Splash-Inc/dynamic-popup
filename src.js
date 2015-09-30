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
  class Popup {
    constructor (options) {
      this.__uid = new Date().getTime()
      this.el = options.el
      this.content = options.content
      this.classes = typeof options.className === 'string' ?
          [options.className] : options.className
      this.direction = options.direction || 'bottom'
      this.popup = null
      this.chevron = null
      this.chevronWidth = options.chevronWidth || 12
      this.prefetch = options.enablePrefetch

      // Classes
      this.baseClass = 'dynamic-popup'
      this.contentBase = `${this.baseClass}__content`
      this.chevronBase = `${this.baseClass}__chevron`

      this.position = () => {this._position()}
      this.onClickEl = () => {this._onClickEl()}
      this.onClickAnyWhere = (e) => {this._onClickAnyWhere(e)}

      this.el.addEventListener('click', this.onClickEl)

      this.styles = {
        [`.${this.baseClass}`]: [
          'position: absolute',
          'padding: 10px',
          'background: rgba(0, 0, 0, .85)',
          'color: #fff',
          'box-shadow: 2px 2px 10px rgba(0, 0, 0, .4)',
          'webkit-transition: all .1s',
          'transition: all .1s'
        ],
        [`.${this.contentBase}
        h1, h2, h3, h4, h4, h5, h6,
        blockquote, pre, span
        dl, dt, dd, ol, ul, li,
        table, caption, tbody, tfoot,
        thead, tr, th, td,
        p, img, ul, ol, dl li`]: [
          'margin: 0',
          'padding: 0'
        ],
        [`.${this.chevronBase}`]: [
          'position: absolute',
          'color: rgba(0, 0, 0, .85)'
        ]
      }

      this.stylize()
      if (this.prefetch) {
        this.preFetchResources()
      }

      return this
    }

    bindEvents() {
      window.addEventListener('resize', this.position)
      window.addEventListener('scroll', this.position)
      document.body.addEventListener('click', this.onClickAnyWhere)
    }

    unbindEvents() {
      window.removeEventListener('resize', this.position)
      window.removeEventListener('scroll', this.position)
      document.body.removeEventListener('click', this.onClickAnyWhere)
    }

    stylize() {
      var styleId = 'dynamic-popup-styles'
      var existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        return
      }

      var sheet = (function() {
        var style = document.createElement("style");
        style.id = styleId
        style.appendChild(document.createTextNode(""));
        document.head.insertBefore(
          style, document.head.firstChild);
        return style.sheet;
      })();

      function addCSSRule(sheet, selector, rules, index) {
        if("insertRule" in sheet) {
          sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
          sheet.addRule(selector, rules, index);
        }
      }

      for (let selector in this.styles) {
        if (this.styles.hasOwnProperty(selector)) {
          for (let rule of this.styles[selector]) {
            addCSSRule(sheet, selector, rule)
          }
        }
      }
    }

    preFetchResources() {
      var container = document.createElement('div')
      container.innerHTML = this.content
      var images = [].slice.call(container.querySelectorAll('img'))

      for (let img of images) {
        let fetched = new Image()
        fetched.src = img.src
      }
    }

    render() {
      this.popup = document.createElement('div')
      this.popup.setAttribute('data-dynamic-popup', this.__uid)
      this.popup.classList.add(this.baseClass)

      this.popupContent = document.createElement('div')
      this.popupContent.style.position = 'relative'
      this.popupContent.innerHTML = this.content
      this.popupContent.classList.add(this.contentBase)

      this.chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      this.chevron.setAttribute('width', `${this.chevronWidth}`)
      this.chevron.setAttribute('height', `${this.chevronWidth}`)
      this.chevron.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
      this.chevron.classList.add(this.chevronBase)

      var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      polygon.setAttribute('points', `${this.chevronWidth / 2},${this.chevronWidth / 1.8} 0,${this.chevronWidth} ${this.chevronWidth},${this.chevronWidth}`)
      polygon.setAttribute('style', 'fill:currentColor')
      this.chevron.appendChild(polygon)

      for (let className of this.classes) {
        this.popup.classList.add(className)
        this.popupContent.classList.add(`${className}__content`)
        this.chevron.classList.add(`${className}__chevron`)
      }

      this.popup.appendChild(this.popupContent)
      this.popup.appendChild(this.chevron)

      document.body.appendChild(this.popup)
      this.position()
    }

    destroy() {
      if (this.popup) {
        this.unbindEvents()
        this.popup.parentNode.removeChild(this.popup);
        this.popup = null;
        this.chevron = null
      }
    }

    _onClickEl() {
      if (!this.popup) {
        this.render()
        this.bindEvents()
      } else if (this.popup) {
        this.destroy()
      }
    }

    _onClickAnyWhere(event) {
      if (this.popup) {
        let target = event.target
        let parents = this._dir(target, 'parentNode')
        parents.push(target)
        let clickedOnEl = parents.filter(p => p == this.el).length
        let clickedOnContent = parents.filter(p => p == this.popup).length

        if (!clickedOnContent && !clickedOnEl) {
          this.destroy()
        }
      }
    }

    // From jquery source. Traverse through all parent nodes.
    _dir(elem, dir) {
      var matched = []

      while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
        if ( elem.nodeType === 1 ) {
          matched.push( elem );
        }
      }
      return matched;
    }

    _position() {
      var el = this.el;
      var popup = this.popup;
      var direction = this.direction;

      var targetTop = el.offsetTop;
      var targetLeft = el.offsetLeft;
      var targetWidth = el.offsetWidth;
      var targetHeight = el.offsetHeight;

      var popupTop = popup.offsetTop;
      var popupWidth = popup.offsetWidth;
      var popupHeight = popup.offsetHeight;

      var scrollTop = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      )

      var gapWidth = 10;
      var chevronWidth = this.chevronWidth

      var top = {
        top: targetTop - popupHeight - gapWidth,
        bottom: targetTop + targetHeight + gapWidth,
        left: targetTop + (targetHeight / 2) - (popupHeight / 2),
        right: targetTop + (targetHeight / 2) - (popupHeight / 2)
      }

      var left = {
        top: targetLeft + (targetWidth / 2) - (popupWidth / 2),
        bottom: targetLeft + (targetWidth / 2) - (popupWidth / 2),
        left: targetLeft - popupWidth - gapWidth,
        right: targetLeft + targetWidth + gapWidth
      }

      var chevron = {
        top: {
          'top': `auto`,
          'bottom': `-${chevronWidth}px`,
          'left': `${targetLeft - left.top + (targetWidth / 2)}px`,
          '-webkit-transform': 'rotate(180deg)',
          'transform': 'rotate(180deg)'
        },
        bottom: {
          'bottom': `auto`,
          'top': `-${chevronWidth}px`,
          'left': `${targetLeft - left.top + (targetWidth / 2)}px`,
          '-webkit-transform': 'rotate(0deg)',
          'transform': 'rotate(0deg)'
        },
        left: {
          'bottom': `auto`,
          'top': `${(targetTop - popupTop) + (targetHeight / 2)}px`,
          'left': `${popupWidth}px`,
          '-webkit-transform': 'rotate(90deg)',
          'transform': 'rotate(90deg)'
        },
        right: {
          'bottom': `auto`,
          'top': `${(targetTop - popupTop) + (targetHeight / 2)}px`,
          'left': `-${chevronWidth}px`,
          '-webkit-transform': 'rotate(-90deg)',
          'transform': 'rotate(-90deg)'
        }
      }

      var posX = left[direction]
      var posY = top[direction]
      var chevronPos = chevron[direction]

      if (posX <= 0) {
        if (direction === 'top' ||
            direction === 'bottom') {
          posX -= posX
          chevronPos.left = `${targetLeft + (targetWidth / 2)}px`
        }
        if (this.direction === 'left') {
          posX = left.right
          chevronPos = chevron.right
        }
      }

      if (posX + popupWidth >= window.innerWidth) {
        if (direction === 'top' ||
            direction === 'bottom') {
          posX += (window.innerWidth - (posX + popupWidth))
          chevronPos.left = `${(targetLeft - posX) + (targetWidth / 2) - (chevronWidth / 2)}px`
        }
        if (direction === 'right') {
          if (left.left > 0) {
            posX = left.left
            chevronPos = chevron.left
          }
        }
      }

      if (posY - scrollTop <= 0) {
        if (direction === 'right' ||
            direction === 'left') {

          let diff = scrollTop - posY
          if (!(diff > popupHeight / 4)) {
            posY += diff
          }
        }
        if (direction === 'top') {
          posY = top.bottom
          chevronPos = chevron.bottom
        }
      }

      if ((posY + popupHeight) - scrollTop >= window.innerHeight) {
        if (direction === 'right' ||
            direction === 'left') {
          let diff = ((posY + popupHeight) - scrollTop - window.innerHeight)
          if (!(diff > popupHeight / 4)) {
            posY -= diff
          }
        }
        if (direction === 'bottom') {
          posY = top.top
          chevronPos = chevron.top
        }
      }

      for (var rule in chevronPos) {
        if (chevronPos.hasOwnProperty(rule)) {
          this.chevron.style[rule] = chevronPos[rule]
        }
      }
      this.popup.style.left = `${posX}px`
      this.popup.style.top = `${posY}px`
    }
  }

  return Popup
})