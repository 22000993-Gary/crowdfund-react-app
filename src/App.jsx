import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Layout from "./pages/Layout";
import AddCampaign from "./pages/AddCampaign";
import CrowdFundingContract from './build/CrowdFundingContract.json';
import Main from './Main';

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    } 
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = CrowdFundingContract.networks[networkId];
    if (networkData) {
      const contractInfo = new web3.eth.Contract(CrowdFundingContract.abi, networkData.address);
      this.setState({ contractInfo });

      const campaignCount = await contractInfo.methods.getNoOfCampaigns().call();
      this.setState({ campaignCount: Number(campaignCount) });

      let listOfCampaigns = [];
      for (let i = 1; i <= campaignCount; i++) {
        const campaign = await contractInfo.methods.listOfCampaigns(i).call();
        campaign.campaignId = Number(campaign.campaignId);
        campaign.targetAmt = Number(campaign.targetAmt);
        campaign.deadline = Number(campaign.deadline);
        campaign.amountCollected = Number(campaign.amountCollected);
        listOfCampaigns.push(campaign);
      }
      this.setState({ listOfCampaigns, loading: false });
    } else {
      window.alert('Campaign contract not deployed to detected network.');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      campaignCount: 0,
      loading: true,   
      listOfCampaigns: [],        
    };
    this.addCampaign = this.addCampaign.bind(this);
    this.donateCampaign = this.donateCampaign.bind(this);
  }

  async addCampaign(name, image, targetAmt, deadline, location) {
    try {
      const { contractInfo, account } = this.state;
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
      const gasEstimate = await contractInfo.methods.addCampaign(name, image, targetAmt, deadlineTimestamp, location)
        .estimateGas({ from: account });

      await contractInfo.methods.addCampaign(name, image, targetAmt, deadlineTimestamp, location)
        .send({ from: account, gas: gasEstimate });

      window.location.reload();
    } catch (error) {
      console.error('Error adding campaign:', error);
      alert('An error occurred while adding the campaign. Please check the console for details.');
    }
  }

  async donateCampaign(id, amount) {
    try {
      const { contractInfo, account } = this.state;
      const gasEstimate = await contractInfo.methods.fundCampaign(id).estimateGas({ from: account, value: amount });
      await contractInfo.methods.fundCampaign(id).send({ from: account, value: amount, gas: gasEstimate });
      window.location.reload();
    } catch (error) {
      console.error('Error donating to campaign:', error);
      alert('An error occurred while donating to the campaign. Please check the console for details.');
    }
  }

  render() {
    return (
      <div>
        <NavBar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="AboutUs" element={<AboutUs />} />
              <Route index element={<Main
                campaignCount={this.state.campaignCount}
                account={this.state.account}
                listOfCampaigns={this.state.listOfCampaigns}
                donateCampaign={this.donateCampaign}
              />} />
              <Route path="AddCampaign" element={<AddCampaign
                campaignCount={this.state.campaignCount}
                account={this.state.account}
                addCampaign={this.addCampaign}
              />} />
            </Routes>
          </BrowserRouter>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;



