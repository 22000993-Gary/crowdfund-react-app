import React, { Component } from 'react';

class AddCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            targetAmt: '',
            deadline: '',
            location: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { name, image, targetAmt, deadline, location } = this.state;
        console.log("Submitting form with data:", this.state);
        try {
            await this.props.addCampaign(name, image, targetAmt, deadline, location);
        } catch (error) {
            console.error("An error occurred while adding a campaign:", error);
        }
    }

    render() {
        return (
            <div id="content">
                <p>Total number of campaigns: {this.props.campaignCount}</p>
                <h1>Add Campaign</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="campaignName"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Campaign Name"
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="campaignImage"
                            type="text"
                            name="image"
                            value={this.state.image}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Campaign Image"
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="campaignTargetAmt"
                            type="number"
                            name="targetAmt"
                            value={this.state.targetAmt}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Target Amount"
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="campaignDeadline"
                            type="date"
                            name="deadline"
                            value={this.state.deadline}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Deadline"
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group mr-sm-2">
                        <input
                            id="campaignLocation"
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Location"
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Add Campaign</button>
                </form>
            </div>
        );
    }
}

export default AddCampaign;



