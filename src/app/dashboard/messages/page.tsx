import connectToDatabase from "@/lib/mongoose";
import Message from "@/lib/models/Message";
import MessageList, { type Message as MessageType } from "./MessageList";
import DashboardSidebar from "../../../components/DashboardSidebar";

type MessageData = MessageType;

export default async function MessagesPage() {
  let serializedMessages: MessageData[] = [];
  let error = false;

  try {
    await connectToDatabase();
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Serialize messages
    serializedMessages = messages.map((msg: Record<string, unknown>) => {
      const status = String(msg.status);
      const validStatus = ["read", "unread", "replied"].includes(status) 
        ? (status as "read" | "unread" | "replied")
        : "unread";
      
      return {
        _id: String(msg._id),
        name: String(msg.name),
        email: String(msg.email),
        message: String(msg.message),
        status: validStatus,
        createdAt: msg.createdAt instanceof Date ? msg.createdAt.toISOString() : String(msg.createdAt),
        updatedAt: msg.updatedAt instanceof Date ? msg.updatedAt.toISOString() : String(msg.updatedAt),
        reply: String(msg.reply || ""),
        repliedAt: msg.repliedAt instanceof Date ? msg.repliedAt.toISOString() : null,
      };
    });
  } catch (err) {
    console.error("Error loading messages:", err);
    error = true;
  }

  if (error) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="text-red-600">Error loading messages</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="mt-2 text-slate-600">
            {serializedMessages.length} message{serializedMessages.length !== 1 ? "s" : ""}
          </p>

          <div className="mt-6">
            <MessageList messages={serializedMessages} />
          </div>
        </div>
      </main>
    </div>
  );
}
