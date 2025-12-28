const API_BASE = "https://invoice-showers-swing-viewers.trycloudflare.com";

export async function sendMessageStream(message, onChunk) {
  const res = await fetch(`${API_BASE}/chat-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok || !res.body) {
    throw new Error("Backend not reachable");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}
