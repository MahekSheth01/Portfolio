const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin", protect, (req, res) => {

  res.status(200).json({
    message: "Welcome Admin",
    user: req.user,
  });

});

module.exports = router;