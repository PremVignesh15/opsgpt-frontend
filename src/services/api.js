const BASE_URL = "https://rate-start-inside-buried.trycloudflare.com";

export async function sendMessageStream(message, onChunk) {
  const res = await fetch(`${BASE_URL}/chat-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}
