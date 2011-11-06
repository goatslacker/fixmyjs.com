define("ace/theme/mango", ["require", "exports", "module"], function (a, b, c) {

var d = a("pilot/dom");
var e = ".ace-mango.ace_editor {\
  font-family: Inconsolata;\
  font-size: 16px;\
}\
\
.ace-mango .ace_editor.ace_focus {\
  border: 2px solid #327fbd;\
}\
\
.ace-mango .ace_gutter {\
  width: 50px;\
  background: #e8e8e8;\
  color: #333;\
  overflow : hidden;\
}\
\
.ace-mango .ace_gutter-layer {\
  width: 100%;\
  text-align: right;\
}\
\
.ace-mango .ace_gutter-layer .ace_gutter-cell {\
  padding-right: 6px;\
}\
\
.ace-mango .ace_print_margin {\
  width: 0px;\
}\
\
.ace-mango .ace_scroller {\
  background-color: #282828;\
}\
\
.ace-mango .ace_text-layer {\
  cursor: text;\
  color: white;\
}\
\
.ace-mango .ace_cursor {\
  border-left: 2px solid #A7A7A7;\
}\
\
.ace-mango .ace_cursor.ace_overwrite {\
  border-left: 0px;\
  border-bottom: 1px solid #A7A7A7;\
}\
\
.ace-mango .ace_marker-layer .ace_selection {\
  background: rgba(221, 240, 255, 0.20);\
}\
\
.ace-mango .ace_marker-layer .ace_step {\
  background: rgb(198, 219, 174);\
}\
\
.ace-mango .ace_marker-layer .ace_bracket {\
  margin: -1px 0 0 -1px;\
  border: 1px solid rgba(255, 255, 255, 0.25);\
}\
\
.ace-mango .ace_marker-layer .ace_active_line {\
  background: rgba(255, 255, 255, 0.031);\
}\
\
.ace-mango .ace_invisible {\
  color: rgba(255, 255, 255, 0.25);\
}\
\
.ace-mango .ace_keyword {\
  color: #daa520;\
}\
\
.ace-mango .ace_keyword.ace_operator {\
  color: white;\
}\
\
.ace-mango .ace_constant {\
  color: #4fb7c5;\
}\
\
.ace-mango .ace_constant.ace_language {\
  \
}\
\
.ace-mango .ace_constant.ace_library {\
  \
}\
\
.ace-mango .ace_constant.ace_numeric, .ace-mango .ace_constant.ace_boolean {\
  color: #D45D57;\
}\
\
.ace-mango .ace_invalid {\
  \
}\
\
.ace-mango .ace_invalid.ace_illegal {\
  color: #F8F8F8;\
  background-color:rgba(86, 45, 86, 0.75);\
}\
\
.ace-mango .ace_invalid.ace_deprecated {\
  text-decoration:underline;\
  font-style:italic;\
  color: #D2A8A1;\
}\
\
.ace-mango .ace_support {\
  color: #9a9a9a;\
}\
\
.ace-mango .ace_support.ace_function {\
  color: #aeb2f8;\
}\
\
.ace-mango .ace_function.ace_buildin {\
  \
}\
\
.ace-mango .ace_string {\
  color: #87AF5F;\
}\
\
.ace-mango .ace_string.ace_regexp {\
  color: #E9C062;\
}\
\
.ace-mango .ace_comment {\
  color: #656865;\
}\
\
.ace-mango .ace_comment.ace_doc {\
  color: #A6C6FF;\
}\
\
.ace-mango .ace_comment.ace_doc.ace_tag {\
  color: #A6C6FF;\
}\
\
.ace-mango .ace_variable {\
  color: #bebf55;\
}\
\
.ace-mango .ace_variable.ace_language {\
  color: #bebf55;\
}\
\
.ace-mango .ace_xml_pe {\
  color:#494949;\
}";

d.importCssString(e);
b.cssClass = "ace-mango";

});
