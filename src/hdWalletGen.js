import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
const ethUtil = require('ethereumjs-util');

export function genEthHdWallet(){
    // generate a random mnemonic
    // here 256 is strength factor, 256 = 24 seed words
    const mnemonic = bip39.generateMnemonic(256);

    // generate seed using hdkey library
    let hdWallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    
    // Use bip44 standard for derivation path.
    let path = `m/44'/60'/0'/0/0`;
    // convert the seed to wallet derivation
    let wallet = hdWallet.derivePath(path).getWallet();

    // get the privatekey, publickey and address from the wallet derivation
    const pubKey = ethUtil.privateToPublic(wallet._privKey);
    const addr = ethUtil.publicToAddress(pubKey).toString('hex');
    const privateKey = wallet._privKey.toString('hex');

    const wallet_obj = {
        privateKey: privateKey,
        publicKey: pubKey.toString('hex'),
        address: '0x' + addr,
        mnemonic: mnemonic
      };

      return wallet_obj;
}