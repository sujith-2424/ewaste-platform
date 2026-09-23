const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Center = require('./models/Center');

// This forces Node to look in the correct 'server' folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const centers = [
  {
    name: 'Hyderabad E-Waste Center',
    capacity: 100,
    currentLoad: 20,
    accepted_materials: ['battery', 'laptop', 'mobile', 'television'],
    coordinates: { type: 'Point', coordinates: [78.4867, 17.3850] }
  },
  {
    name: 'Secunderabad Recycling Hub',
    capacity: 80,
    currentLoad: 79,
    accepted_materials: ['laptop', 'mobile', 'refrigerator'],
    coordinates: { type: 'Point', coordinates: [78.5011, 17.4399] }
  },
  {
    name: 'Kukatpally E-Waste Depot',
    capacity: 60,
    currentLoad: 10,
    accepted_materials: ['battery', 'mobile', 'television', 'refrigerator'],
    coordinates: { type: 'Point', coordinates: [78.4082, 17.4947] }
  },
  {
    name: 'LB Nagar Collection Point',
    capacity: 50,
    currentLoad: 50,
    accepted_materials: ['laptop', 'battery'],
    coordinates: { type: 'Point', coordinates: [78.5519, 17.3469] }
  },
  {
    name: 'Madhapur Tech Recyclers',
    capacity: 120,
    currentLoad: 30,
    accepted_materials: ['laptop', 'mobile', 'battery', 'television'],
    coordinates: { type: 'Point', coordinates: [78.3816, 17.4486] }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Center.deleteMany({});
    console.log('Cleared existing centers');

    await Center.insertMany(centers);
    console.log(`Seeded ${centers.length} recycling centers`);

    await mongoose.disconnect();
    console.log('Done! Disconnected.');
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();