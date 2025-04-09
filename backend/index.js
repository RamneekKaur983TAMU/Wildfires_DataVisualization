const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err.message);
});
