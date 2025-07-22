const express = require('express');
const path = require('path');

const app = express();
const port = parseInt(process.env.PORT || '5000', 10);

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'TokRecharge server is running',
    database: process.env.DATABASE_URL ? 'connected' : 'not configured'
  });
});

// Basic API routes for migration testing
app.get('/api/tools', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'TikTok Coin Calculator',
      description: 'Convert TikTok coins to real money',
      slug: 'coin-calculator'
    }
  ]);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, 'dist', 'public');
  app.use(express.static(publicPath));
  
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(publicPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'TokRecharge Development Server',
      status: 'Migration in progress',
      endpoints: ['/api/health', '/api/tools']
    });
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TokRecharge server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
});