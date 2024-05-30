import React, { Component } from 'react';

class Donation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { amount } = this.state;
    const { campaignId, handleDonate } = this.props;
    handleDonate(campaignId, amount);
  }

  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Donate to Campaign {this.props.campaignId}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Donation Amount (in Wei):</label>
            <input
              type="number"
              className="form-control"
              value={this.state.amount}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Donate</button>
        </form>
      </div>
    );
  }
}

export default Donation;
