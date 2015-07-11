import * as util from '../src/util';

import {expect} from 'chai';

describe('relativeDateString', () => {
	it('should use relative dates for dates < 24 hours ago', () => {
		const now = new Date();

		const tests = [{
			date: now,
			expected: 'seconds ago'
		},{
			date: now - 3 * util.ONE_MINUTE,
			expected: '3 minutes ago'
		},{
			date: now - 4 * util.ONE_HOUR,
			expected: '4 hours ago'
		}];

		for (const test of tests) {
			expect(util.relativeDateString(test.date)).to.equal(test.expected);
		}
	});

	it ('should use absolute dates for dates > 24 hours ago', () => {
		const yesterday = Date.now() - 36 * util.ONE_HOUR;
		expect(util.relativeDateString(yesterday)).to.equal((new Date(yesterday)).toDateString());
	});
});
