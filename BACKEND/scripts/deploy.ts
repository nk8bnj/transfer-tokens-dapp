import { ethers, upgrades } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("UpgradeableToken");
  const token = await upgrades.deployProxy(Token);
  await token.deployed();

  console.log("UpgradeableToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
