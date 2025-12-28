import ChatBox from "./components/ChatBox";

export default function App() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <h1>OpsGPT</h1>
      <ChatBox />
    </div>
  );
}
