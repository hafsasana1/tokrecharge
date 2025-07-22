import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to start the server with tsx
const serverFile = join(__dirname, 'server', 'index.ts');

console.log('Starting TokRecharge server...');

// Set NODE_ENV if not already set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const child = spawn('node', ['--loader=tsx/esm', serverFile], {
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});