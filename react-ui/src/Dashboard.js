import React from 'react';
import PropTypes from 'prop-types';
import ContractApi from './modules/ContractApi';
import Auth from './modules/Auth';
import Header from './Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import Lens from 'material-ui/svg-icons/image/lens';
var blah = 4;
const iconStyles = {
  float: 'right',
  marginTop: 10,
  marginRight: 10,
  width: 10,
  height: 10
};

class ContractDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      friendEmail: '',
      friendAddress: '',
      etherToAdd: '',
      invitedAddress: '',
      voterAddress: '',
      inviteFriendErrorText: '',
      acceptInviteErrorText: '',
      voteErrorText: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contract.userRole) {
      let invitedAddress = '';
      let voterAddress = '';
      if (nextProps.contract.userRole.invited.length) {
        invitedAddress = nextProps.contract.userRole.invited[0];
      }
      if (nextProps.contract.userRole.accepted.length) {
        voterAddress = nextProps.contract.userRole.accepted[0];
      }
      this.setState({
        invitedAddress: invitedAddress,
        voterAddress: voterAddress
      });
    }
  }

  inviteFriend() {
    let errorText = "";
    if (ContractApi.isAddress(this.state.friendAddress)) {
      ContractApi.inviteFriend(this.props.contract.contractAddress, this.props.contract.creatorAddress, this.state.friendAddress);
    } else {
      errorText = "Invalid address!";
    }
    this.setState({ inviteFriendErrorText: errorText })
  }

  acceptInvite() {
    let errorText = "";
    if (ContractApi.isAddress(this.state.invitedAddress)) {
      ContractApi.acceptInvite(this.props.contract.contractAddress, this.state.invitedAddress);
    } else {
      errorText = "Invalid address!";
    }
    this.setState({ acceptInviteErrorText: errorText })
  }

  lockContract() {
    ContractApi.lockContract(this.props.contract.contractAddress, this.props.contract.creatorAddress);
  }

  vote(result) {
    let errorText = "";
    if (ContractApi.isAddress(this.state.voterAddress)) {
      ContractApi.vote(this.props.contract.contractAddress, this.state.voterAddress, result);
    } else {
      errorText = "Invalid address!";
    }
    this.setState({ voteErrorText: errorText });
  }

  render() {
    console.log('CONTRACT = ' + JSON.stringify(this.props.contract));
    let renderAddTab = false;
    let renderInviteTab = false;
    let renderWithdrawTab = false;
    let renderLockTab = false;
    let renderVoteTab = false;
    let renderAcceptInviteTab = false;
    let success = false;
    if (this.props.contract.userRole) {
      if (this.props.contract.userRole.creators.length > 0) {
        renderAddTab = true;
        if (this.props.contract.active) {
          if (this.props.contract.numVotes > (this.props.contract.numVoters / 2)) {
            renderWithdrawTab = true;
            success = true;
          }
        } else {
          if (this.props.contract.numVoters > 0) {
            renderLockTab = true;
          }
          renderInviteTab = true;
        }
      }
      if (this.props.contract.userRole.accepted.length > 0 && this.props.contract.active) {
        renderVoteTab = true;
      }
      if (this.props.contract.userRole.invited.length > 0) {
        renderAcceptInviteTab = true;
      }
    }

    return (
      <Dialog
        modal={false}
        open={this.props.contractOpen}
        onRequestClose={() => { this.props.closeDialog(); }}
        titleStyle={{ fontFamily: 'Impact', color: 'white', backgroundColor: getMuiTheme().palette.primary1Color }}
        contentStyle={{ width: "80%", minWidth: "400px", maxWidth: "none" }}
        title={this.props.contract.title}
        subtitle={this.props.contract.creatorName}
      >
        <br />
        <div className="well">
          <div className='row'>
            Status status status <br />
            {this.props.contract.description}
          </div>
          <div className='row'>
            <div className='col-sm-4'>
              Stored Ether: {this.props.contract.balance}
            </div>
            <div className='col-sm-4'>
              Num Voters: {this.props.contract.numVoters}
            </div>
            <div className='col-sm-4'>
              Num Votes: {this.props.contract.numVotes}
            </div>
          </div>
        </div>
        <Paper>
          <Tabs value={this.state.tabValue} onChange={(value) => { this.setState({ tabValue: value }) }}>
            {renderAddTab ?
              <Tab label="Add Ether" value='0'>
                <div style={{ margin: '10px' }}>
                  <TextField floatingLabelText="Send more ether to contract" value={this.state.etherToAdd} onChange={(e) => { this.setState({ etherToAdd: e.target.value }); }} />

                  <FlatButton primary={true} label="Send" /><br />
                </div>
              </Tab>
              : ''}
            {renderInviteTab ?
              <Tab label="Invite Friend" value='1'>
                <div style={{ margin: '10px' }}>
                  <TextField floatingLabelText="Enter friend's email address" value={this.state.friendEmail} onChange={(e) => { this.setState({ friendEmail: e.target.value }); }} />
                  <FlatButton primary={true} label="Search" />
                  <br /><br />Friend found! Enter their ethereum address<br />
                  <TextField floatingLabelText="Enter friend's eth address" errorText={this.state.inviteFriendErrorText} value={this.state.friendAddress} onChange={(e) => { this.setState({ friendAddress: e.target.value }); }} />
                  <FlatButton primary={true} label="Send Invite" onClick={() => { this.inviteFriend() }} /><br />
                </div>
              </Tab>
              : ''}
            {renderWithdrawTab ?
              <Tab label="Withdraw Ether" value='2'>
                <div style={{ margin: '10px' }}>
                  {success ?
                    'Congratulations! Over half of your friends have said you have honored your pledge. You can now withdraw your Ether'
                    :
                    'This contract has not yet been locked, you can withdraw your ether if you wish to back out of your pledge!'
                  }
                  <br />
                  <FlatButton primary={true} label="Withdraw" /><br />
                </div>
              </Tab>
              : ''}
            {renderLockTab ?
              <Tab label="Lock Contract!" value='3'>
                <div style={{ margin: '10px' }}>
                  Once locked, you cannot invite more friends into your contract. You will not be able to withdraw your ether until >50% of your friends vote that you have kept your resolution!
                      <br />
                  <FlatButton primary={true} label="Let's do this!" onClick={() => { this.lockContract(); }} /><br />
                </div>
              </Tab>
              : ''}
            {renderAcceptInviteTab ?
              <Tab label="Accept Invite" value='4'>
                <div style={{ margin: '10px', padding: '10px' }}>
                  {this.props.contract.creatorName} has invited you to vote on this R3solution! Accept the invite? <br />
                  <TextField floatingLabelText="Your address" errorText={this.state.acceptInviteErrorText} value={this.state.invitedAddress} onChange={(e) => { this.setState({ invitedAddress: e.target.value }); }} />
                  <br />
                  <FlatButton primary={true} label="Yeah!" onClick={() => { this.acceptInvite(); }} />
                  <br />
                </div>
              </Tab>
              : ''}
            {renderVoteTab ?
              <Tab label="Vote on R3solution!" value='5'>
                <div style={{ margin: '10px' }}>
                  As a trusted confidante, {this.props.contract.creatorName} has trusted you to with the power to determine this R3solution's fate! Has your friend honored their commitment?
               <br />
                  <TextField floatingLabelText="Your address" errorText={this.state.voteErrorText} value={this.state.voterAddress} onChange={(e) => { this.setState({ voterAddress: e.target.value }); }} />
                  <br />
                  <FlatButton primary={true} label="Yes!" onClick={() => { this.vote(true); }}/> 
                  <FlatButton primary={true} label="No!" onClick={() => { this.vote(false); }}/>
                </div>
              </Tab>
              : ''}
          </Tabs>
        </Paper>
      </Dialog>
    );
  }
}
//#################################
//Dashboard
//#################################

