"use client";
import { useState } from "react";
import { apiChat } from "../../utils/apiChat";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

type ChatRole = "user" | "assistant" | "system";
type ChatTurn = { role: ChatRole; content: string };

export default function MessagesPage() {
  const [log, setLog] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const messages: ChatTurn[] = [...log, { role: "user", content: input }];
    setLog(messages);
    setInput("");

    const res = await apiChat(messages, "You are HiveBot, the helpful assistant for HouseHive.ai.");
    setLog([...messages, { role: "assistant", content: res.reply }]);
  };

  return (
    <div className="p-4 text-white">
      <div className="space-y-2 mb-4">
        {log.map((msg: ChatTurn, i: number) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user" ? "bg-yellow-500 text-black" : "bg-gray-700"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg text-black"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-yellow-500 text-black font-semibold px-4 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
