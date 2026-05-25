const express = require("express");

const {
  sendMessage,
  getMessages,
  deleteMessage,
  markAsRead,
} = require(
  "../controllers/messageController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();


// PUBLIC ROUTE
router.post("/", sendMessage);


// PROTECTED ROUTES
router.get("/", protect, getMessages);

router.delete(
  "/:id",
  protect,
  deleteMessage
);

router.put(
  "/read/:id",
  protect,
  markAsRead
);

module.exports = router;