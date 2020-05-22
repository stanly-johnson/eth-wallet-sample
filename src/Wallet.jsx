import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { generateWallet } from '../src/walletUtils'
import { genEthHdWallet } from '../src/hdWalletGen'
class Wallet extends Component {

    state = { 
        showWalletTab : false,
        showHdWalletTab : false,
        walletDetails : {}
     }

    handleWalletGen = () => {
        const walletDetails = generateWallet();
        this.setState({ walletDetails, showWalletTab : true})
    }

    handleHdWalletGen = async () => {
        const walletDetails = await genEthHdWallet();
        this.setState({ walletDetails, showHdWalletTab : true})
    }

    render() { 
        return (
        <React.Fragment>
            <br />
            <Button
            onClick = {() => this.handleWalletGen()}
            >Create Wallet</Button>

            {this.state && this.state.showWalletTab && (<p>
                Private Key : {this.state.walletDetails.private_key}
                <br />
                Address : {this.state.walletDetails.public_key}
            </p>)}

            <br /><br />
            <Button
            onClick = {() => this.handleHdWalletGen()}
            >Create HD Wallet</Button>

            {this.state && this.state.showHdWalletTab && (<p>
                Private Key : {this.state.walletDetails.privateKey}
                <br />
                Address : {this.state.walletDetails.address}
                <br />
                Mnemonic : {this.state.walletDetails.mnemonic}
            </p>)}

        </React.Fragment>
            );
    }
}
 
export default Wallet;