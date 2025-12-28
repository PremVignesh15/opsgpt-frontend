export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        backgroundColor: isUser ? "#e2e8f0" : "#ffffff",
        border: isUser ? "none" : "1px solid #e5e7eb",
        padding: "14px 16px",
        borderRadius: 10,
        marginBottom: 12,
        maxWidth: "100%",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#475569",
          marginBottom: 6,
        }}
      >
        {isUser ? "You" : "OpsGPT"}
      </div>

      <div style={{ fontSize: 14 }}>{text}</div>
    </div>
  );
}
