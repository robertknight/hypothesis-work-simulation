NODE_BIN_DIR=./node_modules/.bin
JS_SRCS=$(wildcard src/*.js src/*.jsx)

all: dist/app-bundle.js

node_modules: package.json
	npm install
	touch node_modules

dist/app-bundle.js: node_modules $(JS_SRCS)
	$(NODE_BIN_DIR)/babel $(JS_SRCS) --out-dir build
	webpack

clean:
	rm -rf node_modules build dist
