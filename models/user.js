const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ✅ SAFE IMPORT (works in Node 16–22)
const plm = require("passport-local-mongoose");
const passportLocalMongoose = plm.default || plm;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
