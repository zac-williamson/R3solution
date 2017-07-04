pragma solidity ^0.4.0;

contract R3solution {

    //we need a creator and a balance
    address public creator;
    uint256 public balance;
    //we also need a list of invitees
    mapping (address => bool) invitations;
    mapping (address => bool) acceptedInvitations;
    mapping (address => bool) votes;
    uint32 public numVotes;
    uint32 public numVoters;
    bool public active;

    function R3solution() payable {
        creator = msg.sender;
        balance += msg.value;
    }

    function invite(address friend) {
        if (active) throw; //can't assign voters after activation
        if (msg.sender != creator) throw;
        invitations[friend] = true;
    }

    function invited() returns (bool) {
        return invitations[msg.sender];
    }

    function acceptedInvite() returns (bool) {
        return acceptedInvitations[msg.sender];
    }

    function getVote() returns (bool) {
        return votes[msg.sender];
    }
    
    function acceptInvite() {
        if (!invitations[msg.sender]) throw;
        acceptedInvitations[msg.sender] = true;
        numVoters++;
    }

    function backOut() {
        if (active) throw; //you've made a commitment you can't back out now!
        if (acceptedInvitations[msg.sender]) {
            numVoters--;
            if (votes[msg.sender]) {
                votes[msg.sender] = false;
                numVotes--;
            }
        }
    }
    
    function makeCommitment() payable {
        if (msg.sender != creator) throw;
        balance += msg.value; //hon hon hon. Feed the machine.
    }

    function pay(address payee) internal {
        var value = balance;
        if (value == 0) throw;
        balance = 0;
        if (!payee.send(value)) throw; //congratulations!   
    }

    function withdraw() {
        if (msg.sender != creator) throw;
        if (active) {
            if (numVotes > (numVoters / 2)) {
                pay(msg.sender);
            }
        } else {
            pay(msg.sender);
        }
    }

    function activate() {
        if (msg.sender != creator) throw;
        if (numVoters == 0) throw;
        active = true; //sealed! What have you done????
    }

    function vote(bool value) {
        if (!acceptedInvitations[msg.sender]) throw;
        if (votes[msg.sender] != value) {
            votes[msg.sender] = value;
            if (value) {
                numVotes += 1;
            } else {
                numVotes -= 1;
            }
        }
    }
}
