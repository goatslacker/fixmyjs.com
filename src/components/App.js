var React = require('react')
var fixmyjs = require('fixmyjs')
var diff = require('diff')

var CodeMirror = require('react-code-mirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/diff/diff')

var OptionsStore = require('../stores/OptionsStore')

var Header = require('./Header')
var Options = require('./Options')

var js = `
/**
* Type some JavaScript here and click either
* fix or diff.
*/
`

var App = React.createClass({
  getInitialState() {
    return {
      fixedjs: '',
      value: js,
      showOptions: false,
      options: OptionsStore.getState()
    }
  },

  componentDidMount() {
    OptionsStore.listen(this.onChange)
  },

  onChange() {
    this.setState({ options: OptionsStore.getState() })
  },

  fixthatjs() {
    try {
      return fixmyjs.fix(this.state.value, this.state.options.options)
    } catch (e) {
      console.log(e)
      return e.stack
    }
  },

  fix() {
    var fixedjs = this.fixthatjs()
    this.setState({ fixedjs, showOptions: false })
  },

  diff() {
    var fixedjs = this.fixthatjs()
    var patch = diff.createPatch('fixmyjs', this.state.value, fixedjs)
    this.setState({ fixedjs: patch, showOptions: false })
  },

  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions })
  },

  copyText(ev) {
    this.setState({ value: ev.target.value })
  },

  renderEditor() {
    return (
      <CodeMirror
        mode="javascript"
        theme="solarized light"
        defaultValue={this.state.value}
        lineNumbers={true}
        style={{ borderRight: '1px solid #3d3d3d' }}
        onChange={this.copyText} />
    )
  },

  renderDiff() {
    return (
      <div className={this.state.showOptions ? 'hide' : ''}>
        <CodeMirror
          mode="diff"
          theme="solarized light"
          value={this.state.fixedjs}
          lineNumbers={true}
          readOnly={true} />
      </div>
    )
  },

  renderOptions() {
    return (
      <div className={this.state.showOptions ? '' : 'hide'}>
        <Options />
      </div>
    )
  },

  render() {
    return (
      <div className="row">
        <Header
          onDiff={this.diff}
          onFix={this.fix}
          options={this.state.showOptions}
          onOptions={this.toggleOptions} />
        <div className="col c6 full-height">
          {this.renderEditor()}
        </div>
        <div className="col c6 full-height no-gutter bg-yellow txt-dark-gray">
          {this.renderOptions()}
          {this.renderDiff()}
        </div>
      </div>
    )
  }
})

module.exports = App
