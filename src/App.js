import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer'
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Layout from "./pages/Layout";
import AddCampaign from "./pages/AddCampaign";
import CrowdFundingContract from './build/CrowdFundingContract.json';
import Main from './Main';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    } 
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    const networkData = CrowdFundingContract.networks[networkId];
    if (networkData) {
      const contractInfo = new web3.eth.Contract(CrowdFundingContract.abi, networkData.address);
      this.setState({ contractInfo });

      const campaignCount = await contractInfo.methods.getNoOfCampaigns().call();
      console.log(campaignCount.toString());
      this.setState({ campaignCount });

      web3.eth.getBalance(accounts[0]).then(result => console.log(result));

      for (var i = 1; i <= campaignCount; i++) {
        const campaignInfo = await contractInfo.methods.listOfCampaigns(i).call();
        this.setState({
          listOfCampaigns: [...this.state.listOfCampaigns, campaignInfo]
        });
        console.log(this.state.listOfCampaigns);
      }
      this.setState({ loading: false });
    } else {
      window.alert('Campaign contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      campaignCount: 0,
      loading: true,   
      listOfCampaigns: [],        
    }
    this.addCampaign = this.addCampaign.bind(this);
    this.purchaseCampaign = this.purchaseCampaign.bind(this);
  }

  async addCampaign(name, image, targetAmt, deadline, location) {
    try {
        const { contractInfo, account } = this.state;
        // Ensure the deadline is in the future
        if (new Date(deadline).getTime() <= Date.now()) {
            throw new Error("Deadline must be in the future");
        }
        
        // Convert deadline to UNIX timestamp
        const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
        
        const gasEstimate = await contractInfo.methods.addCampaign(name, image, targetAmt, deadlineTimestamp, location)
            .estimateGas({ from: account });
        
        console.log('Gas Estimate:', gasEstimate);

        const transaction = await contractInfo.methods.addCampaign(name, image, targetAmt, deadlineTimestamp, location)
            .send({ from: account, gas: gasEstimate });

        console.log('Transaction:', transaction);
        window.location.reload();
    } catch (error) {
        console.error('Error adding campaign:', error);
        alert('An error occurred while adding the campaign. Please check the console for details.');
    }
}


  async purchaseCampaign(id, price) {
    const output = await this.state.contractInfo.methods.purchaseCampaign(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      console.log(receipt);
    })    
    console.log(output)
    window.location.assign("/")
  }

  render() {
    return (
      <div>
        <NavBar account={this.state.account} />
        {
          this.state.loading
              ? <div id="loader" className="text-center">
                <p className="text-center">Loading...</p></div>
          :                    
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}/>
                <Route path="AboutUs" element={<AboutUs />} />

                <Route index element={<Main
                    campaignCount={this.state.campaignCount}
                    account={this.state.account}
                    listOfCampaigns={this.state.listOfCampaigns}
                    Campaign={this.purchaseCampaign}
                    />} />
                <Route path="AddCampaign" element={<AddCampaign
                    campaignCount={this.state.campaignCount}
                    account={this.state.account}
                    addCampaign={this.addCampaign} />} />
              </Routes>
            </BrowserRouter>
        }       
        <Footer />
      </div>
    );
  }
}

export default App;
