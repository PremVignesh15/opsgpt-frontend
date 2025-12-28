import { useState } from "react";
import { sendMessageStream } from "../services/api";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSend() {
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg, { role: "bot", text: "" }]);
    setInput("");

    try {
      await sendMessageStream(input, (chunk) => {
        setMessages((msgs) => {
          const copy = [...msgs];
          copy[copy.length - 1].text += chunk;
          return copy;
        });
      });
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "❌ Backend error" },
      ]);
    }
  }

  return (
    <div>
      <div>
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
