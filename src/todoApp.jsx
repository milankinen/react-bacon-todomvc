
const React    = require('react'),
      TodoList = require('./todoList')


module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <header id="header">
          <h1>todos</h1>
          <input
            id="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            />
        </header>
        <TodoList items={this.props.items} />
      </div>
    )
  }

})
