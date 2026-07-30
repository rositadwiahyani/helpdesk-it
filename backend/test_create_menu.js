const http = require('http');

const data = JSON.stringify({
  title: 'Test FAQ',
  action_type: 'TEXT_REPLY',
  content: 'Test FAQ',
  sort_order: 1,
  is_active: true
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/bot-menus',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
    // Simulate admin role since we removed the token temporarily? No, requireAuth blocks it!
  }
};

// Wait, I need a valid token to test this, or I can just test the DB directly.
