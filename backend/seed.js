require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Seed services
    const services = [
      { name: "Plumbing", description: "Professional plumbing services", image: "/uploads/plumber.jpg" },
      { name: "Electrical", description: "Electrical repair and installation", image: "/uploads/factory.jpg" },
      { name: "Cleaning", description: "House cleaning services", image: "/uploads/factory1.jpg" },
      { name: "Beauty", description: "Beauty and salon services", image: "/uploads/img2.jpg" },
      { name: "Pest Control", description: "Pest control and extermination", image: "/uploads/img3.jpg" },
      { name: "Carpentry", description: "Carpentry and woodwork", image: "/uploads/img4.jpg" }
    ];

    console.log('Seeding services...');
    const createdServices = [];
    for (const serviceData of services) {
      let service = await Service.findOne({ name: serviceData.name });
      if (!service) {
        service = new Service(serviceData);
        await service.save();
        console.log(`Created service: ${serviceData.name}`);
      } else {
        console.log(`Service already exists: ${serviceData.name}`);
      }
      createdServices.push(service);
    }

    // Seed providers
    const providers = [
      { name: 'Plumber', email: 'plumber@demo.com', password: 'plumber123', role: 'provider' },
      { name: 'Beautician', email: 'beautician@demo.com', password: 'beautician123', role: 'provider' },
      { name: 'Pest Control', email: 'pestcontrol@demo.com', password: 'pest123', role: 'provider' },
      { name: 'Electrician', email: 'electrician@demo.com', password: 'electrician123', role: 'provider' },
    ];

    console.log('Seeding providers...');
    for (const providerData of providers) {
      let user = await User.findOne({ email: providerData.email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(providerData.password, 10);
        user = new User({ ...providerData, password: hashedPassword });
        await user.save();
        console.log(`Created provider: ${providerData.name}`);
      } else {
        console.log(`Provider already exists: ${providerData.name}`);
      }
    }

    // Create admin user if not exists
    const adminData = { name: 'Admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' };
    let admin = await User.findOne({ email: adminData.email });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      admin = new User({ ...adminData, password: hashedPassword });
      await admin.save();
      console.log('Created admin user');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData(); 