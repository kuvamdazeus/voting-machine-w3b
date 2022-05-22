import { ethers } from "ethers";
import abi from "./contract_ABI";

export const getProvider = () => new ethers.providers.Web3Provider(window.ethereum);

export const getAccount = async () => {
  const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
  return account;
};

export const getContract = () => {
  const signer = getProvider().getSigner();
  const contract = new ethers.Contract(import.meta.env.VITE_CONTRACT, abi, signer);
  return contract;
};
