import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("UpgradeableToken", function () {
  const addresses: string[] = [];
  const tokens: number[] = [];
  let token: any;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    const Token = await ethers.getContractFactory("UpgradeableToken");
    token = await upgrades.deployProxy(Token);
    await token.deployed();

    // Create arrays for tests, using a loop.
    for (let i = 0; i < signers.length; i++) {
      addresses[i] = signers[i].address;
      tokens[i] = 1000 * i;
    }
  });

  it("Owner balance must be 9999999999999999810000", async function () {
    await token.transferTokens(addresses, tokens);
    expect(await token.balanceOf(addresses[0])).to.equal(
      BigNumber.from("9999999999999999810000")
    );
  });

  it("The balance of the third address must be equal to zero", async function () {
    expect(await token.balanceOf(addresses[3])).to.equal(0);
  });

  it("The balance of the fifth address must be topped up by 5000", async function () {
    await token.transferTokens(addresses, tokens);
    expect(await token.balanceOf(addresses[5])).to.equal(5000);
  });

  it("Arrays are not empty", async function () {
    await expect(addresses.length).not.to.equal(0);
    await expect(tokens.length).not.to.equal(0);
  });
});
