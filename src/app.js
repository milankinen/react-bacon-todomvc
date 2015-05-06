
const React   = require('react'),
      Bacon   = require('baconjs'),
      TodoApp = require('./todoApp'),
      todos   = require('./todos'),
      filter  = require('./filter')


const filterP = filter.toProperty('all'),
      itemsP  = todos.toItemsProperty([{id: Date.now(), title: 'foobar', states: []}], filterP)

const appState = Bacon.combineTemplate({
  items: itemsP,
  filter: filterP
})

appState.onValue((state) => {
  React.render(<TodoApp {...state} />, document.getElementById('todoapp'))
})
