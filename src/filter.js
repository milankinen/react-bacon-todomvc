
const Bacon = require('baconjs')

module.exports = {
  toProperty: function(initialFilter) {
    return Bacon.constant(initialFilter)
  }
}
