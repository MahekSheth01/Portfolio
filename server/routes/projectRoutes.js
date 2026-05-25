const express = require("express");

const {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// PUBLIC ROUTES
router.get("/", getProjects);

router.get("/:id", getSingleProject);


// PROTECTED ROUTES
router.post("/", protect, createProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

module.exports = router;