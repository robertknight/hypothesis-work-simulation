export default class Toolbar extends React.Component {
	render() {
		return <div className="topbar">
		  <div className="inner">
			<div className="pull-right user-picker">
			  <span role="button" className="provider-toggle">
				jane.doe<span className="provider">/hypothes.is</span>
			  </span>
			</div>

			{/* Searchbar */}
			<div className="simple-search">
			  <form className="simple-search-form simple-search-inactive" action="/search">
				<input className="simple-search-input" type="text" name="q" placeholder="Search…"/>
				<span className="simple-search-icon">
				  <i className="h-icon-search"></i>
				</span>
			  </form>
			</div>
		  </div>
		</div>
	}
}


