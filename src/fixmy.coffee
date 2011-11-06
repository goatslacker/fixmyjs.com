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

    code = fixMyJS JSHINT.data(), code if !result

    @editor.getSession().setValue code


window.onload = ->
  env = new Editor()
  button = document.querySelector "button"
  button.addEventListener "click", (-> env.hint()), false
