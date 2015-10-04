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
      this.defaultChevronWidth = 16
      this.asyncElements = ['img']
      this.prefetch = options.prefetch

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
          'background: rgba(0, 0, 0, .85)',
          'color: #fff',
          '-webkit-transition: all .1s',
          'transition: all .1s'
        ],
        [`.${this.baseClass} img`]: [
          'vertical-align: middle'
        ],
        [`.${this.chevronBase}`]: [
          'position: absolute',
          'color: rgba(0, 0, 0, .85)',
          `width: ${this.defaultChevronWidth}px`
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

      ;[].forEach.call(this.popup.querySelectorAll(this.asyncElements.join(',')), (el) => {
        if (!el.complete) {
          el.addEventListener('load', this.position)
        }
      })
    }

    unbindEvents() {
      window.removeEventListener('resize', this.position)
      window.removeEventListener('scroll', this.position)
      document.body.removeEventListener('click', this.onClickAnyWhere)

      ;[].forEach.call(this.popup.querySelectorAll(this.asyncElements.join(',')), (el) => {
        el.removeEventListener('load', this.position)
      })
    }

    stylize() {
      var styleId = 'dynamic-popup-styles'
      var existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        return
      }

      // see: http://davidwalsh.name/add-rules-stylesheets
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
      ;[].forEach.call(container.querySelectorAll(this.asyncElements.join(',')), (el) => {
        let fetched = document.createElement(el.tagName)
        fetched.src = el.src
      })
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
      this.chevron.setAttribute('viewBox', '0 0 2 2')
      this.chevron.setAttribute('preserveAspectRatio', 'xMinYMin meet')
      this.chevron.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
      this.chevron.classList.add(this.chevronBase)

      var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      polygon.setAttribute('points', `1,0.8 0,2 2,2`)
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
      var el = this.el
      var popup = this.popup
      var chevron = this.chevron
      var direction = this.direction

      var scrollTop = Math.max(
          document.body.scrollTop,
          document.documentElement.scrollTop
      )

      var scrollLeft = Math.max(
          document.body.scrollLeft,
          document.documentElement.scrollLeft
      )

      var windowWidth = window.innerWidth
      var windowHeight = window.innerHeight

      var targetPosition = el.getBoundingClientRect()
      var popupPosition = popup.getBoundingClientRect()

      var targetTop = targetPosition.top + scrollTop
      var targetLeft = targetPosition.left + scrollLeft
      var targetWidth = targetPosition.width
      var targetHeight = targetPosition.height

      var popupWidth = popupPosition.width
      var popupHeight = popupPosition.height

      var gapWidth = chevron.getBoundingClientRect().width * .8

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

      var chevronStyle = {
        top: {
          'top': `auto`,
          'bottom': `0`,
          'left': `${targetLeft - left.top + (targetWidth / 2)}px`,
          '-webkit-transform': 'rotate(180deg) translateX(50%) translateY(-100%)',
          'transform': 'rotate(180deg) translateX(50%) translateY(-100%)'
        },
        bottom: {
          'bottom': `auto`,
          'top': `0`,
          'left': `${targetLeft - left.top + (targetWidth / 2)}px`,
          '-webkit-transform': 'rotate(0deg) translateX(-50%) translateY(-100%)',
          'transform': 'rotate(0deg) translateX(-50%) translateY(-100%)'
        },
        left: {
          'bottom': `auto`,
          'top': `${(popupHeight / 2)}px`,
          'left': `${popupWidth}px`,
          '-webkit-transform': 'rotate(90deg) translate(-50%, 0%)',
          'transform': 'rotate(90deg) translate(-50%, 0%)'
        },
        right: {
          'bottom': `auto`,
          'top': `${(popupHeight / 2)}px`,
          'left': `0`,
          '-webkit-transform': 'rotate(-90deg) translate(50%, -100%)',
          'transform': 'rotate(-90deg) translate(50%, -100%)'
        }
      }

      var posX = left[direction]
      var posY = top[direction]
      var chevronPos = chevronStyle[direction]

      var doesOverflowToLeft = posX <= 0
      var doesOverflowToRight = posX + popupWidth >= windowWidth
      var doesOverflowToTop = posY - scrollTop <= 0
      var doesOverflowToBottom = (posY + popupHeight) - scrollTop >= windowHeight

      if (doesOverflowToLeft) {
        if (direction === 'top' ||
            direction === 'bottom') {
          posX -= posX
          chevronPos.left = `${targetLeft + (targetWidth / 2)}px`
        }
        if (this.direction === 'left') {
          posX = left.right
          chevronPos = chevronStyle.right
        }
      }

      if (doesOverflowToRight) {
        if (direction === 'top' ||
            direction === 'bottom') {
          posX += (windowWidth - (posX + popupWidth))
          chevronPos.left = `${(targetLeft - posX) + (targetWidth / 2)}px`
        }
        if (direction === 'right') {
          if (left.left > 0) {
            posX = left.left
            chevronPos = chevronStyle.left
          }
        }
      }

      if (doesOverflowToTop) {
        if (direction === 'right' ||
            direction === 'left') {
          let diff = scrollTop - posY
          if (!(diff > popupHeight / 4)) {
            posY += diff
            chevronPos.top = `${parseInt(chevronPos.top, 10) - diff}px`
          }
        }
        if (direction === 'top') {
          posY = top.bottom
          let _chevronLeft = chevronPos.left
          chevronPos = chevronStyle.bottom
          chevronPos.left = _chevronLeft
        }
      }

      if (doesOverflowToBottom) {
        if (direction === 'right' ||
            direction === 'left') {
          let diff = ((posY + popupHeight) - scrollTop - windowHeight)
          if (!(diff > popupHeight / 4)) {
            posY -= diff
            chevronPos.top = `${parseInt(chevronPos.top, 10) + diff}px`
          }
        }
        if (direction === 'bottom') {
          posY = top.top
          let _chevronLeft = chevronPos.left
          chevronPos = chevronStyle.top
          chevronPos.left = _chevronLeft
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