import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootDir = `${__dirname}/public/`;

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

connectDB();

app.get('/', (req, res) => {
  res.send('API ok');
});

// routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port http://localhost:${PORT}`
      .yellow.underline
  )
);
