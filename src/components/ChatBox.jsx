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
    } catch (err) {
      alert("Streaming failed");
    }

    setLoading(false);
  }

  return (
    <>
      <div style={{ minHeight: 400 }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste logs here..."
        style={{ width: "100%", marginTop: 10, padding: 10 }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          background: "#2563eb",
          border: "none",
          color: "white",
          borderRadius: 6,
        }}
      >
        {loading ? "Analyzing..." : "Send"}
      </button>
    </>
  );
}
