@doHint = (code) ->
  result = JSHINT code, (white: true)
  console.log result
  console.log JSHINT.errors
