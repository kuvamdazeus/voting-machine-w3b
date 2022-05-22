import { useState } from "react";
import { useEffect } from "react";
import { getAccount, getContract } from "./web3/utils";

export default function VoteTopic({ index, topic, options, optionVotes }) {
  const totalVotes = optionVotes.reduce((total, optionVote) => total + parseInt(optionVote.toString()), 0);
  const optionWithVotes = optionVotes.map((optionVote) => parseInt(optionVote.toString()));

  const [voted, setVoted] = useState(true);
  const [votingIsOn, setVotingIsOn] = useState(false);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    async function main() {
      const contract = getContract();

      const votedData = await contract.hasVoted(index);
      console.log("voted for", topic, "?", votedData);
      setVoted(votedData);

      const votingIsOnData = await contract.voting(index);
      setVotingIsOn(votingIsOnData);
    }

    main();
  }, []);

  const vote = async () => {
    const contract = getContract();
    console.log(index, selection);
    await contract.vote(index, selection);
    setVoted(true);
    setSelection(null);
  };

  const toggleVoting = async () => {
    const contract = getContract();
    if (votingIsOn) {
      await contract.stopVoting(index);
    } else {
      await contract.startVoting(index);
    }
  };

  return (
    <section style={{ marginBottom: 20, border: "1px solid #9c9c9c", borderRadius: "5px", padding: 10 }}>
      {/* Topic */}
      <h2>{topic}</h2>

      {/* Options... */}
      <div style={{ marginBlock: 20, width: "100%" }}>
        {options.map((option, index) => (
          <>
            <div
              style={{
                cursor: "pointer",
                width: voted ? `${(optionWithVotes[index] / totalVotes) * 100}%` : "100%",
                border: "1px solid black",
                backgroundColor: selection === index ? "lightblue" : "white",
              }}
              onClick={() => !voted && setSelection(index)}
            >
              <p style={{ margin: 5, width: "max-content" }}>
                {index}. {option}
              </p>
            </div>

            {voted && (
              <p style={{ color: "red", fontSize: 12, marginBottom: 10, marginTop: 3 }}>
                {optionWithVotes[index]} votes
              </p>
            )}
          </>
        ))}
      </div>

      {!voted && (
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={vote}>Vote</button>

          <button onClick={toggleVoting}>{votingIsOn ? "Stop" : "Start"} Voting</button>
        </section>
      )}
    </section>
  );
}
