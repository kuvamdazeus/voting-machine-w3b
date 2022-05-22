import { useState } from "react";
import { useEffect } from "react";
import VoteTopic from "../VoteTopic";
import { getContract } from "../web3/utils";
import "./App.css";

export default function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function main() {
      const contract = getContract();
      console.log("getting topics");
      const data = await contract.functions.getTopics();

      console.log("topics", data);
      setTopics(data[0].filter((Topic) => Topic.topic !== ""));
    }

    main();
  }, []);

  if (window.ethereum) {
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

  return (
    <center style={{ marginBlock: "20px" }}>
      <h1>Please install MetaMask to use this dApp.</h1>
    </center>
  );
}
