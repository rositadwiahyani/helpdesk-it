import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth.routes';
import ticketRoutes from './routes/ticket.routes';

const app = express();

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Registrasi Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('API Helpdesk IT UNDIP Aktif!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Helpdesk berjalan di http://localhost:${PORT}`);
});