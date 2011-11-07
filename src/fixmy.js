(function() {
  var Editor, Scrim;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Editor = (function() {
    function Editor(options) {
      var JavaScriptMode, canon;
      this.options = options != null ? options : Editor.getOptions();
      this.editor = ace.edit("code");
      this.editor.setTheme("ace/theme/mango");
      JavaScriptMode = require("ace/mode/javascript").Mode;
      this.editor.getSession().setMode(new JavaScriptMode);
      canon = require("pilot/canon");
      canon.addCommand({
        name: "myCommand",
        bindKey: {
          win: "Ctrl-B",
          mac: "Command-B",
          sender: "editor"
        },
        exec: __bind(function(env, args, request) {
          return this.hint();
        }, this)
      });
    }
    Editor.prototype.hint = function() {
      var code, result;
      code = this.editor.getSession().getValue();
      result = JSHINT(code, this.options);
      if (!result) {
        code = fixMyJS(JSHINT.data(), code);
      }
      return this.editor.getSession().setValue(code);
    };
    Editor.fullScreen = function() {
      var height, width, _ref;
      _ref = $("body").offset(), width = _ref.width, height = _ref.height;
      $("section").css({
        width: "" + width + "px",
        height: "" + (height - 76) + "px"
      });
      return $("code").css({
        width: "" + width + "px",
        height: "" + (height - 156) + "px"
      });
    };
    Editor.getOptions = function() {
      return {};
    };
    return Editor;
  })();
  Scrim = (function() {
    function Scrim() {}
    Scrim.scrim = (function() {
      var el, height, val, width, _ref;
      _ref = $("body").offset(), width = _ref.width, height = _ref.height;
      el = document.createElement("div");
      document.body.appendChild(el);
      val = $(el);
      val.css({
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.8)",
        zIndex: "9000",
        width: "" + width + "px",
        height: "" + height + "px"
      }).hide();
      return val;
    })();
    Scrim.isShowing = false;
    Scrim.toggle = function() {
      if (this.isShowing) {
        return Scrim.hide();
      } else {
        return Scrim.show();
      }
    };
    Scrim.show = function() {
      this.isShowing = !this.isShowing;
      return Scrim.scrim.show();
    };
    Scrim.hide = function() {
      this.isShowing = !this.isShowing;
      return Scrim.scrim.hide();
    };
    return Scrim;
  })();
  $.domReady(function() {
    var env;
    Editor.fullScreen();
    env = new Editor();
    $("button").on("click", (function() {
      return env.hint();
    }));
    return $("#options").on("click", function() {
      if (Scrim.isShowing) {
        $("aside").removeClass("open");
      } else {
        $("aside").addClass("open");
      }
      return Scrim.toggle();
    });
  });
}).call(this);
