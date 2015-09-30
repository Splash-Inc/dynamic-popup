// Demo app
document.addEventListener('DOMContentLoaded', function () {

  function dom (selector) {
    if (selector[0] === '#') {
      return document.getElementById(selector.slice(1))
    }
    return document.querySelectorAll(selector)
  }

  new DynamicPopup({
    el: dom('#example-1'),
    className: ['ex-1', 'lorem'],
    content: '<h1>Hello World</h1>' +
    '<p>' +
      'Eros et accumsan; et iusto odio dignissim qui ' +
      'blandit praesent luptatum zzril delenit augue duis ' +
      'dolore! Facit eorum claritatem' +
    '</p>',
    direction: 'bottom',
    chevronWidth: 20,
    enablePrefetch: true
  })

  new DynamicPopup({
    el: dom('#example-2'),
    className: 'ex-2',
    content: '<img src="http://lorempixel.com/300/300" />',
    direction: 'right',
    chevronWidth: 7,
    enablePrefetch: true
  })

  new DynamicPopup({
    el: dom('#example-3'),
    className: ['ex-3', 'ipsum'],
    content: '<img src="http://lorempixel.com/100/100" />',
    direction: 'top',
    chevronWidth: 7,
    enablePrefetch: true
  })

  new DynamicPopup({
    el: dom('#example-4'),
    className: 'ex-4',
    content: '<img src="http://lorempixel.com/400/400" />',
    direction: 'bottom',
    chevronWidth: 7,
    enablePrefetch: false
  })

})