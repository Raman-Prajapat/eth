import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './App.css';
const contractABI = require("../src/Contract/contract-abi.json")
const contractAddress = "0xE9C923d5970e2E0B5bb3802A04b42672CE469Caf"


const App = () => {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [hash, setHash] = useState("")


  window.web3 = new window.Web3(window.ethereum)

  // Connecting the wallet
  const connectWalletHandler = async () => {

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Wallet Accounts: ', accounts)
      console.log(window.web3)
      setCurrentAccount(accounts[0])

    }
    catch (err) {
      console.log(err)
    }
  }

  // Handle Minting Procedure
  const mintNftHandler = async () => {
    const contract = new window.web3.eth.Contract(contractABI, contractAddress)
    const response = await contract.methods.mint(currentAccount, 2, 1, []).send({ from: currentAccount }).catch(err => err);
    console.log(response)
    console.log(response.blockHash)
    setHash(response.blockHash)
    console.log(`Check the Transction status https://rinkeby.etherscan.io/tx/${response.transactionHash}`)



  }

  // const connectWalletButton = () => {
  //   return (

  //     <Button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
  //       Connect Wallet
  //     </Button>
  //   )
  // }

  // const mintNftButton = () => {
  //   return (
  //     <Button variant="success" onClick={mintNftHandler} className='cta-button mint-nft-button'>
  //       Mint NFT
  //     </Button>
  //   )
  // }



  return (
    <div className='App' >
      <div className="mint-box">
        <h3>NFT Minting</h3>
        {currentAccount ? <Button variant="success" className='cta-button mint-nft-button'>
          Connected
      </Button> :
          <Button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
            Connect the Wallet
      </Button>
        }

        <Button style={{ display: currentAccount ? null : 'none', backgroundColor: "#98ff98", color: "#1f1f1f" }}
          onClick={mintNftHandler} className='cta-button connect-wallet-button'>
          Mint NFT
      </Button>
      </div>
      <br />
      <p>Minted on Hash :- {hash}</p>
      <br />

    </div>
  )

}
export default App
