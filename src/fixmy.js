(function() {
  var Editor;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Editor = (function() {
    function Editor() {
      var JavaScriptMode, canon;
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
    Editor.prototype.options = {
      white: true
    };
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
    return Editor;
  })();
  $.domReady(function() {
    var env;
    Editor.fullScreen();
    env = new Editor();
    return $("button").on("click", (function() {
      return env.hint();
    }));
  });
}).call(this);
