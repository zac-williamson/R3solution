import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Auth from './modules/Auth';
import ContractApi from './modules/ContractApi';

import Header from './Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const iconStyles = {
  marginBottom: -5
};

//#################################
//CreateContract
//#################################

class CreateContract extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: '',
      title: '',
      description: '',
      ether: '',
      gas: ''
    };

  }

  componentDidMount() {
    if (!Auth.isUserAuthenticated()) {
      this.context.router.history.push('/');
    }
    console.log('awutaiwueh');
    console.log(JSON.stringify(getMuiTheme().palette));
  }

  createContract() {
    console.log('creating contract at address ' + this.state.address);
    ContractApi.createR3solutionContract(this.state.address, '100').then((result) => {
      console.log('SUCCESS? ' + JSON.stringify(result));

      axios.post('http://localhost:3001/api/contracts', {
        transactionHash: result.transactionHash,
        creator: this.state.address,
        title: this.state.title,
        creatorName: this.state.name,
        description: this.state.description
      }).then((contractLogResponse) => {
        axios.post('http://localhost:3001/auth/users', {
          email: Auth.getUserEmail(),
          contractTransactionHash: result.transactionHash,
        }).then((userLogResponse) => {
          console.log('successful user logging? ehh?')
        }).catch((userLogError) => {
          console.log('error modifying user database, e = ' + userLogError);

        });
        console.log(contractLogResponse);
      }).catch((contractLogError) => {
        console.log(contractLogError);
      });
    }).catch((errors) => {
      console.log('ERRORS! ' + JSON.stringify(errors));
    })
  }

  render() {
    return (
      <div style={{ width: '100%', marginBottom: '30px' }}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Header />
            <br />
            <br />

            <div className='row'>
              <div className='col-md-10 col-md-offset-1'>
                <Paper style={{ padding: '10px' }}>
                  <h2 style={{ fontFamily: 'Impact', color: getMuiTheme().palette.primary1Color }}>Create a R3solution!</h2>
                  <span style={{ color: getMuiTheme().palette.accent1Color }}>
                    Congratulations on taking the bold step of staking your aspirations onto the blockchain. Today, you condemn the tenebrous commitments of the heart and lighten your spirit by commiting yourself to a brave and glorious cyber-future! Glorious!
           </span>
                  <br />
                  <div className='row' style={{ position: 'relative' }}>
                    <div className='col-sm-12'>
                      <TextField style={{ width: '90%' }} floatingLabelText='Your Ethereum Address' value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }} />
                      <span style={{ color: getMuiTheme().palette.primary1Color, cursor: 'pointer' }} onClick={() => { console.log('hey') }}>?</span>
                    </div>
                  </div>
                  <br />
                  <TextField style={{ width: '90%' }} floatingLabelText='Your Name' hintText='Bartholomew Jebediah von Hohenzollern III' value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                  <br />
                  <TextField style={{ width: '90%' }} floatingLabelText='R3solution Title' hintText='I pledge to grow the biggest yam the world has ever seen!' value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                  <br />
                  <TextField style={{ width: '90%' }} multiLine={true} floatingLabelText='Description' hintText='For years I have toiled under the indignity of inferior yams. Today I pledge to vanquish my monocot nemesis and fulfill my destiny!' value={this.state.description} onChange={(e) => { this.setState({ description: e.target.value }) }} />
                  <br />
                  <TextField floatingLabelText='(optional) ether to be sent' hintText='A dozen Spanish doubloons' value={this.state.ether} onChange={(e) => { this.setState({ ether: e.target.value }) }} />
                  <br />
                  <span style={{ color: getMuiTheme().palette.accent1Color }}>
                    An additional {ContractApi.estimateContractCost(this.state.address, this.state.ether)} gas is required to create this contract.
                  </span><br />
                  <RaisedButton primary={true} label='Make it happen!' onClick={() => { this.createContract() }} />
                </Paper>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default CreateContract;
