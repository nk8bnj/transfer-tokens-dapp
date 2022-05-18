import { ethers } from "ethers";
import abi from "../abi/abi.json";

// "npx hardhat run --network goerli scripts/deploy.ts"
// To get the address of the contract.
const contractAddress = "0x91Cd74818123691E435991a499a82bD1b651362f";

// Request account access.
const requestAccount = async () => {
	await window.ethereum.request({ method: "eth_requestAccounts" });
};

// Function to submit transaction.
export const submitTransaction = async (
	addressesArray: string[],
	tokensArray: string[]
) => {
	if (typeof window.ethereum !== "undefined") {
		await requestAccount();

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const contract = new ethers.Contract(contractAddress, abi, signer);
		const tx = await contract.transferTokens(addressesArray, tokensArray);
		await tx.wait();
	}
};
