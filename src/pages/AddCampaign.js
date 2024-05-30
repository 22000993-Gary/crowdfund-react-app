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
            loading: false
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
        this.setState({ loading: true });
        const { name, image, targetAmt, deadline, location } = this.state;
        try {
            // Call the addCampaign function from props
            await this.props.addCampaign(name, image, targetAmt, deadline, location);
            // Reset form fields after successful submission
            this.setState({
                name: '',
                image: '',
                targetAmt: '',
                deadline: '',
                location: '',
                loading: false
            });
        } catch (error) {
            console.error("An error occurred while adding a campaign:", error);
            // Handle error
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div id="content" className="container mt-5">
                <h1 className="mb-4">Add Campaign</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Campaign Name"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="text"
                            name="image"
                            value={this.state.image}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Campaign Image URL"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="number"
                            name="targetAmt"
                            value={this.state.targetAmt}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Target Amount"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="date"
                            name="deadline"
                            value={this.state.deadline}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Deadline"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <input
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Location"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={this.state.loading}>
                        {this.state.loading ? "Adding Campaign..." : "Add Campaign"}
                    </button>
                </form>
            </div>
        );
    }
}

export default AddCampaign;





