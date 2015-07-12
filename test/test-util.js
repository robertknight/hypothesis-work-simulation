export function findAll(renderTree: React.Component,
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

export function findOne(renderTree: React.Component,
                 testFunc: (component: React.Component) => boolean) {
	const matches = findAll(renderTree, testFunc);
	if (matches.length !== 1) {
		throw new Error(`Expected one match, found ${matches.length}`);
	}
	return matches[0];
}

