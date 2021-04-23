import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.info(`MongoDB connected: ${conn.connection.host}`.blue.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.bgCyan.black);
    process.exit(1);
  }
};

export default connectDB;
