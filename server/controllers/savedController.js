const mongoose = require("mongoose");
const User = require("../models/User");
const Listing = require("../models/Listing");

/**
 * GET /api/saved
 * Private: return the user's saved listings (newest first).
 */
exports.getSavedListings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("savedListings");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listings = await Listing.find({ _id: { $in: user.savedListings } })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/saved/:listingId/toggle
 * Private: toggle save/unsave for a listing.
 * Returns: { saved: boolean }
 */
exports.toggleSaveListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const listingExists = await Listing.exists({ _id: listingId });
    if (!listingExists) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const user = await User.findById(req.user.id).select("savedListings");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listingIdStr = String(listingId);
    const alreadySaved = (user.savedListings || []).some(
      (id) => String(id) === listingIdStr
    );

    if (alreadySaved) {
      user.savedListings = user.savedListings.filter(
        (id) => String(id) !== listingIdStr
      );
      await user.save();
      return res.json({ saved: false });
    }

    user.savedListings.push(listingId);
    await user.save();
    return res.json({ saved: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/saved/:listingId
 * Private: check if a listing is saved by the user.
 * Returns: { saved: boolean }
 */
exports.isListingSaved = async (req, res) => {
  try {
    const { listingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ message: "Invalid listing id" });
    }

    const user = await User.findById(req.user.id).select("savedListings");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listingIdStr = String(listingId);
    const saved = (user.savedListings || []).some(
      (id) => String(id) === listingIdStr
    );

    res.json({ saved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};