const express = require("express");
const router = express.Router();

const {
  createListing,
  getListings,
  getListingById
} = require("../controllers/listingController");

const protect = require("../middleware/authMiddleware");


// CREATE
router.post("/", protect, createListing);

// PUBLIC FEED
router.get("/", getListings);

// DETAIL PAGE
router.get("/:id", getListingById);


module.exports = router;