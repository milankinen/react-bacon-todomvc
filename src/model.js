import Bacon from "baconjs"
import _ from "lodash"
import {createAction} from "megablob"

export default (initialTodos) => {
  const actions = {
    createTodo: createAction(),
    markTodoAsComplete: createAction(),
    removeTodo: createAction(),
    updateTodoText: createAction(),
    markAllAsComplete: createAction(),
    clearCompletedTodos: createAction(),
    resetFilter: createAction()
  }

  const filterP =
    actions.resetFilter.$.toProperty("")

  const createTodoS =
    actions.createTodo.$
      .filter(({text}) => !!text)

  const removeTodoS =
    actions.removeTodo.$

  const markTodoAsCompleteS =
    actions.markTodoAsComplete.$

  const markAllAsCompleteS =
    actions.markAllAsComplete.$

  const clearCompletedS =
    actions.clearCompletedTodos.$

  const todosP = Bacon.update(initialTodos || [],
    [createTodoS], createTodo,
    [removeTodoS], removeTodo,
    [markTodoAsCompleteS], markAsComplete,
    [markAllAsCompleteS], markAllAsComplete,
    [clearCompletedS], clearCompletedTodos
  )

  const displayedTodosP = Bacon.combineWith(
    todosP,
    filterP,
    (todos, f) => f ? _.filter(todos, {completed: f === "completed"}) : todos
  )

  const itemsLeftP =
    todosP.map(todos => todos.filter(t => !t.completed).length)

  const isAllCompletedP =
    todosP.map(todos => _.all(todos, {completed: true}))


  return {
    actions,
    todosP,
    displayedTodosP,
    itemsLeftP,
    isAllCompletedP,
    filterP
  }


  function createTodo(todos, {text, onReady}) {
    const todo = {
      id: Date.now(),
      completed: false,
      text
    }
    invokeCallback(onReady)
    return [...todos, todo]
  }

  function removeTodo(todos, {id, onReady}) {
    invokeCallback(onReady)
    return _.reject(todos, {id})
  }

  function markAsComplete(todos, {id, completed, onReady}) {
    invokeCallback(onReady)
    return todos.map(todo => todo.id === id ? {...todo, completed} : todo)
  }

  function markAllAsComplete(todos, completed) {
    return todos.map(t => ({...t, completed}))
  }

  function clearCompletedTodos(todos) {
    return _.filter(todos, {completed: false})
  }

  function invokeCallback(cb) {
    if (_.isFunction(cb)) {
      cb.call()
    }
  }
}

