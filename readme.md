# Dynamic Popup

A tooltip that's triggered by click event on target. Target can be any element.
DynamicPopup relocate itself depending on the viewport's bounds.

## Usage

You can install the package with NPM.
`npm i dynamic-popup`

Or just download the minified file.
After downloading files,

```js
var DynamicPopup = require('dynamic-popup')
```

or

```
<script type='text/javscript' src='dynamic-popup.min.js' />
```

and

```js
new DynamicPopup({
  el: document.getElementById('example-target'),
  className: 'example-popup', // optional
  content: 'hello', // HTML markup
  direction: 'right' // optional, can also be 'left', 'bottom' and top.
  chevronWidth: 16 // optional
})

```