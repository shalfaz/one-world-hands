"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
  updatedAt: string;
  reply: string;
  repliedAt: string | null;
};

export default function MessageList({ messages }: { messages: Message[] }) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    // TODO: Implement reply functionality
    Swal.fire({
      icon: "success",
      title: "Reply Sent",
      text: "Your reply has been sent successfully.",
    });
    setReplyText("");
    setSelectedMessage(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      {/* Messages List */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 cursor-pointer transition hover:bg-slate-50 ${
                  selectedMessage?._id === msg._id ? "bg-sky-50" : ""
                } ${msg.status === "unread" ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{msg.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          msg.status === "unread"
                            ? "bg-blue-200 text-blue-800"
                            : msg.status === "replied"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{msg.email}</p>
                    <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail */}
      {selectedMessage && (
        <div className="rounded-2xl border border-slate-200 p-4 h-fit">
          <h2 className="font-semibold text-slate-900">{selectedMessage.name}</h2>
          <p className="text-sm text-slate-600">{selectedMessage.email}</p>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {selectedMessage.message}
            </p>
          </div>

          {selectedMessage.reply && (
            <div className="mt-4 rounded-lg bg-green-50 p-3">
              <p className="text-xs font-semibold text-green-800">Your Reply</p>
              <p className="text-sm text-green-700 whitespace-pre-wrap mt-1">
                {selectedMessage.reply}
              </p>
            </div>
          )}

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="mt-4 w-full rounded-lg border border-slate-200 p-2 text-sm"
            rows={4}
          />

          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:bg-slate-300"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
}
