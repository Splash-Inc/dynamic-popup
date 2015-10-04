# Dynamic Popup

A tooltip with a fully customizable content and style. It's triggered by click
event on the target you specify. It'll relocate itself if it overflows the user's
viewport.

[Live Demo](http://codepen.io/pavlovsk/pen/epBKeK)

## Usage

You can install the package with NPM.
`npm i dynamic-popup`

Or just download the minified file.

After downloading files,

```js
var DynamicPopup = require('dynamic-popup')
```

or

```js
define(['path/to/dynamic-popup'], /*...*/)
```

or

```
<script type='text/javascript' src='path/to/dynamic-popup.min.js' />
```

and

```js
new DynamicPopup({
  el: document.getElementById('example-target'),
  content: '<p>hello</p>',
  className: 'my-example-popup',
  direction: 'right'
})

```

## Options

`el` and `content` are the only required parameters to get DynamicPopup properly work.
It has also some handy options.

`el`: Target element. When clicked, DynamicPopup will appear.

`content`: What will appear in popup. Can be any markup code.

`className | optional`: This can be either a string or an array of className strings.
You will have individual CSS selectors for each of them. e.g:

```js
DynamicPopup({
 // ...
 className: ['my-example-popup', 'my-info-popup']
 // ...
})
```

```css
.my-example-popup {/*...*/}
.my-example-popup__content {/*...*/}
.my-example-popup__chevron {/*...*/}

.my-info-popup {/*...*/}
.my-info-popup__content {/*...*/}
.my-info-popup__chevron {/*...*/}
```

`direction | optional`: What direction popup will appear to.
Can be 'top', 'left', 'right', 'bottom'. Default: 'bottom'.

`prefetch | optional`: If enabled, any external sources found in content will be
fetched before popup is visible. Can be used to enhance experience. Default: false

## Styling
DynamicPopup comes with little styling. It provides a set of CSS selectors that 
you can rely on when styling your popups. See demo for styling examples.

You can override default popup style.

```css
.dynamic-popup {/*...*/}
.dynamic-popup__content {/*...*/}
.dynamic-popup__chevron {/*...*/}
```

You can override a specific popup

```css
.my-example-popup {/*...*/}
.my-example-popup__content {/*...*/}
.my-example-popup__chevron {/*...*/}
```

## Notes

### .destroy()
DynamicPopup will destroy itself when clicked outside of popup but you may want
to destroy it yourself in some circumstances. In such cases, you can use:

```js
var myPopup = new DynamicPopup(/*...*/)

myPopup.destroy()
```

This will remove popup and its bindings from DOM.
