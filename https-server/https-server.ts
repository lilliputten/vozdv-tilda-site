/* eslint-disable no-console */

import { readFileSync } from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createServer as createSecureServer } from 'https';
import handler from 'serve-handler';

const PORT = 3000;
const HTTPS_PORT = 3443; // Common for local HTTPS dev
const ALLOWED_ORIGIN = 'http://vozdv.tilda.ws'; // Replace with your actual remote origin
const STATIC_DIR = './build-dev'; // Current directory - adjust as needed

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true',
  'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
};

// HTTPS options - generate self-signed certs or use mkcert
const httpsOptions = {
  key: readFileSync('cert/localhost-key.pem'),
  cert: readFileSync('cert/localhost.pem'),
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

// HTTP server (redirects to HTTPS in production)
const httpServer = createServer(requestHandler);
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});

// HTTPS server (main server)
const httpsServer = createSecureServer(httpsOptions, requestHandler);
httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`HTTPS server running at https://localhost:${HTTPS_PORT}`);
  console.log(`Network accessible at https://0.0.0.0:${HTTPS_PORT}`);
  console.log(`CORS enabled for: ${ALLOWED_ORIGIN}`);
});

// Graceful shutdown
const shutdown = (server: any) => {
  console.log('Shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown(httpsServer));
process.on('SIGINT', () => shutdown(httpsServer));
