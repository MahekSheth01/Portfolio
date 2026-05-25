const Achievement = require(
  "../models/Achievement"
);


// CREATE ACHIEVEMENT
const createAchievement = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      image,
      category,
      date,
      featured,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    // CREATE
    const achievement =
      await Achievement.create({
        title,
        description,
        image,
        category,
        date,
        featured,
      });

    res.status(201).json(achievement);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET ALL ACHIEVEMENTS
const getAchievements = async (
  req,
  res
) => {

  try {

    const achievements =
      await Achievement.find().sort({
        createdAt: -1,
      });

    res.status(200).json(achievements);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET SINGLE ACHIEVEMENT
const getSingleAchievement = async (
  req,
  res
) => {

  try {

    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.status(200).json(achievement);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE ACHIEVEMENT
const updateAchievement = async (
  req,
  res
) => {

  try {

    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    const updatedAchievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedAchievement
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE ACHIEVEMENT
const deleteAchievement = async (
  req,
  res
) => {

  try {

    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    await achievement.deleteOne();

    res.status(200).json({
      message:
        "Achievement deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createAchievement,
  getAchievements,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
};