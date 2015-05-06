
const React      = require('react'),
      TodoList   = require('./todoList'),
      TodoFooter = require('./todoFooter'),
      todos      = require('./todos')


module.exports = React.createClass({

  getInitialState: function() {
    return {text: ''}
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value})
  },

  handleKeyDown: function(e) {
    if (e.which === 13 && this.state.text) {   // 13 == enter
      todos.createItem(this.state.text)
      this.setState({text: ''})
    }
  },

  render: function() {
    return (
      <div>
        <header id="header">
          <h1>todos</h1>
          <input
            id="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
            />
        </header>
        <TodoList items={this.props.items} />
        <TodoFooter items={this.props.items} filter={this.props.filter} />
      </div>
    )
  }

})
