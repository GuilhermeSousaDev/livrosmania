import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return Promise.resolve(true);

    const { connection } = await mongoose.connect(MONGODB_URI as string);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
