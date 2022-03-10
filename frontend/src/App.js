import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import './styles/App.css';
import { networks } from './utils/networks';
// import contractAbi from './utils/GeoDapp.json';


const CONTRACT_ADDRESS = '';


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [dataName, setDataName] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [dataImage, setDataImage] = useState();
  const [data, setData] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
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
					params: [{ chainId: '0x4'}],
				});
			} catch (error) {
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: '0x3',
									chainName: 'Rinkeby Testnet',
									rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
									nativeCurrency: {
										name: "Rinkeby Test Network",
										symbol: "ETH",
										decimals: 18
									},
									blockExplorerUrls: ["https://rinkeby.etherscan.io"],
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


//   const copyrightRegistration = async () => {
//     if(currentAccount) {
//       console.log("Connected Address", currentAccount)
//     }

//     try {
//       const { ethereum } = window;
      
//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

//         console.log("Going to pop wallet now to pay gas...");
//         let tx = await contract.cpRegistration()
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

  const renderNotConnectedContainer = () => (
		<div className='connect-wallet-container'>
			<img src="https://c4.wallpaperflare.com/wallpaper/316/886/460/anime-one-piece-zoro-roronoa-wallpaper-preview.jpg" alt='zoro' />
			<button onClick={connectWallet} className='cta-button connect-wallet-button'>
				Connect Wallet
			</button>
		</div>
	);

	const renderInputForm = () => {
		return (
			<div className="form-container">
				<div className="first-row">
					<input 
						type="text"
						value={dataName}
						placeholder='Data Name'
						onChange={e => setDataName(e.target.value)}
					/>
				</div>

				<input 
					type="text"
					value={year}
					placeholder='Year of data'
					onChange={e => setYear(e.target.value)}
				/>

				<input 
					type="text"
					value={description}
					placeholder='Data Description'
					onChange={e => setDescription(e.target.value)}
				/>

				<input 
					type="file"
					value={dataImage}
					placeholder='Upload data image'
					onChange={e => setDataImage(e.target.value)}
				/>

				<input 
					type="file"
					onChange={e => setData(e.target.value)}
				/>

				<div className="button-container">
					<button className='cta-button mint-button' disabled={null} onClick={null}>
						Set data
					</button> 
				</div>
			</div>
		)
	}


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">GDRM - Decentralized geographic data rights management system </p>
          <p className="sub-text">
            
          </p>
        
        </div>

		{!currentAccount && renderNotConnectedContainer()}
		{currentAccount && renderInputForm()}
        
  
      </div>
    </div>
  );
};

export default App;
