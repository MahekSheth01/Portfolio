const Project = require("../models/Project");


// CREATE PROJECT
const createProject = async (req, res) => {

  try {

    const {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      image,
      featured,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !description ||
      !technologies
    ) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    // CREATE PROJECT
    const project = await Project.create({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      image,
      featured,
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET ALL PROJECTS
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET SINGLE PROJECT
const getSingleProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE PROJECT
const updateProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE PROJECT
const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};