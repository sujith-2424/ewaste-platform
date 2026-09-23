const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Center = require('../src/models/Center');
const Ticket = require('../src/models/Ticket');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Center.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});
});

describe('POST /api/tickets', () => {

  it('assigns the nearest available center', async () => {
    // Seed two centers — one near, one far
    await Center.insertMany([
      {
        name: 'Near Center',
        capacity: 10,
        currentLoad: 0,
        accepted_materials: ['laptop'],
        coordinates: { type: 'Point', coordinates: [78.4867, 17.3850] }
      },
      {
        name: 'Far Center',
        capacity: 10,
        currentLoad: 0,
        accepted_materials: ['laptop'],
        coordinates: { type: 'Point', coordinates: [77.5946, 12.9716] }
      }
    ]);

    // Create a test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      address: 'Hyderabad',
      coordinates: { type: 'Point', coordinates: [78.4867, 17.3850] }
    });

    const res = await request(app)
      .post('/api/tickets')
      .send({
        user_id: user._id,
        waste_type: 'laptop',
        weight: 2,
        coordinates: [78.4867, 17.3850]
      });

    expect(res.statusCode).toBe(201);

    // Verify it picked the nearest center
    const assignedCenter = await Center.findById(res.body.assigned_center_id);
    expect(assignedCenter.name).toBe('Near Center');
  });

  it('returns 422 when all nearby centers are at capacity', async () => {
    // Seed a center that is completely full
    await Center.create({
      name: 'Full Center',
      capacity: 10,
      currentLoad: 10,
      accepted_materials: ['laptop'],
      coordinates: { type: 'Point', coordinates: [78.4867, 17.3850] }
    });

    const user = await User.create({
      name: 'Test User 2',
      email: 'test2@test.com',
      address: 'Hyderabad',
      coordinates: { type: 'Point', coordinates: [78.4867, 17.3850] }
    });

    const res = await request(app)
      .post('/api/tickets')
      .send({
        user_id: user._id,
        waste_type: 'laptop',
        weight: 2,
        coordinates: [78.4867, 17.3850]
      });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe('No available centers near you.');
  });

});