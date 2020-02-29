import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { sendTokenTx } from '../src/walletUtils'

class TokenTransaction extends Component {
    state = { 
        address : "",
        private_key : "",
        recipent : "",
        amount : "",
        token_contract : ""
     }


     handleSubmit = e => {
        e.preventDefault();
        // console.log("Submitted");
        this.doSubmit();
      };

    doSubmit = async() => {
        const {address, token_contract ,recipent, amount, private_key} = this.state;
        let hash = await sendTokenTx(address, token_contract, recipent, amount, private_key)
        console.log(hash)
    }


    render() { 
        return (
        <React.Fragment>
            <br />
            <br />
            <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Sender Address:</label>
                                <input type="text" className="form-control" id="tokenName" 
                                onChange={e => this.setState({ address: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Token Contract Address:</label>
                                <input type="text" className="form-control" id="tokenAmount" 
                                onChange={e => this.setState({ token_contract: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Recipent Address:</label>
                                <input type="text" className="form-control" id="tokenAmount" 
                                onChange={e => this.setState({ recipent: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Token Amount:</label>
                                <input type="text" className="form-control" id="recipent" 
                                onChange={e => this.setState({ amount: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Private Key:</label>
                                <input type="text" className="form-control" id="recipent" 
                                onChange={e => this.setState({ private_key: e.target.value })}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </form>


        </React.Fragment>
            )
    }
}
 
export default TokenTransaction;