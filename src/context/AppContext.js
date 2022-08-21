import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const AppContext = createContext({
  address: null,
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
  const [membershipIdState, setMembershipIdState] = useState(null);
  const [chainId, setChainId] = useState(0);
  const [chainname, setChainName] = useState("");
  const [bountiesState, setBountiesState] = useState([]);

  useEffect(() => {
    if (!currentAddress || !ethers.utils.isAddress(currentAddress)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAddress).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAddress]);

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
