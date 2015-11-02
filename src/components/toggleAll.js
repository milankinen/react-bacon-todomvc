import React from "react"
import Bacon from "baconjs"
import {all} from "lodash"

export default model => {
  const {markAllAsComplete} = model.actions

  return Bacon.combineWith(
    model.isAllCompletedP,
    (allCompleted) => (
      <input
        id="toggle-all"
        type="checkbox"
        checked={allCompleted}
        onChange={e => markAllAsComplete(e.target.checked)}
        />
    ))
}
