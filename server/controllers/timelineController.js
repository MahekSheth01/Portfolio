const Timeline = require(
  "../models/Timeline"
);


// CREATE TIMELINE ITEM
const createTimeline = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      year,
      icon,
      category,
      featured,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !description ||
      !year
    ) {
      return res.status(400).json({
        message: "Please fill required fields",
      });
    }

    // CREATE
    const timeline =
      await Timeline.create({
        title,
        description,
        year,
        icon,
        category,
        featured,
      });

    res.status(201).json(timeline);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET ALL TIMELINE ITEMS
const getTimeline = async (
  req,
  res
) => {

  try {

    const timeline =
      await Timeline.find().sort({
        year: 1,
      });

    res.status(200).json(timeline);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE TIMELINE ITEM
const updateTimeline = async (
  req,
  res
) => {

  try {

    const timeline =
      await Timeline.findById(
        req.params.id
      );

    if (!timeline) {
      return res.status(404).json({
        message: "Timeline item not found",
      });
    }

    const updatedTimeline =
      await Timeline.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedTimeline
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// DELETE TIMELINE ITEM
const deleteTimeline = async (
  req,
  res
) => {

  try {

    const timeline =
      await Timeline.findById(
        req.params.id
      );

    if (!timeline) {
      return res.status(404).json({
        message:
          "Timeline item not found",
      });
    }

    await timeline.deleteOne();

    res.status(200).json({
      message:
        "Timeline item deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  createTimeline,
  getTimeline,
  updateTimeline,
  deleteTimeline,
};