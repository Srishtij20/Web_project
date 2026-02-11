const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const User = require("../models/user");

// INDEX & CREATE ROUTES
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW WISHLIST PAGE (MUST COME BEFORE :id)
router.get("/wishlist", isLoggedIn, async (req, res) => {
  let user = await User.findById(req.user._id).populate("wishlist");
  res.render("listings/wishlist.ejs", { wishlist: user.wishlist });
});

// ADD TO WISHLIST
router.post("/:id/wishlist", isLoggedIn, async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let user = await User.findById(req.user._id);

  if (!user.wishlist.includes(listing._id)) {
    user.wishlist.push(listing._id);
    await user.save();
  }

  req.flash("success", "Added to wishlist!");
  res.redirect(`/listings/${listing._id}`);
});

// REMOVE FROM WISHLIST
router.post("/:id/unwishlist", isLoggedIn, async (req, res) => {
  let user = await User.findById(req.user._id);

  user.wishlist = user.wishlist.filter(
    id => id.toString() !== req.params.id
  );

  await user.save();

  req.flash("success", "Removed from wishlist!");
  res.redirect(`/listings/${req.params.id}`);
});

// SHOW / UPDATE / DELETE ROUTES
// (Dynamic routes go LAST)
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;