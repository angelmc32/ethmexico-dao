import { ethers, Wallet } from "ethers";

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
export const ethersProvider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_RPC_URL
);

export const getSigner = () => {
  return new Wallet(process.env.PRIVATE_KEY, ethersProvider);
};

export const getAddress = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
};

export const signText = (text) => {
  console.log(ethersProvider);
  const signer = getSigner();
  console.log(signer);
  return signer.signMessage(text);
};
