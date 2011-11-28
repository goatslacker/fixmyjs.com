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

  hint: ->
    code = @editor.getSession().getValue()
    result = JSHINT code, Options.options
    return yes if result

    fix = fixMyJS JSHINT.data(), code

    try
      fix.run()
    catch error
      alert error + " Try hitting Fix It again to fix the remaining errors."

    @editor.getSession().setValue fix.getCode()

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


class Options

  @options:
    asi: false
    auto_indent: false
    debug: false
    immed: true
    indent: 4
    indentpref: "spaces"
    lastsemic: false
    laxbreak: true
    maxerr: 500
    shadow: false
    sub: false
    supernew: false
    trailing: true
    white: false

  @setOption: (opt, val) ->
    @options[opt] = val

  @toggle: ->
    if Scrim.isShowing
      Options.hide()
    else
      Options.show()

  @show: ->
    Scrim.show()
    $("datalist").addClass "open"

    setTimeout((->
      if Scrim.isShowing
        $("span.close").addClass "visible"
    ), 1000)

  @hide: ->
    $("span.close").removeClass "visible"

    setTimeout((->
      if Scrim.isShowing
        $("datalist").removeClass "open"
        Scrim.hide()
    ), 200)


class About

  @isOpen: false

  @close: ->
    if @isOpen
      $("aside")
        .removeClass("bounceIn")
        .addClass("bounceOut")

    setTimeout((=>
      if !@isOpen
        $("aside").hide()
    ), 1000)

    clearTimeout @timer

    @isOpen = false

  @open: ->
    $("aside")
      .removeClass("bounceOut")
      .addClass("bounceIn")
      .show()

    @timer = setTimeout About.close, 7500

    @isOpen = true


$.domReady ->
  Editor.fullScreen()
  env = new Editor()

  # Event Listeners
  $("datalist input").each((el) ->
    $(el).on("click", (event) ->
      name = event.target.name
      switch name
        when "indentpref" then Options.setOption name, event.target.value
        when "indent" then # nothing
        else Options.setOption name, event.target.checked
    )
  )
  $("datalist input.optText").on("change", ((event) ->
    Options.setOption event.target.name, Number event.target.value
  ))
  $("span.close").on("click", -> Options.hide())
  $("#options").on("click", -> Options.toggle())
  $("button").on("click", (-> env.hint()))
  $("#about").on("click", -> About.open())
  $("aside").on("click", -> About.close()).hide().addClass("animated")
