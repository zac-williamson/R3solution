import axios from 'axios';
import Auth from './Auth'

import Web3 from 'web3';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.toAsciiOriginal = web3.toAscii;
web3.toAscii = function (input) { return web3.toAsciiOriginal(input).replace(/\u0000/g, '') }

var r3solutionInterface = [{ "constant": false, "inputs": [], "name": "makeCommitment", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [], "name": "getVote", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "active", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "activate", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "friend", "type": "address" }], "name": "invite", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "value", "type": "bool" }], "name": "vote", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "backOut", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numVoters", "outputs": [{ "name": "", "type": "uint32" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "acceptedInvite", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numVotes", "outputs": [{ "name": "", "type": "uint32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "balance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "acceptInvite", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "invited", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }];

var r3solutionBytecode = "60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346001600082825401925050819055505b5b610bce806100676000396000f300606060405236156100d8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680624c6ad2146100da5780630242f351146100e457806302d05d3f1461010e57806302fb0c5e146101605780630f15f4c01461018a5780633ccfd60b1461019c5780634b77c468146101ae5780634b9f5c98146101e45780634bd9d10e146102065780634cbe32b81461021857806395e2e0961461024a578063a3bef4d714610274578063b69ef8a8146102a6578063bbb4d3e9146102cc578063dd503634146102de575bfe5b6100e2610308565b005b34156100ec57fe5b6100f4610378565b604051808215151515815260200191505060405180910390f35b341561011657fe5b61011e6103cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016857fe5b6101706103f3565b604051808215151515815260200191505060405180910390f35b341561019257fe5b61019a610406565b005b34156101a457fe5b6101ac6104a8565b005b34156101b657fe5b6101e2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610580565b005b34156101ec57fe5b61020460048080351515906020019091905050610654565b005b341561020e57fe5b6102166107dc565b005b341561022057fe5b610228610970565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561025257fe5b61025a610986565b604051808215151515815260200191505060405180910390f35b341561027c57fe5b6102846109db565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b34156102ae57fe5b6102b66109f1565b6040518082815260200191505060405180910390f35b34156102d457fe5b6102dc6109f7565b005b34156102e657fe5b6102ee610ae6565b604051808215151515815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103655760006000fd5b346001600082825401925050819055505b565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b90565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560089054906101000a900460ff1681565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104635760006000fd5b6000600560049054906101000a900463ffffffff1663ffffffff16141561048a5760006000fd5b6001600560086101000a81548160ff0219169083151502179055505b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105055760006000fd5b600560089054906101000a900460ff1615610573576002600560049054906101000a900463ffffffff1663ffffffff1681151561053e57fe5b0463ffffffff16600560009054906101000a900463ffffffff1663ffffffff16111561056e5761056d33610b3b565b5b61057d565b61057c33610b3b565b5b5b565b600560089054906101000a900460ff161561059b5760006000fd5b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105f85760006000fd5b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b50565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615156106ad5760006000fd5b801515600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151415156107d85780600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550801561079f576001600560008282829054906101000a900463ffffffff160192506101000a81548163ffffffff021916908363ffffffff1602179055506107d7565b6001600560008282829054906101000a900463ffffffff160392506101000a81548163ffffffff021916908363ffffffff1602179055505b5b5b50565b600560089054906101000a900460ff16156107f75760006000fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561096d576005600481819054906101000a900463ffffffff16809291906001900391906101000a81548163ffffffff021916908363ffffffff16021790555050600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561096c576000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506005600081819054906101000a900463ffffffff16809291906001900391906101000a81548163ffffffff021916908363ffffffff160217905550505b5b5b565b600560049054906101000a900463ffffffff1681565b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b90565b600560009054906101000a900463ffffffff1681565b60015481565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610a505760006000fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506005600481819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff160217905550505b565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b90565b600060015490506000811415610b515760006000fd5b60006001819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f193505050501515610b9d5760006000fd5b5b50505600a165627a7a72305820b27dddd0d6199f61bb89e9662ca3d3721b9dd4639704a0ae59db65cee6b02d8a0029";
var r3solutionContract = web3.eth.contract(r3solutionInterface);



class ContractApi {

  static isAddress(address) {
    return web3.isAddress(address);
  }

  static estimateContractCost(creatorAddress, spendoolies) {
    var gas = r3solutionContract.new.getData({ from: creatorAddress, value: spendoolies, data: r3solutionBytecode });
    var estimate = web3.eth.estimateGas({ data: gas });
    return estimate;
  };

