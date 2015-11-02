import {render} from "react-dom"
import {partialRight} from "lodash"
import Model from "./src/model"
import initTodoApp from "./src/todoApp"

const initialTodos = [
  {
    id: Date.now(),
    text: "Write some documentation",
    completed: false
  },
  {
    id: Date.now() + 1,
    text: "Commit changes",
    completed: true
  }
]

const renderApp = partialRight(render, document.getElementById("todoapp"))
initTodoApp(Model(initialTodos)).onValue(renderApp)
