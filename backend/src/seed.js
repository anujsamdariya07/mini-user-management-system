import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import dbConnect from './config/dbConnect.js';

config();

const seedUsers = [
  {
    fullName: 'Admin One',
    email: 'admin1@example.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
  },
  {
    fullName: 'Admin Two',
    email: 'admin2@example.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
  },

  {
    fullName: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Olivia Miller',
    email: 'olivia.miller@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Sophia Davis',
    email: 'sophia.davis@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Ava Wilson',
    email: 'ava.wilson@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Isabella Brown',
    email: 'isabella.brown@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Mia Johnson',
    email: 'mia.johnson@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Charlotte Williams',
    email: 'charlotte.williams@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Amelia Garcia',
    email: 'amelia.garcia@example.com',
    password: 'User@123',
  },
  {
    fullName: 'James Anderson',
    email: 'james.anderson@example.com',
    password: 'User@123',
  },
  {
    fullName: 'William Clark',
    email: 'william.clark@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Benjamin Taylor',
    email: 'benjamin.taylor@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Lucas Moore',
    email: 'lucas.moore@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Henry Jackson',
    email: 'henry.jackson@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Alexander Martin',
    email: 'alexander.martin@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Daniel Rodriguez',
    email: 'daniel.rodriguez@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Ethan Martinez',
    email: 'ethan.martinez@example.com',
    password: 'User@123',
  },
  {
    fullName: 'Michael Perez',
    email: 'michael.perez@example.com',
    password: 'User@123',
  },
];

const seedDatabase = async () => {
  try {
    await dbConnect();

    await User.deleteMany();

    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await User.insertMany(hashedUsers);

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
