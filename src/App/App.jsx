import { useState } from "react";
import { useEffect } from "react";
import VoteTopic from "../VoteTopic";
import { getAccount, getContract } from "../web3/utils";
import "./App.css";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function main() {
      try {
        await getAccount();
        setConnected(true);
      } catch {
        console.log("not connected");
      }
      const contract = getContract();
      console.log("getting topics");
      const data = await contract.functions.getTopics();

      console.log("topics", data);
      setTopics(data[0].filter((Topic) => Topic.topic !== ""));
    }

    main();
  }, []);

  if (window.ethereum && connected) {
    return (
      <section className="center-items">
        <section className="App">
          <p style={{ fontSize: "38px", textAlign: "center", marginBottom: 10 }}>Vote Topics</p>

          {topics.map((topic, index) => (
            <VoteTopic index={index} {...topic} />
          ))}
        </section>
      </section>
    );
  }

  if (!window.ethereum)
    return (
      <center style={{ marginBlock: "20px" }}>
        <h1>Please install MetaMask to use this dApp.</h1>
      </center>
    );

  if (!connected) {
    return (
      <center style={{ marginBlock: "20px" }}>
        <h1>Please connect MetaMask to use this dApp.</h1>
      </center>
    );
  }
}
