/* eslint-disable no-console */

import { createServer, IncomingMessage, ServerResponse } from 'http';
import handler from 'serve-handler';

const PORT = 3000;
const ALLOWED_ORIGIN = 'http://vozdv.tilda.ws'; // Replace with your actual remote origin
const STATIC_DIR = './build-dev'; // Current directory - adjust as needed

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true',
  'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
};

const requestHandler = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight OPTIONS requests immediately
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // Serve static files with serve-handler and merged headers
    await handler(req, res, {
      public: STATIC_DIR,
      headers: [
        {
          source: '/**',
          headers: [{ key: 'Access-Control-Allow-Private-Network', value: 'true' }],
        },
      ],
      cleanUrls: true,
      trailingSlash: true,
    });
  } catch (error) {
    console.error('Serve handler error:', error);
    debugger; // eslint-disable-line no-debugger
    res.writeHead(500);
    res.end('Internal Server Error');
  }
};

const server = createServer(requestHandler);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Network accessible at http://0.0.0.0:${PORT}`);
  console.log(`CORS enabled for: ${ALLOWED_ORIGIN}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
