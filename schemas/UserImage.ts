const { CloudinaryAdapter } = require("@keystonejs/file-adapters");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const { Text, Relationship } = require("@keystonejs/fields");
require("dotenv").config();

const fileAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "rattle-keystone-app",
});

const userImageFields = {
  fields: {
    image: { type: CloudinaryImage, adapter: fileAdapter, label: "Source" },
    altText: { type: Text },
    user: { type: Relationship, ref: "User" },
  },
};

module.exports = userImageFields;
