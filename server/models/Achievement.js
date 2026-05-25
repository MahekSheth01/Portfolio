const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "certificate",
        "event",
        "project",
        "design",
        "journey",
      ],
      default: "certificate",
    },

    date: {
      type: String,
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
  "Achievement",
  achievementSchema
);