const mongoose = require("mongoose");

const timelineSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
    },

    category: {
      type: String,
      enum: [
        "education",
        "project",
        "achievement",
        "career",
        "learning",
      ],
      default: "learning",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Timeline",
  timelineSchema
);