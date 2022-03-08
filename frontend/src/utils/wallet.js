import { RINKEBY_CHAIN_ID } from "../constants";

export const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
        return {
            account: "",
            status: "Get Metamask!",
        };
    }

    try {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        if (chainId !== RINKEBY_CHAIN_ID) {
            return {
                account: "",
                status: "You are not connected to the Rinkeby Test Network",
            };
        }

        const [account = ""] = await ethereum.request({
            method: "eth_requestAccounts",
        });

        return {
            account,
            status: "Found Metamask Account",
        };
    } catch (error) {
        console.error("Error in connectWallet component:", error);
        return {
            account: "",
            status: "😥 " + error.message,
        };
    }
};

export const getCurrentWalletConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
        return {
            account: "",
            status: "Connect your MetaMask 🦊 wallet to start minting."
        };
    }

    try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
            return {
                account: accounts[0],
                status: "Wallet Connected! ✅",
            };   
        } else {
            return {
                account: "",
                status: "No authorised account found",
            };
        }
    } catch (error) {
        console.error("Error in getCurrentWalletConnected:", error);
        return {
            account: "",
            status: "ERROR",
        };
    }
};