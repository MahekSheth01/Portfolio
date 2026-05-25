const express = require("express");

const {
  createAchievement,
  getAchievements,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
} = require(
  "../controllers/achievementController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// PUBLIC ROUTES
router.get("/", getAchievements);

router.get("/:id", getSingleAchievement);


// PROTECTED ROUTES
router.post("/", protect, createAchievement);

router.put("/:id", protect, updateAchievement);

router.delete(
  "/:id",
  protect,
  deleteAchievement
);

module.exports = router;