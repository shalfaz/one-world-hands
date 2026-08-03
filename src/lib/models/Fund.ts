import mongoose, { Schema } from "mongoose";

const FundSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Fund name is required"],
      maxlength: [100, "Fund name cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["education", "health", "emergency", "community", "livelihood", "other"],
      required: [true, "Category is required"],
    },
    impactSummary: {
      type: String,
      default: "",
    },
    targetAmount: {
      type: Number,
      default: 0,
      min: [0, "Target amount cannot be negative"],
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: [0, "Raised amount cannot be negative"],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "draft", "completed", "paused"],
      default: "draft",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator information is required"],
    },
  },
  { timestamps: true }
);

const Fund = mongoose.models.Fund || mongoose.model("Fund", FundSchema);

export default Fund;
