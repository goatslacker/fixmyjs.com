class Editor

  constructor: ->
    @editor = ace.edit "code"
    @editor.setTheme "ace/theme/mango"
    JavaScriptMode = require("ace/mode/javascript").Mode
    @editor.getSession().setMode new JavaScriptMode

    canon = require "pilot/canon"
    canon.addCommand(
      name: "myCommand"
      bindKey:
        win: "Ctrl-B"
        mac: "Command-B"
        sender: "editor"
      exec: (env, args, request) =>
        @hint()
    )

  options:
    white: true

  hint: ->
    code = @editor.getSession().getValue()
    result = JSHINT code, @options

    code = fixMyJS JSHINT.data(), code if !result

    @editor.getSession().setValue code

  @fullScreen: ->
    { width, height } = $("body").offset()
    $("section").css(
      width: "#{width}px"
      height: "#{height - 76}px"
    )
    $("code").css(
      width: "#{width}px"
      height: "#{height - 156}px"
    )


$.domReady ->
  Editor.fullScreen()
  env = new Editor()
  $("button").on("click", (-> env.hint()))
