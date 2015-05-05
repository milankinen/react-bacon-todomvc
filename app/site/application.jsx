
let React = require('react')

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Node.js quickstart</h1>
        <h2>{this.props.author}</h2>
      </div>
    )
  }
})
