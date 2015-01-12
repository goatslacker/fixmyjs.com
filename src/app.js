(function () {
  function Editor() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      theme: 'default',
      lineNumbers: true
    });
    this.editor.focus();
  }

  Editor.prototype.hint = function () {
    var code = this.editor.getValue();
    if ($('input.legacy')[0].checked) {
      JSHINT.jshint(code, Options.options);
      this.editor.setValue(fixMyJS(JSHINT.jshint.data(), code, Options.options).run());
    } else {
      this.editor.setValue(fixMyJS.fix(this.editor.getValue(), Options.options));
    }
  };

  Editor.getOptions = function () {
    return {};
  };
  var Scrim = {
      scrim: function () {
        var el = document.createElement('div');
        document.body.appendChild(el);
        var val = $(el);
        val.css({
          position: 'fixed',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: '9000',
          width: '1920px',
          height: '1080px'
        }).hide();
        return val;
      }(),

      isShowing: false,

      toggle: function () {
        if (this.isShowing) {
          return Scrim.hide();
        } else {
          return Scrim.show();
        }
      },

      show: function () {
        this.isShowing = !this.isShowing;
        return Scrim.scrim.show();
      },

      hide: function () {
        this.isShowing = !this.isShowing;
        return Scrim.scrim.hide();
      }
    };

  var Options = {
      options: {
        asi: false,
        auto_indent: false,
        debug: false,
        immed: true,
        indent: 4,
        indentpref: 'spaces',
        lastsemic: false,
        laxbreak: true,
        maxerr: 500,
        sub: false,
        supernew: false,
        trailing: true,
        white: false
      },

      setOption: function (opt, val) {
        return this.options[opt] = val;
      },

      toggle: function () {
        if (Scrim.isShowing) {
          return Options.hide();
        } else {
          return Options.show();
        }
      },

      show: function () {
        Scrim.show();
        $('section.options').addClass('open');
        setTimeout(function () {
          Scrim.isShowing && $('span.close').addClass('visible');
        }, 1000);
      },

      hide: function () {
        $('span.close').removeClass('visible');
        setTimeout(function () {
          if (Scrim.isShowing) {
            $('section.options').removeClass('open');
            Scrim.hide();
          }
        }, 200);
      }
    };

  function Dialog(id) {
    this.id = id;
  }

  Dialog.prototype.open = function () {
    Dialog.open(this.id);
  };

  Dialog.prototype.close = function () {
    Dialog.close(this.id);
  };

  Dialog.openDialog = null;
  Dialog.autoHideTimer = null;

  Dialog.close = function (id) {
    if (Dialog.openDialog) {
      $(id).removeClass('bounceIn').addClass('bounceOut');
    }
    clearTimeout(Dialog.autoHideTimer);
    setTimeout(function () {
      $(id).hide();
    }, 1000);
    Dialog.openDialog = null;
  };

  Dialog.open = function (id) {
    if (Dialog.openDialog) {
      Dialog.close(Dialog.openDialog);
    }
    $(id).removeClass('bounceOut').addClass('bounceIn').show();
    Dialog.autoHideTimer = setTimeout(Dialog.close.bind(Dialog, id), 7500);
    Dialog.openDialog = id;
  };

  var Legacy = new Dialog('aside#legacy_dialog');
  var About = new Dialog('aside#about_dialog');

  $.domReady(function () {
    var env;
    env = new Editor();
    $('section.options input').each(function (el) {
      $(el).on('click', function (event) {
        var name = event.target.name;
        switch (name) {
          case 'indentpref':
            return Options.setOption(name, event.target.value);
          case 'indent':
            break;
          default:
            return Options.setOption(name, event.target.checked);
        }
      });
    });

    $('section.options input.optText').on('change', function (event) {
      Options.setOption(event.target.name, Number(event.target.value));
    });

    $('span.close').on('click', function () {
      Options.hide();
    });

    $('#options').on('click', function () {
      Options.toggle();
    });

    $('button').on('click', function () {
      env.hint();
    });

    $('#about').on('click', function () {
      About.open();
    });

    $('#legacy').on('click', function () {
      Legacy.open();
    });

    $('aside#about_dialog').on('click', function () {
      About.close();
    }).hide().addClass('animated');

    $('aside#legacy_dialog').on('click', function () {
      Legacy.close();
    }).hide().addClass('animated');

    console.log($('#version'));
    $('#version').html('v' + fixMyJS.version);
  });

}.call(this));
