const express = require("express");

const {
  createTimeline,
  getTimeline,
  updateTimeline,
  deleteTimeline,
} = require(
  "../controllers/timelineController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// PUBLIC ROUTE
router.get("/", getTimeline);


// PROTECTED ROUTES
router.post("/", protect, createTimeline);

router.put("/:id", protect, updateTimeline);

router.delete(
  "/:id",
  protect,
  deleteTimeline
);

module.exports = router;