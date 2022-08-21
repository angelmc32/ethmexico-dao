import axios from "axios";
import { ethers } from "ethers";

const gold_badge_URI =
  "https://ipfs.io/ipfs/QmQqq9rbsf4PCgoMY3MartEc1gqi7i5shFsynrGqoJs9T8";
const silver_badge_URI =
  "https://ipfs.io/ipfs/QmasVyyargGfuLBcJNhpxtHuhjMNtYEZAFZCujxQiQxrrz";
const bronze_badge_URI =
  "https://ipfs.io/ipfs/QmUHbny2snjs7Gco6Hkwyu44Yzrf1ZMh6e4SQssZyq9FT8";

const rpc = "https://rpc-mumbai.maticvigil.com/";
const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);

let membershipNftAbi = [
  "function balanceOf(address owner) public view returns(uint256 balance)",
  "function symbol() public view returns(string memory)",
  "function tokenCount() public view returns(uint256)",
  "function tokenURI(uint256 _tokenId) public view returns(string memory)",
];

let membershipNft = new ethers.Contract(
  "0x8202398ED2885187b39220Aeb26e795486930681",
  membershipNftAbi,
  ethersProvider
);

let bountyNftFactoryAbi = [
  "function deposit(uint _amount, IERC20 token) public payable(uint256 balance)",
  "function withdraw(uint256 amount, address payable destAddr) public",
  "function transferERC20(IERC20 token, address to, uint256 amount, uint256 bountyId) public",
  "function createBounty(address _newBountyOwner, uint256 _newBountyId, string memory _title, uint256 _value, address _erc20tokenAddress, string memory _erc20tokenSymbol, string memory _imageURI) public",
];

let bountyNft = new ethers.Contract(
  "0x6bee2523a2e054846c45c1ec7da1258dbf04e159",
  bountyNftFactoryAbi,
  ethersProvider
);

export const getNFT = async (address) => {
  const membershipId = (await membershipNft.balanceOf(address)).toNumber();
  const nftSymbol = await membershipNft.symbol();
  console.log(membershipId, nftSymbol);
  const nftURI = await membershipNft.tokenURI(0);

  console.log("URI", nftURI);

  return axios.get(nftURI);
};

export const createBounty = async (
  address,
  bountyData,
  erc20tokenAddress,
  erc20tokenSymbol
) => {
  const { title, compensation, badge } = bountyData;
  let savedImageURI, meritPoints;

  switch (badge) {
    case "bronze":
      savedImageURI = bronze_badge_URI;
      meritPoints = 2;
      break;
    case "silver":
      savedImageURI = silver_badge_URI;
      meritPoints = 5;
      break;
    case "gold":
      savedImageURI = gold_badge_URI;
      meritPoints = 10;
      break;
    default:
      savedImageURI = bronze_badge_URI;
      meritPoints = 2;
      break;
  }
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: {
        title: title,
        compensation: compensation,
        meritPoints: meritPoints,
        imageURI: savedImageURI,
      },
    },
  });

  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.PINATA_JWT,
    },
    data: data,
  };
  const pinataResponse = await axios.post(config);
  console.log(pinataResponse);
  //bountyNft.createBounty(address, 1, title, compensation, erc20tokenAddress, erc20tokenSymbol, imageURI)
};
