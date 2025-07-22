#!/usr/bin/env python3
"""
Migration server for TokRecharge - temporary server to complete migration
This serves the application until Node.js threading issues are resolved
"""

import json
import os
import sqlite3
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import socketserver

class MigrationHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Set the directory for static files
        super().__init__(*args, directory="client", **kwargs)
    
    def do_GET(self):
        parsed = urlparse(self.path)
        
        # Handle API routes
        if parsed.path.startswith('/api/'):
            self.handle_api_request(parsed)
        else:
            # For SPA routing, serve index.html for non-API routes
            if not parsed.path.startswith('/assets/') and not os.path.exists(f"client{parsed.path}"):
                self.path = '/index.html'
            super().do_GET()
    
    def handle_api_request(self, parsed):
        """Handle API requests for migration"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Basic API responses for migration
        if parsed.path == '/api/health':
            response = {
                "status": "ok",
                "message": "TokRecharge migration server running",
                "database": os.getenv('DATABASE_URL', 'not configured'),
                "migration": "in_progress"
            }
        elif parsed.path == '/api/tools':
            response = [
                {
                    "id": 1,
                    "name": "TikTok Coin Calculator",
                    "description": "Convert TikTok coins to real money",
                    "slug": "coin-calculator"
                },
                {
                    "id": 2,
                    "name": "Gift Value Calculator",
                    "description": "Calculate TikTok gift values",
                    "slug": "gift-calculator"
                }
            ]
        elif parsed.path == '/api/countries':
            response = [
                {"code": "US", "name": "United States", "currency": "USD", "rate": 0.014},
                {"code": "UK", "name": "United Kingdom", "currency": "GBP", "rate": 0.011},
                {"code": "CA", "name": "Canada", "currency": "CAD", "rate": 0.019}
            ]
        else:
            response = {"error": "Migration API endpoint", "path": parsed.path}
        
        self.wfile.write(json.dumps(response).encode())
    
    def log_message(self, format, *args):
        """Custom logging for migration server"""
        print(f"Migration Server: {format % args}")

def main():
    port = int(os.getenv('PORT', 5000))
    
    print(f"Starting TokRecharge Migration Server on port {port}")
    print(f"Environment: {os.getenv('NODE_ENV', 'development')}")
    print(f"Database: {'configured' if os.getenv('DATABASE_URL') else 'not configured'}")
    
    # Check if client directory exists
    if not os.path.exists('client'):
        print("Warning: client directory not found, creating basic structure...")
        os.makedirs('client', exist_ok=True)
        
        # Create a basic index.html for migration testing
        with open('client/index.html', 'w') as f:
            f.write('''<!DOCTYPE html>
<html>
<head>
    <title>TokRecharge - Migration in Progress</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        h1 { color: #333; }
        .status { background: #e7f3ff; padding: 20px; border-radius: 4px; border-left: 4px solid #007acc; }
        .api-test { background: #f0f8f0; padding: 15px; margin: 20px 0; border-radius: 4px; }
        button { background: #007acc; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a9e; }
        .result { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>TokRecharge Migration Server</h1>
        <div class="status">
            <strong>Migration Status:</strong> In Progress<br>
            <strong>Server:</strong> Python Migration Server<br>
            <strong>Database:</strong> PostgreSQL Configured<br>
            <strong>Next Steps:</strong> Resolving Node.js threading issues
        </div>
        
        <div class="api-test">
            <h3>API Testing</h3>
            <button onclick="testApi('/api/health')">Test Health</button>
            <button onclick="testApi('/api/tools')">Test Tools</button>
            <button onclick="testApi('/api/countries')">Test Countries</button>
            <div id="api-results"></div>
        </div>
        
        <h3>Migration Progress</h3>
        <ul>
            <li>✅ Dependencies installed</li>
            <li>✅ PostgreSQL database created</li>
            <li>⚠️ Node.js threading issue identified</li>
            <li>🔄 Migration server running</li>
            <li>⏳ Full application migration in progress</li>
        </ul>
    </div>
    
    <script>
        async function testApi(endpoint) {
            const resultsDiv = document.getElementById('api-results');
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                resultsDiv.innerHTML = `<div class="result"><strong>${endpoint}:</strong><br><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
            } catch (error) {
                resultsDiv.innerHTML = `<div class="result"><strong>Error:</strong> ${error.message}</div>`;
            }
        }
    </script>
</body>
</html>''')
    
    with socketserver.TCPServer(("0.0.0.0", port), MigrationHandler) as httpd:
        print(f"Migration server running at http://0.0.0.0:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nMigration server stopped")

if __name__ == "__main__":
    main()