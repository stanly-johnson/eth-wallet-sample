import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { generateWallet } from '../src/walletUtils'

class Wallet extends Component {

    state = { 
        showWalletTab : false,
        walletDetails : {}
     }

    handleWalletGen = () => {
        const walletDetails = generateWallet();
        this.setState({ walletDetails, showWalletTab : true})
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
                Public Key : {this.state.walletDetails.public_key}
            </p>)}

        </React.Fragment>
            );
    }
}
 
export default Wallet;