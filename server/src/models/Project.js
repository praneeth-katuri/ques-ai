const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    podcastCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.index({ title: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Project", projectSchema);
