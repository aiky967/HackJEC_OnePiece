import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import sampleDeveloper from './assets/sample-developer.svg';
import mintingAnimation from './assets/pick-axe.svg';

import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import coolNFT from './utils/coolNFT.json';
import { connectWallet, getCurrentWalletConnected } from "./utils/wallet"


import {
  CONTRACT_ADDRESS,
  TOTAL_MINT_COUNT,
  RINKEBY_URL,
  OPENSEA_LINK,
  RARIBLE_URL,
  TWITTER_HANDLE,
  TWITTER_LINK,
} from "./constants";
import Loading from "./Loading";



const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [rinkebyUrl, setRinkebyUrl] = useState("");
  const [openSeaUrl, setOpenSeaUrl] = useState("");
  const [raribleUrl, setRaribleUrl] = useState("");
  const [status, setStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNumber, setMintedNumber] = useState(null);
  const [showUrls, setShowUrls] = useState(false);


  const onConnectWalletClick = async () => {
    const { account, status } = await connectWallet();
    setCurrentAccount(account);
    setStatus(status);
  };

  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={onConnectWalletClick}
    >
      Connect to wallet
    </button>
  );

  const renderMintUI = () => 
    isMinting ? (
      <Loading></Loading>
    ) : (
      <button className='cta-button connect-wallet-button' onClick={askContractToMintNft} >
        Mint NFT
      </button>
    );
    
  
  const renderTotalMintedSoFar = () => (
    <p className='mint-total-text'>
      {mintedNumber} out of {TOTAL_MINT_COUNT} Minted so far
    </p>
  );


  const renderMintingAnimation = () => {
    if (isMinting) {
      return (
        <div className='mint-animation-container'>
          <img alt="Minting animation" className='pick-axe' src={mintingAnimation} />
        </div>
      );
    } else {
      return ('');
    }
  };


  const setupEventListener = async () => {

    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, coolNFT.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          const tokenNumberId = tokenId.toNumber();
          const openSea = `${OPENSEA_LINK}/${tokenNumberId}`;
          const rarible = RARIBLE_URL + tokenNumberId;
          setOpenSeaUrl(openSea);
          setRaribleUrl(rarible);

          const mintedMsg = (
            <div>
              <p> Hey there! We've minted your NFT and sent it to your wallet. 😍 </p>
              <p> It may be blank right now. It can take a max of 10 min to show up on OpenSea. </p>
            </div>
          );
          

          connectedContract
            .getTotalNFTsMintedSoFar()
            .then((total) => setMintedNumber(total.toNumber()))
            .catch((error) => console.log(error));
          setIsMinting(false);
          setStatus(mintedMsg);
          setShowUrls(true);
        });

        console.log("Setup event listener!")
      } else {
        setStatus("Can't connect to your Metamask account.");
      }
     }  catch (error) {
        console.log("Error in setupEventListener", error)
    }
  };


  const renderUserUrls = () => (
    <div>
      <p>
        <button className='user-link-button transaction-button'>
          <a
            href={rinkebyUrl}
            target="_blank"
            rel="noreferrer"
            className='collection-link'
          >
            Your Transaction
          </a>
        </button>
      </p>

      <p>
        <button className='user-link-button openSea-collection-button'>
          <a
            href={openSeaUrl}
            target="_blank"
            rel="noreferrer"
            className='collection-link'
          >
            OpenSea
          </a>
        </button>
      </p>

      <p>
        <button className='user-link-button rarible-button'>
          <a
            href={raribleUrl}
            target="_blank"
            rel="noreferrer"
            className='collection-link'
          >
            Rarible
          </a>
        </button>
      </p>
    </div>
  );


  const askContractToMintNft = async () => {
    const { ethereum } = window;
    if (ethereum) {
      try {
        if (currentAccount === "") {
          setStatus("Please connect your MetaMask 🦊 account first.");
          return;
        }
        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, coolNFT.abi, signer);
        setStatus("Going to pop wallet now to pay gas... ⛽️");
        let nftTxn = await connectedContract.makeAnEpicNFT();
        setIsMinting(true)
        setStatus("Miniting...please wait.");
        await nftTxn.wait();
        setRinkebyUrl(`${RINKEBY_URL}/${nftTxn.hash}`);
    } catch (error) {
      setStatus("Sorry, there was a minting error 😳");
      setIsMinting(false);
    }
  } else {
    setStatus("Please connect your MetaMask 🦊 account first.");
  }
};

const getTotalNFTsMintedSoFar = async () => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, coolNFT, signer);

      const totalMinted = await connectedContract.getTotalNFTsMintedSoFar();
      setMintedNumber(totalMinted.toNumber());
    }
  } catch (error) {
    console.log("Error in getTotalNFTsMintedSoFar", error);
  }
};


  useEffect(() => {
    async function fetchData() {
      const { account, status } = await getCurrentWalletConnected();
      setCurrentAccount(account);
      setStatus(status)
    } 
    fetchData();
  }, []);

  useEffect(() => {
    if (currentAccount !== "") {
      setupEventListener();
      getTotalNFTsMintedSoFar();
    }
  }, [currentAccount]);



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Cool NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>

          {currentAccount === "" ? 
            renderNotConnectedContainer() : renderMintUI()}

            {mintedNumber && renderTotalMintedSoFar()}

            {renderMintingAnimation()}

          <img className='sample' alt="sample Stick Figure Developer NFT" src={sampleDeveloper} />
        </div>

        <div className='sub-text'>
          {status}
          {showUrls && renderUserUrls()}
        </div>

  
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`build by @${TWITTER_HANDLE}`}</a>
          <button onClick={() => {window.open('https://testnets.opensea.io/collection/squarenft-t9xibzvvj8')}} className='opensea-button'>
          🌊 View Collection on OpenSea   
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
