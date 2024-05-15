import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div className="container">
                <h1>Crowd Funding Platform</h1>
                <h2>Total Number of Campaigns: {this.props.campaignCount}</h2>
                <h4>Account: {this.props.account}</h4>
                <hr />
                <br />
                <div id="campaignsRow" className="row">
                    {this.props.listOfCampaigns.map((campaign, key) => {
                        return (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={key}>
                                <div className="panel panel-default panel-campaign">
                                    <div className="panel-heading">
                                        <h2>{campaign.campaignId}</h2>
                                        <h3 className="panel-title">{campaign.name}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <img
                                            alt="Campaign"
                                            width="200"
                                            className="img-rounded img-center"
                                            src={campaign.image}
                                        />
                                        <br /><br />
                                        <strong>Target Amount</strong>: <span className="campaign-targetAmt">{campaign.targetAmt}</span><br />
                                        <strong>Deadline</strong>: <span className="campaign-deadline">{campaign.deadline}</span><br />
                                        <strong>Location</strong>: <span className="campaign-location">{campaign.location}</span><br /><br />
                                        <strong>Amount Collected</strong>: <span className="campaign-amountCollected">{campaign.amountCollected}</span><br /><br />
                                        <strong>Campaign Status</strong>: <span className="campaign-status">{campaign.status}</span><br /><br />
                                        <strong>
                                            {campaign.status === "Inprogress" ? (
                                                <button
                                                    className="donateButton"
                                                    onClick={() => this.props.purchaseCampaign(campaign.campaignId, campaign.targetAmt)}
                                                >
                                                    Donate
                                                </button>
                                            ) : (
                                                <p>Campaign Completed</p>
                                            )}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Main;

