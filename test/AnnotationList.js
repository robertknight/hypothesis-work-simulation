import * as fs from 'fs';
import {expect} from 'chai';
import {addons} from 'react/addons';
import * as path from 'path';
import React from 'react';

import {Annotation, AnnotationBody, TagList} from '../src/AnnotationList';

const testDataPath = path.join(__dirname, '../data.json');
const testData = JSON.parse(fs.readFileSync(testDataPath).toString());

function findAll(renderTree: React.Component,
                 testFunc: (component: React.Component) => boolean,
                 matches: Array<React.Component> = []) {
	if (testFunc(renderTree)) {
		matches.push(renderTree);
	}
	if (renderTree.props && renderTree.props.children) {
		if (Array.isArray(renderTree.props.children)) {
			for (const child of renderTree.props.children) {
				if (typeof child === 'object') {
					findAll(child, testFunc, matches);
				}
			}
		} else if (typeof renderTree.props.children === 'object') {
			findAll(renderTree.props.children, testFunc, matches);
		}
	}
	return matches;
}

function findOne(renderTree: React.Component,
                 testFunc: (component: React.Component) => boolean) {
	const matches = findAll(renderTree, testFunc);
	if (matches.length !== 1) {
		throw new Error(`Expected one match, found ${matches.length}`);
	}
	return matches[0];
}

describe('Annotation', () => {
	const renderer = addons.TestUtils.createRenderer();
	renderer.render(<Annotation annotation={testData}/>);
	const renderedAnnotation = renderer.getRenderOutput();

	it('should render tags', () => {
		const tagList = findOne(renderedAnnotation, inst => inst.type === TagList);
		expect(tagList.props.tags).to.deep.equal(['bad pitch', 'Silicon Valley']);
	});

	it('should render username', () => {
		const usernameLink = findOne(renderedAnnotation, inst => inst.props.className === 'annotation-user');
		expect(usernameLink.props.children).to.equal('jane.doe');
		expect(usernameLink.props.href).to.equal(`https://hypothes.is/u/acct:jane.doe@hypothes.is`);
	});

	it('should render citation', () => {
		const citationLink = findOne(renderedAnnotation,
		  inst => inst.props.className === 'annotation-citation-link');
		expect(citationLink.props.children).to.equal('All Is Fair in Love and Twitte…');

		const domainLink = findOne(renderedAnnotation, inst => inst.props.className === 'annotation-citation-domain');
		expect(domainLink.props.children.join('')).to.equal(' (www.nytimes.com)');
	});

	it('should render quotes', () => {
		const quote = findOne(renderedAnnotation, inst => inst.type === 'blockquote');
		expect(quote.props.children).to.equal('Usually it’s not simply because the ideas are bad (although some certainly are),');
	});

	it('should render body', () => {
		const body = findOne(renderedAnnotation, inst => inst.type === AnnotationBody);
		expect(body.props.annotation).to.equal(testData);
		const bodyContent = React.renderToStaticMarkup(body);
		expect(bodyContent).to.equal(`<div class="styled-text"><p>Like this one:</p>
<p><a target="blank" href="https://youtube.com/watch?v=wyrFWbGiGOc">https://youtube.com/watch?v=wyrFWbGiGOc</a></p></div>`);
	});
});
