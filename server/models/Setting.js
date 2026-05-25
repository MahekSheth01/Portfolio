const mongoose = require("mongoose");

const settingSchema = mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "",
    },

    heroSubtitle: {
      type: String,
      default: "",
    },

    aboutText: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    resumeLink: {
      type: String,
      default: "",
    },

    githubLink: {
      type: String,
      default: "",
    },

    linkedinLink: {
      type: String,
      default: "",
    },

    twitterLink: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    availability: {
      type: Boolean,
      default: true,
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Setting",
  settingSchema
);