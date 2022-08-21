// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const BountyNFTFactory = await hre.ethers.getContractFactory(
    "BountyNFTFactory"
  );
  const bountyNFTFactory = await BountyNFTFactory.deploy(
    "BountyFactory",
    "BTY"
  );

  await bountyNFTFactory.deployed();

  console.log(`BountyNFTFactory deployed to ${bountyNFTFactory.address}`);

  await bountyNFTFactory.mint(
    "https://ipfs.io/ipfs/QmXaEkN9eTR5yofzWk3D4oWeWN7s2nkscimYLGDR59NWFm"
  );

  console.log(`NFT succesfully minted`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
