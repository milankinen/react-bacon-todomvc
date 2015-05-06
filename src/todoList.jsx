
const React    = require('react'),
      R        = require('ramda'),
      TodoItem = require('./todoItem'),
      todos    = require('./todos')


module.exports = React.createClass({

  render: function() {
    const allCompleted = R.all(todos.isCompleted, this.props.items)
    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          checked={allCompleted}
          onChange={e => todos.setAllCompleted(e.target.checked)}
          />
        <ul id="todo-list">
          {R.map(it => it.display ? <TodoItem key={it.id} item={it} /> : '', this.props.items)}
        </ul>
      </section>
    )
  }

})
