export default function AuthProvider({ children }) {
  if (!window.ethereum)
    return (
      <section className="centered">
        <button>Please connect wallet</button>
      </section>
    );

  return children;
}
