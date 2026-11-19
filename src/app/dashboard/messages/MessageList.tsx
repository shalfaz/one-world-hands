"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { markMessageAsRead, replyToMessage } from "./actions";

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
  const [messageRows, setMessageRows] = useState(messages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSelect = async (message: Message) => {
    if (saving) return;
    setSelectedMessage(message);
    if (message.status !== "unread") return;

    setSaving(true);
    try {
      const result = await markMessageAsRead(message._id);
      if (!result.success) throw new Error(result.error);

      const updatedMessage = { ...message, status: "read" as const };
      setMessageRows((currentRows) =>
        currentRows.map((row) =>
          row._id === message._id ? updatedMessage : row
        )
      );
      setSelectedMessage(updatedMessage);
    } catch (error) {
      console.error("Could not mark message as read:", error);
      await Swal.fire({
        icon: "error",
        title: "Could not update message",
        text: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim() || saving) return;

    setSaving(true);
    try {
      const result = await replyToMessage(selectedMessage._id, replyText);
      if (!result.success) throw new Error(result.error);

      const updatedMessage: Message = {
        ...selectedMessage,
        reply: replyText.trim(),
        repliedAt: result.repliedAt || new Date().toISOString(),
        status: "replied",
      };
      setMessageRows((currentRows) =>
        currentRows.map((row) =>
          row._id === updatedMessage._id ? updatedMessage : row
        )
      );
      setSelectedMessage(updatedMessage);
      setReplyText("");
      await Swal.fire({
        icon: "success",
        title: "Reply saved",
        text: "The reply is saved in the dashboard. It has not been emailed to the sender.",
      });
    } catch (error) {
      console.error("Could not save message reply:", error);
      await Swal.fire({
        icon: "error",
        title: "Could not save reply",
        text: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      {/* Messages List */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        {messageRows.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y">
            {messageRows.map((msg) => (
              <div
                key={msg._id}
                onClick={() => void handleSelect(msg)}
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
            disabled={saving}
          />

          <button
            onClick={handleReply}
            disabled={!replyText.trim() || saving}
            className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:bg-slate-300"
          >
            {saving ? "Saving..." : "Save Reply"}
          </button>
        </div>
      )}
    </div>
  );
}
