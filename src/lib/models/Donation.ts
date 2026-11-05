import mongoose, { Schema } from "mongoose";

const DonationSchema = new Schema(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    contact: { type: String, trim: true, default: "" },
    fund: { type: Schema.Types.ObjectId, ref: "Fund" },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ["bkash", "nagad", "card", "cash", "bank"], default: "cash" },
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
  },
  { timestamps: true }
);

const Donation = mongoose.models.Donation || mongoose.model("Donation", DonationSchema);

export default Donation;
