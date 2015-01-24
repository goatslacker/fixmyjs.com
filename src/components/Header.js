var React = require('react')
var fixmyjs = require('fixmyjs')

var Header = React.createClass({
  render() {
    return (
      <div className="col c12 header">
        <header className="bg-black">
          <h1 className="txt-center txt-upper txt-light-gray sp-vert-sm">fixmyjs</h1>

          <div className="github">
            <iframe src="http://ghbtns.com/github-btn.html?user=jshint&repo=fixmyjs&type=watch&count=true&size=small"
              allowTransparency="true" frameBorder="0" scrolling="0" width="85px" height="20px"></iframe>
          </div>

          <nav className="nav">
            <ul>
              <li>
                <a href="https://github.com/jshint/fixmyjs">Download</a>
              </li>
              <li>
                <a href="https://github.com/jshint/fixmyjs/issues">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="http://josh.mit-license.org">License</a>
              </li>
              <li className="txt-light-gray">
                <small>version {fixmyjs.version}</small>
              </li>
            </ul>
          </nav>

          <div className="buttons txt-center">
            <button
              className="btn bg-green"
              onClick={this.props.onFix}>
              Fix
            </button>
            <button
              className="btn bg-green"
              onClick={this.props.onDiff}>
              Diff
            </button>
            <button
              className={'btn bg-green' + (this.props.options ? ' pressed' : '')}
              onClick={this.props.onOptions}>
              Options
            </button>
          </div>
        </header>
      </div>
    )
  }
})

module.exports = Header
