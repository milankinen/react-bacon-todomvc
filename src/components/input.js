import React from "react"
import {createAction} from "megablob"

export default (model) => {
  const {createTodo} = model.actions
  const setText = createAction()
  const handleInputChange = e => setText(e.target.value)
  const handleEsc = text => e => {
    if (e.which === 13) {
      createTodo({text, onReady: () => setText("")})
    }
  }

  const textP = setText.$.toProperty("")

  return textP.map(text => (
    <input
      id="new-todo"
      placeholder="What needs to be done?"
      autoFocus={true}
      value={text}
      onChange={handleInputChange}
      onKeyDown={handleEsc(text)}
      />
  ))
}

