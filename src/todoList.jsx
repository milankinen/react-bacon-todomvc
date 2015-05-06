
const React = require('react'),
      R     = require('ramda')


module.exports = React.createClass({

  render: function() {
    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          />
        <ul id="todo-list">
          {R.map(renderItem, this.props.items)}
        </ul>
      </section>
    )
  }

})

function renderItem(item) {
  return <li>{item.name}</li>
}
