
const React = require('react'),
      todos = require('./todos')


module.exports = React.createClass({

  startEditing: function() {
    const node = React.findDOMNode(this.refs.editField),
          item = this.props.item

    todos.setEditing(item.id, true)
    node.focus()
    node.setSelectionRange(0, node.value.length)
  },

  stopEditing: function() {
    const item = this.props.item
    if (item.title) {
      todos.setEditing(item.id, false)
    } else {
      todos.removeItem(item.id)
    }
  },

  handleKeyDown: function(e) {
    if (e.which === 13) {
      this.stopEditing()
    }
  },

  handleChange: function(e) {
    todos.setTitle(this.props.item.id, e.target.value)
  },

  render: function() {
    const item = this.props.item
    return (
      <li className={item.states.join(' ')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={e => todos.setCompleted(item.id, e.target.checked)}
            checked={todos.isCompleted(item)}
            />
          <label onDoubleClick={this.startEditing}>
            {item.title}
          </label>
          <button className="destroy" onClick={() => todos.removeItem(item.id)}/>
        </div>
        <input
          ref="editField"
          className="edit"
          value={item.title}
          onBlur={this.stopEditing}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          />
      </li>
    )
  }
})


