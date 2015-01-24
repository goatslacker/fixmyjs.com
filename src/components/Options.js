var React = require('react')

var OptionsActions = require('../actions/OptionsActions')
var OptionsStore = require('../stores/OptionsStore')

var Options = React.createClass({
  getInitialState() {
    return OptionsStore.getState()
  },

  componentDidMount() {
    OptionsStore.listen(this._onChange)
  },

  _onChange() {
    this.setState(OptionsStore.getState())
  },

  toggle(ev) {
    var { key } = ev.target.dataset
    OptionsActions.toggle(key)
  },

  render() {
    return (
      <div className="sp-vert-sm">
        {Object.keys(this.state.options).map((option) => {
          return (
            <label key={option} className="sp-horiz-sm">
              <input
                type="checkbox"
                checked={this.state.options[option]}
                data-key={option}
                onChange={this.toggle} />
              {' '}
              {option}
            </label>
          )
        })}
      </div>
    )
  }
})

module.exports = Options
