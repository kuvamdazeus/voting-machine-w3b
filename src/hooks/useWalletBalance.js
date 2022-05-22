import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getAccount, getProvider } from "../web3/utils";

export default function useWalletBalance() {
  const [balance, setBalance] = useState("");

  const [intervalState, setIntervalState] = useState(null);

  useEffect(() => {
    const main = async () => {
      if (!window.ethereum) return;

      const account = await getAccount();
      setBalance(ethers.utils.formatEther(await getProvider().getBalance(account)));
    };

    clearInterval(intervalState);
    setIntervalState(setInterval(main, 1000));
  }, []);

  return balance;
}
