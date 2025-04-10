const express = require('express');
const cors = require('cors');
const edaRoutes = require('./routes/edaRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET'],
  credentials: true
}));

app.use(express.json());

// Mount EDA routes at /api
app.use('/api', edaRoutes);
app.use('/api/prediction', predictionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err.message);
});
