const cloudinary =
  require("cloudinary").v2;


const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

const missing = [];
if (!CLOUDINARY_CLOUD_NAME) missing.push("CLOUDINARY_CLOUD_NAME");
if (!CLOUDINARY_API_KEY) missing.push("CLOUDINARY_API_KEY");
if (!CLOUDINARY_API_SECRET) missing.push("CLOUDINARY_API_SECRET");

if (missing.length) {
  console.error(
    "[cloudinary] Missing env vars:",
    missing.join(", ")
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


module.exports = cloudinary;

