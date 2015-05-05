
let React       = require('react'),
    lrAPI       = require('livereactload-api'),
    Application = require('./application'),
    appState    = require('./appState')


window.onload = () => {
  initApp(window.INITIAL_MODEL)
}

function initApp(model) {
  let stateStream = appState.init(model)
  stateStream.onValue((state) => {
    lrAPI.setState(state)
    React.render(<Application {...model} />, document.getElementById('app'))
  })
}

// enable live reloading (in dev-mode only)
lrAPI.onReload(() => initApp(lrAPI.getState()))
