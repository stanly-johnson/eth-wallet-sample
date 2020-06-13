// import hdkey from 'ethereumjs-wallet/hdkey';
var Wallet = require('ethereumjs-wallet');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

// connect to infura - test network
//var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/fe850a1d3b5f4d4e9f9df5f6760e691d'));

// connect to local ganache network
var web3 = new Web3("http://127.0.0.1:7545");

//-->Use the below code to set Metamask as the web3 provider if needed for testing
// window.addEventListener('load', function () {
//   if (typeof web3 !== 'undefined') {
//       window.web3 = new Web3(window.web3.currentProvider)
//       if (window.web3.currentProvider.isMetaMask === true) {
//           window.web3.eth.getAccounts((error, accounts) => {
//               if (accounts.length == 0) {
//                   // there is no active accounts in MetaMask
//               }
//               else {
//                   // It's ok
//               }
//           });
//       } else {
//           // Another web3 provider --> possibly infura
//       }
//   } else {
//       // No web 3 provider
//   }
// });

export function generateWallet(){
    const wallet = Wallet.generate();
    console.log("privateKey: " + wallet.getPrivateKeyString());
    console.log("address: " + wallet.getAddressString());
    return {
        "private_key" : wallet.getPrivateKeyString(),
        "public_key" : wallet.getAddressString()
    }

}

export async function sendTx(sender, recipent, amount, pvt_key){
  //getting the nonce value for the txn, include the pending parameter for duplicate errors
  var getNonce = await web3.eth.getTransactionCount(sender, 'pending');
  // set the gas price for the transaction
  let gasPriceInWei = web3.utils.toWei("20", 'Gwei');
  console.log({ gasPriceInWei });
  
  var rawTx = {
    nonce: getNonce,
    gasPrice: web3.utils.toHex(gasPriceInWei),
    gasLimit: web3.utils.toHex(21000),
    to: recipent,
    value: web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
  };
  console.log(rawTx);
  var tx = new Tx(rawTx);
  var privKey = Buffer.from(pvt_key, 'hex');
  tx.sign(privKey);

  var serializedTx = tx.serialize();

  return new Promise((resolve, reject) =>
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (!err) {
        //console.log(hash);
        resolve(hash);
      } else {
        reject(err);
      }
    }));

}

var human_standard_token_abi = [
  {
    constant: !0,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !1,
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !1,
    inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transferFrom',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !1,
    inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    payable: !1,
    type: 'function'
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: '_from', type: 'address' },
      { indexed: !0, name: '_to', type: 'address' },
      { indexed: !1, name: '_value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: '_owner', type: 'address' },
      { indexed: !0, name: '_spender', type: 'address' },
      { indexed: !1, name: '_value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    inputs: [
      { name: '_initialAmount', type: 'uint256' },
      { name: '_tokenName', type: 'string' },
      { name: '_decimalUnits', type: 'uint8' },
      { name: '_tokenSymbol', type: 'string' }
    ],
    payable: !1,
    type: 'constructor'
  },
  {
    constant: !1,
    inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }, { name: '_extraData', type: 'bytes' }],
    name: 'approveAndCall',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: !1,
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'version',
    outputs: [{ name: '', type: 'string' }],
    payable: !1,
    type: 'function'
  }
];


export async function sendTokenTx(sender, token_contract_addr, recipent, amount, pvt_key){
  //getting the nonce value for the txn, include the pending parameter for duplicate errors
  var getNonce = await web3.eth.getTransactionCount(sender, 'pending');

  let gasPriceInWei = web3.utils.toWei("5", 'Gwei');
  console.log({ gasPriceInWei });

  var contract = new web3.eth.Contract(human_standard_token_abi, token_contract_addr, {
      from: sender
    });
  
  const payload = contract.methods.transfer(recipent, amount).encodeABI();
  const recipentAddress = token_contract_addr;
  
  var rawTx = {
    nonce: getNonce,
    gasPrice: web3.utils.toHex(gasPriceInWei),
    gasLimit: web3.utils.toHex(3000000),
    to: recipentAddress,
    value: '0x0',
    data: payload
  };
  console.log(rawTx);
  var tx = new Tx(rawTx);
  var privKey = Buffer.from(pvt_key, 'hex');
  tx.sign(privKey);

  var serializedTx = tx.serialize();

  return new Promise((resolve, reject) =>
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (!err) {
        //console.log(hash);
        resolve(hash);
      } else {
        reject(err);
      }
    }));

}