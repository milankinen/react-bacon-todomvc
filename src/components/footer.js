import React from "react"
import Bacon from "baconjs"
import {createAction} from "megablob"

export default (model) => {
  const {resetFilter, clearCompletedTodos} = model.actions

  const Btn = (currentFilter, name, filterValue) =>
    <a className={currentFilter === filterValue ? 'selected' : ''}
       onClick={() => resetFilter(filterValue)}>
      {name}
    </a>


  return Bacon.combineWith(
    model.itemsLeftP,
    model.todosP.map(".length"),
    model.filterP,
    (itemsLeft, totalItems, filter) => (
      <footer id="footer">
        <span id="todo-count">
          <strong>{itemsLeft}</strong> {itemsLeft === 1 ? 'item' : 'items'} left
        </span>
        <ul id="filters">
          <li>{Btn(filter, "All", "")}</li>
          <li>{Btn(filter, "Active", "active")}</li>
          <li>{Btn(filter, "Completed", "completed")}</li>
        </ul>
        {totalItems - itemsLeft > 0 ?
          <button
            id="clear-completed"
            onClick={clearCompletedTodos}>
            Clear completed
          </button>
          : null
        }
      </footer>
    )
  )
}
