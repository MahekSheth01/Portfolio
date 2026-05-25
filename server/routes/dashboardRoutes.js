const express = require("express");

const {
  getDashboardStats,
} = require(
  "../controllers/dashboardController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// PROTECTED ROUTE
router.get(
  "/stats",
  protect,
  getDashboardStats
);

module.exports = router;