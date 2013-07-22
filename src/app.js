(function() {
  var Options, Scrim;

  function Editor() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      theme: 'default',
      lineNumbers: true
    });
    this.editor.focus();
  }

  Editor.prototype.hint = function() {
    this.editor.setValue(fixMyJS.fix(this.editor.getValue(), Options.options))
  };

  Editor.getOptions = function() {
    return {};
  };

  Scrim = (function() {

    function Scrim() {}

    Scrim.scrim = (function() {
      var el, val;
      el = document.createElement("div");
      document.body.appendChild(el);
      val = $(el);
      val.css({
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.8)",
        zIndex: "9000",
        width: "1920px",
        height: "1080px"
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
      maxerr: 500,
      sub: false,
      supernew: false,
      trailing: true,
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
      $("section.options").addClass("open");
      return setTimeout((function() {
        if (Scrim.isShowing) return $("span.close").addClass("visible");
      }), 1000);
    };

    Options.hide = function() {
      $("span.close").removeClass("visible");
      return setTimeout((function() {
        if (Scrim.isShowing) {
          $("section.options").removeClass("open");
          return Scrim.hide();
        }
      }), 200);
    };

    return Options;

  })();

  function About() {}
  About.isOpen = false;
  About.close = function() {
    var id = "aside#about_dialog"
    var _this = this;
    if (this.isOpen) $(id).removeClass("bounceIn").addClass("bounceOut");
    setTimeout((function() {
      if (!_this.isOpen) return $(id).hide();
    }), 1000);
    clearTimeout(this.timer);
    return this.isOpen = false;
  };

  About.open = function() {
    var id = "aside#about_dialog"
    $(id).removeClass("bounceOut").addClass("bounceIn").show();
    this.timer = setTimeout(About.close, 7500);
    return this.isOpen = true;
  };


  var Legacy = {
    isOpen: false,
    close: function () {
      var id = "aside#legacy_dialog"
      var _this = this;
      if (this.isOpen) $(id).removeClass("bounceIn").addClass("bounceOut");
      setTimeout((function() {
        if (!_this.isOpen) return $(id).hide();
      }), 1000);
      clearTimeout(this.timer);
      return this.isOpen = false;
    },
    open: function () {
      var id = "aside#legacy_dialog"
      $(id).removeClass("bounceOut").addClass("bounceIn").show();
      this.timer = setTimeout(Legacy.close, 7500);
      return this.isOpen = true;
    }
  }

  $.domReady(function() {
    var env;
    env = new Editor();
    $("section.options input").each(function(el) {
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
    $("section.options input.optText").on("change", (function(event) {
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
    $("#legacy").on("click", function() {
      return Legacy.open();
    });
    $("aside#about_dialog").on("click", function() {
      return About.close();
    }).hide().addClass("animated");
    $("aside#legacy_dialog").on("click", function() {
      return Legacy.close();
    }).hide().addClass("animated");
  });

}).call(this);
