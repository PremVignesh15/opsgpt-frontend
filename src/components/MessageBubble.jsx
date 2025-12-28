export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        background: isUser ? "#1e293b" : "#020617",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        whiteSpace: "pre-wrap",
      }}
    >
      <strong>{isUser ? "You" : "OpsGPT"}:</strong>
      <div>{text}</div>
    </div>
  );
}
