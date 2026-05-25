const express = require("express");

const {
  uploadImage,
} = require(
  "../controllers/uploadController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const router = express.Router();


// PROTECTED IMAGE UPLOAD
router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);

module.exports = router;