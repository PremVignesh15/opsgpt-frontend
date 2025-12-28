const BASE_URL = "https://invoice-showers-swing-viewers.trycloudflare.com";

export async function sendMessageStream(message, onChunk) {
  const response = await fetch(`${BASE_URL}/chat-stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Backend did not respond correctly");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}
