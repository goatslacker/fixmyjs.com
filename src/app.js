(function() {
  var About, Editor, Options, Scrim;
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
    Editor.prototype.hint = function() {
      var code, result;
      code = this.editor.getSession().getValue();
      result = JSHINT(code, Options.options);
      if (!result) {
        code = fixMyJS(JSHINT.data(), code).run();
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
  Options = (function() {
    function Options() {}
    Options.options = {
      asi: false,
      auto_indent: false,
      debug: false,
      immed: true,
      indent: 4,
      indentpref: "spaces",
      lastsemic: false,
      laxbreak: true,
      shadow: false,
      sub: false,
      supernew: false,
      white: false
    };
    Options.setOption = function(opt, val) {
      return this.options[opt] = val;
    };
    Options.toggle = function() {
      if (Scrim.isShowing) {
        return Options.hide();
      } else {
        return Options.show();
      }
    };
    Options.show = function() {
      Scrim.show();
      $("datalist").addClass("open");
      return setTimeout((function() {
        if (Scrim.isShowing) {
          return $("span.close").addClass("visible");
        }
      }), 1000);
    };
    Options.hide = function() {
      $("span.close").removeClass("visible");
      return setTimeout((function() {
        if (Scrim.isShowing) {
          $("datalist").removeClass("open");
          return Scrim.hide();
        }
      }), 200);
    };
    return Options;
  })();
  About = (function() {
    function About() {}
    About.isOpen = false;
    About.close = function() {
      if (this.isOpen) {
        $("aside").removeClass("bounceIn").addClass("bounceOut");
      }
      setTimeout((__bind(function() {
        if (!this.isOpen) {
          return $("aside").hide();
        }
      }, this)), 1000);
      clearTimeout(this.timer);
      return this.isOpen = false;
    };
    About.open = function() {
      $("aside").removeClass("bounceOut").addClass("bounceIn").show();
      this.timer = setTimeout(About.close, 7500);
      return this.isOpen = true;
    };
    return About;
  })();
  $.domReady(function() {
    var env;
    Editor.fullScreen();
    env = new Editor();
    $("datalist input").each(function(el) {
      return $(el).on("click", function(event) {
        var name;
        name = event.target.name;
        switch (name) {
          case "indentpref":
            return Options.setOption(name, event.target.value);
          case "indent":
            break;
          default:
            return Options.setOption(name, event.target.checked);
        }
      });
    });
    $("datalist input.optText").on("change", (function(event) {
      return Options.setOption(event.target.name, Number(event.target.value));
    }));
    $("span.close").on("click", function() {
      return Options.hide();
    });
    $("#options").on("click", function() {
      return Options.toggle();
    });
    $("button").on("click", (function() {
      return env.hint();
    }));
    $("#about").on("click", function() {
      return About.open();
    });
    return $("aside").on("click", function() {
      return About.close();
    }).hide().addClass("animated");
  });
}).call(this);
