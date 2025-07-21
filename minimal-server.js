// Minimal server to test if basic Node.js works
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>TokRecharge - Migration Test</title></head>
      <body>
        <h1>TokRecharge.com - TikTok Coin Calculator</h1>
        <p>Server is running! Migration to Replit is in progress.</p>
        <p>Time: ${new Date().toISOString()}</p>
      </body>
    </html>
  `);
});

const port = parseInt(process.env.PORT || '5000', 10);
server.listen(port, '0.0.0.0', () => {
  console.log(`Minimal server running on port ${port}`);
  console.log(`Visit: http://localhost:${port}`);
});