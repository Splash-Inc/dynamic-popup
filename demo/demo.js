// Demo app
document.addEventListener('DOMContentLoaded', function () {

  function dom (selector) {
    if (selector[0] === '#') {
      return document.getElementById(selector.slice(1))
    }
    return document.querySelectorAll(selector)
  }

  var examples = {
    '1': {
      el: dom('#example-1'),
      className: ['ex-1', 'lorem'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'left',
      chevronWidth: 20
    },

    '2': {
      el: dom('#example-2'),
      className: 'ex-2',
      content: '<img src="http://lorempixel.com/100/100" />',
      direction: 'left',
      chevronWidth: 16,
      prefetch: true
    },

    '3': {
      el: dom('#example-3'),
      className: ['ex-3', 'ipsum'],
      content: '<img src="http://lorempixel.com/200/200" />',
      direction: 'left',
      chevronWidth: 7,
      prefetch: true
    },

    '4': {
      el: dom('#example-4'),
      className: 'ex-4',
      content: '<img src="http://lorempixel.com/400/400" />',
      direction: 'bottom',
      chevronWidth: 15
    },

    '5': {
      el: dom('#example-5'),
      className: ['ex-5', 'dolor'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'bottom',
      chevronWidth: 22
    },

    '6': {
      el: dom('#example-6'),
      className: 'ex-6',
      content: '<img src="http://lorempixel.com/800/800" />',
      direction: 'right',
      chevronWidth: 6,
      prefetch: true
    },

    '7': {
      el: dom('#example-7'),
      className: ['ex-7', 'sit'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'left',
      chevronWidth: 25
    },

    '8': {
      el: dom('#example-8'),
      className: 'ex-8',
      content: '<img src="http://lorempixel.com/150/150" />',
      direction: 'top',
      chevronWidth: 9,
      prefetch: true
    },

    '9': {
      el: dom('#example-9'),
      className: ['ex-9', 'amet'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'bottom',
      chevronWidth: 13
    },

    '10': {
      el: dom('#example-10'),
      className: 'ex-10',
      content: '<img src="http://lorempixel.com/450/450" />',
      direction: 'right',
      chevronWidth: 7
    },

    '11': {
      el: dom('#example-11'),
      className: ['ex-11', 'adipiscing'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'top',
      chevronWidth: 15
    },

    '12': {
      el: dom('#example-12'),
      className: ['ex-12', 'elit'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'top',
      chevronWidth: 20
    },

    '13': {
      el: dom('#example-13'),
      className: 'ex-13',
      content: '<img src="http://lorempixel.com/800/800" />',
      direction: 'right',
      chevronWidth: 6,
      prefetch: true
    },

    '14': {
      el: dom('#example-14'),
      className: ['ex-14', 'sit'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'left',
      chevronWidth: 25
    },

    '15': {
      el: dom('#example-15'),
      className: 'ex-15',
      content: '<img src="http://lorempixel.com/150/150" />',
      direction: 'top',
      chevronWidth: 9,
      prefetch: true
    },

    '16': {
      el: dom('#example-16'),
      className: ['ex-16', 'amet'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'bottom',
      chevronWidth: 13
    },

    '17': {
      el: dom('#example-17'),
      className: 'ex-17',
      content: '<img src="http://lorempixel.com/450/450" />',
      direction: 'right',
      chevronWidth: 7
    },

    '18': {
      el: dom('#example-18'),
      className: ['ex-18', 'adipiscing'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'top',
      chevronWidth: 15
    },

    '19': {
      el: dom('#example-19'),
      className: ['ex-19', 'adipiscing'],
      content: '<img src="http://lorempixel.com/450/450" />',
      direction: 'right',
      chevronWidth: 15,
      prefetch: true
    }
  }

  for (var key in examples) {
    if (examples.hasOwnProperty(key)) {
      new DynamicPopup(examples[key])
    }
  }

})