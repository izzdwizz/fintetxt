import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js';
import connectDB from './config/db.js';
import colors from 'colors';

import authRoutes from  './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(router);

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api', imageRoutes);

// Set port from environment variable, defaulting to 5000 if not provided
const PORT = process.env.PORT || 5000;

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});