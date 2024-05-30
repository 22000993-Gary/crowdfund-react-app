import React, { Component } from 'react';

class Main extends Component {
  handleDonate = (campaignId) => {
    const amount = prompt("Enter the amount you want to donate (in Wei):");
    if (amount && !isNaN(amount)) {
      this.props.donateCampaign(campaignId, amount);
    } else {
      alert("Please enter a valid amount.");
    }
  }

  render() {
    console.log("List of Campaigns in Main:", this.props.listOfCampaigns);

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Crowd Funding Platform</h1>
        <h2 className="text-center mb-4">Total Number of Campaigns: {this.props.campaignCount}</h2>
        <h4 className="text-center mb-4">Account: {this.props.account}</h4>
        <hr />
        <div className="row">
          {this.props.listOfCampaigns.map((campaign, key) => {
            const status = Number(campaign.status);
            console.log("Campaign Details:", campaign);
            console.log("Parsed Campaign Status:", status);

            return (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={key}>
                <div className="card h-100">
                  <div className="card-header bg-dark text-white">
                    <h2 className="card-title">{campaign.campaignId}</h2>
                    <h3 className="card-subtitle">{campaign.name}</h3>
                  </div>
                  <div className="card-body text-center">
                    <img
                      alt="Campaign"
                      width="200"
                      className="img-fluid rounded mb-3"
                      src={campaign.image}
                    />
                    <p><strong>Target Amount:</strong> {campaign.targetAmt}</p>
                    <p><strong>Deadline:</strong> {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {campaign.location}</p>
                    <p><strong>Amount Collected:</strong> {campaign.amountCollected}</p>
                    <p><strong>Campaign Status:</strong> {status === 0 ? "Completed" : "In Progress"}</p>
                    {status === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleDonate(campaign.campaignId)}
                      >
                        Donate
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;






