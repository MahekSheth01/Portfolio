const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// UPLOAD IMAGE — streams buffer from memoryStorage to Cloudinary
const uploadImage = async (req, res) => {
  try {
    console.log("[uploadImage] user:", req.user ? req.user._id : null);
    console.log("[uploadImage] has req.file:", !!req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    console.log("[uploadImage] file fieldname:", req.file.fieldname);
    console.log("[uploadImage] file mimetype:", req.file.mimetype);
    console.log("[uploadImage] file originalname:", req.file.originalname);
    console.log("[uploadImage] buffer size:", req.file.buffer?.length);

    // Upload buffer to Cloudinary via stream
    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "portfolio" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

    const result = await uploadFromBuffer();

    res.status(200).json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error("[uploadImage] Cloudinary upload failed:", error);
    res.status(500).json({
      message: error?.message || "Cloudinary upload failed",
    });
  }
};

module.exports = { uploadImage };