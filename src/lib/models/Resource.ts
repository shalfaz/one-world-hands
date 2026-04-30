import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      maxlength: [150, "Title cannot exceed 150 characters"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["photo", "document", "blog", "report", "webinar"],
      required: [true, "Resource type is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    // For documents/PDFs uploaded to Cloudinary
    fileUrl: {
      type: String,
      default: "",
    },
    fileType: {
      type: String,
      default: "", // e.g., "pdf", "docx", "pptx"
    },
    // For YouTube links (videos)
    youtubeLink: {
      type: String,
      default: "",
    },
    // For blog content
    content: {
      type: String,
      default: "",
    },
    tags: [String],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator information is required"],
    },
  },
  { timestamps: true }
);

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);

export default Resource;
