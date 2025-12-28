const BASE_URL = "https://extra-startup-arthritis-phones.trycloudflare.com";

export async function sendMessageStream(message, onChunk) {
  const res = await fetch(`${BASE_URL}/chat-stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value));
  }
}
