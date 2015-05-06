
const Bacon       = require('baconjs'),
      R           = require('ramda'),
      Dispatcher  = require('./dispatcher')


const d = new Dispatcher()

module.exports = {
  toItemsProperty: function(initialItems, filterS) {
    const itemsS = Bacon.update(initialItems,
      [d.stream('remove')],           removeItem,
      [d.stream('create')],           createItem,
      [d.stream('addState')],         addItemState,
      [d.stream('removeState')],      removeItemState,
      [d.stream('removeCompleted')],  removeCompleteItems,
      [d.stream('updateTitle')],      updateItemTitle
    )

    return Bacon.combineAsArray([itemsS, filterS]).map(withDisplayStatus)


    function createItem(items, newItemTitle) {
      return items.concat([{id: Date.now(), title: newItemTitle, states: []}])
    }

    function removeItem(items, itemIdToRemove) {
      return R.reject(it => it.id === itemIdToRemove, items)
    }

    function removeCompleteItems(items) {
      return R.reject(isItemCompleted, items)
    }

    function addItemState(items, {itemId, state}) {
      return R.map(updateItem(itemId, it => R.merge(it, {states: R.union(it.states, [state])})), items)
    }

    function removeItemState(items, {itemId, state}) {
      return R.map(updateItem(itemId, it => R.merge(it, {states: R.reject(R.eq(state), it.states)})), items)
    }

    function updateItemTitle(items, {itemId, title}) {
      return R.map(updateItem(itemId, it => R.merge(it, {title})), items)
    }

    function withDisplayStatus([items, filter]) {
      function setDisplay(it) {
        const display = filter === 'completed' ? isItemCompleted(it) : filter === 'active' ? !isItemCompleted(it) : true
        return R.merge(it, {display})
      }
      return R.map(setDisplay, items)
    }
  },

  // "public" methods

  isCompleted: isItemCompleted,

  isEdited: isItemEdited,

  createItem: function(title) {
    d.push('create', title)
  },

  removeItem: function(itemId) {
    d.push('remove', itemId)
  },

  removeCompleted: function() {
    d.push('removeCompleted')
  },

  setTitle: function(itemId, title) {
    d.push('updateTitle', {itemId, title})
  },

  setCompleted: function(itemId, completed) {
    d.push(completed ? 'addState' : 'removeState', {itemId, state: 'completed'})
  },

  setAllCompleted: function(completed) {
    d.push(completed ? 'addState' : 'removeState', {itemId: 'all', state: 'completed'})
  },

  setEditing: function(itemId, editing) {
    d.push(editing ? 'addState' : 'removeState', {itemId, state: 'editing'})
  }

}


function isItemCompleted(item) {
  return R.contains('completed', item.states)
}

function isItemEdited(item) {
  return R.contains('editing', item.states)
}

function updateItem(itemId, fn) {
  return (it) => itemId === 'all' || it.id === itemId ? fn(it) : it
}

