import { useState } from "react";
import { sendMessageStream } from "../services/api";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSend() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [...prev, { role: "user", text: userText }]);

    let botText = "";
    setMessages(prev => [...prev, { role: "bot", text: "" }]);

    await sendMessageStream(userText, (chunk) => {
      botText += chunk;
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "bot", text: botText };
        return copy;
      });
    });

    // 👇 completion marker
    setMessages(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = {
        role: "bot",
        text: botText + "\n\n✅ Analysis complete."
      };
      return copy;
    });
  }

  return (
    <div>
      <div style={{ minHeight: 200 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask OpsGPT..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
