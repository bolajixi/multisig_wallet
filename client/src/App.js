import React, { useEffect, useState } from 'react';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { getWallet, getWeb3 } from './utils';

function App() {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [wallet, setWallet] = useState(undefined);
    const [approvers, setApprovers] = useState([]);
    const [quorum, setQuorum] = useState(undefined);
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        (async () => {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const wallet = await getWallet(web3);
            const approvers = await wallet.methods.getApprovers().call(); 
            const quorum = await wallet.methods.quorum().call();
            const transfers = await wallet.methods.getTransfers().call();

            setWeb3(web3);
            setAccounts(accounts);
            setWallet(wallet);
            setApprovers(approvers);
            setQuorum(quorum);
            setTransfers(transfers);
        })();
    }, []);

    const createTransfer = transfer => {
        wallet.methods
        .createTransfer(transfer.amount, transfer.to)
        .send({from: accounts[0]});
    }

    const approveTransfer = transferId => {
        wallet.methods
        .approveTransfer(transferId)
        .send({from: accounts[0]});
    }
        
    if( typeof web3 === 'undefined' || typeof accounts === 'undefined' || typeof wallet === 'undefined' || approvers.length === 0 || typeof quorum === 'undefined'){
        <div>{typeof web3}</div>
        return <div>Loading...., Web3 = {web3}</div>
    }
            
            
    return (
        <div className="App">
            MULTI-SIG DAPP (Multi-signature DAPP)
            <Header approvers={approvers} quorum={quorum}></Header>
            <NewTransfer createTransfer={createTransfer} />
            <TransferList transfers={transfers} approveTransfer={approveTransfer} />
        </div>
    );
}

export default App;
