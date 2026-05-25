const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "database",
        "tools",
        "other",
      ],
      default: "frontend",
    },

    icon: {
      type: String,
    },

    proficiency: {
      type: Number,
      min: 1,
      max: 100,
      default: 80,
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
  "Skill",
  skillSchema
);