const React  = require('react'),
      R      = require('ramda'),
      todos  = require('./todos'),
      filter = require('./filter')


module.exports = React.createClass({
  render: function() {
    const itemsLeft     = R.filter(R.compose(R.not, todos.isCompleted), this.props.items).length,
          currentFilter = this.props.filter

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>{itemsLeft}</strong> {itemsLeft === 1 ? 'item' : 'items'} left
        </span>
        <ul id="filters">
          {filterBtn({name: 'All', id: 'all'})}
          {' '}
          {filterBtn({name: 'Active', id: 'active'})}
          {' '}
          {filterBtn({name: 'Completed', id: 'completed'})}
        </ul>

        {this.props.items.length - itemsLeft > 0 ?
          <button
            id="clear-completed"
            onClick={todos.removeCompleted}>
            Clear completed
          </button>
          : ''
        }
      </footer>
    )

    function filterBtn({name, id}) {
      return (
        <li>
          <a className={currentFilter === id ? 'selected' : ''} onClick={R.partial(filter.reset, id)}>
            {name}
          </a>
        </li>
      )
    }
  }
})
