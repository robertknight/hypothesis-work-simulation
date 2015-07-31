NODE_BIN_DIR=./node_modules/.bin
TS_SRCS=$(wildcard src/*.ts src/*.tsx)

all: dist/app-bundle.js

node_modules: package.json
	npm install
	touch node_modules

dist/app-bundle.js: node_modules $(TS_SRCS)
	$(NODE_BIN_DIR)/tsc
	webpack

clean:
	rm -rf node_modules build dist
