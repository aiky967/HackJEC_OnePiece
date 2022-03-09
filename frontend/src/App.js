import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import './styles/App.css';
import { networks } from './utils/networks';
import contractAbi from './utils/GeoDapp.json';


const CONTRACT_ADDRESS = '';




const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [status, setStatus] = useState("");
  const [network, setNetwork] = useState("");
  

  const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Make sure you have metamask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum)
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}

		const chainId = await ethereum.request({ method: 'eth_chainId' });
		setNetwork(networks[chainId]);

		ethereum.on('chainChanged', handleChainChanged);

		function handleChainChanged(_chainId) {
			window.location.reload();                    
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			} 

			const accounts = await ethereum.request({ method: "eth_requestAccounts" });

			console.log("Connected", accounts[0]);
		} catch (error) {
			console.error(error);
		}
	};

	const switchNetwork = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x3'}],
				});
			} catch (error) {
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: '0x3',
									chainName: 'Ropston Testnet',
									rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
									nativeCurrency: {
										name: "Ropston Test Network",
										symbol: "ETH",
										decimals: 18
									},
									blockExplorerUrls: ["https://ropsten.etherscan.io"],
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		}
	};


  const copyrightRegistration = async () => {
    if(currentAccount) {
      console.log("Connected Address", currentAccount)
    }

    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.cpRegistration()
      }
    } catch (error) {
      console.error(error);
    }
  };
  
 

  const renderNotConnectedContainer = () => (
		<div className='connect-wallet-container'>
			<img src="https://c4.wallpaperflare.com/wallpaper/316/886/460/anime-one-piece-zoro-roronoa-wallpaper-preview.jpg" alt='zoro' />
			<button onClick={connectWallet} className='cta-button connect-wallet-button'>
				Connect Wallet
			</button>
		</div>
	);


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Cool NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>

          
          <img className='sample' alt="sample Stick Figure Developer NFT" src={sampleDeveloper} />
        </div>

        
  
      </div>
    </div>
  );
};

export default App;