  static createR3solutionContract(creatorAddress, spendoolies) {
    return new Promise((resolve, reject) => {
      console.log('creating a resolution contract?');
      let gasPrice = parseInt(this.estimateContractCost() * 1.03);
      console.log('gas price = ' + gasPrice);
      r3solutionContract.new(
        {
          from: creatorAddress,
          data: r3solutionBytecode,
          gas: gasPrice,
          value: spendoolies
        }, function (e, contract) {
          if (e) {
            console.log('beep?')
            reject(e);
          }
          console.log(e, contract);
          if (typeof contract.address === 'undefined') {
            resolve({ message: 'Transaction Sent!', transactionHash: contract.transactionHash, address: contract.address });
          } else {
            resolve({ message: 'Contract Mined!', transactionHash: contract.transactionHash, address: contract.address });
          }
        });
    });
  }

  static inviteFriend(contractAddress, creatorAddress, friendAddress) {
    let contract = r3solutionContract.at(contractAddress);
    let functionData = contract.invite.getData(friendAddress);
    let gasCost = parseInt(web3.eth.estimateGas({
      from: creatorAddress,
      to: contractAddress,
      data: functionData
    }));
    console.log('FUNCTION GAS COST = ' + gasCost);
    // gasCost = 2 * gasCost;
    if (contract) {
      console.log('boop ' + friendAddress + ', ' + creatorAddress + ', ' + contractAddress);
        contract.invite(friendAddress,
          {
            from: creatorAddress,
            gas: gasCost
          }, (e, res) => {
            if (e) {
              console.log('INVITE FRIEND ERROR ' + e);
            } else {
              console.log('INVITE FRIEND SUCCESS ' + res);
            }
          });
    }
  }

  static acceptInvite(contractAddress, invitedAddress) {
    let contract = r3solutionContract.at(contractAddress);
    let functionData = contract.acceptInvite.getData();
    console.log('function data = ' + functionData);
    console.log(contractAddress + ', ' + invitedAddress);
    let gasCost = parseInt(web3.eth.estimateGas({
      from: invitedAddress,
      to: contractAddress,
      data: functionData
    }));
    console.log('FUNCTION GAS COST = ' + gasCost);
    if (contract) {
      contract.acceptInvite(
        {
          from: invitedAddress,
          gas: gasCost
        }, (e, res) => {
          if (e) {
            console.log('ACCEPT INVITE ERROR ' + e);
          } else {
            console.log('ACCEPTED INVITE SUCCESS ' + res);
          }
        });
    }
  }

  static lockContract(contractAddress, creatorAddress) {
    let contract = r3solutionContract.at(contractAddress);
    let functionData = contract.activate.getData();
    let gasCost = parseInt(web3.eth.estimateGas({
      from: creatorAddress,
      to: contractAddress,
      data: functionData
    }));
    console.log('FUNCTION GAS COST = ' + gasCost);
    if (contract) {
      contract.activate(
        {
          from: creatorAddress,
          gas: gasCost
        }, (e, res) => {
          if (e) {
            console.log('LOCK CONTRACT ERROR ' + e);
          } else {
            console.log('CONTRACT LOCKED! ' + res);
          }
        });
    }
  }

  static vote(contractAddress, voterAddress, voteResult) {
    console.log(Boolean(voteResult));
    let contract = r3solutionContract.at(contractAddress);
    let functionData = contract.vote.getData(Boolean(voteResult));
    let gasCost = parseInt(web3.eth.estimateGas({
      from: voterAddress,
      to: contractAddress,
      data: functionData
    }));
    gasCost *= 2;
    console.log('FUNCTION GAS COST = ' + gasCost);
    if (contract) {
      contract.vote(Boolean(voteResult),
        {
          from: voterAddress,
          gas: gasCost
        }, (e, res) => {
          if (e) {
            console.log('VOTE ERROR ' + e);
          } else {
            console.log('SUCCESSFULLY VOTED! ' + res);
          }
        });
    }
  }

  static getContractFromDatabase(hash, callback) {
    let result = { title: '' };
    let blah = 4;
    axios.get('http://localhost:3001/api/contracts/' + hash, {
      transactionHash: hash,
    }).then((contractResponse) => {
      result.title = contractResponse.data[0].title;
      result.description = contractResponse.data[0].description;
      result.creatorName = contractResponse.data[0].creatorName;
      result.creatorAddress = contractResponse.data[0].creator;
      callback(result);
    }).catch((contractResponseError) => {
      result.errors = [];
      result.errors.push(contractResponseError);
      callback(result);
    });
  }

