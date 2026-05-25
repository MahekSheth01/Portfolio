const Project = require("../models/Project");

const Skill = require("../models/Skill");

const Achievement = require(
  "../models/Achievement"
);

const Message = require("../models/Message");

const Timeline = require("../models/Timeline");


// GET DASHBOARD STATS
const getDashboardStats = async (
  req,
  res
) => {

  try {

    // COUNT DOCUMENTS
    const totalProjects =
      await Project.countDocuments();

    const totalSkills =
      await Skill.countDocuments();

    const totalAchievements =
      await Achievement.countDocuments();

    const totalMessages =
      await Message.countDocuments();

    const unreadMessages =
      await Message.countDocuments({
        isRead: false,
      });

    const timelineItems =
      await Timeline.countDocuments();

    // RESPONSE
    res.status(200).json({
      totalProjects,
      totalSkills,
      totalAchievements,
      totalMessages,
      unreadMessages,
      timelineItems,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getDashboardStats,
};