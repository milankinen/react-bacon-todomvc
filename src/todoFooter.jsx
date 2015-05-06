const React = require('react'),
      R     = require('ramda'),
      todos = require('./todos')


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
          <li>
            <a className={currentFilter === 'all' ? 'selected' : ''}>
              All
            </a>
          </li>
          {' '}
          <li>
            <a className={currentFilter === 'active' ? 'selected' : ''}>
              Active
            </a>
          </li>
          {' '}
          <li>
            <a className={currentFilter === 'completed' ? 'selected' : ''}>
              Completed
            </a>
          </li>
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
  }
})
