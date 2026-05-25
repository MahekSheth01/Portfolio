const express = require("express");

const {
  getSettings,
  updateSettings,
} = require(
  "../controllers/settingController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// PUBLIC ROUTE
router.get("/", getSettings);


// PROTECTED ROUTE
router.put("/", protect, updateSettings);

module.exports = router;