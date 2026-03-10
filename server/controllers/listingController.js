const Listing = require("../models/Listing");


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
      user: req.user.id
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

    const listing = await Listing.findById(req.params.id)
      .populate("user", "name");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};