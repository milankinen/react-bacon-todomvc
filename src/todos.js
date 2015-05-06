
const Bacon = require('baconjs'),
      R     = require('ramda')



module.exports = {
  toItemsProperty: function(initialItems, filterS) {
    const itemsS = Bacon.constant(initialItems)

    return Bacon
      .combineAsArray([itemsS, filterS])
      .map(updateItemsDisplayStatus)
  }
}

function updateItemsDisplayStatus([items, filter]) {
  return R.map(it => R.merge(it, {display: filter === 'all' || it.status === filter}), items)
}
