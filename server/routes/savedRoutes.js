const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getSavedListings,
  toggleSaveListing,
  isListingSaved,
} = require("../controllers/savedController");

// LIST SAVED LISTINGS
router.get("/", protect, getSavedListings);

// CHECK IF ONE LISTING IS SAVED
router.get("/:listingId", protect, isListingSaved);

// TOGGLE SAVE/UNSAVE
router.post("/:listingId/toggle", protect, toggleSaveListing);

module.exports = router;