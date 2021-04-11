import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import posts from './data/posts.js';
import User from './models/userModel.js';
import Post from './models/postModel.js';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, user: adminUser };
    });

    await Post.insertMany(samplePosts);

    console.log(`Data imported!`.blue.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    console.log(`Data destroyed!`.red.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
