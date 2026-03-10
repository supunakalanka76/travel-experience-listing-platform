const Listing = require("../models/Listing");

const HOURS_24_MS = 24 * 60 * 60 * 1000;

// CREATE LISTING
exports.createListing = async (req, res) => {
  try {
    const { title, location, image, description, price } = req.body;

    const listing = await Listing.create({
      title,
      location,
      image,
      description,
      price,
      user: req.user.id,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL LISTINGS (PUBLIC FEED)
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE LISTING
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "user",
      "name"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY LISTINGS (PRIVATE)
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LISTING (PRIVATE, OWNER, WITHIN 24H)
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (String(listing.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const createdAtMs = new Date(listing.createdAt).getTime();
    if (Date.now() - createdAtMs > HOURS_24_MS) {
      return res
        .status(403)
        .json({ message: "Editing allowed only within 24 hours" });
    }

    const { title, location, image, description, price } = req.body;

    listing.title = title ?? listing.title;
    listing.location = location ?? listing.location;
    listing.image = image ?? listing.image;
    listing.description = description ?? listing.description;
    listing.price = price ?? listing.price;

    const updated = await listing.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE LISTING (PRIVATE, OWNER, WITHIN 24H)
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (String(listing.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const createdAtMs = new Date(listing.createdAt).getTime();
    if (Date.now() - createdAtMs > HOURS_24_MS) {
      return res
        .status(403)
        .json({ message: "Deleting allowed only within 24 hours" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};