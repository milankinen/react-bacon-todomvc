
const Bacon      = require('baconjs'),
      Dispatcher = require('./dispatcher')

const d = new Dispatcher()

module.exports = {
  toProperty: function(initialFilter) {
    return d.stream('reset').scan(initialFilter, (_, newFilter) => newFilter)
  },

  reset: function(newFilter) {
    window.location.hash = newFilter
    d.push('reset', newFilter)
  }
}
