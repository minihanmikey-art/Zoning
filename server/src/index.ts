import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import parcelRoutes from './routes/parcel.routes';
import municipalityRoutes from './routes/municipality.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/parcels', parcelRoutes);
app.use('/api/municipalities', municipalityRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
