import {addons} from 'react/addons';
import {expect} from 'chai';
import React from 'react';

import CopyLinkPane, {attemptClipboardCopy} from '../src/CopyLinkPane';
import {findOne, findAll} from './test-util';

describe('attemptClipboardCopy', () => {
	global.document = {};

	it('should copy link if supported', () => {
		global.document.execCommand = command => {
			// simulate browser not supporting programmatic copying
			// of content to system clipboard
			throw new Error('Programatically copying links not allowed');
		};

		let didSelect = false;
		const field = {
			select: () => didSelect = true
		};

		expect(attemptClipboardCopy(field)).to.equal(false);
		expect(didSelect).to.equal(true);

		global.document.execCommand = command => true;
		didSelect = false;
		expect(attemptClipboardCopy(field)).to.equal(true);
		expect(didSelect).to.equal(true);
	});
});

describe('CopyLinkPane', () => {
	const renderer = addons.TestUtils.createRenderer();

	it('should display input with link', () => {
		const LINK_URL = 'https://hypothes.is/a/some-link';
		const ANNOTATOR_LINK = 'https://hypothes.is/u/acct:jane.doe@hypothes.is';
		const ANNOTATOR_NAME = 'jane.doe';
		renderer.render(<CopyLinkPane link={LINK_URL}
		                              onDismiss={() => {}}
									  annotatorName={ANNOTATOR_NAME}
									  annotatorLink={ANNOTATOR_LINK}
		                              />);
		const renderedPane = renderer.getRenderOutput();

		const linkField = findOne(renderedPane, inst => inst.type === 'input');
		expect(linkField.props.defaultValue).to.equal(LINK_URL);
	});
});
