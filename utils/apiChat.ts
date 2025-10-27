export async function apiChat(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  systemPrompt: string
) {
  try {
    const res = await fetch("https://househive-backend-server-1.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemPrompt,
        messages,
      }),
    });

    if (!res.ok) throw new Error("Chat API request failed");
    const data = await res.json();

    return {
      reply: data.reply || "No response received from HiveBot.",
      success: true,
    };
  } catch (err) {
    console.error("Error in apiChat:", err);
    return {
      reply: "There was an error connecting to HiveBot.",
      success: false,
    };
  }
}