  static loadUserContracts(callback) {
    //situations that can happen. Hash does not exist. Hash exists but no contract. Hash exists and there is a contract.
    //there are accompanying database details, or there are not accompanying database details
    let contracts = [];
    let email = Auth.getUserEmail();
    axios.get('http://localhost:3001/api/users/' + email, {
      email: email,
    }).then((response) => {
      let size = response.data[0].transactionHashes.length;
      let remaining = size;
      for (let i = 0; i < size; i++) {
        let contractDetails = { errors: [] };
        let hash = response.data[0].transactionHashes[i].hash;
        this.getContractFromDatabase(hash, (result) => {
          contractDetails = Object.assign(contractDetails, result);
          web3.eth.getTransaction(hash, (err, result) => {
            if (!result) {
              contractDetails.transactionOnChain = false;
              contractDetails.errors.push(err);
            } else {
              contractDetails.transactionOnChain = true;
            }
            web3.eth.getTransactionReceipt(hash, (err, result) => {
              if (!result) {
                contractDetails.contractOnChain = false;
                contractDetails.errors.push(err);
              } else {
                let contractAddress = result.contractAddress;
                if (contractAddress) {
                  contractDetails.contractAddress = contractAddress;
                  let contract = r3solutionContract.at(contractAddress);
                  contractDetails.numVotes = contract.numVotes().toNumber();
                  contractDetails.numVoters = contract.numVoters().toNumber();
                  contractDetails.balance = contract.balance().toNumber();
                  contractDetails.active = contract.active();
                  console.log(contractDetails.creatorAddress + ' : ' + contract.creator());
                  if (contractDetails.creatorAddress !== contract.creator()) {
                    contractDetails.errors.push('Creator address on-chain and creator address in database do not match!');
                  }
                  contractDetails.creatorAddress = contract.creator();
                  contractDetails.contractOnChain = true;
                }
              }
              contracts.push(contractDetails);
              remaining--;
              if (remaining === 0) {
                callback(contracts);
              }
            });
          });
        });
      }
    });
  }

  static getRole(contractAddress) {
    //we need to determine whether this user is, in relation to this contract..
    //A: creator
    //B: invited voter
    //C: accepted voter
    //D: some combination of all 3?
    return new Promise((resolve, reject) => {
      let result = { creators: [], invited: [], accepted: [] };
      let invited = [];
      let contract = r3solutionContract.at(contractAddress);
      if (!contract) reject("no contract at address " + contractAddress);
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          reject(error);
        } else {
          let invitedCheck = accounts.length;
          let acceptedCheck = accounts.length;
          let createdCheck = accounts.length;
          let extricate = () => {
            if (invitedCheck == 0 && acceptedCheck == 0 && createdCheck == 0) {
              for (let j = 0; j < invited.length; j++) {
                let clash = false;
                for (let k = 0; k < result.accepted.length; k++) {
                  if (invited[j] == result.accepted[k]) {
                    clash = true;
                  }
                }
                if (!clash) {
                  result.invited.push(invited[j]);
                }
              }
              resolve(result);
            }
          };
          for (let i = 0; i < accounts.length; i++) {
            if (accounts[i] == contract.creator()) {
              result.creators.push(accounts[i]);
              createdCheck--;
              extricate();
            } else {
              createdCheck--;
              extricate();
            }
            contract.invited.call({
              from: accounts[i]
            }, (e, isInvited) => {
              if (e) {
                reject(e);
              } else {
                if (isInvited) {
                  invited.push(accounts[i]);
                }
              }
              invitedCheck--;
              extricate();
            });

            contract.acceptedInvite.call({
              from: accounts[i]
            }, (e, isAccepted) => {
              if (e) {
                reject(e);
              } else {
                if (isAccepted) {
                  result.accepted.push(accounts[i]);
                }
              }
              acceptedCheck--;
              extricate();
            });
          }
        }
      });
    });
  }


  // static loadUserContracts(userEmail, liveOnly = false) {
  //   return new Promise((resolve, reject) => {
  //     let email = Auth.getUserEmail();
  //     console.log(email);
  //     axios.get('http://localhost:3001/api/users/' + email, {
  //       email: email,
  //     }).then((response) => {
  //       let userAddress = response.data[0].address;
  //       let contractDetails = [];
  //       let size = response.data[0].contracts.length;
  //       for (let i = 0; i < response.data[0].contracts.length; i++) {
  //         let contractAddress = (response.data[0].contracts[i].address);
  //         let userRole = (response.data[0].contracts[i].role);
  //         console.log('getting contract details of ' + contractAddress);
  //         getContractInfo(contractAddress).then((response) => {
  //           if ((liveOnly === false) || (response.dealPhase === 'Live')) {
  //             let contract = this.parseContractData(response);
  //             contract.contractAddress = contractAddress;
  //             contract.userRole = userRole;
  //             contractDetails.push(contract);
  //           }
  //           size--;
  //           if (size === 0) {
  //             resolve(contractDetails);
  //           }
  //         }).catch((error) => {
  //           console.log('load user contract error! error = ' + error); //not an error using testrpc: database contains contracts that don't exist!
  //           size--;
  //           if (size === 0) {
  //             resolve(contractDetails);
  //           }
  //         })
  //         // getContractDetails(userAddress, response.data[0].contracts[i], (response) => {
  //         //   contractDetails.push(response);
  //         //   size--;
  //         //   console.log('new size = ' + size);
  //         //   if (size === 0) {
  //         //     resolve(contractDetails);
  //         //   }
  //         // });
  //       }
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // };
}

export default ContractApi;