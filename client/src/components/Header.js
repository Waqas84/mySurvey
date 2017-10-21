import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
	renderContent() {

		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Log in with Google</a></li>;

			default:
				return <a href="/api/logout">Logout</a>;
		}
	}

	render() {
		console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="" className="brand-logo">
						mySurvey
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(Header);
