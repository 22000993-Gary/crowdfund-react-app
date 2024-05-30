import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="/images/SimplyFund.png" width="30" height="30" className="d-inline-block align-top" alt="SimplyFund Logo" />
                        <span className="ml-2">SimplyFund</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/AddCampaign">Add Campaign</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/AboutUs">About Us</a>
                            </li>
                        </ul>
                        <span className="navbar-text mr-3">Accounts: <span id="account">{this.props.account}</span></span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
