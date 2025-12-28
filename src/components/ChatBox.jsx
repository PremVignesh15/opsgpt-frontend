import { useState } from "react";
import { sendMessageStream } from "../services/api";
import MessageBubble from "./MessageBubble";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botMessage = { role: "bot", text: "" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    setLoading(true);

    try {
      await sendMessageStream(input, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...botMessage,
            text: updated[updated.length - 1].text + chunk,
          };
          return updated;
        });
      });
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Backend error occurred." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ minHeight: 300, marginBottom: 16 }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste logs here..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
          marginBottom: 12,
          resize: "vertical",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "10px 18px",
          borderRadius: 8,
          border: "none",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {loading ? "Analyzing…" : "Send"}
      </button>
    </div>
  );
}
