@doHint = (code) ->
  result = JSHINT code, (white: true)
  console.log result
  console.log JSHINT.errors


window.onload = ->
  editor = ace.edit "code"
  editor.setTheme "ace/theme/mango"
  JavaScriptMode = require("ace/mode/javascript").Mode
  editor.getSession().setMode new JavaScriptMode
