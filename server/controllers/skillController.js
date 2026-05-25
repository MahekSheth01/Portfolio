const Skill = require("../models/Skill");


// CREATE SKILL
const createSkill = async (
  req,
  res
) => {

  try {

    const {
      name,
      category,
      icon,
      proficiency,
      featured,
    } = req.body;

    // VALIDATION
    if (!name) {
      return res.status(400).json({
        message: "Skill name required",
      });
    }

    // CREATE
    const skill = await Skill.create({
      name,
      category,
      icon,
      proficiency,
      featured,
    });

    res.status(201).json(skill);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET ALL SKILLS
const getSkills = async (
  req,
  res
) => {

  try {

    const skills = await Skill.find().sort({
      createdAt: -1,
    });

    res.status(200).json(skills);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE SKILL
const updateSkill = async (
  req,
  res
) => {

  try {

    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    const updatedSkill =
      await Skill.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedSkill);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE SKILL
const deleteSkill = async (
  req,
  res
) => {

  try {

    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      message: "Skill deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};