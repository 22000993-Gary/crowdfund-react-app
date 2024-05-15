import React, { Component } from 'react';
class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src="/images/SimplyFund.png" width="200" height="200" alt="SimplyFund Logo" />
                    <span className="navbar-brand mb-0 h1">Crowd Funding</span>
                    <a className="nav-link active" href="/">Home</a>
                    <a className="nav-link active" href="/AddCampaign">Add Campaign</a>
                    <a className="nav-link active" href="/AboutUs">About Us</a>
                    <p className="nav-link" href="#"> Accounts: <span id="account"> {this.props.account} </span> </p>
                </div>
            </nav>
        )
    }
}
export default NavBar;
