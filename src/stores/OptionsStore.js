var alt = require('../alt')
var fixmyjs = require('fixmyjs')

var OptionsActions = require('../actions/OptionsActions')

class OptionsStore {
  constructor() {
    this.bindActions(OptionsActions)
    this.options = OptionsStore.getDefaultOptions()
  }

  onToggle(option) {
    this.options[option] = !this.options[option]
  }

  static getDefaultOptions() {
    return Object.assign({}, fixmyjs.defaultOptions)
  }
}

module.exports = alt.createStore(OptionsStore, 'OptionsStore')
