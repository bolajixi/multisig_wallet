import Web3 from 'web3';
import Wallet from './contracts/Wallet.json';

// const getWeb3 = () => {
//     return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));
// };

const getWeb3 = () => {
    // return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));
    return new Promise( (resolve, reject) => {
        window.addEventListener('load', async (event) => {
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            } else if (window.web3){
                resolve(window.web3);
            } else {
                reject('You must install Meta Mask')
            }
        })
    })
};

const getWallet = async web3 => {
    const networkId = await web3.eth.net.getId();
    const network = Wallet.networks[networkId];

    return new web3.eth.Contract(
        Wallet.abi,
        network && network.address
    );
};

export { getWeb3, getWallet };
