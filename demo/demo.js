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
      direction: 'left'
    },

    '2': {
      el: dom('#example-2'),
      className: 'ex-2',
      content: '<img src="http://placehold.it/100x100" />',
      direction: 'left',
      prefetch: true
    },

    '3': {
      el: dom('#example-3'),
      className: ['ex-3', 'ipsum'],
      content: '<img src="http://placehold.it/200x200" />',
      direction: 'left',
      prefetch: true
    },

    '4': {
      el: dom('#example-4'),
      className: 'ex-4',
      content: '<img src="http://placehold.it/400x400" />',
      direction: 'bottom'
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
      direction: 'bottom'
    },

    '6': {
      el: dom('#example-6'),
      className: 'ex-6',
      content: '<img src="http://placehold.it/800x800" />',
      direction: 'right',
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
      direction: 'left'
    },

    '8': {
      el: dom('#example-8'),
      className: 'ex-8',
      content: '<img src="http://placehold.it/150x150" />',
      direction: 'top',
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
      direction: 'bottom'
    },

    '10': {
      el: dom('#example-10'),
      className: 'ex-10',
      content: '<img src="http://placehold.it/450x450" />',
      direction: 'right'
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
      direction: 'top'
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
      direction: 'top'
    },

    '13': {
      el: dom('#example-13'),
      className: 'ex-13',
      content: '<img src="http://placehold.it/800x800" />',
      direction: 'right',
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
      direction: 'left'
    },

    '15': {
      el: dom('#example-15'),
      className: 'ex-15',
      content: '<img src="http://placehold.it/150x150" />',
      direction: 'top',
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
      direction: 'bottom'
    },

    '17': {
      el: dom('#example-17'),
      className: 'ex-17',
      content: '<img src="http://placehold.it/450x450" />',
      direction: 'right'
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
      direction: 'top'
    },

    '19': {
      el: dom('#example-19'),
      className: ['ex-19', 'adipiscing'],
      content: '<img src="http://placehold.it/450x450" />',
      direction: 'right',
      prefetch: true
    },

    '20': {
      el: dom('#example-20'),
      className: ['ex-20', 'lorem'],
      content: '<h1>Hello World</h1>' +
      '<p>' +
        'Eros et accumsan; et iusto odio dignissim qui ' +
        'blandit praesent luptatum zzril delenit augue duis ' +
        'dolore! Facit eorum claritatem' +
      '</p>',
      direction: 'top'
    },

    '21': {
      el: dom('#example-21'),
      className: ['ex-21', 'ipsum'],
      content: '<img src="http://placehold.it/450x450" />',
      direction: 'left',
      prefetch: true
    },

    '22': {
      el: dom('#example-22'),
      className: ['ex-22', 'dolor'],
      content: '<img src="http://placehold.it/250x250" />',
      direction: 'right',
      prefetch: true
    },

    '23': {
      el: dom('#example-23'),
      className: ['ex-23', 'sit'],
      content: '<img src="http://placehold.it/300x300" />',
      direction: 'bottom',
      prefetch: true
    }
  }

  for (var key in examples) {
    if (examples.hasOwnProperty(key)) {
      new DynamicPopup(examples[key])
    }
  }

})