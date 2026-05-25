const Message = require("../models/Message");
const validator = require("validator");


// SEND MESSAGE
const sendMessage = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // VALIDATION
    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // EMAIL VALIDATION
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // CREATE MESSAGE
    const newMessage =
      await Message.create({
        name,
        email,
        subject,
        message,
      });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET ALL MESSAGES
const getMessages = async (
  req,
  res
) => {

  try {

    const messages =
      await Message.find().sort({
        createdAt: -1,
      });

    res.status(200).json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE MESSAGE
const deleteMessage = async (
  req,
  res
) => {

  try {

    const message =
      await Message.findById(
        req.params.id
      );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      message:
        "Message deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// MARK AS READ
const markAsRead = async (
  req,
  res
) => {

  try {

    const message =
      await Message.findById(
        req.params.id
      );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    message.isRead = true;

    await message.save();

    res.status(200).json({
      message: "Message marked as read",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
  markAsRead,
};