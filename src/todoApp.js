import React from "react"
import Bacon from "baconjs"
import Input from "./components/input"
import ToggleAll from "./components/toggleAll"
import List from "./components/list"
import Footer from "./components/footer"

export default model =>
  Bacon.combineWith(
    Input(model),
    ToggleAll(model),
    List(model),
    Footer(model),
    (inputEl, toggleAllEl, listEl, footerEl) => (
      <div>
        <header id="header">
          <h1>todos</h1>
          {inputEl}
        </header>
        <section id="main">
          {toggleAllEl}
          {listEl}
        </section>
        {footerEl}
      </div>
    )
  )
