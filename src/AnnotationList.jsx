import marked from 'marked';
import React from 'react';
import url from 'url';

import {relativeDateString} from './util';

export class TagList extends React.Component {
	render() {
		const tagItems = this.props.tags.map(tag => {
			const uriEscapedTag = encodeURIComponent(tag);
			const tagURL = `/#tags="${uriEscapedTag}"`;
			return <li className="tag-item" key={tag}>
				<a href={tagURL}>{tag}</a>
			</li>;
		});
		return <ul className="tag-list">
		{tagItems}
		</ul>
	}
}

function annotatorNameFromAccount(account: string) {
	if (account.slice(0,5) === 'acct:') {
		account = account.slice(5);
	}
	const domainSeparator = account.indexOf('@');
	if (domainSeparator !== -1) {
		return account.slice(0, domainSeparator);
	} else {
		return account;
	}
}

export class AnnotationBody extends React.Component {
	render() {
		const annotation = this.props.annotation;
		let html: string;
		if (annotation.text_rendered) {
			html = annotation.text_rendered;
		} else if (annotation.text) {
			html = marked(annotation.text);
		}
		return <div className="styled-text" dangerouslySetInnerHTML={{__html: html}}></div>
	}
}

export class Annotation extends React.Component {
	render() {
		const annotation = this.props.annotation;
		const annotatorLink = `https://hypothes.is/u/${annotation.user}`;
		const annotatorName = annotatorNameFromAccount(annotation.user);
		const links = annotation.document.link;
		const updated = new Date(annotation.updated);

		let contentLink: string;
		if (links.length > 0) {
			// use the default link. Depending on the device and context,
			// it may be preferable to use one of the alternate links
			contentLink = url.parse(links[0].href);
		}

		const MAX_TITLE_LENGTH = 30;
		let elidedTitle = annotation.document.title;
		if (elidedTitle.length > MAX_TITLE_LENGTH) {
			elidedTitle = elidedTitle.slice(0,MAX_TITLE_LENGTH) + "…";
		}

		return <article className="annotation thread-message">
			{/* Header */}
			<header className="annotation-header">
				<span>
					<a className="annotation-user" target="_blank" href={annotatorLink}>{annotatorName}</a>
					<span className="annotation-citation">
						&nbsp;on “<a className="annotation-citation-link" href={contentLink.href}>{elidedTitle}</a>”
						 <span className="annotation-citation-domain"> ({contentLink.hostname})</span>
					</span>
				</span>
				<a className="annotation-timestamp small pull-right" target="_blank"
				   title={updated.toDateString()}
			       href={`https://hypothes.is/a/${annotation.id}`}>{relativeDateString(updated)}</a>
			</header>
			{/* Excerpts */}
			<section className="annotation-section">
				{this._renderQuotes()}
			</section>
			{/* Body */}
			<section name="text" className="annotation-body">
				<AnnotationBody annotation={annotation}/>
			</section>
			{/* Tags */}
			<div className="annotation-section tags tags-read-only">
				<TagList tags={annotation.tags}/>
			</div>
			{/* Annotation footer */}
			<footer className="annotation-footer">
				<div className="annotation-actions">
                  <button className="small btn-clean"><i className="h-icon-reply btn-icon"></i> Reply</button>
				</div>
			</footer>
		</article>;
	}

	_renderQuotes() {
		const annotation = this.props.annotation;
		const quotes = [];

		for (const target of annotation.target) {
			if (target.selector) {
				for (const selector of target.selector) {
					if (selector.type === 'TextQuoteSelector') {
						quotes.push(selector.exact);
					}
				}
			}
		}
		return quotes.map((quote, index) =>
			<blockquote className="annotation-quote" key={index}>{quote}</blockquote>
		);
	}
}

export default class AnnotationList extends React.Component {
	render() {
		let annotations = this.props.annotations.map(annotation =>
			<li className="paper thread" key={annotation.id}>
				<Annotation annotation={annotation}/>
			</li>
		);
		return <ul className="stream-list">{annotations}</ul>
	}
}
