const express = require("express");
const router = express.Router();
const Service = require("../models/service");

// @route POST /api/services
// @desc Create a new service
router.post("/", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const newService = new Service({ name, description, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Failed to create service", error });
  }
});

// @route GET /api/services?q=plumber
// @desc Get all services or filtered by query
router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "";
    const services = await Service.find({
      name: { $regex: query, $options: "i" }, // case-insensitive search
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
});

module.exports = router;