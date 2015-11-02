import React from "react"
import classNames from "classnames"
import {findDOMNode} from "react-dom"


export default React.createClass({
  getInitialState() {
    return {editing: false}
  },

  startEditing() {
    const node = findDOMNode(this.refs.editField)
    node.focus()
    node.setSelectionRange(0, node.value.length)
    this.setState({editing: true, editedText: this.props.text})
  },

  stopEditing() {
    const {editedText, editing} = this.state
    const {update, remove} = this.props.actions
    const onReady = () => {
      if (this.isMounted()) {
        this.setState({editing: false, editedText: ""})
      }
    }

    if (editing) {
      if (editedText) {
        update(editedText, onReady)
      } else {
        remove(onReady)
      }
    }
  },

  handleKeyDown(e) {
    if (e.which === 13) {
      this.stopEditing()
    }
  },

  handleTextChange(e) {
    this.setState({editedText: e.target.value})
  },

  render() {
    const {text, completed, actions: {remove, markAsComplete}} = this.props
    const {editing, editedText} = this.state
    const displayedText = editing ? editedText : text

    return (
      <li className={classNames({editing, completed})}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={e => markAsComplete(e.target.checked)}
            checked={completed}
            />
          <label onDoubleClick={this.startEditing}>
            {text}
          </label>
          <button className="destroy" onClick={() => remove()}/>
        </div>
        <input
          ref="editField"
          className="edit"
          value={displayedText}
          onBlur={this.stopEditing}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          />
      </li>
    )
  }
})


