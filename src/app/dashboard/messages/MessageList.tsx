"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { markMessageAsRead, replyToMessage } from "./actions";
import { useLanguage } from "@/context/LanguageContext";

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
  const { t } = useLanguage();

  const statusLabels: Record<string, string> = {
    unread: t.dashboard.messages.status.unread,
    read: t.dashboard.messages.status.read,
    replied: t.dashboard.messages.status.replied,
  };

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
        title: t.dashboard.messages.alerts.updateErrorTitle,
        text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
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
        title: t.dashboard.messages.alerts.replySavedTitle,
        text: t.dashboard.messages.alerts.replySavedText,
      });
    } catch (error) {
      console.error("Could not save message reply:", error);
      await Swal.fire({
        icon: "error",
        title: t.dashboard.messages.alerts.replyErrorTitle,
        text: error instanceof Error ? error.message : t.dashboard.common.tryAgain,
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
            <p>{t.dashboard.messages.empty}</p>
          </div>
        ) : (
          <div className="divide-y">
            {messageRows.map((msg) => (
              <div
                key={msg._id}
                onClick={() => void handleSelect(msg)}
                className={`p-4 cursor-pointer transition hover:bg-slate-50 ${
                  selectedMessage?._id === msg._id ? "bg-[#EAF6FB]" : ""
                } ${msg.status === "unread" ? "bg-[#EAF6FB]" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{msg.name}</h3>
                      <span
                        className={`whitespace-nowrap text-xs px-2 py-1 rounded-full ${
                          msg.status === "unread"
                            ? "bg-[#EAF6FB] text-[#174A70]"
                            : msg.status === "replied"
                            ? "bg-emerald-50 text-[#17634B]"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {statusLabels[msg.status] ?? msg.status}
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
            <div className="mt-4 rounded-lg bg-[#EAF6FB] p-3">
              <p className="text-xs font-semibold text-[#174A70]">{t.dashboard.messages.yourReply}</p>
              <p className="text-sm text-[#475569] whitespace-pre-wrap mt-1">
                {selectedMessage.reply}
              </p>
            </div>
          )}

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t.dashboard.messages.replyPlaceholder}
            className="mt-4 w-full rounded-lg border border-slate-200 p-2 text-sm"
            rows={4}
            disabled={saving}
          />

          <button
            onClick={handleReply}
            disabled={!replyText.trim() || saving}
            className="mt-2 w-full whitespace-nowrap rounded-lg bg-[#009EDB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:bg-slate-300"
          >
            {saving ? t.dashboard.messages.savingReply : t.dashboard.messages.saveReply}
          </button>
        </div>
      )}
    </div>
  );
}
