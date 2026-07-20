const express = require("express");

const {
  getMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMessages);
router.post("/", createMessage);
router.patch("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;