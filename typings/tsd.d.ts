
/// <reference path="marked/marked.d.ts" />
/// <reference path="node/node.d.ts" />
/// <reference path="react/react.d.ts" />
/// <reference path="whatwg-fetch/whatwg-fetch.d.ts" />
/// <reference path="es6-promise/es6-promise.d.ts" />

declare module 'isomorphic-fetch' {
	function fetch(url: string, init?: RequestInit): Promise<Response>;
	export = fetch;
}
