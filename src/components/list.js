import React from "react"
import Bacon from "baconjs"
import {all} from "lodash"
import Item from "./item"

export default model => {
  return Bacon.combineWith(
    model.displayedTodosP,
    (todos) => (
      <ul id="todo-list">
        {todos.map(TodoItem(model))}
      </ul>
    ))
}

const TodoItem = model => todo => {
  const {markTodoAsComplete, removeTodo, updateTodoText} = model.actions
  const {id} = todo
  const actions = {
    update: (text, onReady) => updateTodoText({id, text, onReady}),
    remove: (onReady) => removeTodo({id, onReady}),
    markAsComplete: (completed, onReady) => markTodoAsComplete({id, completed, onReady})
  }
  return <Item key={id} actions={actions} {...todo} />
}
