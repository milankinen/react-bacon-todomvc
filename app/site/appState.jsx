
let Bacon = require('baconjs')

module.exports = {
  init: function(initialModel) {
    // all application business logic here!
    return Bacon.combineTemplate(initialModel)
  }
}
