var alt = require('../alt')

class OptionsActions {
  constructor() {
    this.generateActions('toggle')
  }
}

module.exports = alt.createActions(OptionsActions)
