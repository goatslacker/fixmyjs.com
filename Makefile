all:
	@coffee -c src/*.coffee && echo "done."

fixmyjs:
	@cat ~/Development/jshint/jshint.js > packages/fixmyjs/fixmyjs.js && \
	cat ~/Development/jshint-autofix/fixmyjs.js >> packages/fixmyjs/fixmyjs.js

min:
