import React, { createContext, useEffect, useCallback, useState } from "react";
import { ethers } from "ethers";

export const AppContext = createContext({
  address: null,
  signer: null,
  wallet: null,
  balance: null,
  membershipId: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  updateMembership: () => {},
  bounties: [],
});

const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [signerState, setSignerState] = useState(null);
  const [membershipIdState, setMembershipIdState] = useState(null);
  const [chainId, setChainId] = useState(0);
  const [chainname, setChainName] = useState("");
  const [bountiesState, setBountiesState] = useState([]);

  async function requestAccount() {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts;
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  // Create a provider to interact with a smart contract
  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await requestAccount();
      return accounts[0];
    }
  }, []);

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log(accounts);
    const signer = provider.getSigner();
    return signer;
    console.log("Account:", await signer.getAddress());
  }

  useEffect(() => {
    if (!currentAddress || !ethers.utils.isAddress(currentAddress)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    connectToMetamask().then((res) => {
      setSignerState(res);
      console.log(res);
    });
    // console.log("loading");
    // connectWallet().then((res) => {
    //   console.log("Saving wallet add");
    //   setWalletAddress(res);
    // });
    // console.log("loaded");

    provider.getBalance(currentAddress).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });

    // provider.send("eth_requestAccounts", []).then((res) => {
    //   const signer = provider.getSigner();
    //   //signer.getAddress().then((res) => console.log(res));
    //   console.log(signer);
    //   setSignerState(signer);
    // });
  }, [currentAddress, connectWallet]);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAddress(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setCurrentAddress(undefined);
  };

  const updateMembership = (membershipId) => {
    setMembershipIdState(membershipId);
  };

  const appContextValue = {
    address: currentAddress,
    balance: balance,
    wallet: walletAddress,
    signer: signerState,
    connectWallet: onClickConnect,
    disconnectWallet: onClickDisconnect,
    bounties: bountiesState,
    membershipId: membershipIdState,
    updateMembership,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
