const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const User = require("../models/User");

// @route POST /api/services/seed
// @desc Seed sample services
router.post("/seed", async (req, res) => {
  try {
    const sampleServices = [
      { name: "Plumbing", description: "Professional plumbing services", image: "/uploads/plumber.jpg" },
      { name: "Electrical", description: "Electrical repair and installation", image: "/uploads/factory.jpg" },
      { name: "Cleaning", description: "House cleaning services", image: "/uploads/factory1.jpg" },
      { name: "Beauty", description: "Beauty and salon services", image: "/uploads/img2.jpg" },
      { name: "Pest Control", description: "Pest control and extermination", image: "/uploads/img3.jpg" },
      { name: "Carpentry", description: "Carpentry and woodwork", image: "/uploads/img4.jpg" }
    ];

    const results = [];
    for (const serviceData of sampleServices) {
      let service = await Service.findOne({ name: serviceData.name });
      if (!service) {
        service = new Service(serviceData);
        await service.save();
        results.push({ name: serviceData.name, status: 'created' });
      } else {
        results.push({ name: serviceData.name, status: 'already exists' });
      }
    }
    res.json({ message: 'Services seeded', results });
  } catch (error) {
    res.status(500).json({ message: "Failed to seed services", error });
  }
});

// @route GET /api/services/available
// @desc Get services that have providers assigned to them
router.get("/available", async (req, res) => {
  try {
    const query = req.query.q || "";
    
    console.log('Fetching available services with query:', query);
    
    // Find all providers who have services assigned
    const providersWithServices = await User.find({
      role: 'provider',
      services: { $exists: true, $ne: [] }
    }).populate('services');
    
    console.log('Found providers with services:', providersWithServices.length);
    
    // Get unique services that have providers
    const availableServices = new Map();
    
    providersWithServices.forEach(provider => {
      console.log(`Provider ${provider.name} has ${provider.services.length} services`);
      provider.services.forEach(service => {
        if (!availableServices.has(service._id.toString())) {
          availableServices.set(service._id.toString(), {
            ...service.toObject(),
            providerCount: 1
          });
        } else {
          availableServices.get(service._id.toString()).providerCount += 1;
        }
      });
    });
    
    // Convert to array and filter by query
    let services = Array.from(availableServices.values());
    
    if (query) {
      services = services.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    console.log('Returning available services:', services.length);
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching available services:', error);
    res.status(500).json({ message: "Failed to fetch available services", error });
  }
});

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