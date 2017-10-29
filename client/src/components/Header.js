import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
	renderContent() {
		console.log("props", this.props.auth)
		switch (this.props.auth) {
			case null:
				return "Still loading";
			case false:
				return <li><a href="/auth/google">Login with google</a> </li>;
					
				
			default:
				return [
					<li key="2">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	  render(){
        return(
            <nav>
                <div className="nav-wrapper">
                   
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}


function mapStateToProps(state) {
    //console.log(state);
    return {auth : state.auth}
}

export default connect(mapStateToProps)(Header);