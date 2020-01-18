// import hdkey from 'ethereumjs-wallet/hdkey';
var Wallet = require('ethereumjs-wallet');
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/fe850a1d3b5f4d4e9f9df5f6760e691d'));

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
  //var getNonce = await web3.eth.getTransactionCount(sender, 'pending');

  let gasPriceInWei = web3.utils.toWei("5", 'Gwei');
  console.log({ gasPriceInWei });
  
  var rawTx = {
    gasPrice: web3.utils.toHex(gasPriceInWei),
    gasLimit: web3.utils.toHex(3000000),
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


// /**
//  * Function to fetch the ETH balance of an account
//  * @param {String} account_address 
//  * 
//  * @returns 
//  *  final balance in ETH
//  */
// export async function getEthBalance(account_address){
//     //Fetch the ETH balance of the address
//     account_address = web3.utils.toHex(account_address);
//     try {
//       const wei_balance = await web3.eth.getBalance(account_address);
//       const final_balance = web3.utils.fromWei(wei_balance, 'ether');
//       return `${final_balance}`;
//     } catch (error) {
//       console.log(error);
//       return 'cannot compute';
//     }
// }