class Dashboard extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      currentContract: {},
      contractOpen: false
    };

  }

  componentDidMount() {
    if (!Auth.isUserAuthenticated()) {
      this.context.router.history.push('/');
    } else {
      ContractApi.loadUserContracts((result) => {
        console.log('CONTRACT RESULT = ' + JSON.stringify(result));
        this.setState({
          contracts: result
        }, () => { this.getRoles(); this.render(); });
      });
    }
  }

  getRoles() {
    console.log('beep getting roles');
    console.log('contract length = ' + this.state.contracts.length);
    let contracts = this.state.contracts;
    for (let i = 0; i < this.state.contracts.length; i++) {
      if (this.state.contracts[i].contractAddress) {
        ContractApi.getRole(this.state.contracts[i].contractAddress).then((result) => {
          console.log('GET ROLE RESULT = ' + JSON.stringify(result));
          contracts[i].userRole = result;
        }).catch((error) => {
          console.log('GET ROLE ERROR = ' + JSON.stringify(error));
        })
      }
    }
  }
  //I need to iterate over the contracts
  //I then need to split them up into groups of three
  //

  getColor(contract) {
    if (contract.active) {
      return '#00FF00';
    } else if (contract.contractOnChain) {
      return '#0000FF';
    } else if (contract.transactionOnChain) {
      return '#CCCCCC';
    } else {
      return 'black';
    }
  }

  renderContract(contract, index, length) {

    let roleText = ""
    if (contract.userRole) {
      if (contract.userRole.creators) {
        roleText = "Creator";
      } else if (contract.userRole.invited) {
        roleText = "Invited";
      } else if (contract.userRole.accepted) {
        roleText = "Voter";
      }
    }
    return (
      <div className="col-sm-4" style={{ minHeight: '400px' }} key={index}>
        <Card onClick={() => {
          this.setState({
            currentContract: contract,
            contractOpen: true
          });
        }}>
          <CardTitle
            title={<div className="row">
              <div className="col-md-9">
                {contract.title}
              </div>
              <div className="col-md-3">
                <Lens style={iconStyles} color={this.getColor(contract)} />
              </div>
            </div>}
            subtitle={contract.creatorName}
            titleStyle={{ color: getMuiTheme().palette.primary1Color }}
          />
          <CardText>
            <h4>{roleText}</h4><br />
            {contract.description}
          </CardText>
        </Card>
      </div>
    );
  }

  render() {

    return (
      <div style={{ width: '100%', marginBottom: '30px' }}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Header />
            <br />
            <br />
            <div className="col-sm-12">
              {this.state.contracts.map((contract, index) => {
                return this.renderContract(contract, index, this.state.contracts.length)
              }
              )};
            </div>
            <ContractDialog contractOpen={this.state.contractOpen} contract={this.state.currentContract} closeDialog={() => { this.setState({ contractOpen: false }) }} />

          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Dashboard;
