class Editor

  constructor: (@options = Editor.getOptions()) ->
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

  @getOptions: ->
    { }


class Scrim

  @scrim: do ->
    { width, height } = $("body").offset()
    el = document.createElement "div"
    document.body.appendChild el

    val = $ el

    val.css(
      position: "fixed"
      top: 0
      left: 0
      background: "rgba(0, 0, 0, 0.8)"
      zIndex: "9000"
      width: "#{width}px"
      height: "#{height}px"
    ).hide()

    val

  @isShowing: false

  @toggle: ->
    if @isShowing
      Scrim.hide()
    else
      Scrim.show()

  @show: ->
    @isShowing = !@isShowing
    Scrim.scrim.show()

  @hide: ->
    @isShowing = !@isShowing
    Scrim.scrim.hide()


$.domReady ->
  Editor.fullScreen()
  env = new Editor()

  $("button").on("click", (-> env.hint()))

  $("#options").on("click", ->
    if Scrim.isShowing
      $("aside").removeClass "open"
    else
      $("aside").addClass "open"

    Scrim.toggle()
  )