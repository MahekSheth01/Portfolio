const Setting = require("../models/Setting");


// GET SETTINGS
const getSettings = async (
  req,
  res
) => {

  try {

    let settings =
      await Setting.findOne();

    // CREATE DEFAULT IF NOT EXISTS
    if (!settings) {

      settings =
        await Setting.create({});

    }

    res.status(200).json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// UPDATE SETTINGS
const updateSettings = async (
  req,
  res
) => {

  try {

    let settings =
      await Setting.findOne();

    // CREATE IF NOT EXISTS
    if (!settings) {

      settings =
        await Setting.create({});

    }

    // UPDATE SETTINGS
    settings =
      await Setting.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getSettings,
  updateSettings,
};