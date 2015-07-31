import * as React from 'react';

export function attemptClipboardCopy(textField: HTMLInputElement) {
	try {
		textField.select();

		// Chrome 43 [1] and Firefox 41 [2] allow copying to
		// the system clipboard in the context of a user-triggered
		// action.
		//
		// This is currently not supported in other browsers so a
		// fallback such as https://github.com/zeroclipboard/zeroclipboard
		// is needed.
		//
		// [1] https://code.google.com/p/chromium/issues/detail?id=437908
		// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1012662
		document.execCommand('copy');
		return true;
	} catch (ex) {
		console.warn(`Unable to copy link automatically: ${ex.toString()}`);
		return false;
	}
}

export interface CopyLinkPaneProps {
	link: string;
	annotatorLink: string;
	annotatorName: string;
	onDismiss: () => void;
}

interface CopyLinkPaneState {
	autoClipboardCopySuccessful?: boolean;
	initialDisplay?: boolean;
}

export class CopyLinkPane extends React.Component<CopyLinkPaneProps,CopyLinkPaneState> {
	constructor(props) {
		super(props);
		this.state = {
			autoClipboardCopySuccessful: false,
			initialDisplay: true
		};
	}

	componentDidMount() {
		const linkField = React.findDOMNode(this.refs['linkField']) as HTMLInputElement;
		this.setState({
			autoClipboardCopySuccessful: attemptClipboardCopy(linkField)
		});

		setTimeout(() => this.setState({initialDisplay: false}));
	}

	render() {
		let copyAdvice;
		if (this.state.autoClipboardCopySuccessful) {
			copyAdvice = <div className="copy-pane-advice">
				A link to <a href={this.props.annotatorLink}>{this.props.annotatorName}</a>{'\''}s annotation has been copied.
			</div>;
		} else {
			copyAdvice = <div className="copy-pane-advice">
				Select the link and press Ctrl+C or (Cmd+C) to copy it.
			</div>;
		}

		const paneStyle = {
			opacity: this.state.initialDisplay ? 0.01 : 1.0
		};

		const overlayStyle = {
			position: 'fixed',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			color: 'red'
		};

		return <div className="copy-pane" style={paneStyle}>
			<div style={overlayStyle} onClick={() => this._dismiss()}/>
		  {/* TSX <input> is missing defaultValue attribute */}
			{React.createElement('input', {ref: 'linkField', defaultValue: this.props.link})}
			{copyAdvice}
		</div>
	}

	_dismiss() {
		this.setState({initialDisplay: true});
		setTimeout(() => this.props.onDismiss(), 300);
	}
}
