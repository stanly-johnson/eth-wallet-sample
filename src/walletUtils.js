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