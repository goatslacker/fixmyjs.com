class Editor

  constructor: ->
    @editor = ace.edit "code"
    @editor.setTheme "ace/theme/mango"
    JavaScriptMode = require("ace/mode/javascript").Mode
    @editor.getSession().setMode new JavaScriptMode

  options:
    white: true

  hint: ->
    code = @editor.getSession().getValue()
    result = JSHINT code, @options
    console.log result
    console.log JSHINT.errors


window.onload = ->
  env = new Editor()
  button = document.querySelector "button"
  button.addEventListener "click", (-> env.hint()), false
