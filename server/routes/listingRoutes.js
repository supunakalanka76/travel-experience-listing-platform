const express = require("express");
const router = express.Router();

const {
  createListing,
  getListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

const protect = require("../middleware/authMiddleware");

// MY LISTINGS (must be before "/:id")
router.get("/my", protect, getMyListings);

// CREATE
router.post("/", protect, createListing);

// PUBLIC FEED
router.get("/", getListings);

// UPDATE / DELETE (owner + within 24h enforced in controller)
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

// DETAIL PAGE
router.get("/:id", getListingById);

module.exports = router;