/// <reference path="../typings/tsd.d.ts" />

import 'es6-promises';
import fetch = require('isomorphic-fetch');
import * as React from 'react';

import {AnnotationList, HypothesisAnnotation} from './AnnotationList';
import Toolbar from './Toolbar';

interface AppProps {
		annotations: HypothesisAnnotation[]
}

class App extends React.Component<AppProps,{}> {
	render() {
		return <div>
			<Toolbar />
			<div id="wrapper">
				<main className="content">
					<AnnotationList annotations={this.props.annotations}/>
				</main>
			</div>
		</div>;
	}
}

function fetchAndDisplayAnnotations(sourceURL: string) {
	fetch(sourceURL).then(annotations => {
		return annotations.json();
	}).then(annotations => {
		if (annotations.document) {
			// response with a single annotation
			annotations = [annotations];
		} else if (annotations.rows) {
			// response with multiple annotations, in the format
			// returned by the search API.
			// Only include top-level annotations, excluding replies
			annotations = annotations.rows.filter(row => row.document && row.target);
		} else {
			throw new Error('Unexpected annotations API response');
		}

		const appElement = document.getElementById('app');
		React.render(<App annotations={annotations}/>,
		  appElement);
	}).catch(err => {
		console.error(`Failed to fetch annotations from ${sourceURL}: ${err}`);
		console.log(err.stack);
	});
}

function refresh() {
	// use the sample annotation from the data.json file by default.
	// If a query is specified via a hash argument, that is passed directly
	// to the search API
	let sourceURL = 'data.json';
	if (document.location.hash) {
		let query = document.location.hash.slice(1);
		sourceURL = `https://hypothes.is/api/search?limit=200&offset=0&order=desc&sort=created&${query}`;
	}
	fetchAndDisplayAnnotations(sourceURL);
}

refresh();
window.addEventListener('hashchange', () => refresh());
