import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  if (!MONGO_URI) {
    console.error(
      'MongoDB connection URI is not defined in environment variables'
    );
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(MONGO_URI);

    console.log(
      `MongoDB connected: ${connect.connection.host} [${connect.connection.name}]`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
