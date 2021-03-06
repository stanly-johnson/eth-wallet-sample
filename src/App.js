import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Wallet from './Wallet'
import Transaction from './Transaction'
import TokenTransaction from './TokenTransaction'

function App() {
  return (
    <BrowserRouter>
      <main className="container">
          <Switch>
            <Route path="/tx" component={Transaction} />
            <Route path="/token_tx" component={TokenTransaction} />
            <Route path="/" component={Wallet} />
            <Redirect to="/404" />
          </Switch>
        </main>
    </BrowserRouter>
  );
}

export default App;
