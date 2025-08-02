import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/products', productRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Serve frontend static files
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is running...');
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server is ready on port ${PORT}`));
