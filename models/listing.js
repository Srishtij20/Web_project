const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: { url: String, filename: String },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: ["trending","rooms","iconic cities","mountains","castles","amazing pools","camping","farms","arctic","domes","boats","beach"],
    default: "trending",
  },
  geometry: {
    type: { type: String, enum: ["Point"] },
    coordinates: [Number],
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);